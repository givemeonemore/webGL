module.exports = {
  presets: ["@vue/app"],
  plugins: [
    [
      "transform-gl-matrix",
      {
        glMatrixArray: false
      }
    ]
  ]
};
