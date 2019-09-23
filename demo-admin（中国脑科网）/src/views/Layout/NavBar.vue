<template>
  <el-menu
    class="el-menu-vertical-demo"
    background-color="#4765a9"
    text-color="#fff"
    :router="true"
    active-text-color="#c4deff"
  >
    <el-submenu
      v-for="(item,key) in nav"
      :key="key"
      :index="key+''"
      v-if="item.children.length > 0"
    >
      <template slot="title">
        <i :class="item.icon"></i>
        <span>{{item.title}}</span>
      </template>
      <el-menu-item-group v-for="(child,childkey) in item.children" :key="childkey">
        <el-menu-item :index="child.path" :route="{name:child.path}">{{child.title}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      nav: []
    };
  },
  created() {
    //导航数据过滤
    let navList = this.$config.navList;
    let perms = this.$cookies.get("perms");
    if (perms != null && perms.indexOf("all") == -1) {
      let nav = [];
      navList.forEach((v, k) => {
        nav.push({ id: v.id, title: v.title, icon: v.icon, children: [] });
        let children = v.children;
        children.forEach(x => {
          if (perms.indexOf(x.path) != -1) {
            nav[k].children.push({ id: x.id, title: x.title, path: x.path });
          }
        });
      });
      this.nav = nav;
      //console.log(nav);
    } else {
      this.nav = navList;
    }
  }
};
</script>

<style scoped >
.el-menu {
  height: 100%;
  min-height: calc(100vh - 50px);
}
.el-menu >>> .el-menu-item {
  background: #2d4784 !important;
}
.el-menu >>> .el-menu-item-group__title {
  padding: 0;
}
>>> .el-submenu__title {
  font-size: 16px;
}
>>> .el-submenu__title i {
  color: #fff;
  margin-right: 10px;
}
</style>