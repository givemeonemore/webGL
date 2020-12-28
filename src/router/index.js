import Vue from "vue";
import VueRouter from "vue-router";
import webgl from "./webgl";
import componentTest from "./componentTest";
import personalTest from "./personalTest";
import learningCurriculum from "./learningCurriculum";
import { isDev, hasRegisterRoute } from "@/utils/base";

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
    path: "/404",
    name: "404",
    component: () =>
      import(/* webpackChunkName: "ErrorPage" */ "@/views/ErrorPage")
  },
  {
    ...webgl
  },
  {
    ...componentTest
  },
  {
    ...personalTest
  },
  {
    ...learningCurriculum
  }
];

if (isDev()) {
  routes.push({
    name: "Svg",
    path: "/svg",
    component: () => import("@/icon/svg/IconView.vue")
  });
}

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const { name } = to;
  if (hasRegisterRoute(name, routes)) {
    next();
  } else {
    next({ name: "404" });
  }
});

export default router;
