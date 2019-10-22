<template>
  <div>
    <el-card shadow="always">
      <div class="top">
        <span>编辑资料</span>
        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/profile' }">个人资料</el-breadcrumb-item>
            <el-breadcrumb-item>编辑资料</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
    </el-card>
    <el-card shadow="always">
      <el-row class="bodys">
        <el-col :span="12">
          <el-form ref="formData" label-width="100px">
            <el-form-item label="姓名" prop="realname">
              <el-input v-model="formData.realname"></el-input>
            </el-form-item>
            <el-form-item label="email" prop="email">
              <el-input v-model="formData.email"></el-input>
            </el-form-item>
            <el-form-item label="上传头像">
              <el-upload
                class="avatar-uploader"
                action="#"
                :auto-upload="false"
                :show-file-list="false"
                :on-change="onchange"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <!-- <img
                  v-if="imageUrl=='' && formData.attr"
                  :src="$url+'uploads/'+formData.attr"
                  class="avatar"
                />-->
                <i
                  v-if="imageUrl=='' && formData.attr==undefined"
                  class="el-icon-plus avatar-uploader-icon"
                ></i>
              </el-upload>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onSubmit()">确定</el-button>
              <el-button type="primary" @click="onSubmits()">上传</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import { error } from "util";
export default {
  data() {
    return {
      loading: true,
      rules: {
        realname: [{ required: true, message: "请输入名称", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }]
      },
      id: "",
      formData: {},
      // username: "",
      // email: "",
      file: {},
      imageUrl: ""
    };
  },
  mounted() {
    this.getPersonal();
  },
  methods: {
    getPersonal() {
      var params = new URLSearchParams();
      params.append("tokenKey", this.$cookies.get("jwt"));
      params.append("usernameper", this.$cookies.get("username"));
      params.append("uidper", parseInt(this.$cookies.get("user_uid")));
      params.append("uid", parseInt(this.$cookies.get("user_uid")));
      this.$api.fun.getPersonal(params).then(res => {
        console.log(res.data);
        this.formData = res.data.users;
        this.loading = false;
      });
    },
    //图片预览
    onchange(file, fileList) {
      this.file = file.raw;

      var _this = this;
      var event = event || window.event;
      var files = event.target.files[0];
      var reader = new FileReader();
      //转base64
      reader.onload = function(e) {
        _this.imageUrl = e.target.result; //将图片路径赋值给src
      };
      reader.readAsDataURL(files);
    },
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    routerLink() {
      setTimeout(() => {
        this.$router.push({
          path: "/profile"
        });
      }, 500);
    },
    onSubmit() {
      var params = new URLSearchParams();
      params.append("tokenKey", this.$cookies.get("jwt"));
      params.append("usernameper", this.$cookies.get("username"));
      params.append("uidper", parseInt(this.$cookies.get("user_uid")));
      params.append("username", this.formData.realname);
      params.append("email", this.formData.email);
      params.append("uid", parseInt(this.$cookies.get("user_uid")));
      this.$api.fun.updateuser(params).then(res => {
        console.log(res);
        // this.formData = res.data.users[0];
        // this.loading = false;
        this.routerLink();
      });
    },
    onSubmits() {
      var params = new URLSearchParams();
      params.append("tokenKey", this.$cookies.get("jwt"));
      params.append("usernameper", this.$cookies.get("username"));
      params.append("uidper", parseInt(this.$cookies.get("user_uid")));
      params.append("uid", parseInt(this.$cookies.get("user_uid")));
      params.append("upfile", this.imageUrl);
      console.log(this.imageUrl);
      this.$api.fun.uploadImg(params).then(res => {
        // console.log(this.uploadFile);
        // this.$message({
        //   message: "上传成功",
        //   type: "success"
        // });
      });
    }
  }
};
</script>

<style scoped lang="less">
/*图片上传*/
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
/**/
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
  form {
    margin-top: 10px;
  }
}
</style>