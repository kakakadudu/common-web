<template>
  <el-menu
    :default-active="active"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    router
  >
    <el-menu-item v-for="item in menus" :key="item.name" :index="item.path">
      <el-icon><component :is="item.icon" /></el-icon>
      <span>{{ item.title }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import myRouter from "@/router/index.js";
import { useRoute } from "vue-router";
import { onMounted } from "vue";

const route = useRoute();

const { routes } = myRouter.options;
const menus = ref([]);
const active = ref("");

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};

onMounted(() => {
  const { path } = route;
  menus.value = routes.filter((item) => item.name == "Layout")[0].children;
  active.value = path;
});
</script>

<style scoped lang="scss"></style>
