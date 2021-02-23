import {
  VISUAL_DRAG_COPY,
  VISUAL_DRAG_PASTE,
  VISUAL_DRAG_CUT,
  VISUAL_DRAG_SET_EDIT_MODE,
  VISUAL_DRAG_SET_CANVAS_STYLE,
  VISUAL_DRAG_ADD_COMPONENT,
  VISUAL_DRAG_SET_CUR_COMPONENT,
  VISUAL_DRAG_SET_SHAPE_STYLE,
  VISUAL_DRAG_SET_SHAPE_POS_STYLE,
  VISUAL_DRAG_UNDO,
  VISUAL_DRAG_REDO,
  VISUAL_DRAG_SET_COMPONENT_DATA,
  VISUAL_DRAG_RECODE_SNAP_SHOT,
  VISUAL_DRAG_SHOW_CONTEXT_MENU,
  VISUAL_DRAG_HIDE_CONTEXT_MENU,
  VISUAL_DRAG_DELETE_COMPONENT,
  VISUAL_DRAG_UPCOMPONENT,
  VISUAL_DRAG_DOWN_COMPONENT,
  VISUAL_DRAG_TOP_COMPONENT,
  VISUAL_DRAG_BOTTOM_COMPONENT,
  VISUAL_DRAG_ADD_ANIMATION,
  VISUAL_DRAG_REMOVE_ANIMATION,
  VISUAL_DRAG_ADD_EVEVT,
  VISUAL_DRAG_REMOVE_EVENT
} from "../types";
import { deepCopy, swap } from "@/utils/VisualDrag/utils";
import toast from "@/utils/VisualDrag/toast";
import generateID from "@/utils/VisualDrag/generateID";
import store from "@/store";
import Vue from "vue";

