const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}
const CompressionPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["js", "css"];
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

let cesiumSource = "./node_modules/cesium/Source";
// let cesiumWorkers = "../Build/Cesium/Workers";

// process: process对象是一个global（全局）变量，提供有关信息，控制当前Node.js进程。作为一个对象，它对于Node.js应用程序始终是可用的，故无需使用require()
module.exports = {
  // publicPath,之前的baseUrl从vue cli 3.3起已经弃用，现更改为publicPath。其值类型为string类型，默认值为"/"
  // 部署应用包时的基本URL。用法和webpack本身的output.publicPath一致，但是vue cli在一些其他地方也需要用到这个值，所以这个地方应该始终使用publicPath，而不是直接修改webpack里面的output.publicPath
  // 默认情况下，vue cli会假设你的应用是被部署在一个域名的根路径上，例如 http://www.ma-app.com/。如果应用是被部署在一个子路径上，你就需要用这个选项指定这个子路径，例如，如果是被部署在https://www.my-app.com/my-app/上，则设置publicPath为/ma-app/。
  // 这个值也可以被设置为空字符串('')或是相对路径('./')，这样所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径，也可以用在类似Coedova hybrid应用的文件系统中。
  publicPath: process.env.NODE_ENV === "development" ? "/" : "./",
  // outputDir,其值类型为string类型，默认值为'dist'
  // 当运行vue-cli-service build时生成的生产环境构建文件的目录。注意目标目录在构建之前会被清除（构建时传入 --on-clean可关闭该行为）
  // 请始终使用 outputDir 而不要修改 webpack 的 output.path。
  outputDir: "dist",
  // assetsDir,其值类型为string类型，默认值为''
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  // 从生成的资源覆写 filename 或 chunkFilename 时，assetsDir 会被忽略
  assetsDir: "assets",
  // 指定生成的index.html的输出路径（打包之后，改变系统默认的index.html的文件名）。也可以是一个绝对路径
  indexPath: "index.html",
  // 默认情况下，生成的静态资源在它们的文件名中包含了hash以便更好的控制缓存。然而，这也要求index的HTML是被vue cli自动生成的。如果无法使用vue cli生成的index HTML，即将这个选项设为false来关闭哈希表
  filenameHashing: false,
  // lintOnSave，其值类型为boolean或者error，默认值为true
  // 是否在开发环境下通过eslint-loader在每次保存lint代码。这个值会在@vue/cli-plugin-eslint在安装之后生效。
  // 设置为true时，eslint-loader会将lint错误输出为编译警告，警告仅仅会被输出到命令行，且不会使得编译失败。
  // 如果希望让lint错误在开发时直接显示在浏览器中，便可以使用lintOnSave: 'error'，这会强制eslint-loader将lint错误输出位编译错误，同事也意味着lint错误将会导致编译失败
  // 或者也可以设置让浏览器overlay同时显示警告和错误，如下：
  devServer: {
    host: "0.0.0.0",
    port: 9096,
    open: true
  },
  //如果你想要在生产构建时禁用 eslint-loader，你可以用如下配置
  // lintOnSave: process.env.NODE_ENV !== 'production',
  lintOnSave: true,
  // runtimeCompiler,其值类型为boole，默认值为false
  // 是否使用包含运行时编译器的Vue构建版本。设置为true后我们就可以在vue组件中使用template选项。
  runtimeCompiler: false,
  // productionSourceMap：如果不需要生产环境的source map，可以将其设置为false以加速生产环境构建。
  // 如果在打包之后发现map文件过大，项目体积很大，在这里将productionSourceMap设置为false就可以不输出map文件
  // map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
  // 有了map就可以像未加密的代码一样，准确的输出是哪一行那一列有错。
  productionSourceMap: false,
  parallel: false,
  // vue-echarts-v3需要babel转码，才能兼容ie
  // 参考 https://github.com/xlsdg/vue-echarts-v3#usage
  transpileDependencies: ["vue-echarts-v3", "iview"],
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      // 在新版本的sass-loader中不再使用data: `@import "@/styles/index.scss";`，而是改成prependData: `@import "@/styles/index.scss";`
      sass: {
        // eslint-disable-next-line quotes
        prependData: `@import "@/styles/index.scss";`
      }
    }
  },
  // 别名设置
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("cesium", resolve(__dirname, cesiumSource))
      .set("VisualDrag", resolve("src/views/Layout/VisualDrag"));
    // svg的处理
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icon/svg"))
      .end();
    config.module
      .rule("icon")
      .test(/\.svg$/)
      .include.add(resolve("src/icon/svg"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();
  },
  // module: {
  //   rules: [
  //     {
  //       test: /.css$/,
  //       use: ["style-loader", "css-loader"]
  //     }
  //   ]
  // },
  // 生产环境打包去除console.log
  configureWebpack: {
    devtool: process.env.NODE_ENV === "development" ?
      "cheap-module-eval-source-map" :
      "source-map",
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            ecma: undefined,
            warnings: false,
            parse: {},
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ["console.log"] // 移除console
            }
          }
        })
      ]
    },
    module: {
      // unknownContextCritical: /^.\/.*$/,
      unknownContextCritical: false
    },
    // gzip
    plugins: process.env.NODE_ENV === "production" ?
      [
        new CompressionPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: new RegExp(
            "\\.(" + productionGzipExtensions.join("|") + ")$"
          ),
          threshold: 10240,
          minRatio: 0.8
        }),
        new CopyWebpackPlugin([{
          from: path.join(
            "node_modules/cesium/Source",
            "../Build/Cesium/Workers"
          ),
          to: "Workers"
        }]),
        new CopyWebpackPlugin([{
          from: path.join("node_modules/cesium/Source", "Assets"),
          to: "Assets"
        }]),
        new CopyWebpackPlugin([{
          from: path.join("node_modules/cesium/Source", "Widgets"),
          to: "Widgets"
        }]),
        new webpack.DefinePlugin({
          // Define relative base path in cesium for loading assets
          CESIUM_BASE_URL: JSON.stringify("./")
        })
      ] :
      []
  }
};