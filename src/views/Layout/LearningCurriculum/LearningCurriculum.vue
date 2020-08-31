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
        <div v-for="(item, index) in menuListData" :key="index">
          <template v-if="item.children && item.children.length">
            <Submenu name="item.courseName">
              <template v-if="item.children && item.children.length">
                <div v-for="(cItem, cIndex) in item.children" :key="cIndex">
                  <template v-if="cItem.children && cItem.children.length">
                    <Submenu name="cItem.courseName">
                      <template v-if="cItem.children && cItem.children.length">
                        <div
                          v-for="(ccItem, ccIndex) in cItem.children"
                          :key="ccIndex"
                        >
                          <MenuItem name="ccItem.courseName"></MenuItem>
                        </div>
                      </template>
                    </Submenu>
                  </template>
                  <MenuItem v-else name="cItem.courseName"></MenuItem>
                </div>
              </template>
            </Submenu>
          </template>
          <MenuItem v-else name="item.courseName"></MenuItem>
        </div>
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
import { getLearnningCourse } from "@/api/learningCurriculum";
export default {
  name: "LearningCurriculum",
  data() {
    return {
      activeName: "",
      menuListData: [],
      openName: []
    };
  },
  computed: {},
  created() {
    this.getMenuData();
  },
  methods: {
    async getMenuData() {
      this.menuListData = await getLearnningCourse();
      if (this.menuListData.length) {
        this.activeName = this.getMenuName(this.menuListData);
        this.openName[0] = this.menuListData[0].courseName;
      }
    },
    getMenuName(menuData) {
      let menuName = "";
      menuData.forEach((item, index) => {
        if (index === 0) {
          if (item.children && item.children.length) {
            menuName = this.getMenuName(item.children);
          } else {
            menuName = item.courseName;
          }
        }
      });
      return menuName;
    },
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
