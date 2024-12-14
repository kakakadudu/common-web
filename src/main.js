
import '@/assets/styles/index.scss' // global css

import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import locale from "element-plus/es/locale/lang/zh-cn"; // 中文语言
import plugins from "./plugins"; // plugins

import App from "./App.vue";
import stores from "./stores";
import router from "./router";

import "virtual:svg-icons-register";
import SvgIcon from "@/components/SvgIcon";
import elementIcons from "@/components/SvgIcon/svgicon";

// 日期格式化
import "./utils/date.js";

const app = createApp(App);

app.use(createPinia());
app.use(ElementPlus, {
  locale: locale,
  // 支持 large、default、small
  size: "default",
});
app.use(elementIcons);
app.component("svg-icon", SvgIcon);
app.use(plugins);
app.use(stores);
app.use(router);

app.mount("#app");
