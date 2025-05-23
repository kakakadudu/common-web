import Cookies from "js-cookie";
import { encrypt, decrypt } from "./crypto.js";

const TokenKey = "Admin-Token";
const RefreshTokenKey = "refreshToken";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function getRefreshToken() {
  const refreshToken = localStorage.getItem(RefreshTokenKey);
  if (refreshToken) {
    return decrypt(refreshToken);
  }
  return "";
}

export function setRefreshToken(token) {
  const refreshToken = encrypt(token);
  return localStorage.setItem(RefreshTokenKey, refreshToken);
}

export function removeRefreshToken() {
  return localStorage.removeItem(RefreshTokenKey);
}
