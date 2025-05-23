import request from "@/utils/request";

// 登录方法
export function login(username, password, code, uuid) {
  const data = {
    username,
    password,
    code,
    uuid,
  };
  return request({
    url: "/login",
    headers: {
      isToken: false,
      repeatSubmit: false,
    },
    method: "post",
    data: data,
  });
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: "/getInfo",
    method: "get",
  });
}

// 退出方法
export function logout() {
  return request({
    url: "/logout",
    method: "post",
  });
}

// 获取火山云 token
export function getHsyToken(query) {
  return request({
    url: '/sign/token',
    method: 'get',
    params: query,
  });
}

// 刷新token
export function refreshToken(data) {
  return request({
    url: '/web/auth/refresh_token',
    method: 'post',
    params: data
  });
}