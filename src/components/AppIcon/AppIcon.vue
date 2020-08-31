<template>
  <i
    :class="['app-icon', `app-icon-${name}`, className]"
    :style="svgStyle"
    @click="handleClick"
  >
    <svg fill="currentColor" aria-hidden="true" :width="width" :height="height">
      <!-- prettier-ignore -->
      <use :xlink:href="iconName" />
    </svg>
  </i>
</template>

<script>
export default {
  name: "app-icon",
  props: {
    // icon名字
    name: {
      type: String,
      required: true
    },
    // className
    className: {
      type: String
    },
    // 颜色
    color: {
      type: String
    },
    size: {
      type: [Number, String]
    },
    width: {
      type: String,
      default: () => "1em"
    },
    height: {
      type: String,
      default: () => "1em"
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.name}`;
    },
    svgClass() {
      if (this.className) {
        return `${this.className}`;
      }
      return "";
    },
    svgStyle() {
      const { color, size } = this;
      const style = {};
      color && (style.color = color);

      if (size) {
        if (typeof size === "string") {
          size.includes("rem")
            ? (style.fontSize = size)
            : (style.fontSize = `${size}px`);
        } else {
          style.fontSize = `${size}px`;
        }
      }

      return style;
    }
  },
  methods: {
    handleClick(event) {
      if (this.disabled || this.loading) {
        return;
      }
      // 返回 event 参数支持 @click.stop.prevent 写法
      this.$emit("click", event);
    }
  }
};
</script>

<style lang="scss" scoped>
.app-icon {
  vertical-align: -0.125em;
  line-height: 0;
  display: inline-block;
}
</style>
