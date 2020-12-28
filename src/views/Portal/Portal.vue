<template>
  <div class="portal">
    <p-canvas class="portal-canvas"></p-canvas>
    <div class="portal-body">
      <div class="portal-body-middle">
        <div
          class="portal-body-middle-button"
          v-for="item in sysNameList"
          :key="item.meta.sysName"
          :title="item.meta.sysName"
          @click="handleSkip(item)"
        >
          {{ item.meta.sysName }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pCanvas from "../Login/components/LoginCavans";
import { SET_SYSNAME } from "@/store/types.js";
export default {
  data() {
    return {
      sysNameList: []
    };
  },
  components: { pCanvas },
  created() {
    this.sysNameList = this.$router.options.routes.filter(item => {
      if (item.meta && item.meta.sysName) {
        return item;
      }
    });
  },
  methods: {
    handleSkip(item) {
      this.$store.commit(SET_SYSNAME, item.meta.sysName);
      this.$router.push({
        name: item.children[0].name,
        params: {}
      });
    }
  }
};
</script>

<style scoped lang="scss">
.portal {
  width: 100%;
  height: 100%;
  background-color: #000000;
  margin: 0;
  overflow: hidden;
  font-size: 0;
  &-cavans {
    width: 100%;
    height: 100%;
  }
  &-body {
    height: 15rem;
    width: 100%;
    position: absolute;
    top: calc(50% - 6rem);
    &-middle {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 15rem;
      width: 100%;
      &-button {
        height: 10rem;
        width: 10rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
        cursor: pointer;
        border-radius: 50%;
        background: rgba(231, 226, 230, 0.6);
        color: #000000;
        box-shadow: $shadow-header;
        z-index: 999;
        margin-left: 1rem;
      }
      &-button:hover {
        box-shadow: 0 0 40px #900;
      }
    }
  }
}
</style>
