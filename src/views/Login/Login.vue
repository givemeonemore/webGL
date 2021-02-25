<template>
  <div class="root">
    <login-canvas class="root-cavans"></login-canvas>
    <login-content class="root-content"></login-content>
  </div>
</template>

<script>
import LoginCanvas from "./components/LoginCavans";
import LoginContent from "./components/LoginContent";
export default {
  name: "Login",
  components: {
    LoginCanvas,
    LoginContent
  },
  data() {
    return {
      title: ""
    };
  },
  created() {
    console.log(window.a.b);
  },
  destroyed() {
    
  },
  methods: {}
};
</script>

<style scoped lang="scss">
.root {
  width: 100%;
  height: 100%;
  background-color: #000000;
  margin: 0;
  overflow: hidden;
  font-size: 0;
  &-cavans {
    width: 100%;
    height: 100%;
  }
  &-content {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
