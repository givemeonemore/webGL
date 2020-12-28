module.exports = {
  compact: false, // 解决因为文件过大(大于500k)无法正常启动的问题
  presets: ["@vue/app"], // 根据 babel 的 presets 配置缩写规则，这里实际指的模块为 @vue/babel-preset-app
  plugins: [
    [
      "transform-gl-matrix",
      {
        glMatrixArray: false
      }
    ]
  ]
};
