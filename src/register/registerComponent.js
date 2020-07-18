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
