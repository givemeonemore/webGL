<template>
  <div class="error-page">
    <div class="error-page-content">
      <app-icon
        class="error-page-content-svg"
        :name="'404'"
        :width="'10em'"
        :height="'10em'"
      ></app-icon>
    </div>
    <div class="error-page-tip">作者正在偷懒中……</div>
  </div>
</template>

<script>
export default {
  name: "ErrorPage",
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
.error-page {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &-content {
    width: 10rem;
    height: 10rem;
  }
}
</style>
