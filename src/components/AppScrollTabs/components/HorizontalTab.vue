<template>
  <div class="horizontal-tab">
    <Button v-for="item in tabData" :key="item.id" type="primary">{{
      item.label
    }}</Button>
    <tab-panel></tab-panel>
  </div>
</template>

<script>
import TabPanel from "./TabPanel";
export default {
  props: {
    tabData: {
      type: Array,
      default: () => []
    }
  },
  components: {
    TabPanel
  },
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
.horizontal-tab {
  width: 100%;
  height: 100%;
}
</style>
