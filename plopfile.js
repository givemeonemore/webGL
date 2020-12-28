// const nodeFs = require("fs");
const fs = require("fs");
const path = require("path");
// const viewsComponents = fs.readdirSync(path.join(__dirname, "./src")); // 如果直接读取src的话，会导致读取不到其子文件夹信息

const componentExist = comp => {
  return JSON.stringify(this.viewsComponents).includes(comp);
};

const that = this;

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
        message: "请输入文件位置（默认根目录为src，用/显示层级）",
        validate: value => {
          that.viewsComponents = fs.readdirSync(
            path.join(__dirname, `./src/${value}`)
          );
          return true;
        }
      },
      {
        type: "input",
        name: "name",
        message: "请输入文件名称",
        validate: value => {
          if (/.+/.test(value)) {
            return componentExist(value) ? "文件名已经存在" : true;
          }
          return "请输入文件名称";
        }
      },
      {
        type: "confirm",
        name: "hasDeFaultIndex",
        default: true,
        message: "是否需要创建index文件？"
      }
    ],
    actions: function(data) {
      // hbs,默认视图引擎,调用.hbs时将渲染文件res.render
      // 创建一个文件目录，并使用 plop-templates下面的index.hbs 作为渲染模板创建项目
      const { fileLocation } = data;
      var templateBasePath, indexBasePath;
      if (fileLocation) {
        templateBasePath = "src/{{fileLocation}}/{{name}}.vue";
        indexBasePath = "src/{{fileLocation}}/index.js";
        return [
          {
            type: "add",
            path: templateBasePath,
            templateFile: "plop-templates/template.hbs" // 文件模板位置
          },
          {
            type: "add",
            path: indexBasePath,
            templateFile: "plop-templates/index.hbs" // 文件模板位置
          }
        ];
      } else {
        templateBasePath = "src/{{name}}.vue";
        return [
          {
            type: "add",
            path: templateBasePath,
            templateFile: "plop-templates/template.hbs" // 文件模板位置
          }
        ];
      }
    }
  });
};
