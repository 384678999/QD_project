<template>
  <div id="app-body">
    <Index-top :title="'权限'"></Index-top>
    <el-card shadow="always">
      <div class="bodys">
        <div class="form">
          <el-form :inline="true" :model="formData" class="demo-form-inline">
            <el-form-item>
              <refresh></refresh>
            </el-form-item>
            <el-form-item>
              <el-button type="success" size="small" @click="handleAdd" icon="el-icon-plus">添加</el-button>
            </el-form-item>
            <el-form-item>
              <el-button
                type="warning"
                size="small"
                @click="deleteuacRolelist"
                icon="el-icon-delete"
              >批量删除</el-button>
            </el-form-item>
            <el-form-item label="名称">
              <el-input v-model="formData.name" size="small" placeholder="名称"></el-input>
            </el-form-item>
            <el-form-item label="路由">
              <el-input v-model="formData.uri" size="small" placeholder="路由"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" @click="onSubmit" icon="el-icon-search">搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table
          v-loading="loading"
          @selection-change="handleSelectionChange"
          :data="tableData"
          border
          style="width: 100%"
        >
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column prop="id" label="ID" width="90"></el-table-column>
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="uri" label="路由名称"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                icon="el-icon-edit"
                @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="deleteuacRoleList(scope.$index, scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pages">
          <el-pagination
            :current-page.sync="currentPage"
            :page-size="pageSize"
            background
            layout="prev, pager, next"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import IndexTop from "@/components/IndexTop.vue";
import refresh from "@/components/Refresh.vue";
export default {
  data() {
    return {
      //   loading: true,
      formData: {},
      tableData: [],
      total: 0, // 总页数
      pageSize: 10, // 每页显示的数量
      currentPage: 1, //当前第几页
      //   prev: 0,
      //   pager: 0,
      //   next: 0,
      ids: ""
    };
  },
  components: {
    IndexTop,
    refresh
  },
  created() {
    this.getuacRoleList();
  },
  watch: {
    //分页监听
    currentPage(to, from) {
      if (from != 0) {
        //搜索分页
        var params = new URLSearchParams();
        params.append("tokenKey", this.$cookies.get("jwt"));
        params.append("usernameper", this.$cookies.get("username"));
        params.append("uidper", parseInt(this.$cookies.get("user_uid")));
        params.append("start", this.currentPage);
        params.append("limit", 10);
        this.getuacRoleList(params);
      }
    }
  },
  methods: {
    getuacRoleList() {
      var params = new URLSearchParams();
      params.append("tokenKey", this.$cookies.get("jwt"));
      params.append("usernameper", this.$cookies.get("username"));
      params.append("uidper", parseInt(this.$cookies.get("user_uid")));
      params.append("start", 0);
      params.append("limit", 10);
      this.loading = true;
      this.$api.fun.getuacRoleList(params).then(res => {
        this.tableData = res.data.pageInfo.list;
        this.total = res.data.pageInfo.total;
        this.loading = false;
      });
    },
    // 跳转新增
    handleAdd() {
      this.$router.push({ path: "/permissions/form" });
    },
    // 跳转编辑
    handleEdit(index, row) {
      this.$router.push({
        path: "/permissions/form/",
        query: { type: "edit", id: row.id }
      });
    },
    //批量删除
    deleteuacRolelist() {
      if (this.ids.length == 0) {
        this.$message.error({ message: "请选择" });
      } else {
        this.$confirm("是否删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            var params = new URLSearchParams();
            params.append("tokenKey", this.$cookies.get("jwt"));
            params.append("usernameper", this.$cookies.get("username"));
            params.append("uidper", parseInt(this.$cookies.get("user_uid")));
            params.append("id", this.ids);
            this.$api.fun.deleteuacRolelist(params).then(res => {
              if (!res.status) {
                this.$notify.success({ title: "成功", message: res.msg });
                this.getuacRoleList();
              } else {
                this.$notify.error({ title: "错误", message: res.msg });
              }
            });
          })
          .catch(() => {});
      }
    },

    // 删除
    deleteuacRoleList(index, row) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var params = new URLSearchParams();
          params.append("tokenKey", this.$cookies.get("jwt"));
          params.append("usernameper", this.$cookies.get("username"));
          params.append("uidper", parseInt(this.$cookies.get("user_uid")));
          params.append("id", row.id);
          this.$api.fun.deleteuacRoleList(params).then(res => {
            console.log(res);
            if (!res.status) {
              this.$notify.success({ title: "成功", message: res.msg });
              this.getuacRoleList();
            } else {
              this.$notify.error({ title: "错误", message: res.msg });
            }
          });
        })
        .catch(() => {});
    },
    handleSelectionChange(val) {
      let ids = "";
      for (let i = 0; i < val.length; i++) {
        if (i == val.length - 1) {
          ids += val[i].id;
        } else {
          ids += val[i].id + ",";
        }
      }
      this.ids = ids;
    },
    onSubmit() {
      let length = Object.keys(this.formData).length;
      if (length == 0) {
        this.$notify.warning({ title: "错误", message: "输入搜索条件" });
      } else {
        // var params = {
        //   tokenKey: this.$cookies.get("jwt"),
        //   usernameper: this.$cookies.get("username"),
        //   uidper: this.$cookies.get("user_uid"),
        //   name: this.formData.name,
        //   uri: this.formData.uri
        // };
        var params = new URLSearchParams();
        params.append("tokenKey", this.$cookies.get("jwt"));
        params.append("usernameper", this.$cookies.get("username"));
        params.append("uidper", parseInt(this.$cookies.get("user_uid")));
        if (this.formData.name != undefined)
          params.append("name", this.formData.name);
        if (this.formData.uri != undefined)
          params.append("uri", this.formData.uri);
        this.$api.fun.getuacRoleList(params).then(res => {
          this.tableData = res.data.pageInfo.list;
          console.log(res);
        });
      }
    }
  }
};
</script>

<style scoped lang="less">
.bodys {
  height: calc(100% - 66px);
  border: 1px solid #e6ebf5;
  .form {
    margin-top: 22px;
    form {
      margin-left: 20px;
    }
  }
}
.pages {
  margin-top: 20px;
}
</style>