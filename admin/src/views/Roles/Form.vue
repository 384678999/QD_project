<template>
  <div>
    <Form-Top :title="'角色'" :path="'/roles'"></Form-Top>
    <el-card shadow="always">
      <el-row class="bodys">
        <el-col :span="24">
          <el-form ref="formData" :model="formData" label-width="100px">
            <el-form-item label="角色名称" prop="NAME">
              <el-input v-model="formData.NAME"></el-input>
            </el-form-item>
            <el-form-item label="选择权限">
              <el-transfer
                v-model="value"
                :right-default-checked="value"
                :data="getrolePermissionlist"
                :titles="['权限列表','已选择']"
                :button-texts="['删除', '选择']"
              ></el-transfer>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit('formData')">确定</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import FormTop from "@/components/FormTop";
import { join } from "path";
export default {
  data() {
    return {
      loading: true,
      formData: {},
      getrolePermissionlist: [],
      value: [],
      // Roleid: "",

      label: [],
      rules: {
        NAME: [{ required: true, message: "请输入名称", trigger: "blur" }]
      }
    };
  },
  components: {
    FormTop
  },
  mounted() {
    // this.handle(this.$route.query);
    let id = this.handle(this.$route.query);
    if (id) {
      this.Uacrole();
    } else {
      this.rolePermissionlist();
    }
  },
  watch: {
    // $route(to, from) {
    //   if (to.params.id) {
    //     this.rolesShow({ id: to.params.id, include: "permissions" });
    //   } else {
    //     this.formData = {};
    //   }
    // }
  },
  filters: {},
  methods: {
    handle(e) {
      if (e.type === "edit") {
        this.flag = true;

        this.Uacrole();
      } else {
        this.flag = false;
      }
    },
    Uacrole(params) {
      let uid = this.$route.query.id;
      var params = new URLSearchParams();
      params.append("tokenKey", this.$cookies.get("jwt"));
      params.append("usernameper", this.$cookies.get("username"));
      params.append("uidper", parseInt(this.$cookies.get("user_uid")));
      params.append("id", uid);
      this.$api.fun.Uacrole(params).then(res => {
        this.formData = res.data.roles;
        this.Roleid = res.data.roles.Roleid;
        this.value = (this.Roleid || "").split(",").map(Number);
        // this.value = this.Roleid;
        console.log(this.value);
        console.log("value  " + typeof this.value);
      });
    },
    //所有权限列表
    rolePermissionlist() {
      var params = new URLSearchParams();
      params.append("tokenKey", this.$cookies.get("jwt"));
      params.append("usernameper", this.$cookies.get("username"));
      params.append("uidper", parseInt(this.$cookies.get("user_uid")));
      this.$api.fun.rolePermissionlist(params).then(res => {
        this.loading = false;
        for (let i = 0; i < res.data.roles.length; i++) {
          this.getrolePermissionlist.push({
            label: res.data.roles[i].name,
            key: res.data.roles[i].id
            // label: res.data.roles[i].name,
            // key: res.data.roles[i].id
          });
        }
      });
    },
    routerLink() {
      setTimeout(() => {
        this.$router.push({
          path: "/roles"
        });
      }, 500);
    },
    onSubmit(formData) {
      this.$refs[formData].validate(valid => {
        if (valid) {
          let id = this.$route.query.id;
          if (id) {
            if (this.value != [])
              this.formData.getrolePermissionlist = this.value.join(",");
            var params = new URLSearchParams();
            params.append("tokenKey", this.$cookies.get("jwt"));
            params.append("usernameper", this.$cookies.get("username"));
            params.append("uidper", parseInt(this.$cookies.get("user_uid")));
            params.append("roleId", id);
            params.append("name", this.formData.NAME);
            params.append("id", this.formData.getrolePermissionlist);
            console.log(this.formData.getrolePermissionlist);
            this.$api.fun.updateuacRole(params).then(res => {
              this.routerLink();
            });
          } else {
            if (this.value != [])
              this.formData.getrolePermissionlist = this.value.join(",");
            var params = new URLSearchParams();
            params.append("tokenKey", this.$cookies.get("jwt"));
            params.append("usernameper", this.$cookies.get("username"));
            params.append("uidper", parseInt(this.$cookies.get("user_uid")));
            params.append("name", this.formData.NAME);
            params.append("namepri", this.formData.getrolePermissionlist);
            this.$api.fun.uacRoleInsert(params).then(res => {
              this.routerLink();
            });
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.bodys {
  height: calc(100% - 66px);
  border: 1px solid #e6ebf5;
  form {
    margin-top: 10px;
  }
}
/deep/ .el-transfer-panel__body {
  height: 500px;
}
/deep/ .el-transfer-panel__list {
  height: 500px;
}
/deep/ .el-transfer-panel__item.el-checkbox {
  width: 74%;
}
</style>