<template>
  <div class="son-root" v-bind="$attrs" v-on="$listeners">
    <!-- <span>{{ $attrs.data.sonName || "无" }}</span> -->
    <Input v-model="$attrs.data.sonName" />
  </div>
</template>

<script>
export default {
  name: "VueSubChild", // 大驼峰（表示第一个字母需要大写）
  props: {},
  computed: {},
  watch: {},
  data() {
    return {};
  },
  created() {
    console.log(this.$attrs);
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="scss"></style>
