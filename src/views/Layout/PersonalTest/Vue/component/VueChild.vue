<template>
  <div class="son-root" v-bind="$attrs" v-on="$listeners">
    <p>{{ $attrs.data.fatherName }}</p>
    <div>
      <Input v-model="subName" />
      <Input v-model="getTempName" />
    </div>
    <vue-sub-child :data="$attrs.data"></vue-sub-child>
  </div>
</template>

<script>
import VueSubChild from "@/views/Layout/PersonalTest/Vue/component/VueSubChild";
export default {
  name: "VueChild", // 大驼峰（表示第一个字母需要大写）
  inheritAttrs: false, // 是否需要在根节点上显示除已经通过props传递的数据之外其他父组件里的数据
  components: { VueSubChild },
  props: {
    subName: {
      type: String,
      default: () => ""
    }
  },
  computed: {
    getTempName() {
      console.log(this.$attrs);
      return this.$attrs.data.fatherName || "没拿到数据";
    }
  },
  watch: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="scss">
.son-root {
  width: 100%;
  height: 100%;
  ::v-deep .ivu-input-wrapper {
    width: 10rem;
  }
}
</style>
