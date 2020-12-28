<template>
  <div class="body">
    <Sider class="body-sider">
      <Menu
        v-if="showMenu"
        ref="Menu"
        :active-name="activeName"
        accordion
        theme="dark"
        width="auto"
        :open-names="openName"
        @on-select="handleSkip"
      >
        <Submenu
          v-for="(item, index) in menuData"
          :key="index"
          :name="item.name"
        >
          <template v-if="item.children && item.children.length">
            <template slot="title">
              <Icon :type="item.icon"></Icon>
              {{ item.label }}
            </template>
            <MenuItem
              v-for="(cItem, cIndex) in item.children"
              :key="cIndex"
              :name="cItem.name"
              >{{ cItem.label }}</MenuItem
            >
          </template>
          <template v-else>
            <template slot="title">
              <Icon type="ios-navigate"></Icon>
              {{ item.label }}
            </template>
          </template>
        </Submenu>
        <!-- <Submenu name="1">
          <template slot="title">
            <Icon type="ios-navigate"></Icon>
            WebGL基础
          </template>
          <MenuItem name="1-1">
            WebGL基本原理
          </MenuItem>
          <MenuItem name="1-2">
            WebGL工作原理
          </MenuItem>
          <MenuItem name="1-3">
            WebGL着色器和GLSL
          </MenuItem>
          <MenuItem name="1-4">
            测试图像
          </MenuItem>
        </Submenu>
        <Submenu name="2">
          <template slot="title">
            <Icon type="ios-keypad"></Icon>
            图像处理
          </template>
          <MenuItem name="2-1">WebGL图像处理1</MenuItem>
          <MenuItem name="2-2">WebGL图像处理2</MenuItem>
        </Submenu>
        <Submenu name="3">
          <template slot="title">
            <Icon type="ios-analytics"></Icon>
            2D图像处理
          </template>
          <MenuItem name="3-1">
            WebGL 2D图像转换
          </MenuItem>
          <MenuItem name="3-2">
            WebGL 2D图像旋转
          </MenuItem>
          <MenuItem name="3-3">
            WebGL 2D图像伸缩
          </MenuItem>
          <MenuItem name="3-4">WebGL 2D矩阵</MenuItem>
        </Submenu> -->
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
import { getWebGLMenu } from "@/api/public";
export default {
  name: "Body",
  data() {
    return {
      showMenu: false,
      activeName: "1-1",
      openName: ["1"],
      menuData: []
    };
  },
  computed: {},
  async mounted() {
    this.menuData = await getWebGLMenu();
    this.showMenu = true;
    this.$nextTick(() => {
      this.activeName = this.$router.currentRoute.name;
      this.openName[0] = this.$router.currentRoute.name.substr(0, 1);
      this.$refs.Menu.updateActiveName();
    });
  },
  created() {
    // this.$nextTick(() => {
    //   this.activeName = this.$router.currentRoute.name;
    //   this.openName[0] = this.$router.currentRoute.name.substr(0, 1);
    //   this.$refs.Menu.updateActiveName();
    // });
    // this.$nextTick(() => {
    //   this.$refs.Menu.updateActiveName();
    // });
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
