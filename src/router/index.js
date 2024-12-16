import { createRouter, createWebHistory } from "vue-router";
import Layout from "../layout/index.vue";
import Index from "../views/index/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "",
      name: "Layout",
      component: Layout,
      children: [
        {
          path: "/index",
          name: "Index",
          title: "作品管理",
          icon: "Collection",
          component: Index,
        }, 
      ],
    },
    {
      path: "/init",
      name: "Init",
      desc: "首次登录初始化信息",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/initInfo/index.vue"),
    },
  ],
});

export default router;
