<template>
  <div class="body">
    <Sider class="body-sider">
      <Menu
        ref="Menu"
        :active-name="activeName"
        accordion
        theme="dark"
        width="auto"
        :open-names="openName"
        @on-select="handleSkip"
      >
        <Submenu name="CSS">
          <template slot="title">
            <Icon type="ios-navigate"></Icon>
            CSS实验效果
          </template>
          <MenuItem name="css-1">
            渐变发光加载动画特效
          </MenuItem>
          <MenuItem name="css-2">
            transform动画效果
          </MenuItem>
          <MenuItem name="css-3">
            WebGL着色器和GLSL
          </MenuItem>
          <MenuItem name="css-4">
            测试图像
          </MenuItem>
        </Submenu>
        <Submenu name="JavaScript">
          <template slot="title">
            <Icon type="ios-keypad"></Icon>
            JavaScript实践
          </template>
          <MenuItem name="JavaScript-1">WebGL图像处理1</MenuItem>
          <MenuItem name="JavaScript-2">WebGL图像处理2</MenuItem>
        </Submenu>
        <Submenu name="VUE">
          <template slot="title">
            <Icon type="ios-paper"></Icon>
            Vue理论实践
          </template>
          <MenuItem name="vue-1">如何从插槽中发出数据</MenuItem>
          <MenuItem name="vue-2">WebGL图像处理2</MenuItem>
        </Submenu>
      </Menu>
    </Sider>
    <Layout class="body-layout">
      <Content class="body-layout-content">
        <div class="body-layout-content-app-main-con">
          <router-view />
        </div>
      </Content>
    </Layout>
  </div>
</template>

<script>
export default {
  name: "Body",
  data() {
    return {
      activeName: "css-1",
      openName: ["CSS"]
    };
  },
  computed: {},
  created() {
    this.activeName = this.$router.currentRoute.name;
    this.openName[0] = this.$router.currentRoute.name
      .split("-")[0]
      .toUpperCase();
    this.$nextTick(() => {
      this.$refs.Menu.updateActiveName();
    });
  },
  methods: {
    updateActiveName() {},
    handleSkip(name) {
      this.$router.push({
        name: name,
        params: {}
      });
    }
  }
};
</script>

<style scoped lang="scss">
.body {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  &-sider {
    position: fixed;
    height: 100%;
    left: 0;
    overflow: auto;
    width: 15rem !important;
    min-width: 15rem !important;
    max-width: 15rem !important;
    >>> .ivu-menu-submenu-title {
      text-align: left;
    }
    >>> .ivu-menu {
      >>> .ivu-menu-item {
        text-align: left;
      }
    }
  }
  &-layout {
    width: calc(100% - 15rem);
    margin-left: 15rem;
    height: 100%;
    &-content {
      padding: 0 16px 0 16px;
      height: 100%;
      width: 100%;
      &-app-main-con {
        height: 100%;
        width: 100%;
      }
    }
  }
}
</style>
