import axios from "axios";
import {
  ElNotification,
  ElMessage,
} from "element-plus";
import { getToken } from "@/utils/auth";
import errorCode from "@/utils/errorCode";
import { tansParams } from "@/utils/common";
import cache from "@/plugins/cache";
import useUserStore from "@/stores/modules/user";

let isRefreshing = false; // 标志位，表示是否正在刷新 Token
let refreshSubscribers = []; // 存储等待刷新 Token 的请求

// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // 超时
  timeout: 5 * 60 * 1000,
});

const cancelToken = axios.CancelToken;
let cancelRequest = [];

// request拦截器
service.interceptors.request.use(
  (config) => {
    config.cancelToken = new cancelToken((c) => {
      cancelRequest.push(c);
    });
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false;
    // 是否需要防止数据重复提交
    const isRepeatSubmit = (config.headers || {}).repeatSubmit === false;
    if (getToken() && !isToken) {
      config.headers["Authorization"] = "Bearer " + getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    // get请求映射params参数
    if (config.method === "get" && config.params) {
      let url = config.url + "?" + tansParams(config.params);
      url = url.slice(0, -1);
      config.params = {};
      config.url = url;
    }
    if (
      !isRepeatSubmit &&
      (config.method === "post" || config.method === "put")
    ) {
      const requestObj = {
        url: config.url,
        data:
          typeof config.data === "object"
            ? JSON.stringify(config.data)
            : config.data,
        time: new Date().getTime(),
      };
      const requestSize = Object.keys(JSON.stringify(requestObj)).length; // 请求数据大小
      const limitSize = 5 * 1024 * 1024; // 限制存放数据5M
      if (requestSize >= limitSize) {
        console.warn(
          `[${config.url}]: ` +
          "请求数据大小超出允许的5M限制，无法进行防重复提交验证。"
        );
        return config;
      }
      const sessionObj = cache.session.getJSON("sessionObj");
      if (
        sessionObj === undefined ||
        sessionObj === null ||
        sessionObj === ""
      ) {
        cache.session.setJSON("sessionObj", requestObj);
      } else {
        const s_url = sessionObj.url; // 请求地址
        const s_data = sessionObj.data; // 请求数据
        const s_time = sessionObj.time; // 请求时间
        const interval = 1000; // 间隔时间(ms)，小于此时间视为重复提交
        if (
          s_data === requestObj.data &&
          requestObj.time - s_time < interval &&
          s_url === requestObj.url
        ) {
          const message = "数据正在处理，请勿重复提交";
          console.warn(`[${s_url}]: ` + message);
          return Promise.reject(new Error(message));
        } else {
          cache.session.setJSON("sessionObj", requestObj);
        }
      }
    }
    return config;
  },
  (error) => {
    console.log("request error-----", error);
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200;
    // 获取错误信息
    const msg = errorCode[code] || res.data.msg || errorCode["default"];
    // 二进制数据则直接返回
    if (
      res.request.responseType === "blob" ||
      res.request.responseType === "arraybuffer"
    ) {
      return res.data;
    }
    if (code === 401) {
      const originalRequest = res.config; // 保存当前请求
      if (!isRefreshing) {
        isRefreshing = true;
        return useUserStore().refreshAccessToken().then((res) => { // 刷新 Token 成功，重新发送原始请求
          originalRequest.headers["Authorization"] = "Bearer " + getToken();
          // 重新发送原始请求
          retryRefreshSubscribers()
          return service(originalRequest);
        }).catch((refreshError) => {
          // 刷新 Token 失败，跳转到登录页面
          // ElMessage({ message: "登录过期，请重新登录", type: "error" });
          useUserStore().logOut();
          return Promise.reject(refreshError);
        }).finally(() => {
          isRefreshing = false;
        });
      } else {
        console.log(originalRequest.url, "正在刷新 Token，将请求加入等待队列");
        // 如果正在刷新 Token，将请求加入等待队列
        return new Promise((resolve) => {
          refreshSubscribers.push(() => {
            originalRequest.headers["Authorization"] = "Bearer " + getToken();
            resolve(service(originalRequest));
          });
        });
      }
    } else if (code === 403) {
      // ElMessage({ message: "登录过期，请重新登录", type: "error" });
      console.log("登录过期");
      useUserStore().logOut();
      return Promise.reject(res);
    } else if (code === 500) {
      ElMessage({ message: msg, type: "error" });
      return Promise.reject(new Error(msg));
    } else if (code === 601) {
      ElMessage({ message: msg, type: "warning" });
      return Promise.reject(new Error(msg));
    } else if (code !== 200) {
      ElNotification.error({ title: msg });
      return Promise.reject("error");
    } else {
      return Promise.resolve(res.data);
    }
  },
  (error) => {
    console.log("response error-----", error);
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("502")) {
      message = "服务正在发布中请耐心等待...";
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    if (message == "canceled") {
      console.log("取消请求");
    } else {
      ElMessage({ message: message, type: "error", duration: 5 * 1000 });
    }
    return Promise.reject(error);
  }
);
// 刷新 Token 成功后，重新发送所有等待的请求
const retryRefreshSubscribers = () => {
  refreshSubscribers.forEach((callback) => callback());
  refreshSubscribers = [];
};

export function cancelRequests() {
  cancelRequest.forEach((c) => c());
}

export default service;
