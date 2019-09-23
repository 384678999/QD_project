<template>
  <div>
    <Form-Top :id="$route.params.id" :title="'用户'" :path="'/users'"></Form-Top>
    <el-card shadow="always">
      <el-row class="bodys">
        <el-col :span="12">
          <el-form ref="formData" :model="formData" :rules="rules" label-width="100px">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="email" prop="email">
              <el-input v-model="formData.email"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="formData.password" type="password"></el-input>
            </el-form-item>

            <el-form-item label="角色" prop="roles">
              <el-checkbox-group v-model="roles" @change="handleCheckedRolesChange">
                <template v-for="item in rolesList">
                  <el-checkbox
                    v-if="roles.indexOf(item.id) != -1"
                    checked
                    :label="item.id"
                    :key="item.id"
                    name="type"
                  >{{item.name}}</el-checkbox>
                  <el-checkbox v-else :label="item.id" :key="item.id" name="type">{{item.name}}</el-checkbox>
                </template>
              </el-checkbox-group>
            </el-form-item>

            <Upload-Img :pic="formData.attr" @upload-img="uploadImg"></Upload-Img>
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
import UploadImg from "@/components/UploadImg";
export default {
  data() {
    return {
      formData: {},
      file: "",
      roles: [],
      rolesList: [],
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        roles: [{ required: true, message: "请选择角色", trigger: "blur" }]
      }
    };
  },
  components: {
    FormTop,
    UploadImg
  },
  watch: {
    $route(to, from) {
      if (to.params.id) {
        this.usersShow({ id: to.params.id });
      } else {
        this.formData = {};
      }
    }
  },
  created() {
    let id = this.$route.params.id;
    if (id) {
      this.usersShow({ id: id, include: "roles" });
    }
    this.rolesAll();
  },
  methods: {
    //个人信息--详情
    usersShow(params) {
      this.$api.fun.usersShow(params).then(res => {
        this.formData = res.data;
        if (res.data.roles.data) {
          res.data.roles.data.forEach(val => {
            this.roles.push(val.id);
          });
        }
      });
    },
    rolesAll() {
      this.$api.fun.rolesAll().then(res => {
        this.rolesList = res.data;
      });
    },
    routerLink() {
      setTimeout(() => {
        this.$router.push({
          path: "/users"
        });
      }, 500);
    },
    uploadImg(file) {
      this.file = file;
    },
    storeFormData(data) {
      this.$api.fun.usersStore(data).then(res => {
        //console.log(res);return false;
        if (res.status == 1) {
          this.$notify.success({ title: "成功", message: res.msg });
          this.routerLink();
        } else {
          this.$notify.error({ title: "失败", message: res.msg });
        }
      });
    },
    handleCheckedRolesChange(val) {
      this.formData.role_ids = JSON.stringify(val);
      console.log(this.formData.role_ids);
    },
    onSubmit(formData) {
      this.$refs[formData].validate(valid => {
        if (valid) {
          if (typeof this.formData.role_ids == "undefined") {
            this.$notify.error({ title: "失败", message: "选择角色！" });
            return false;
          }
          console.log(this.file);
          return false;
          //是否有文件上传
          if (this.file.size != 0 && this.file.size != undefined) {
            let form = new FormData();
            form.append("file", this.file);
            this.$api.fun.uploadImg(form).then(res => {
              if (res.status == 1) {
                this.formData.attr = res.msg;
                this.storeFormData(this.formData);
              } else {
                this.$notify.error({ title: "失败", message: res.msg });
              }
            });
          } else {
            this.storeFormData(this.formData);
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped >
</style>