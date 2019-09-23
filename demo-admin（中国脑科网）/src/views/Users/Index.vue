<template>
  <div id="app-body">
    <Index-top :title="'用户'"></Index-top>
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
                @click="handleDeleteAll"
                icon="el-icon-delete"
              >批量删除</el-button>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="formData.name" size="small" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" @click="onSubmit" icon="el-icon-search">搜索</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" @click="batchlock" icon="el-icon-lock">批量锁定</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" @click="batchUnlock" icon="el-icon-unlock">批量解锁</el-button>
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
          <el-table-column type="selection" width="35"></el-table-column>
          <el-table-column prop="id" label="ID" width="90"></el-table-column>
          <el-table-column prop="name" label="姓名" width="180"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="updated_at" label="最后登陆时间" width="180"></el-table-column>
          <el-table-column prop="created_at" label="创建时间" width="180"></el-table-column>
          <el-table-column prop="status" label="状态" width="90">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="light" content="点击锁定" placement="left-start">
                <el-button
                  v-if="scope.row.status == 1"
                  type="primary"
                  plain
                  size="small"
                  @click="handleLock(scope.$index, scope.row)"
                >正常</el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="light" content="点击解锁" placement="left-start">
                <el-button
                  v-if="scope.row.status == 0"
                  type="danger"
                  plain
                  size="small"
                  @click="handleLock(scope.$index, scope.row)"
                >锁定</el-button>
              </el-tooltip>
            </template>
          </el-table-column>
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
                @click="handleDelete(scope.$index, scope.row)"
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
import Function from "@/function";
export default {
  data() {
    return {
      formData: {},
      loading: true,
      tableData: [],
      total: 0, // 总页数
      pageSize: 0, // 每页显示的数量
      currentPage: 0, //当前第几页
      ids: ""
    };
  },
  components: {
    IndexTop,
    refresh
  },
  created() {
    //console.log(Function.getIsPerms('users-delete'));
    this.usersList();
  },
  watch: {
    //分页监听
    currentPage(to, from) {
      if (from != 0) {
        //搜索分页
        let length = Object.keys(this.formData).length;
        if (length == 0) {
          this.usersList({ page: to });
        } else {
          this.formData.page = to;
          this.usersList(this.formData);
        }
      }
    }
  },
  methods: {
    usersList(params) {
      this.loading = true;
      this.$api.fun.usersList(params).then(res => {
        this.loading = false;
        //console.log(res);
        this.tableData = res.data;
        this.total = res.meta.pagination.total;
        this.currentPage = res.meta.pagination.current_page;
        this.pageSize = res.meta.pagination.per_page;
      });
    },
    // 跳转新增
    handleAdd() {
      this.$router.push({ path: "/users/form" });
    },
    // 跳转编辑
    handleEdit(index, row) {
      this.$router.push({ path: "/users/form/" + row.id });
    },
    // 批量删除
    handleDeleteAll() {
      if (this.ids.length == 0) {
        this.$message.error({ message: "请选择" });
      } else {
        this.$confirm("是否删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$api.fun.usersDelete({ id: this.ids }).then(res => {
              if (res.status) {
                this.$notify.success({ title: "成功", message: res.msg });
                this.usersList();
              } else {
                this.$notify.error({ title: "错误", message: res.msg });
              }
            });
          })
          .catch(() => {});
      }
    },

    //删除
    handleDelete(index, row) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.fun.usersDelete({ id: row.id }).then(res => {
            if (res.status) {
              this.$notify.success({ title: "成功", message: res.msg });
              this.usersList();
            } else {
              this.$notify.error({ title: "错误", message: res.msg });
            }
          });
        })
        .catch(() => {});
    },
    // 批量锁定
    batchlock() {
      if (this.ids.length == 0) {
        this.$message.error({ message: "请选择" });
      } else {
        this.$api.fun.usersLock({ id: this.ids, type: 0 }).then(res => {
          if (res.status) {
            this.$notify.success({ title: "成功", message: res.msg });
            this.usersList();
          } else {
            this.$notify.error({ title: "错误", message: res.msg });
          }
        });
      }
    },
    // 批量解锁
    batchUnlock() {
      if (this.ids.length == 0) {
        this.$message.error({ message: "请选择" });
      } else {
        this.$api.fun.usersLock({ id: this.ids, type: 1 }).then(res => {
          if (res.status) {
            this.$notify.success({ title: "成功", message: res.msg });
            this.usersList();
          } else {
            this.$notify.error({ title: "错误", message: res.msg });
          }
        });
      }
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
    // 正常  锁定
    handleLock(index, row) {
      if (row.status == 0) {
        row.status = 1;
        this.$api.fun.usersLock({ id: row.id, type: 1 }).then(res => {
          if (res.status) {
            this.$notify.success({ title: "成功", message: res.msg });
          } else {
            this.$notify.error({ title: "错误", message: res.msg });
          }
        });
      } else {
        row.status = 0;
        this.$api.fun.usersLock({ id: row.id, type: 0 }).then(res => {
          if (res.status) {
            this.$notify.success({ title: "成功", message: res.msg });
          } else {
            this.$notify.error({ title: "错误", message: res.msg });
          }
        });
      }
    },
    onSubmit() {
      let length = Object.keys(this.formData).length;
      if (length == 0) {
        this.$notify.warning({ title: "错误", message: "输入搜索条件" });
      } else {
        this.usersList(this.formData);
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