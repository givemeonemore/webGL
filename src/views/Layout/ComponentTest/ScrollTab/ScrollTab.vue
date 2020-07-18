<template>
  <div class="scroll-tab">
    <app-scroll-tabs :tabData="tabData"></app-scroll-tabs>
  </div>
</template>

<script>
import { getScrollTabsData } from "@/api/componentTest";
export default {
  data() {
    return {
      tabData: []
    };
  },
  created() {
    this.getTabsData();
  },
  methods: {
    async getTabsData() {
      let res = await getScrollTabsData();
      if (res) {
        this.tabData = res;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.scroll-tab {
  height: 100%;
  width: 100%;
  &-img {
    background: url("../../../../assets/image/timg.png") no-repeat;
  }
}
</style>
