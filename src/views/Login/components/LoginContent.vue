<template>
  <div class="registerOrLogin-content">
    <div class="registerOrLogin-content-form">
      <div class="registerOrLogin-content-form-info">Sign In</div>
      <div :class="userNameClass">
        <i slot="prefix" class="iconfont icon-wode"></i>
        <Input placeholder="请输入用户名" v-model="userName" />
      </div>
      <div :class="passwordClass">
        <i slot="prefix" class="iconfont icon-jiesuo"></i>
        <Input placeholder="请输入密码" v-model="password" />
      </div>
      <div class="registerOrLogin-content-form-tips">
        Forgot
        <span
          class="registerOrLogin-content-form-tips-userName"
          @click="getUserName"
          >userName</span
        >
        or
        <span
          class="registerOrLogin-content-form-tips-password"
          @click="getPassword"
          >Password</span
        >
        ?
      </div>
      <div class="registerOrLogin-content-form-button">
        <Button
          class="registerOrLogin-content-form-button-success"
          @keyup.enter.native="handleLogIn"
          @click="handleLogIn"
          type="success"
          >登录</Button
        >
      </div>
    </div>
  </div>
</template>

<script>
// import { highSwitch } from "@/utils/judge";
import { SET_USER_INFO, SET_LOGIN_STATUS, SET_SYSNAME } from "@/store/types.js";
import highSwitch from "./judge";
export default {
  name: "LoginContent",
  mixins: [highSwitch],
  data() {
    return {
      title: "周然帅哥",
      userName: "",
      password: "",
      // 自定义用户名输入框的样式
      userNameClass: "registerOrLogin-content-form-userName",
      // 自定义密码输入框的样式
      passwordClass: "registerOrLogin-content-form-password"
    };
  },
  watch: {
    userName(newVal) {
      if (newVal !== "") {
        this.userNameClass = "registerOrLogin-content-form-userName";
      }
    },
    password(newVal) {
      if (newVal !== "") {
        this.passwordClass = "registerOrLogin-content-form-password";
      }
    }
  },
  methods: {
    getUserName() {
      this.userName = "zhouran";
    },
    getPassword() {
      this.password = "zhouran";
    },
    handleLogIn() {
      if (this.userName === "") {
        this.userNameClass = "registerOrLogin-content-form-userName-red-border";
        return;
      }
      if (this.password === "") {
        this.passwordClass = "registerOrLogin-content-form-password-red-border";
        return;
      }
      let result = "";
      if (this.userName !== "zhouran" && this.password !== "zhouran") {
        result = 0;
      }
      if (this.userName === "zhouran" && this.password !== "zhouran") {
        result = 1;
      }
      if (this.userName !== "zhouran" && this.password === "zhouran") {
        result = 2;
      }
      if (this.userName === "zhouran" && this.password === "zhouran") {
        result = 3;
      }
      let logInResult = this.highSwitch(result);
      if (logInResult) {
        let userInfo = {
          userName: this.userName,
          password: this.password
        };
        this.$store.commit(SET_USER_INFO, userInfo);
        this.$store.commit(SET_LOGIN_STATUS, true);
        this.$store.commit(SET_SYSNAME, "WebGL测试项目");
        window.localStorage.setItem("token", "1234");
        window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
        window.localStorage.setItem("sysName", "WebGL测试项目");
        this.$router.push({
          name: "Portal",
          params: {}
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.registerOrLogin-content {
  background-color: #00000034;
  width: 100%;
  height: 100%;
  &-form {
    color: #fff;
    position: relative;
    margin: 0 auto;
    /* margin-left: calc(50% - 150px); */
    margin-top: calc(25% - 150px);
    width: 300px;
    height: 300px;
    background: rgba(84, 79, 83, 0.6);
    border: 1px solid rgba(0, 0, 0, 0.1);
    &-info {
      width: 100%;
      text-align: center;
      font-size: 22px;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      // height: 100%;
    }
    &-userName {
      margin-top: 20px;
      margin-left: 5%;
      width: 90%;
      >>> .ivu-input {
        background: rgba(84, 79, 83, 0.5);
        color: #fff;
      }
      .iconfont {
        font-size: 20px;
        vertical-align: middle;
        line-height: 40px;
      }
    }
    &-userName-red-border {
      margin-top: 20px;
      margin-left: 5%;
      width: 90%;
      >>> .ivu-input {
        border: 1px solid red;
        background: rgba(84, 79, 83, 0.5);
        color: #fff;
      }
      .iconfont {
        font-size: 20px;
        vertical-align: middle;
        line-height: 40px;
      }
    }
    &-password {
      margin-top: 20px;
      margin-left: 5%;
      width: 90%;
      >>> .ivu-input {
        background: rgba(84, 79, 83, 0.5);
        color: #fff;
      }
      .iconfont {
        font-size: 20px;
        vertical-align: middle;
        line-height: 40px;
      }
    }
    &-password-red-border {
      margin-top: 20px;
      margin-left: 5%;
      width: 90%;
      >>> .ivu-input {
        border: 1px solid red;
        background: rgba(84, 79, 83, 0.5);
        color: #fff;
      }
      .iconfont {
        font-size: 20px;
        vertical-align: middle;
        line-height: 40px;
      }
    }
    &-tips {
      margin-top: 20px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 18px;
      &-userName {
        cursor: pointer;
        text-decoration: underline;
      }
      &-password {
        cursor: pointer;
        text-decoration: underline;
      }
    }
    &-button {
      margin-top: 20px;
      margin-left: 5%;
      width: 90%;
      &-success {
        width: 100%;
      }
    }
  }
}
</style>
