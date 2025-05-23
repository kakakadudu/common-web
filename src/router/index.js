import { createRouter, createWebHistory } from "vue-router";
import { getToken } from "@/utils/auth";
import { getAuth } from "@/api/user.js";
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
const toPage = (next) => {
  if (window.localStorage.getItem("hadAuth") === "1") {
    next();
  } else {
    if (getToken()) {
      router.replace({ path: "/init" });
    } else {
      useUserStore().logOut();
    }
  }
};

router.beforeEach((to, from, next) => {
  if (to.fullPath === "/") {
    router.replace({ path: "/index" });
  }
  if (!!to.meta.hadAuth) {
    // 需要认证才可访问
    if (window.localStorage.getItem("hadAuth")) {
      toPage(next);
    } else {
      getAuth().then((res) => {
        if (res.data?.name) {
          window.localStorage.setItem("hadAuth", 1);
        }
        toPage(next);
      });
    }
  } else {
    next();
  }
});

export default router;
