<template>
  <el-container>
    <el-header class="f-c-c"><Header /></el-header>
    <el-main>
      <div class="app-main f-c-c">
        <div class="app-warp f-s-s mt30">
          <div v-if="!isMobile" class="silder">
            <Silder />
          </div>
          <div class="app-container">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script setup>
import { onMounted, ref } from "vue";
import Header from "../components/Header";
import Silder from "../components/Slider";

const isMobile = ref(false);
onMounted(() => {
  isMobile.value = window.innerWidth <= 768; // 判断是否为移动端
});
</script>
<style lang="scss">
.el-header {
  height: 80px;
  background-color: #fff;
}
.el-main,
.el-header {
  padding: 0;
}
.el-main {
  overflow: auto;
  height: calc(100vh - 80px);
}
.silder {
  position: sticky;
  top: 30px;
  z-index: 10;
  width: 200px;
  min-height: 100px;
  background-color: #fff;
  margin-right: 10px;
}
.app-container {
  flex: 1;
  min-height: 600px;
  background-color: #fff;
}
@media screen and (min-width: 769px) {
  .app-warp {
    width: 1200px;
  }
}
// 移动端
@media screen and (max-width: 768px) {
  .app-warp {
    width: 100%;
  }
}
</style>
