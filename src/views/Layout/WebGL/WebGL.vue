<template>
  <div class="webgl">
    <!-- <Header class="webgl-header"></Header> -->
    <Body class="webgl-body"></Body>
  </div>
</template>

<script>
// import Header from "./Header/Header.vue";
import Body from "./Body/Body.vue";
export default {
  name: "WebGL",
  components: {
    // Header,
    Body
  },
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
.webgl {
  width: 100%;
  height: 100%;
  // &-header {
  //   padding: 0 1.5rem;
  //   height: 3rem;
  //   width: 100%;
  //   position: relative;
  //   box-shadow: $shadow-header;
  //   z-index: 999;
  // }
  &-body {
    // height: calc(100% - 3rem);
    height: 100%;
  }
}
</style>
