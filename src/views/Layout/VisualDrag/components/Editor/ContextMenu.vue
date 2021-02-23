<template>
  <div
    class="contextmenu"
    v-show="menuShow"
    :style="{ top: menuTop + 'px', left: menuLeft + 'px' }"
  >
    <ul>
      <template v-if="curComponent">
        <li @click="copy">复制</li>
        <li @click="paste">粘贴</li>
        <li @click="cut">剪切</li>
        <li @click="deleteComponent">删除</li>
        <li @click="topComponent">置顶</li>
        <li @click="bottomComponent">置底</li>
        <li @click="upComponent">上移</li>
        <li @click="downComponent">下移</li>
      </template>
      <li v-else @click="paste">粘贴</li>
    </ul>
  </div>
</template>

<script>
import {
  VISUAL_DRAG_COPY,
  VISUAL_DRAG_PASTE,
  VISUAL_DRAG_CUT,
  VISUAL_DRAG_DELETE_COMPONENT,
  VISUAL_DRAG_RECODE_SNAP_SHOT,
  VISUAL_DRAG_UPCOMPONENT,
  VISUAL_DRAG_DOWN_COMPONENT,
  VISUAL_DRAG_TOP_COMPONENT,
  VISUAL_DRAG_BOTTOM_COMPONENT
} from "@/store/types.js";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      copyData: null
    };
  },
  computed: {
    ...mapGetters(["menuTop", "menuLeft", "menuShow", "curComponent"])
  },
  methods: {
    cut() {
      this.$store.commit(VISUAL_DRAG_CUT);
    },

    copy() {
      this.$store.commit(VISUAL_DRAG_COPY);
    },

    paste() {
      this.$store.commit(VISUAL_DRAG_PASTE, true);
    },

    deleteComponent() {
      this.$store.commit(VISUAL_DRAG_DELETE_COMPONENT);
      this.$store.commit(VISUAL_DRAG_RECODE_SNAP_SHOT);
    },

    upComponent() {
      this.$store.commit(VISUAL_DRAG_UPCOMPONENT);
      this.$store.commit(VISUAL_DRAG_RECODE_SNAP_SHOT);
    },

    downComponent() {
      this.$store.commit(VISUAL_DRAG_DOWN_COMPONENT);
      this.$store.commit(VISUAL_DRAG_RECODE_SNAP_SHOT);
    },

    topComponent() {
      this.$store.commit(VISUAL_DRAG_TOP_COMPONENT);
      this.$store.commit(VISUAL_DRAG_RECODE_SNAP_SHOT);
    },

    bottomComponent() {
      this.$store.commit(VISUAL_DRAG_BOTTOM_COMPONENT);
      this.$store.commit(VISUAL_DRAG_RECODE_SNAP_SHOT);
    }
  }
};
</script>

<style lang="scss" scoped>
.contextmenu {
  position: absolute;
  z-index: 1000;

  ul {
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    margin: 5px 0;
    padding: 6px 0;

    li {
      font-size: 14px;
      padding: 0 20px;
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #606266;
      height: 34px;
      line-height: 34px;
      box-sizing: border-box;
      cursor: pointer;

      &:hover {
        background-color: #f5f7fa;
      }
    }
  }
}
</style>
