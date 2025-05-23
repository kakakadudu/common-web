import request from "@/utils/request";

// 获取用户认证信息
export function getAuth() {
  return request({
    url: "/user/auth/info",
    method: "get",
  });
}
