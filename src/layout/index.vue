<template>
  <el-container>
    <el-header>
      <div class="item">Gmail</div>
      <div class="item">图片</div>
    </el-header>
    <el-main>
      <div class="main f-c-c">
        <div class="warp f-s-s mt30">
          <div v-if="!isMobile" class="silder"></div>
          <div class="content">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script setup>
import { onMounted, ref } from "vue";
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
  min-height: 300px;
  background-color: #fff;
  margin-right: 10px;
}
.content {
  flex: 1;
  min-height: 600px;
  background-color: #fff;
}
@media screen and (min-width: 769px) {
  .warp {
    width: 1200px;
  }
}
// 移动端
@media screen and (max-width: 768px) {
  .warp {
    width: 100%;
  }
}
</style>
