<template>
  <div class="page">
    <canvas id="glcanvas" width="640" height="480"></canvas>
  </div>
</template>

<script>
import { buildProgram, initBufferObject } from "./webGL.js";
export default {
  data() {
    return {
      vertexSource: `
      attribute vec4 aPosition;
      attribute float aPointSize;
      void main() {
        gl_Position = aPosition;
        gl_PointSize = aPointSize;
      }
      `,
      fragmentSource: `
      precision mediump float;
      uniform vec4 uColor;
      void main() {
        gl_FragColor = uColor;
      }
      `,
      verteces: new Float32Array([
        -0.9,
        0.8,
        -0.7,
        0.8,
        -0.5,
        0.8,
        -0.5,
        0.6,
        -0.5,
        -0.4,

        -0.9 + 1,
        0.8,
        -0.7 + 1,
        0.8,
        -0.5 + 1,
        0.8,
        -0.5 + 1,
        0.6,
        -0.5 + 1,
        0.4,

        -0.9,
        0.8 - 1,
        -0.7,
        0.8 - 1,
        -0.5,
        0.8 - 1,
        -0.5,
        0.6 - 1,
        -0.5,
        0.4 - 1
      ]),
      // verteces: new Float32Array([-1, 1, -1, -1, 1, -1, 1, 1, -1, 1]),
      sizes: new Float32Array([10.0, 12.0, 14.0, 16.0, 18.0])
    };
  },
  mounted() {
    this.initWebGL();
  },
  methods: {
    initWebGL() {
      //首先获取到canvas的dom对象
      let canvas = document.getElementById("glcanvas");

      //获取到WebGL的上下文
      var gl = canvas.getContext("webgl");

      //不支持WebGL的浏览器将打印一个错误，并结束代码运行
      if (!gl) {
        console.log("浏览器不支持WebGL");
        return;
      }

      //指定一个覆盖（清空）canvas的颜色
      gl.clearColor(0.0, 0.0, 1.0, 1.0);
      //执行清空
      gl.clear(gl.COLOR_BUFFER_BIT);

      //开启混合功能
      gl.enable(gl.BLEND);
      //指定混合函数
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      let program = buildProgram(
        gl,
        this.vertexSource,
        this.fragmentSource,
        true
      );
      // 获取attribute变量的存储位置和存储地址
      let aPosition = gl.getAttribLocation(program, "aPosition");
      if (aPosition < 0) {
        this.$Message.error("获取attribute变量aPostion位置出错");
        return;
      }
      let aPointSize = gl.getAttribLocation(program, "aPointSize");
      if (aPointSize < 0) {
        this.$Message.error("获取attribute变量aPointSize位置出错");
        return;
      }
      //获取uniform变量的存储地址
      let uColor = gl.getUniformLocation(program, "uColor");
      if (uColor == null) {
        console.log("Failed get unifrom variable uColor's location");
        return;
      }
      // let uOffset = gl.getUniformLocation(program, "uOffset");
      // if (uOffset == null) {
      //   console.log("Failed get unifrom variable uOffset's location");
      //   return;
      // }

      // ------------------------------------------ 使用缓冲区对象将多个顶点数据一次性传给着色器程序对象 --------------------------------------------
      // ------------------------------------------ 将创建缓冲区的方法提取出去 -------------------------------------------------------------------
      initBufferObject(gl, this.verteces, 2, aPosition);
      initBufferObject(gl, this.sizes, 1, aPointSize);

      gl.uniform4f(uColor, 1, 0, 0, 1);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 5);

      gl.uniform4f(uColor, 1, 1, 1, 0.5);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 5);
      // gl.drawArrays(gl.LINE_STRIP, 5, 5);
      // gl.drawArrays(gl.LINE_LOOP, 10, 5);
      // gl.drawArrays(gl.POINTS, 0, 5);
      // ---------------------------------------------- 手动创建缓冲区，并实时给顶点位置信息和大小信息 ----------------------------------------------
      // let verteces = new Float32Array([
      //   0.1,
      //   0.0,
      //   0.2,
      //   0.1,
      //   0.3,
      //   0.2,
      //   0.4,
      //   0.3,
      //   0.5,
      //   0.4
      // ]);

      // // 创建顶点左边缓冲区对象
      // let vertexBuffer = gl.createBuffer();
      // // 绑定缓冲区对象
      // gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      // // 给缓冲区填充数据
      // gl.bufferData(gl.ARRAY_BUFFER, verteces, gl.STATIC_DRAW);
      // // 把缓冲区对象分配给attitude变量
      // gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
      // gl.enableVertexAttribArray(aPosition);

      // 实践表示，虽然缓冲区对象都是通过gl.createBuffer()创建，但是顶点和片元的缓冲区不可用一个，会造成混乱
      // // 定义顶点尺寸数据
      // let sizes = new Float32Array([10.0, 12.0, 14.0, 16.0, 18.0]);
      // // 给缓冲区填充数据
      // gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW);
      // // 把缓冲区对象分配给attribute·变量
      // gl.vertexAttribPointer(aPointSize, 1, gl.FLOAT, false, 0, 0);
      // gl.enableVertexAttribArray(aPointSize);

      // 定义顶点尺寸数据
      // let sizes = new Float32Array([10.0, 12.0, 14.0, 16.0, 18.0]);
      // // 创建缓冲区对象
      // let fragmentBuffer = gl.createBuffer();
      // // 绑定缓冲区对象
      // gl.bindBuffer(gl.ARRAY_BUFFER, fragmentBuffer);
      // // 给缓冲区填充数据
      // gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW);
      // // 把缓冲区对象分配给attribute·变量
      // gl.vertexAttribPointer(aPointSize, 1, gl.FLOAT, false, 0, 0);

      // gl.enableVertexAttribArray(aPointSize);

      // gl.drawArrays(gl.POINTS, 0, 5);

      // ----------------------------------------- 通过多次渲染顶点从而绘制多个点的写法--------------------------------------------------------------
      // let verteces = [
      //   [0.1, 0.0, 10.0],
      //   [0.2, 0.1, 12.0],
      //   [0.3, 0.2, 14.0],
      //   [0.4, 0.3, 16.0],
      //   [0.5, 0.4, 18.0]
      // ];
      // verteces.forEach(item => {
      //   gl.vertexAttrib3f(aPosition, item[0], item[1], 0.0);
      //   gl.vertexAttrib1f(aPointSize, item[2]);
      //   gl.drawArrays(gl.POINTS, 0, 1);
      // });

      // ---------------------------------------------传统赋予一个点的写法-------------------------------------------------------------------------------

      // // 给attribute变量赋值，将(0.5, 0.5, 0.0)位置赋给aPosition，默认的w为1.0
      // gl.vertexAttrib3f(aPosition, 0.5, 0.5, 0.0);

      // 将20.0赋给aPointSize
      // gl.vertexAttrib1f(aPointSize, 20.0);

      // // 进行绘制
      // gl.drawArrays(gl.POINTS, 0, 1);
    }
  }
};
</script>

<style scoped lang="scss"></style>
