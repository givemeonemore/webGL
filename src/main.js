import Vue from "vue";
import App from "./App.vue";
// import iview from "iview";
import store from "./store";
import router from "./router";

// 全局组件、指令、原型等统一注册
import "./register";
// import "./assets/Build/Cesium/Widgets/widgets.css";


import "./sentry";

// 全局css
import "./styles/global.scss";

// 全局svg
import "@/icon/svg";

Vue.config.productionTip = false;
// initConfig
// import initAppConfig from "./initAppConfig";
router.beforeEach((to, from, next) => {
  // 判断路由是否需要登录
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (window.localStorage.token) {
      // 判断当前的token是否存在；即登录时存入的token
      next();
    } else {
      next({
        name: "Login",
        params: {} // 将跳转的路由path作为参数，登录成功后跳转到主页
      });
    }
  } else {
    next();
  }
});
// 挂载实例
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
// 初始化app配置文件再渲染页面
// (async () => {
//   try {
//     await initAppConfig();
//     // 挂载实例
//     new Vue({
//       router,
//       store,
//       render: h => h(App)
//     }).$mount("#app");
//   } catch (error) {
//     return iview.Notice.error({
//       title: "配置出错",
//       desc: error
//     });
//   }
// })();
