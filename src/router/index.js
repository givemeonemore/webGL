import Vue from "vue";
import VueRouter from "vue-router";
import webgl from "./webgl";
import componentTest from "./componentTest";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/Login/Login.vue")
  },
  {
    path: "/Portal",
    name: "Portal",
    component: () => import(/* webpackChunkName: "Portal" */ "@/views/Portal")
  },
  {
    ...webgl
  },
  {
    ...componentTest
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
