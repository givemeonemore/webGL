<template>
  <div class="page">
    <canvas id="canvas" width="640" height="480"></canvas>
  </div>
</template>

<script>
import { buildProgram, initBufferObject } from "./webGL.js";
export default {
  data() {
    return {
      vertexSource: `
      attribute vec4 aPosition;
      attribute vec2 aUv;
      varying vec2 vUv;
      uniform mat4 uMatrix;
      void main() {
        vUv = aUv;
        gl_Position = uMatrix * aPosition;
      }
      `,
      fragmentSource: `
      precision mediump float;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      void main() {
        gl_FragColor = texture2D(uTexture, vUv);
      }
      `,
      imageSrc1: require("@/assets/image/timg.png"),
      imageSrc: "",
      imageSrc2: "",
      verteces: new Float32Array([0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.0]),
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
      let canvas = document.getElementById("canvas");

      //获取到WebGL的上下文
      var gl = canvas.getContext("webgl");

      //不支持WebGL的浏览器将打印一个错误，并结束代码运行
      if (!gl) {
        console.log("浏览器不支持WebGL");
        return;
      }

      //指定一个覆盖（清空）canvas的颜色
      gl.clearColor(1.0, 1.0, 1.0, 1.0);
      //执行清空
      gl.clear(gl.COLOR_BUFFER_BIT);

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

      let aUv = gl.getAttribLocation(program, "aUv");
      if (aUv == null) {
        this.$Message.error("获取uniform变量aUv位置出错");
        return;
      }
      var uMatrix = gl.getUniformLocation(program, "uMatrix");
      if (uMatrix == null) {
        console.log("Failed get unifrom variable uMatrix's location");
        return;
      }
      // // 启用attribute变量
      // gl.enableVertexAttribArray(aPosition);
      // gl.enableVertexAttribArray(aUv);

      //获取uniform变量的存储地址
      let uTexture = gl.getUniformLocation(program, "uTexture");
      if (uTexture == null) {
        console.log("获取uniform变量uTexture位置出错");
        return;
      }
      initBufferObject(gl, this.verteces, 2, aUv);
      initBufferObject(gl, this.verteces, 2, aPosition);
      this.loadTexture(gl, uMatrix, uTexture);
    },
    loadTexture(gl, uMatrix, uTexture) {
      let img = new Image();
      img.src = this.imageSrc1;
      img.onload = () => {
        let texture = gl.createTexture();
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.activeTexture(gl.TEXTURE1); //设置当前活动纹理单元gl.TEXTURE1
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          img
        );
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        //处理图片像素非2的幂次方的配置
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.uniform1i(uTexture, 1);

        gl.clear(gl.COLOR_BUFFER_BIT); //清空
        // 进行位置转换
        let translateMatrix = this.$glMatrix.mat4.create();
        this.$glMatrix.mat4.fromTranslation(translateMatrix, [-0.5, -0.5, 0.0]);
        gl.uniformMatrix4fv(uMatrix, false, translateMatrix);
        // 进行大小转换
        let scaleMatrix = this.$glMatrix.mat4.create();
        this.$glMatrix.mat4.fromScaling(scaleMatrix, [1.0, 0.5, 0.0]);
        gl.uniformMatrix4fv(uMatrix, false, scaleMatrix);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      };
    }
  }
};
</script>

<style scoped lang="scss"></style>
