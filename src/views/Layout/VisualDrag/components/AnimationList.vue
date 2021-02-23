<template>
  <div class="animation-list">
    <div class="div-animation">
      <Button @click="isShowAnimation = true">添加动画</Button>
      <Button @click="previewAnimate">预览动画</Button>
      <div>
        <Tag
          v-for="(tag, index) in curComponent.animations"
          :key="index"
          closable
          @close="removeAnimation(index)"
        >
          {{ tag.label }}
        </Tag>
      </div>
    </div>

    <!-- 选择动画 -->
    <Modal v-model="isShowAnimation">
      <Tabs v-model="animationActiveName">
        <TabPane
          v-for="item in animationClassData"
          :key="item.label"
          :label="item.label"
          :name="item.label"
        >
          <Scroll class="animate-container">
            <div
              class="animate"
              v-for="(animate, index) in item.children"
              :key="index"
              @mouseover="hoverPreviewAnimate = animate.value"
              @click="addAnimation(animate)"
            >
              <div
                :class="[
                  hoverPreviewAnimate === animate.value &&
                    animate.value + ' animated'
                ]"
              >
                {{ animate.label }}
              </div>
            </div>
          </Scroll>
        </TabPane>
      </Tabs>
    </Modal>
  </div>
</template>

<script>
import Modal from "VisualDrag/components/Modal";
import eventBus from "@/utils/EventBus";
import animationClassData from "@/utils/VisualDrag/animationClassData";
import { mapGetters } from "vuex";

export default {
  components: { Modal },
  data() {
    return {
      isShowAnimation: false,
      hoverPreviewAnimate: "",
      animationActiveName: "进入",
      animationClassData,
      showAnimatePanel: false
    };
  },
  computed: {
    ...mapGetters(["curComponent"])
  },
  methods: {
    addAnimation(animate) {
      this.$store.commit("addAnimation", animate);
      this.isShowAnimation = false;
    },

    previewAnimate() {
      eventBus.$emit("runAnimation");
    },

    removeAnimation(index) {
      this.$store.commit("removeAnimation", index);
    }
  }
};
</script>

<style lang="scss">
.animation-list {
  .div-animation {
    text-align: center;

    & > div {
      margin-top: 20px;
    }

    .Tag {
      display: block;
      width: 50%;
      margin: auto;
      margin-bottom: 10px;
    }
  }

  .ivu-scrollbar__view {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding-left: 10px;

    .animate > div {
      width: 100px;
      height: 60px;
      background: #f5f8fb;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 12px;
      margin-bottom: 10px;
      font-size: 12px;
      color: #333;
      border-radius: 3px;
      user-select: none;
      cursor: pointer;
    }
  }
}
</style>
