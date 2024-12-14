import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default function createComponents() {
  Components({
    resolvers: [ElementPlusResolver()], // 按需引入 Element Plus 的组件
  });
}
