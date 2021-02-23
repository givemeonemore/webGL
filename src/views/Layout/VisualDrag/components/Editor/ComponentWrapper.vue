<template>
  <div @click="handleClick">
    <component
      class="conponent"
      :is="config.component"
      :style="getStyle(config.style)"
      :propValue="config.propValue"
    />
  </div>
</template>

<script>
import getStyle from "@/utils/VisualDrag/style";
import runAnimation from "@/utils/VisualDrag/runAnimation";
import { mixins } from "@/utils/VisualDrag/events";

export default {
  props: {
    config: {
      type: Object,
      require: true
    }
  },
  mounted() {
    runAnimation(this.$ivu, this.config.animations);
  },
  mixins: [mixins],
  methods: {
    getStyle,

    handleClick() {
      const events = this.config.events;
      Object.keys(events).forEach(event => {
        this[event](events[event]);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.conponent {
  position: absolute;
}
</style>
