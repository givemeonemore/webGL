<template>
  <div class="app-main">
    <div class="app-main-header" v-if="isAlone">
      <Header></Header>
    </div>
    <div
      class="app-main-con"
      :style="isAlone ? 'height: calc(100% - 3rem)' : ''"
    >
      <router-view />
    </div>
  </div>
</template>

<script>
// import { isAlone } from "@/utils/base";
import Header from "./Header";
export default {
  name: "Layout",
  data() {
    return {
      systemList: [],
      subSystemList: [],
      currentModule: "",
      isAlone: true
    };
  },

  watch: {
    $route: {
      immediate: true,
      handler(route) {
        console.log(route);
      }
    }
  },
  created: function() {},
  computed: {
    // isAlone() {
    //   return isAlone();
    // }
  },
  methods: {
    changePage(name) {
      // FIX: 点击切换目录子系统后，目录会再次弹出
      setTimeout(() => {
        this.$router.push({
          name
        });
      }, 300);
    }
  },
  components: {
    Header
  }
};
</script>

<style lang="scss" scoped>
.app-main {
  height: 100%;
  width: 100%;
  &-header {
    height: 3rem;
    width: 100%;
    position: relative;
    box-shadow: $shadow-header;
    z-index: 999;
    // &::after {
    //   // 添加阴影
    //   position: absolute;
    //   content: "";
    //   width: 100%;
    //   height: 0.5rem;
    //   bottom: 0;
    //   box-shadow: 0rem 0.5rem 2rem 0rem rgba(0, 0, 0, 0.07);
    // }
  }
  &-con {
    height: 100%;
    width: 100%;
  }
  .app-main-con {
    background: $colorffffff;
  }
}
</style>
