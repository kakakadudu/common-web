import { fileURLToPath, URL } from "node:url";
import os from "node:os";
import process from "node:process";

import { defineConfig, loadEnv } from "vite";
import createVitePlugins from "./vite/plugins";
import { createHtmlPlugin } from "vite-plugin-html";

// 获取本机 IP 地址
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // 过滤掉回环地址、未启用的网络接口和 IPv6 地址
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "0.0.0.0"; // 如果没有找到 IP
}

// https://vite.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const { VITE_APP_BASE_API, VITE_APP_TITLE } = env;
  return {
    base: "/",
    plugins: [
      createVitePlugins(env, command === "build"),
      createHtmlPlugin({
        minify: true, // 是否压缩 HTML
        inject: {
          data: {
            title: VITE_APP_TITLE, // 动态设置 <title> 内容
          },
        },
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
      extensions: [".mjs", ".js", ".ts", ".json", ".vue"],
    },
    build: {
      target: ["edge90", "chrome90", "firefox90", "safari15"],
      outDir: "author-front",
    },
    server: {
      port: 8006,
      host: getLocalIP(),
      open: true,
      proxy: {
        [VITE_APP_BASE_API]: {
          target: "",
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/dev-api/, ""),
        },
      },
    },
  };
});
