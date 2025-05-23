import autoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default function createAutoImport() {
  return autoImport({
    imports: ["vue", "vue-router", "pinia"],
    resolvers: [ElementPlusResolver()], // 自动导入 Element Plus 的 API
    dts: false,
  });
}
