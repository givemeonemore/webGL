<template>
  <app-layout>
    <template #left>
      <div class="left">
        <div class="left-header">
          <span>测试各种自写组件</span>
        </div>
        <div class="left-menu">
          <Menu
            ref="menu"
            :active-name="activeName"
            :open-names="openNames"
            theme="light"
            width="auto"
          >
            <Submenu :name="subName">
              <template slot="title">
                <Icon :type="subIcon" />
                {{ subLabel }}
              </template>
              <menu-item
                v-for="item in menuData"
                :key="item.meta.name"
                :name="item.meta.name"
                :title="item.meta.label"
                >{{ item.meta.label }}</menu-item
              >
            </Submenu>
          </Menu>
        </div>
      </div>
    </template>
    <template #right>
      <router-view></router-view>
    </template>
  </app-layout>
</template>

<script>
export default {
  name: "ComponentTest",
  data() {
    return {
      matchRoute: [],
      menuData: [],
      subName: "",
      subIcon: "",
      subLabel: "",
      activeName: "",
      openNames: [],
      currentRouteName: "ComponentTest"
    };
  },
  computed: {},
  watch: {
    activeName(value) {
      this.$nextTick(() => {
        this.$refs.menu.updateActiveName();
      });
      if (value) {
        this.$router.push({
          name: value,
          params: {}
        });
      }
    },
    openNames() {
      this.$nextTick(() => {
        this.$refs.menu.updateOpened();
      });
    }
  },
  created() {
    this.matchRoute = this.$router.options.routes.filter(item => {
      if (item.redirect && item.redirect.name === this.currentRouteName) {
        return item;
      }
    })[0].children;
    // this.matchRoute = matchRoute[0].children;
    this.getProperty();
  },
  methods: {
    getProperty() {
      this.menuData = this.matchRoute[0].children;
      this.subName = this.matchRoute[0].meta.name;
      this.subIcon = this.matchRoute[0].meta.icon;
      this.subLabel = this.matchRoute[0].meta.label;
      this.activeName = this.matchRoute[0].children[0].name;
      this.openNames.push(this.matchRoute[0].meta.name);
    }
  }
};
</script>

<style scoped lang="scss">
.left {
  width: 100%;
  height: 100%;
  border-right: 1px solid #e3e3e3;
  &-header {
    width: 100%;
    height: 100%;
    height: 3rem;
    font-size: 0.93rem;
    line-height: 3rem;
    display: inline-block;
    padding-left: 1.5rem;
    font-weight: bold;
    border-bottom: 1px solid #e3e3e3;
  }
  &-menu {
    width: 100%;
    height: calc(100% - 3rem);
    .ivu-menu {
      width: 100% !important;
      font-size: 0.73rem !important;
    }
    .ivu-menu-vertical.ivu-menu-light:after {
      width: 0px;
    }
  }
  // box-shadow: ;
}
</style>
