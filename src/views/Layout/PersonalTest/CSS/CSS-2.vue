<template>
  <div class="transition">
    <div class="transition-first-part">
      <div class="transition-first-part-body">
        <div class="transition-first-part-body-upper" :class="getUpperStyle">
          <p class="transition-first-part-body-upper-p1">
            这里第一行是占位用的字符，检测宽度变化是否会引起格式改变
          </p>
          <p class="transition-first-part-body-upper-p1">
            这里第二行是占位用的字符，检测宽度变化是否会引起格式改变
          </p>
          <p class="transition-first-part-body-upper-p1">
            这里第三行是占位用的字符，检测宽度变化是否会引起格式改变
          </p>
          <p class="transition-first-part-body-upper-p1">
            这里第四行是占位用的字符，检测宽度变化是否会引起格式改变
          </p>
          <p class="transition-first-part-body-upper-p1">
            这里第五行是占位用的字符，检测宽度变化是否会引起格式改变
          </p>
        </div>
        <Button
          class="transition-first-part-body-upper-button"
          type="primary"
          @click="handleUpperClick"
          >{{ getUpperTip }}</Button
        >
        <div style="width: 100%; fontWeight: bold">
          宽度变化时，其内容仍存在随着宽度的变化而变化，导致格式错乱
        </div>
      </div>
      <div class="transition-first-part-footer">
        <div
          class="transition-first-part-footer-bottom"
          :class="getBottomStyle"
        >
          <p class="transition-first-part-footer-bottom-p1">
            这里第一行是占位用的字符，检测宽度变化是否会引起格式改变
          </p>
          <p class="transition-first-part-footer-bottom-p1">
            这里第二行是占位用的字符，检测宽度变化是否会引起格式改变
          </p>
          <p class="transition-first-part-footer-bottom-p1">
            这里第三行是占位用的字符，检测宽度变化是否会引起格式改变
          </p>
          <p class="transition-first-part-footer-bottom-p1">
            这里第四行是占位用的字符，检测宽度变化是否会引起格式改变
          </p>
          <p class="transition-first-part-footer-bottom-p1">
            这里第五行是占位用的字符，检测宽度变化是否会引起格式改变
          </p>
        </div>
        <Button
          class="transition-first-part-footer-bottom-button"
          type="primary"
          @click="handleBottomClick"
          >{{ getBottomTip }}</Button
        >
      </div>
    </div>
    <div class="transition-second-part">
      <Button
        class="transition-second-part-button"
        type="primary"
        @click="handleSecondClick"
        >{{ getSecondTip }}</Button
      >
      <div class="transition-second-part">
        <div class="transition-second-part-left" :class="getSecondLeftStyle">
          <p class="transition-first-part-footer-bottom-p1">
            这里第一行是占位用的字符，检测宽度变化是否会引起格式改变
          </p>
          <p class="transition-first-part-footer-bottom-p1">
            这里第二行是占位用的字符，检测宽度变化是否会引起格式改变
          </p>
          <p class="transition-first-part-footer-bottom-p1">
            这里第三行是占位用的字符，检测宽度变化是否会引起格式改变
          </p>
          <p class="transition-first-part-footer-bottom-p1">
            这里第四行是占位用的字符，检测宽度变化是否会引起格式改变
          </p>
          <p class="transition-first-part-footer-bottom-p1">
            这里第五行是占位用的字符，检测宽度变化是否会引起格式改变
          </p>
        </div>
        <div class="transition-second-part-right" :class="getSecondRightStyle">
          <p class="transition-first-part-footer-bottom-p1">
            这里第一行是占位用的字符，检测宽度变化是否会引起格式改变
          </p>
          <p class="transition-first-part-footer-bottom-p1">
            这里第二行是占位用的字符，检测宽度变化是否会引起格式改变
          </p>
          <p class="transition-first-part-footer-bottom-p1">
            这里第三行是占位用的字符，检测宽度变化是否会引起格式改变
          </p>
          <p class="transition-first-part-footer-bottom-p1">
            这里第四行是占位用的字符，检测宽度变化是否会引起格式改变
          </p>
          <p class="transition-first-part-footer-bottom-p1">
            这里第五行是占位用的字符，检测宽度变化是否会引起格式改变
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 这里是测试transition动画效果的，包括单个动画、联合动画等
  name: "transition",
  data() {
    return {
      isUpperOpen: true,
      isBottomOpen: true,
      isSecondOpen: true
    };
  },
  computed: {
    getUpperTip() {
      return this.isUpperOpen ? "宽度关闭" : "宽度打开";
    },
    getUpperStyle() {
      return this.isUpperOpen ? "" : "upper-disapper";
    },
    getBottomTip() {
      return this.isBottomOpen ? "侧边关闭" : "侧边打开";
    },
    getBottomStyle() {
      return this.isBottomOpen ? "" : "bottom-disapper";
    },
    getSecondTip() {
      return this.isSecondOpen ? "关闭" : "打开";
    },
    getSecondLeftStyle() {
      return this.isSecondOpen ? "" : "left-disapper";
    },
    getSecondRightStyle() {
      return this.isSecondOpen ? "" : "right-disapper";
    }
  },
  methods: {
    handleUpperClick() {
      this.isUpperOpen = !this.isUpperOpen;
    },
    handleBottomClick() {
      this.isBottomOpen = !this.isBottomOpen;
    },
    handleSecondClick() {
      this.isSecondOpen = !this.isSecondOpen;
    }
    // getUpperStyle() {}
  }
};
</script>

<style lang="scss" scoped>
.transition {
  width: 100%;
  height: 98%;
  margin-top: 1vh;
  position: relative;
  @include T3;
  margin: 0.5rem 0.5rem;
  @include OriginBorder;
  display: flex;
  flex-wrap: nowrap;
  background: #fff;
  &-first-part {
    width: 35%;
    height: 100%;
    position: relative;
    border: 1px dashed #000;
    &-body {
      width: 100%;
      height: 50%;
      &-upper {
        height: 30%;
        width: 100%;
        transition: width 2s;
        @include OriginBorder;
        p {
          display: inline-block;
        }
      }
      .upper-disapper {
        // height: 50%;
        width: 0;
        // transition: width 2s;
      }
    }
    &-footer {
      width: 100%;
      height: 50%;
      position: relative;
      &-bottom {
        height: 30%;
        width: 100%;
        transition: left 2s;
        position: absolute;
        left: 0;
        @include OriginBorder;
        &-button {
          margin-top: 30%;
        }
      }
      .bottom-disapper {
        height: 30%;
        width: 100%;
        left: -100%;
        position: absolute;
        transition: left 2s;
      }
    }
  }
  &-second-part {
    width: 65%;
    height: 100%;
    position: relative;
    &-left {
      width: 30%;
      height: calc(100% - 2.8rem);
      position: absolute;
      left: 0;
      transition: left 2s;
    }
    .left-disapper {
      position: absolute;
      left: -30%;
      transition: left 2s;
    }
    &-right {
      width: 70%;
      height: 100%;
      position: absolute;
      right: 0;
      transition: width 2s;
    }
    .right-disapper {
      width: 100%;
      height: 100%;
      position: absolute;
      right: 0;
      transition: width 2s;
    }
  }
}
</style>
