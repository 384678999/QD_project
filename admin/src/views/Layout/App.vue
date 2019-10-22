<template>
  <div class="main">
    <IndexHeader></IndexHeader>

    <div class="app">
      <el-container>
        <el-aside width="230px">
          <NavBar></NavBar>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
          <el-footer>
            <IndexFooter></IndexFooter>
          </el-footer>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import IndexHeader from "@/views/layout/Top.vue";
import IndexFooter from "@/views/layout/Footer.vue";
import NavBar from "@/views/layout/NavBar.vue";
export default {
  components: {
    IndexHeader,
    IndexFooter,
    NavBar
  }
};
</script>

<style scoped lang="less">
.app {
  display: flex;
}
.aside {
  width: 230px;
  background: #4765a9;
}
@media screen and (min-width: 1200px) {
  .aside {
    display: inline-block;
  }
  .app-body {
    width: calc(100% - 230px);
  }
}
@media screen and (max-width: 1200px) {
  .aside {
    display: none;
  }
  .app-body {
    width: 100%;
  }
}
.app-body {
  padding: 10px;
  background-color: #ecf0f5;
  div {
    height: calc(100%);
    background-color: white;
  }
}
.app-footer {
  padding: 10px;
  height: 50px;
}
</style>