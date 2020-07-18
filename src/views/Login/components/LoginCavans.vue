<template>
  <section class="login" :style="style">
    <canvas ref="canvas" class="login-canvas" id="canvas"></canvas>
    <h1 ref="headline" class="login-text" id="headline">{{ title }}</h1>
  </section>
</template>

<script>
import Particles from "./constructe.js";
export default {
  name: "LoginCanvas",
  data() {
    return {
      title: "欢迎",
      backgroundUrl: require("@/assets/image/bcg.jpg"),
      // canvas 相关参数
      canvas: null,
      ctx: null,
      link: null,
      headline: null,
      particles: [],
      amount: 0,
      mouse: { x: -9999, y: -9999 },
      radius: 1,
      colors: [
        "rgba(252, 248, 254, 0.85)",
        "rgba(220, 203, 255, 0.75)",
        "rgba(154, 112, 124, 0.85)",
        "rgba(192, 213, 255, 0.85)",
        "rgba(244, 223, 254, 0.75)"
      ],
      ww: window.innerWidth,
      wh: window.innerHeight
    };
  },
  computed: {
    style() {
      let styleStr = {
        background: `url(${this.backgroundUrl}) center center no-repeat fixed`,
        backgroundSize: "cover"
      };
      return styleStr;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.headline = this.$refs.headline;
      this.initScene();
      requestAnimationFrame(this.render);
    });
  },
  created() {
    // this.headline.addEventListener("keyup", this.initScene, true);
    window.addEventListener("resize", this.initScene, true);
    window.addEventListener("mousemove", this.onMouseMove, true);
    window.addEventListener("touchmove", this.onTouchMove, true);
    window.addEventListener("touchend", this.onTouchEnd, true);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.initScene, true);
    window.removeEventListener("mousemove", this.onMouseMove, true);
    window.removeEventListener("touchmove", this.onTouchMove, true);
    window.removeEventListener("touchend", this.onTouchEnd, true);
  },
  methods: {
    initScene() {
      this.canvas = this.$refs.canvas;
      this.ctx = this.canvas.getContext("2d");
      this.link = document.createElement("link");
      this.ww = this.canvas.width = window.innerWidth;
      this.wh = this.canvas.height = window.innerHeight;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.link.rel = "stylesheet";
      this.link.type = "text/css";
      this.link.href = "https://fonts.googleapis.com/css?family=Abril+Fatface";
      document.getElementsByTagName("head")[0].appendChild(this.link);

      this.ctx.font = "bold 16vw 'Abril Fatface'";
      this.ctx.textAlign = "center";
      this.ctx.fillText(this.headline.innerHTML, this.ww / 2, this.wh / 1.6);
      // 获取当点canvas中的像素点
      let data = this.ctx.getImageData(0, 0, this.ww, this.wh).data;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.globalCompositeOperation = "screen";

      this.particles = [];
      for (let i = 0; i < this.ww; i += Math.round(this.ww / 200)) {
        for (let j = 0; j < this.wh; j += Math.round(this.ww / 200)) {
          if (data[(i + j * this.ww) * 4 + 3] > 200) {
            this.particles.push(
              new Particles(
                i,
                j,
                this.colors,
                this.ctx,
                this.ww,
                this.wh,
                this.mouse,
                this.radius
              )
            );
          }
        }
      }
      this.amount = this.particles.length;
    },
    render() {
      // window.requestAnimationFrame,告诉浏览器——我们希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。
      requestAnimationFrame(this.render);
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      for (let i = 0; i < this.amount; i++) {
        this.particles[i].render();
      }
    },
    onMouseMove(e) {
      if (e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
      }
    },
    onTouchMove(e) {
      if (e && e.touches.length > 0) {
        this.mouse.x = e.touches[0].clientX;
        this.mouse.y = e.touches[0].clientY;
      }
    },
    onTouchEnd(e) {
      if (e) {
        this.mouse.x = -9999;
        this.mouse.y = -9999;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.login {
  // background-image: url("./@/assets/image/bcg.jpg") no-repeat center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  font-weight: 700;
  &-canvas {
    width: 100vw;
    height: 100vh;
  }
  // &-text {
  //   display: none;
  // }
}
</style>
