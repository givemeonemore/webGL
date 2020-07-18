<!--
 * @Author: zhouran
 * @LastEditors: zhouran
 * @Description: 基于iview的Tabs组件进行二次封装的组件，增加tabs的动态效果
 * @Date: 2020-03-24
 * @LastEditTime: null
 -->
<template>
  <div class="app-scroll-tabs">
    <div v-if="isHorizontal">
      <horizontal-tab :tabData="tabData"></horizontal-tab>
    </div>
    <div v-if="isVertical">
      <vertical-tab :tabData="tabData"></vertical-tab>
    </div>
  </div>
</template>

<script>
import HorizontalTab from "./components/HorizontalTab";
import VerticalTab from "./components/VerticalTab";
export default {
  name: "AppScrollTabs",
  props: {
    horizontal: {
      type: Boolean,
      default: () => false
    },
    vertical: {
      type: Boolean,
      default: () => false
    },
    tabData: {
      type: Array,
      default: () => []
    }
  },
  components: {
    HorizontalTab,
    VerticalTab
  },
  data() {
    return {};
  },
  computed: {
    isHorizontal() {
      return this.horizontal && !this.vertical ? this.horizontal : true;
    },
    isVertical() {
      return this.vertical;
    }
  }
};
</script>

<style scoped lang="scss">
.app-scroll-tabs {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
