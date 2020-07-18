<template>
  <div class="page">
    <div class="page-button">
      <Button type="primary" @click="changeTransparency">切换</Button>
    </div>
    <div class="page-canvas">
      <canvas id="glcanvas" width="640" height="480"></canvas>
    </div>
  </div>
</template>

<script>
// uniform mat4 uMVMatrix;
// uniform mat4 uPMatrix;
export default {
  data() {
    return {
      squareVerticesBuffer: null
    };
  },
  methods: {
    changeTransparency() {
      // let canvas = document.getElementsByTagName("canvas");
      // console.log(canvas);
      // let ctx = canvas[canvas.length - 1].getContext("2d");
      // ctx.clearRect(
      //   0,
      //   0,
      //   canvas[canvas.length - 1].width,
      //   canvas[canvas.length - 1].height
      // );
      // ctx.fillStyle = "RGBA(255,0,0,0.1)";
      // ctx.fill();
      // ctx.strokeStyple = "#ccc";
      // ctx.stroke();
      let canvas = document.getElementById("glcanvas");
      // let gl = canvas.getContext("2d");
      let gl =
        canvas.getContext("webgl", {
          preserveDrawingBuffer: true
        }) ||
        canvas.getContext("experimental-webgl", {
          preserveDrawingBuffer: true
        });
      if (gl) {
        let data = gl.canvas.toDataURL();
        // this.imageSrc = data;
        console.log(data);
      }
    },
    initShaderProgram(gl, vsSource, fsSource) {
      const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vsSource);
      const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
      // 创建着色器程序

      const shaderProgram = gl.createProgram();
      gl.attachShader(shaderProgram, vertexShader);
      gl.attachShader(shaderProgram, fragmentShader);
      gl.linkProgram(shaderProgram);

      // 创建失败， alert
      if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("初始化着色器程序失败" + gl.getProgramInfoLog(shaderProgram));
        return null;
      }
      return shaderProgram;
    },
    loadShader(gl, type, source) {
      const shader = gl.createShader(type);

      // 将资源发送到着色器对象

      gl.shaderSource(shader, source);

      gl.compileShader(shader);

      // See if it compiled successfully

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        // alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }

      return shader;
    },
    initBuffers(gl) {
      this.squareVerticesBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVerticesBuffer);

      var vertices = [
        1.0,
        1.0,
        0.0,
        -1.0,
        1.0,
        0.0,
        1.0,
        -1.0,
        0.0,
        -1.0,
        -1.0,
        0.0
      ];
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(vertices),
        gl.STATIC_DRAW
      );
      // console.log( gl.STATIC_DRAW)

      return { position: this.squareVerticesBuffer };
    },
    drawScene(gl, programInfo, buffers) {
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clearDepth(1.0);
      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(gl.LEQUAL);

      // Clear the canvas before we start drawing on it.

      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      //创建一个透视矩阵，一个特殊的矩阵
      //用于模拟照相机透视的失真。
      //匹配画布显示大小的比率
      //可以看到0.1个单位之间的对象
      //距离摄像机100个单位。

      const fieldOfView = (45 * Math.PI) / 180; // in radians
      const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
      const zNear = 0.1;
      const zFar = 100.0;
      const projectionMatrix = this.$glMatrix.mat4.create();

      // 注意:glmatrix.js总是有第一个参数
      // 作为接收结果。
      this.$glMatrix.mat4.perspective(
        projectionMatrix,
        fieldOfView,
        aspect,
        zNear,
        zFar
      );

      // 现在将绘图位置移动到我们想要的位置
      // 场景的中心
      const modelViewMatrix = this.$glMatrix.mat4.create();

      // start drawing the square.

      this.$glMatrix.mat4.translate(
        modelViewMatrix, // 变形矩阵
        modelViewMatrix, //矩阵变换
        [-0.0, 0.0, -6.0]
      ); // 变换的矩阵

      // 告诉WebGL从position拉出位置
      // 缓冲到vertexPosition属性中。
      {
        const numComponents = 2; // 每次迭代取出2个值
        const type = gl.FLOAT; // 缓冲区中的数据是32位浮点数
        const normalize = false;
        const stride = 0; // 从一组值到下一组值需要多少字节 //0 =使用上面的type和numComponents
        const offset = 0; // 缓冲区中要从多少字节开始
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
        gl.vertexAttribPointer(
          programInfo.attribLocations.vertexPosition,
          numComponents,
          type,
          normalize,
          stride,
          offset
        );
        gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
      }

      //使用我们的 programInfo绘制图形
      gl.useProgram(programInfo.program);

      // 设置着色器
      gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        projectionMatrix
      );
      gl.uniformMatrix4fv(
        programInfo.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix
      );
      {
        const offset = 0;
        const vertexCount = 4;
        gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
      }
    }
  },
  mounted() {
    const canvas = document.querySelector("#glcanvas");
    // 获取webgl上下文
    const gl = canvas.getContext("webgl", {
      preserveDrawingBuffer: true
    });
    if (!gl) {
      alert("浏览器不支持webgl");
      return;
    }
    // 设置清空颜色缓冲时的颜色值
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // 清除保存颜色的缓冲区
    gl.clear(gl.COLOR_BUFFER_BIT);
    // 在JavaScript中，着色器代码就是一段文本字符串。事实上，我们正是把字符串形式的着色器代码通过JavaScript传递给WebGL系统来创建着色器程序着色器
    // 因为着色器语言是类C语言，因此无论是顶点着色器还是片元着色器，都包含一个main函数
    // 设置顶点着色器，用于定义定点的位置、尺寸等信息
    /**
     * @param gl_Position 值来定义顶点的位置，类型是一个由浮点数类型组成的四元数，在着色器语言中为vec4
     * @param gl_PointSize 值表示顶点的尺寸，类型是浮点数类型float，单位是像素
     */
    const vsSource = `
        attribute vec4 aVertexPosition;

        uniform mat4 uModelViewMatrix;
        uniform mat4 uProjectionMatrix;

        void main() {
          gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        }
      `;
    // 设置片元着色器
    const fsSource = `
        void main() {
          gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        }
      `;
    const shaderProgram = this.initShaderProgram(gl, vsSource, fsSource);

    const programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition")
      },
      uniformLocations: {
        projectionMatrix: gl.getUniformLocation(
          shaderProgram,
          "uProjectionMatrix"
        ),
        modelViewMatrix: gl.getUniformLocation(
          shaderProgram,
          "uModelViewMatrix"
        )
      }
    };
    const buffer = this.initBuffers(gl);
    // console.log(gl.bufferData)
    this.drawScene(gl, programInfo, buffer);
  }
};
</script>

<style scoped lang="scss">
.page {
  height: 100%;
  width: 100%;
  &-button {
    width: 100%;
    height: 3rem;
  }
  &-canvas {
    width: 100%;
    height: calc(100% - 3rem);
  }
}
</style>
