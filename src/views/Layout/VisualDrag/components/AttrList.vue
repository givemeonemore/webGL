<template>
  <div class="attr-list">
    <Form>
      <FormItem
        v-for="(key, index) in styleKeys.filter(item => item != 'rotate')"
        :key="index"
        :label="map[key]"
      >
        <ColorPicker
          v-if="key == 'borderColor'"
          v-model="curComponent.style[key]"
        ></ColorPicker>
        <ColorPicker
          v-else-if="key == 'color'"
          v-model="curComponent.style[key]"
        ></ColorPicker>
        <ColorPicker
          v-else-if="key == 'backgroundColor'"
          v-model="curComponent.style[key]"
        ></ColorPicker>
        <Select
          v-else-if="key == 'textAlign'"
          v-model="curComponent.style[key]"
        >
          <Option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></Option>
        </Select>
        <Input type="number" v-else v-model="curComponent.style[key]" />
      </FormItem>
      <FormItem
        label="内容"
        v-if="curComponent && !excludes.includes(curComponent.component)"
      >
        <Input type="textarea" v-model="curComponent.propValue" />
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      excludes: ["Picture"], // 这些组件不显示内容
      options: [
        {
          label: "左对齐",
          value: "left"
        },
        {
          label: "居中",
          value: "center"
        },
        {
          label: "右对齐",
          value: "right"
        }
      ],
      map: {
        left: "x 坐标",
        top: "y 坐标",
        height: "高",
        width: "宽",
        color: "颜色",
        backgroundColor: "背景色",
        borderWidth: "边框宽度",
        borderColor: "边框颜色",
        borderRadius: "边框半径",
        fontSize: "字体大小",
        fontWeight: "字体粗细",
        lineHeight: "行高",
        letterSpacing: "字间距",
        textAlign: "对齐方式",
        opacity: "透明度"
      }
    };
  },
  computed: {
    styleKeys() {
      return this.$store.state.curComponent
        ? Object.keys(this.$store.state.curComponent.style)
        : [];
    },
    curComponent() {
      return this.$store.state.curComponent;
    }
  }
};
</script>

<style lang="scss" scoped>
.attr-list {
  overflow: auto;
  padding: 20px;
  padding-top: 0;
  height: 100%;
}
</style>