const config = {
  state: {
    editMode: "edit", // 编辑器模式 edit read
    canvasStyleData: {
      // 页面全局数据
      width: 1200,
      height: 740
    },
    componentData: [], // 画布组件数据
    curComponent: null,
    curComponentIndex: null,
    snapshotData: [], // 编辑器快照数据
    snapshotIndex: -1, // 快照索引
    menuTop: 0, // 右击菜单数据
    menuLeft: 0,
    menuShow: false,
    copyData: null // 复制粘贴剪切
  },
  getters: {
    editMode: state => {
      return state.editMode;
    },
    canvasStyleData: state => {
      return state.canvasStyleData;
    },
    componentData: state => {
      return state.componentData;
    },
    curComponent: state => {
      return state.curComponent;
    },
    curComponentIndex: state => {
      return state.curComponentIndex;
    },
    snapshotData: state => {
      return state.snapshotData;
    },
    snapshotIndex: state => {
      return state.snapshotIndex;
    },
    menuTop: state => {
      return state.menuTop;
    },
    menuLeft: state => {
      return state.menuLeft;
    },
    menuShow: state => {
      return state.menuShow;
    },
    copyData: state => {
      return state.copyData;
    }
  },
  mutations: {
    [VISUAL_DRAG_COPY](state) {
      state.copyData = {
        data: deepCopy(state.curComponent),
        index: state.curComponentIndex
      };
    },

    [VISUAL_DRAG_PASTE](state, isMouse) {
      if (!state.copyData) {
        toast("请选择组件");
        return;
      }

      const data = state.copyData.data;

      if (isMouse) {
        data.style.top = state.menuTop;
        data.style.left = state.menuLeft;
      } else {
        data.style.top += 10;
        data.style.left += 10;
      }

      data.id = generateID();
      store.commit(VISUAL_DRAG_ADD_COMPONENT, { component: data });
      store.commit(VISUAL_DRAG_RECODE_SNAP_SHOT);
      state.copyData = null;
    },

    [VISUAL_DRAG_CUT](state) {
      if (!state.curComponent) {
        toast("请选择组件");
        return;
      }

      if (state.copyData) {
        store.commit(VISUAL_DRAG_ADD_COMPONENT, {
          component: state.copyData.data,
          index: state.copyData.index
        });
        if (state.curComponentIndex >= state.copyData.index) {
          // 如果当前组件索引大于等于插入索引，需要加一，因为当前组件往后移了一位
          state.curComponentIndex++;
        }
      }

      store.commit(VISUAL_DRAG_COPY);
      store.commit(VISUAL_DRAG_DELETE_COMPONENT);
    },

    [VISUAL_DRAG_SET_EDIT_MODE](state, mode) {
      state.editMode = mode;
    },

    [VISUAL_DRAG_SET_CANVAS_STYLE](state, style) {
      state.canvasStyleData = style;
    },

    [VISUAL_DRAG_ADD_COMPONENT](state, { component, index }) {
      if (index !== undefined) {
        state.componentData.splice(index, 0, component);
      } else {
        state.componentData.push(component);
      }
    },

    [VISUAL_DRAG_SET_CUR_COMPONENT](state, { component, index }) {
      state.curComponent = component;
      state.curComponentIndex = index;
    },

    [VISUAL_DRAG_SET_SHAPE_STYLE](
      { curComponent },
      { top, left, width, height, rotate }
    ) {
      if (top) curComponent.style.top = top;
      if (left) curComponent.style.left = left;
      if (width) curComponent.style.width = width;
      if (height) curComponent.style.height = height;
      if (rotate) curComponent.style.rotate = rotate;
    },

    [VISUAL_DRAG_SET_SHAPE_POS_STYLE]({ curComponent }, { key, value }) {
      curComponent.style[key] = value;
    },

    [VISUAL_DRAG_UNDO](state) {
      if (state.snapshotIndex >= 0) {
        state.snapshotIndex--;
        store.commit(
          VISUAL_DRAG_SET_COMPONENT_DATA,
          deepCopy(state.snapshotData[state.snapshotIndex])
        );
      }
    },

    [VISUAL_DRAG_REDO](state) {
      if (state.snapshotIndex < state.snapshotData.length - 1) {
        state.snapshotIndex++;
        store.commit(
          VISUAL_DRAG_SET_COMPONENT_DATA,
          deepCopy(state.snapshotData[state.snapshotIndex])
        );
      }
    },

    [VISUAL_DRAG_SET_COMPONENT_DATA](state, componentData = []) {
      // 使用 .set 触发数据更新
      Vue.set(state, "componentData", componentData);
    },

    [VISUAL_DRAG_RECODE_SNAP_SHOT](state) {
      // 添加新的快照
      state.snapshotData[++state.snapshotIndex] = deepCopy(state.componentData);
      // 在 undo 过程中，添加新的快照时，要将它后面的快照清理掉
      if (state.snapshotIndex < state.snapshotData.length - 1) {
        state.snapshotData = state.snapshotData.slice(
          0,
          state.snapshotIndex + 1
        );
      }
    },

    [VISUAL_DRAG_SHOW_CONTEXT_MENU](state, { top, left }) {
      state.menuShow = true;
      state.menuTop = top;
      state.menuLeft = left;
    },

    [VISUAL_DRAG_HIDE_CONTEXT_MENU](state) {
      state.menuShow = false;
    },

    [VISUAL_DRAG_DELETE_COMPONENT](state, index = state.curComponentIndex) {
      state.componentData.splice(index, 1);
    },

    [VISUAL_DRAG_UPCOMPONENT]({ componentData, curComponentIndex }) {
      // 上移图层 index，表示元素在数组中越往后
      if (curComponentIndex < componentData.length - 1) {
        swap(componentData, curComponentIndex, curComponentIndex + 1);
      } else {
        toast("已经到顶了");
      }
    },

    [VISUAL_DRAG_DOWN_COMPONENT]({ componentData, curComponentIndex }) {
      // 下移图层 index，表示元素在数组中越往前
      if (curComponentIndex > 0) {
        swap(componentData, curComponentIndex, curComponentIndex - 1);
      } else {
        toast("已经到底了");
      }
    },

    [VISUAL_DRAG_TOP_COMPONENT]({ componentData, curComponentIndex }) {
      // 置顶
      if (curComponentIndex < componentData.length - 1) {
        swap(componentData, curComponentIndex, componentData.length - 1);
      } else {
        toast("已经到顶了");
      }
    },

    [VISUAL_DRAG_BOTTOM_COMPONENT]({ componentData, curComponentIndex }) {
      // 置底
      if (curComponentIndex > 0) {
        swap(componentData, curComponentIndex, 0);
      } else {
        toast("已经到底了");
      }
    },

    [VISUAL_DRAG_ADD_ANIMATION]({ curComponent }, animation) {
      curComponent.animations.push(animation);
    },

    [VISUAL_DRAG_REMOVE_ANIMATION]({ curComponent }, index) {
      curComponent.animations.splice(index, 1);
    },

    [VISUAL_DRAG_ADD_EVEVT]({ curComponent }, { event, param }) {
      curComponent.events[event] = param;
    },

    [VISUAL_DRAG_REMOVE_EVENT]({ curComponent }, event) {
      delete curComponent.events[event];
    }
  }
};

export default config;
