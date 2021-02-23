<template>
  <div class="event-list">
    <div class="div-events">
      <Button @click="isShowEvent = true">添加事件</Button>
      <div>
        <Tag
          v-for="event in Object.keys(curComponent.events)"
          :key="event"
          closable
          @close="removeEvent(event)"
        >
          {{ event }}
        </Tag>
      </div>
    </div>

    <!-- 选择事件 -->
    <Modal v-model="isShowEvent">
      <Tabs v-model="eventActiveName">
        <TabPane
          v-for="item in eventList"
          :key="item.key"
          :label="item.label"
          :name="item.key"
          style="padding: 0 20px"
        >
          <Input
            v-if="item.key == 'redirect'"
            v-model="item.param"
            type="textarea"
            placeholder="请输入完整的 URL"
          />
          <Input
            v-if="item.key == 'alert'"
            v-model="item.param"
            type="textarea"
            placeholder="请输入要 alert 的内容"
          />
          <Button
            style="margin-top: 20px;"
            @click="addEvent(item.key, item.param)"
            >确定</Button
          >
        </TabPane>
      </Tabs>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Modal from "VisualDrag/components/Modal";
import { eventList } from "@/utils/VisualDrag/events";

export default {
  components: { Modal },
  data() {
    return {
      isShowEvent: false,
      eventURL: "",
      eventActiveName: "redirect",
      eventList
    };
  },
  computed: {
    ...mapGetters(["curComponent"])
  },
  methods: {
    addEvent(event, param) {
      this.isShowEvent = false;
      this.$store.commit("addEvent", { event, param });
    },

    removeEvent(event) {
      this.$store.commit("removeEvent", event);
    }
  }
};
</script>

<style lang="scss" scoped>
.event-list {
  .div-events {
    text-align: center;
    padding: 0 20px;

    .Button {
      display: inline-block;
      margin-bottom: 10px;
    }

    .Tag {
      display: block;
      width: 50%;
      margin: auto;
      margin-bottom: 10px;
    }
  }
}
</style>
