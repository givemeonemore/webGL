<template>
  <div class="map">
    <app-map @map-ready="mapReady"></app-map>
  </div>
</template>

<script>
export default {
  name: "MapTest",
  data() {
    return {};
  },
  created() {},
  methods: {
    mapReady() {
      this.$Message.success("地圖加載成功！");
    }
  }
};
</script>
<style scoped lang="scss">
.map {
  width: 100%;
  height: 100%;
}
</style>
