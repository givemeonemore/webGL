<template>
  <div class="root">
    <div class="root-top" id="container"></div>
    <div class="root-bottom">
      <div class="root-bottom-left">
        <!-- 绘制一个点 -->
        <canvas id="cspoint" width="300" height="300"></canvas>
      </div>
      <div class="root-bottom-right">
        <canvas id="canvas" width="300" height="300"></canvas>
        <Button type="primary" @click="changeTransparency">切换</Button>
      </div>
    </div>
  </div>
</template>
<script>
import * as Three from "three";
export default {
  name: "ThreeTest",
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      // 定义顶点着色器
      // gl_Position 表示顶点着色器中顶点的坐标位置，类型是一个由浮点数类型组成的四元数，在着色器语言中为vec4
      // gl_PointSize 表示顶点着色器中顶点的大小，类型是浮点数类型float，单位是像素
      vertexSource: `
      void main() {
        gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
        gl_PointSize = 20.0;
      }
      `,
      // 定义片元着色器
      // gl_FragColor 设置片元颜色，介于0-1之间，表示片元着色器中片元的颜色，数据类型是vec4
      fragmentSource: `
      void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
      }
      `
    };
  },
  methods: {
    init: function() {
      let container = document.getElementById("container");
      this.camera = new Three.PerspectiveCamera(
        70,
        container.clientWidth / container.clientHeight,
        0.01,
        10
      );
      this.camera.position.z = 1;
      this.scene = new Three.Scene();
      let geometry = new Three.BoxGeometry(0.2, 0.2, 0.2);
      let material = new Three.MeshNormalMaterial();
      this.mesh = new Three.Mesh(geometry, material);
      this.scene.add(this.mesh);
      this.renderer = new Three.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);
    },
    animate: function() {
      requestAnimationFrame(this.animate);
      this.mesh.rotation.x += 0.01;
      this.mesh.rotation.y += 0.02;
      this.renderer.render(this.scene, this.camera);
    },
    initCanvas() {
      this.initRightCanvas();
      let gl = this.getWebGLContext("cspoint");
      if (!gl) {
        this.$Message.error("您当前浏览器不支持webgl");
        return;
      }
      // 设置背景色，虽然方法名为clear，但是这里的意思是先设置一个清除默认颜色的颜色，然后再用这个颜色替换掉默认的颜色(0,0,0,0)，也就是一个替换的过程
      // 需要先执行clearColor方法 clearColor(R, G, B, A)，四个值均在 0-1 之间，以下设置的则是红色
      gl.clearColor(0.0, 0.0, 1.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      this.buildProgram(gl, this.vertexSource, this.fragmentSource);
      gl.drawArrays(gl.POINTS, 0, 1); //绘制点
    },

    initRightCanvas() {
      let cs = document.getElementById("canvas");
      let ctx = cs.getContext("2d");
      // let gl = cs.getContext("webgl");
      ctx.rect(10, 10, 100, 100);
      ctx.fillStyle = "green";
      ctx.fill();
      ctx.strokeStyple = "#ccc";
      ctx.stroke();
    },

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
      let canvas = document.getElementsByTagName("canvas");
      let gl =
        canvas[1].getContext("webgl", {
          preserveDrawingBuffer: true
        }) ||
        canvas[1].getContext("experimental-webgl", {
          preserveDrawingBuffer: true
        });
      if (gl) {
        let data = gl.canvas.toDataURL();
        // this.imageSrc = data;
        console.log(data);
      }
    },

    getWebGLContext(name) {
      let canvas = document.getElementById(name);
      // 获取wengl上下文，WebGL上下文可以理解为：一个包含了所有WebGL相关属性和API函数的对象
      // 传入的参数一般是“webgl”，但是早期一部分浏览器传入的参数是“experimental-webgl”，表示是实验阶段的WebGL。为了兼容，写成下面这样
      return (
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      );
    },

    /**
     * 创建着色器对象的主要步骤
     * （1）创建着色器对象(gl.createShader)
     * （2）指定着色器对象的着色器代码(gl.shaderSource)
     * （3）编译着色器对象(gl.compileShader)
     * （4）检查着色器对象编译状态(gl.getShaderParameter)
     */
    // 创建着色器着色器程序对象
    buildProgram(gl, vertexSource, fragmentSource) {
      // 创建顶点着色器对象
      let vertexShader = this.createShader(gl, gl.VERTEX_SHADER, vertexSource);
      // 创建片元着色器对象
      let fragmentShader = this.createShader(
        gl,
        gl.FRAGMENT_SHADER,
        fragmentSource
      );
      let program = gl.createProgram(); // 创建程序
      // 用程序绑定着色器将着色器对象绑定到着色器程序对象
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      // 开始连接程序,把顶点着色器对象和片元着色器对象关联起来，以保证顶点着色器对象和片元着色器对象可以配合执行
      gl.linkProgram(program);
      // 查询程序对象的连接状态
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        this.$Messgae.error("程序链接失败！");
      }
      gl.useProgram(program);
    },
    createShader(gl, type, source) {
      // 创建着色器对象
      let shader = gl.createShader(type);
      // 将着色器源码写入对象
      gl.shaderSource(shader, source);
      // 编译着色器
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        let info = gl.getShaderInfoLog(shader);
        this.$Message.error("error" + info);
      }
      return shader;
    }
  },
  mounted() {
    this.init();
    this.animate();
    this.initCanvas();
  }
};
</script>
<style scoped lang="scss">
.root {
  height: calc(100% - 2rem);
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  border: 1px solid #000;
  &-top {
    height: 400px;
    width: 100%;
  }
  &-bottom {
    display: flex;
    height: calc(100% - 400px);
    width: 100%;
    align-items: center;
    justify-content: space-around;
    &-left {
      width: 50%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &-right {
      width: 50%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
