// const nodeFs = require("fs");

module.exports = function(plop) {
  // 流程控制器
  // setGenerator 是plop 的 api， 其作用是用来（等待）为该plopfile创建生成器的函数
  plop.setGenerator("controller", {
    description: "编写应用程序控制器逻辑",
    // 流程
    prompts: [
      {
        type: "input",
        name: "fileLocation",
        message: "请输入文件位置（默认根目录为src）"
      },
      {
        type: "input",
        name: "name",
        message: "请输入文件名称"
      }
    ],
    actions: function() {
      var basePath = "src/{{fileLocation}}/{{name}}.vue";
      return [
        {
          type: "add",
          path: basePath,
          templateFile: "plop-templates/index.hbs" // 文件模板
        }
      ];
    }
  });
};
