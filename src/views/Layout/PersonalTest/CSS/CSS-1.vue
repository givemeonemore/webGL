<!--
 * @Descripttion: 
 * @version: 
 * @Author: zhouran
 * @Date: 2020-08-01 15:03:33
 * @LastEditors: zhouran
 * @LastEditTime: 2020-09-02 14:45:44
-->
<template>
  <div class="css-1">
    <div class="css-1-body"></div>
  </div>
</template>

<script>
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
