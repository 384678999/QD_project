<template>
  <el-card shadow="always">
    <div class="top">
      <template v-if="$route.query.id ==undefined">
        <span>新增{{title}}</span>
        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="path">{{title}}管理</el-breadcrumb-item>
            <el-breadcrumb-item>新增{{title}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </template>
      <template v-else>
        <span>编辑{{title}}</span>
        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="path">{{title}}管理</el-breadcrumb-item>
            <el-breadcrumb-item>编辑{{title}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </template>
    </div>
  </el-card>
</template>

<script>
export default {
  props: ["path", "title"]
};
</script>

<style scoped lang="less">
.top {
  position: relative;
  > span {
    display: inline-block;
    width: 88px;
    text-align: right;
    color: #244d71;
    font-size: 18px;
    font-weight: bold;
  }
  .breadcrumb {
    position: absolute;
    right: 45px;
    top: 6px;
    /deep/ .el-breadcrumb__inner {
      font-weight: normal;
      color: #244d71;
    }
  }
}
</style>