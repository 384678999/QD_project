<template>
  <div id="app-body">
    <el-card shadow="always">
      <div class="top">
        <span>锁定用户</span>
        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>锁定用户</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
    </el-card>
    <el-card shadow="always">
      <div class="bodys">
        <div class="form">
          <el-form :inline="true" :model="formData" class="demo-form-inline">
            <el-form-item label="姓名">
              <el-input v-model="formData.user" size="small" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="formData.sex" size="small" placeholder="性别">
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" @click="onSubmit" icon="el-icon-search">搜索</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" @click="batchUnlock" icon="el-icon-unlock">批量解锁</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table
          @selection-change="handleSelectionChange"
          :data="tableData"
          border
          style="width: 100%"
        >
          <el-table-column type="selection" width="35"></el-table-column>
          <el-table-column prop="id" label="ID" width="90"></el-table-column>
          <el-table-column prop="name" label="姓名" width="180"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
          <el-table-column prop="date" label="最后登陆时间" width="180"></el-table-column>
          <el-table-column prop="date" label="创建时间" width="180"></el-table-column>
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
export default {
  data() {
    return {
      formData: {
        name: "",
        sex: ""
      },
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          status: 1
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          status: 0
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          status: 0
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          status: 1
        },
        {
          id: 5,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          status: 1
        },
        {
          id: 6,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          status: 1
        },
        {
          id: 7,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          status: 1
        },
        {
          id: 8,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          status: 1
        },
        {
          id: 9,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          status: 1
        },
        {
          id: 10,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          status: 1
        },
        {
          id: 11,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          status: 1
        }
      ],
      total: 100, // 总页数
      pageSize: 6, // 每页显示的数量
      currentPage: 1, //当前第几页
      ids: []
    };
  },
  watch: {
    currentPage(to, from) {
      console.log(to);
      console.log(this.currentPage);
    }
  },
  methods: {
    batchUnlock() {
      if (this.ids.length == 0) {
        this.$message({
          type: "error",
          message: "请选择"
        });
      } else {
      }
    },
    handleSelectionChange(val) {
      let ids = [];
      for (let i = 0; i < val.length; i++) {
        ids.push(val[i].id);
      }
      this.ids = ids;
    },
    handleLock(index, row) {
      console.log(row);
      if (row.status == 0) {
        row.status = 1;
        this.$notify({
          type: "success",
          message: "解锁成功！"
        });
      } else {
        row.status = 0;
        this.$notify({
          type: "success",
          message: "成功锁定！"
        });
      }
    },
    handleEdit(index, row) {
      this.$router.push({
        path: "/profile/edit/" + row.id
      });
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    onSubmit() {
      console.log("submit!");
    }
  }
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