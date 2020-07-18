<template>
  <div class="button" :style="buttonStyle">{{ buttonText }}</div>
</template>

<script>
export default {
  name: "Button",
  data() {
    return {
      buttonBorder: "1px solid #2d8cf0",
      width: "4rem",
      height: "2rem",
      backgroundColor: "#2d8cf0",
      fontSize: "1rem",
      buttonText: "确认",
      buttonStyle: {}
    };
  },
  props: {
    style: {
      type: Object,
      default: () => {}
    }
  },
  methods: {}
};
</script>

<style scoped lang="scss">
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
}
</style>
