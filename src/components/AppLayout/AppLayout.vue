<template>
  <div class="app-layout">
    <transition name="slide">
      <div class="app-layout-left" v-show="!isFold">
        <!-- 左栏展示区域 -->
        <slot name="left"></slot>
      </div>
    </transition>
    <div
      class="app-layout-right"
      :style="`width: calc(100% - ${isFold ? '0rem' : '22rem'})`"
    >
      <Button
        class="btn"
        :icon="iconType"
        @click.prevent.stop="toggleFold"
      ></Button>
      <!-- 右栏展示区域 -->
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppLayout",
  props: {
    isToggle: {
      // 默认打开
      type: Boolean,
      default: () => false
    }
  },
  data({ isToggle }) {
    return {
      isFold: isToggle // 默认打开
    };
  },
  computed: {
    iconType() {
      return this.isFold ? "ios-arrow-forward" : "ios-arrow-back";
    }
  },
  methods: {
    toggleFold() {
      this.isFold = !this.isFold;
    }
  },
  watch: {
    isToggle(value) {
      // 外部传入折叠变化
      this.isFold = value;
    },
    isFold(value) {
      // 折叠变化响应事件
      // @arg value[Boolean]
      this.$emit("on-fold-change", value);
    }
  }
};
</script>

<style lang="scss" scoped>
.app-layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  background-color: $colorffffff;
  &-left {
    // flex: 0 0 16rem;
    width: 22rem;
    height: 100%;
    overflow-x: hidden;
    box-shadow: -9px 0px 15px 0px;
  }
  &-right {
    flex: 1;
    position: relative;
    height: 100%;
    .btn {
      position: absolute;
      width: 1.25rem;
      height: 2.6rem;
      font-size: 1rem;
      padding: 0;
      top: 50%;
      left: 0px;
      margin-top: -1.3rem;
      z-index: 99;
    }
  }
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.3s linear;
  }
  .slide-enter,
  .slide-leave-to {
    // flex-basic: 0;
    width: 0;
  }
}
</style>
