import Vue from "vue";

// 检索目录下的模块
const req = require.context(".", true, /\.vue$/);

req.keys().forEach(fileName => {
  // 过滤demo文件夹下的组件
  if (/^\.\/demo\//.test(fileName)) {
    return;
  }
  // require模块
  const componentConfig = req(fileName);
  const name =
    fileName.name || fileName.replace(/^\.\/(.*\/)?/, "").replace(/\.vue$/, "");
  Vue.component(name, componentConfig.default || componentConfig);
});
