<template>
  <div class="parent">
    <div class="parent-content" v-for="(item, index) in dataList" :key="index">
      <div class="parent-content-title">{{ item.name }}</div>
      <div>
        <vue-child :sub-name="item.subName" :data="item.data"></vue-child>
      </div>
    </div>
  </div>
</template>

<script>
import VueChild from "@/views/Layout/PersonalTest/Vue/component/VueChild";
export default {
  name: "VUE1",
  // 测试$attrs以及inherit、provide和inject等组件传值
  data() {
    return {
      dataList: [
        {
          name: "$attrs测试传值",
          subName: "专门测试$attrs的",
          data: {
            fatherName: "张三",
            sonName: "张三儿子",
            grandSonName: "张三孙子"
          }
        },
        {
          name: "provide和inject测试传值",
          subName: "专门测试provide和inject的",
          data: {
            fatherName: "李四",
            sonName: "李四儿子",
            grandSonName: "李四孙子"
          }
        }
      ]
    };
  },
  components: { VueChild }
};
</script>

<style lang="scss" scoped>
.parent {
  width: 100%;
  height: 100%;
  position: relative;
  &-content {
    width: 80%;
    height: 15rem;
    border-bottom: 1px solid #9b9b9b;
    box-shadow: 10px 10px 30px 5px darkgrey;
    // box-shadow: 10px 10px 30px 5px darkgrey inset;
    margin-bottom: 5rem;
    &-title {
      width: 100%;
      height: 2rem;
      font-size: 1.13rem;
      background-color: #e3e3e3;
      border-bottom: 1px solid #9b9b9b;
      line-height: 2rem;
      display: inline-block;
      padding-left: 0.5rem;
    }
    &-body {
      width: 100%;
      height: calc(100% - 2rem);
    }
  }
}
</style>
