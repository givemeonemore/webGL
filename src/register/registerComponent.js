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
// import * as Sentry from "@sentry/vue";
// import { Integrations } from "@sentry/tracing";
// Sentry.init({
//   Vue,
//   dsn:
//     "https://61f5fe3d0fdc46c2a7794ca231700972@o530360.ingest.sentry.io/5649750",
//   integrations: [new Integrations.BrowserTracing()],

//   // We recommend adjusting this value in production, or using tracesSampler
//   // for finer control
//   tracesSampleRate: 1.0
// });

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
