<template>
  <div class="css-1">
    <div class="css-1-body"></div>
  </div>
</template>

<script>
/*
 * @Author: 周然
 * @Date: 2020-04-26 21:44:21
 * @LastEditors: humx
 * @LastEditTime: 2020-08-03 13:26:37
 * @Description:
 */
export default {
  name: "loading",
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
.css-1 {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: #000;
  &-body {
    position: relative;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: linear-gradient(45deg, transparent, transparent 40%, #e5f403);
    animation: animate 2s linear infinite;
  }
  @keyframes animate {
    0% {
      transform: rotate(0deg);
      filter: hue-rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
      filter: hue-rotate(360deg);
    }
  }
  &-body::before {
    content: "";
    position: absolute;
    top: 6px;
    left: 6px;
    right: 6px;
    bottom: 6px;
    background-color: #000;
    border-radius: 50%;
    z-index: 1000;
  }
  &-body::after {
    content: "";
    position: absolute;
    top: 6px;
    left: 6px;
    right: 6px;
    bottom: 6px;
    background-color: #000;
    border-radius: 50%;
    z-index: 1;
    filter: blur(60px);
  }
}
</style>
