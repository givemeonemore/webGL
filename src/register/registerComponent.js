/*
  注册全局组件、插件
*/
import Vue from "vue";
// import vueAwesomeSwiper from "vue-awesome-swiper";
// import "swiper/dist/css/swiper.css";
import iView from "iview";
import "iview/dist/styles/iview.css";
Vue.use(iView);
import echarts from "vue-echarts-v3/src/full.js";
Vue.component("echarts", echarts);
import * as glMatrix from "gl-matrix";
// 全局注册glMatrix
Vue.prototype.$glMatrix = glMatrix;

// Sentry 错误监控注册
import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";

Sentry.init({
  Vue,
  dsn: "http://03cac5a9eb294ba090d66358bbc117b1@localhost:9000/2",
  integrations: [new Integrations.BrowserTracing()],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
  logErrors: true, // 如果不配置这个为true，则sentry不会在控制台输出错误
  release: "test@1.0.1" // 版本
});

// 全局组件注册
import "@/components";

// 引入样式
import "vue-easytable/libs/themes-base/index.css";
// 导入 table 和 分页组件
import { VTable, VPagination } from "vue-easytable";

import Viewer from "v-viewer";
import "viewerjs/dist/viewer.css";

Vue.use(Viewer);
Viewer.setDefaults({
  inline: true,
  button: true,
  navbar: false,
  title: false,
  toolbar: false,
  tooltip: true,
  movable: true,
  zoomable: true
});
// 注册到全局
Vue.component(VTable.name, VTable);
Vue.component(VPagination.name, VPagination);
