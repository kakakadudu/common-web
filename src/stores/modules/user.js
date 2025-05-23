import { defineStore } from "pinia";
import { login, logout, getInfo, refreshToken } from "@/api/login";
import { getToken, setToken, removeToken, getRefreshToken, setRefreshToken, removeRefreshToken } from "@/utils/auth";
import defAva from "@/assets/images/sheep.jpeg";

const useUserStore = defineStore("user", {
  state: () => ({
    token: getToken(),
    refreshToken: getRefreshToken(), // 用于刷新 accessToken
    id: "",
    name: "",
    avatar: "",
  }),
  actions: {
    // 登录
    login(userInfo) {
      const username = userInfo.username.trim();
      const password = userInfo.password;
      const code = userInfo.code;
      const uuid = userInfo.uuid;
      return new Promise((resolve, reject) => {
        login(username, password, code, uuid)
          .then((res) => {
            setToken(res.token);
            this.token = res.token;
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 获取用户信息
    getInfo() {
      return new Promise((resolve, reject) => {
        getInfo()
          .then((res) => {
            const user = res.user;
            const avatar =
              user.avatar == "" || user.avatar == null
                ? defAva
                : import.meta.env.VITE_APP_BASE_API + user.avatar;

            this.id = user.userId;
            this.name = user.userName;
            this.avatar = avatar;
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    refreshAccessToken() {
      return new Promise((resolve, reject) => {
        refreshToken({
          refreshToken: this.refreshToken
        })
          .then((res) => {
            if (res.code === 200) {
              setToken(res.data.accessToken);
              setRefreshToken(res.data.refreshToken);
              this.token = res.data.accessToken;
              this.refreshToken = res.data.refreshToken;
              resolve(res);
            } else {
              reject(res);
            }
          })
          .catch((error) => {
            this.logOut();
            reject(error);
          });
      });
    },
    // 退出系统
    logOut() {
      return new Promise((resolve, reject) => {
        logout(this.token)
          .then(() => {
            this.token = "";
            removeToken();
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});

export default useUserStore;
