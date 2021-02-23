<template>
  <div class="home">
    <Toolbar />

    <main>
      <!-- 左侧组件列表 -->
      <section class="left">
        <ComponentList />
      </section>
      <!-- 中间画布 -->
      <section class="center">
        <div
          class="content"
          @drop="handleDrop"
          @dragover="handleDragOver"
          @click="deselectCurComponent"
        >
          <Editor />
        </div>
      </section>
      <!-- 右侧属性列表 -->
      <section class="right">
        <Tabs v-model="activeName">
          <TabPane label="属性" name="attr">
            <AttrList v-if="curComponent" />
            <p v-else class="placeholder">请选择组件</p>
          </TabPane>
          <!-- <TabPane label="动画" name="animation">
            <AnimationList v-if="curComponent" />
            <p v-else class="placeholder">请选择组件</p>
          </TabPane>
          <TabPane label="事件" name="events">
            <EventList v-if="curComponent" />
            <p v-else class="placeholder">请选择组件</p>
          </TabPane> -->
        </Tabs>
      </section>
    </main>
  </div>
</template>

<script>
import Editor from "VisualDrag/components/Editor/index";
import ComponentList from "VisualDrag/components/ComponentList"; // 左侧列表组件
import AttrList from "VisualDrag/components/AttrList"; // 右侧属性列表
// import AnimationList from "VisualDrag/components/AnimationList"; // 右侧动画列表
// import EventList from "VisualDrag/components/EventList"; // 右侧事件列表
import componentList from "VisualDrag/custom-component/component-list"; // 左侧列表数据
import Toolbar from "VisualDrag/components/Toolbar";
import { deepCopy } from "@/utils/VisualDrag/utils";
import { mapGetters } from "vuex";
import generateID from "@/utils/VisualDrag/generateID";
import {
  VISUAL_DRAG_COPY,
  VISUAL_DRAG_PASTE,
  VISUAL_DRAG_CUT,
  VISUAL_DRAG_SET_COMPONENT_DATA,
  VISUAL_DRAG_SET_CANVAS_STYLE,
  VISUAL_DRAG_ADD_COMPONENT,
  VISUAL_DRAG_RECODE_SNAP_SHOT,
  VISUAL_DRAG_SET_CUR_COMPONENT,
  VISUAL_DRAG_HIDE_CONTEXT_MENU
} from "@/store/types.js";

export default {
  components: {
    Editor,
    ComponentList,
    AttrList,
    // AnimationList,
    // EventList,
    Toolbar
  },
  data() {
    return {
      activeName: "attr",
      reSelectAnimateIndex: undefined
    };
  },
  computed: {
    ...mapGetters(["componentData", "curComponent"])
  },
  created() {
    this.restore();
    // 监听复制粘贴
    this.listenCopyAndPaste();
  },
  methods: {
    listenCopyAndPaste() {
      const ctrlKey = 17,
        vKey = 86,
        cKey = 67,
        xKey = 88;
      let isCtrlDown = false;

      window.onkeydown = e => {
        if (e.keyCode == ctrlKey) {
          isCtrlDown = true;
        } else if (isCtrlDown && e.keyCode == cKey) {
          this.$store.commit(VISUAL_DRAG_COPY);
        } else if (isCtrlDown && e.keyCode == vKey) {
          this.$store.commit(VISUAL_DRAG_PASTE);
        } else if (isCtrlDown && e.keyCode == xKey) {
          this.$store.commit(VISUAL_DRAG_CUT);
        }
      };

      window.onkeyup = e => {
        if (e.keyCode == ctrlKey) {
          isCtrlDown = false;
        }
      };
    },

    restore() {
      // 用保存的数据恢复画布
      if (localStorage.getItem("canvasData")) {
        this.$store.commit(
          VISUAL_DRAG_SET_COMPONENT_DATA,
          this.resetID(JSON.parse(localStorage.getItem("canvasData")))
        );
      }

      if (localStorage.getItem("canvasStyle")) {
        this.$store.commit(
          VISUAL_DRAG_SET_CANVAS_STYLE,
          JSON.parse(localStorage.getItem("canvasStyle"))
        );
      }
    },

    resetID(data) {
      data.forEach(item => {
        item.id = generateID();
      });

      return data;
    },

    handleDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      const component = deepCopy(
        componentList[e.dataTransfer.getData("index")]
      );
      component.style.top = e.offsetY;
      component.style.left = e.offsetX;
      component.id = generateID();
      this.$store.commit(VISUAL_DRAG_ADD_COMPONENT, { component });
      this.$store.commit(VISUAL_DRAG_RECODE_SNAP_SHOT);
    },

    handleDragOver(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    },

    deselectCurComponent() {
      this.$store.commit(VISUAL_DRAG_SET_CUR_COMPONENT, {
        component: null,
        index: null
      });
      this.$store.commit(VISUAL_DRAG_HIDE_CONTEXT_MENU);
    }
  }
};
</script>

<style scoped lang="scss">
.home {
  height: 100vh;
  background: #fff;

  main {
    height: calc(100% - 64px);
    position: relative;

    .left {
      position: absolute;
      height: 100%;
      width: 200px;
      left: 0;
      top: 0;
      padding-top: 10px;
    }

    .right {
      position: absolute;
      height: 100%;
      width: 262px;
      right: 0;
      top: 0;
    }

    .center {
      margin-left: 200px;
      margin-right: 262px;
      background: #f5f5f5;
      height: 100%;
      overflow: auto;
      padding: 20px;

      .content {
        height: 100%;
        overflow: auto;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .placeholder {
    text-align: center;
    color: #333;
  }
}
</style>
