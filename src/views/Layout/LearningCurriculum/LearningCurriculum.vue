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
          <div v-if="item.children && item.children.length">
            <Submenu :name="item.courseName">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>
                {{ item.courseName }}
              </template>
              <div v-if="item.children && item.children.length">
                <learning-curriculum
                  :subMenuListData="item.children"
                ></learning-curriculum>
                <div v-for="(cItem, cIndex) in item.children" :key="cIndex">
                  <div v-if="cItem.children && cItem.children.length">
                    <!-- <Submenu class="submenu-title" :name="cItem.courseName">
                      <template slot="title">
                        <Icon type="ios-navigate"></Icon>
                        <span class="submenu-title">{{
                          cItem.courseName
                        }}</span>
                      </template>
                      <div v-if="cItem.children && cItem.children.length">
                        <div
                          v-for="(ccItem, ccIndex) in cItem.children"
                          :key="ccIndex"
                        >
                          <MenuItem class="submenu-title" :name="ccItem.courseName">{{
                            ccItem.courseName
                          }}</MenuItem>
                        </div>
                      </div>
                    </Submenu> -->
                  </div>
                  <MenuItem
                    v-else
                    class="submenu-title"
                    :name="cItem.courseName"
                    >{{ cItem.courseName }}</MenuItem
                  >
                </div>
              </div>
            </Submenu>
          </div>
          <MenuItem v-else :name="item.courseName">{{
            item.courseName
          }}</MenuItem>
        </div>
      </Menu>
    </Sider>
    <Layout class="body-layout">
      <Content class="body-layout-content">
        <div class="body-layout-content-app-main-con" v-if="showPage">
          <!-- <router-view /> -->
          <iframe :src="htmlSrc"></iframe>
        </div>
      </Content>
    </Layout>
  </div>
</template>

<script>
import { getLearnningCourse } from "@/api/learningCurriculum";
import LearningCurriculum from "@/views/Layout/LearningCurriculum/LearningCurriculum";
export default {
  name: "LearningCurriculum",
  components: { LearningCurriculum },
  data() {
    return {
      activeName: "",
      menuListData: [],
      openName: [],
      htmlSrc: "",
      showPage: false
    };
  },
  props: {
    subMenuListData: {
      type: Array,
      default: () => []
    }
  },
  computed: {},
  created() {
    if (!this.subMenuListData || !this.subMenuListData.length) {
      this.getMenuData();
    } else {
      this.menuListData = this.subMenuListData;
      this.getMenuActiveName();
    }
  },
  methods: {
    async getMenuData() {
      this.menuListData = await getLearnningCourse();
      this.getMenuActiveName();
      this.$nextTick(() => {
        this.$refs.Menu.updateActiveName();
        // this.htmlSrc = require(`@/assets/learningcurriculum/${this.urlFileLocation}${this.urlFileName}`);
        this.showPage = true;
      });
    },

    getMenuActiveName() {
      if (this.menuListData.length) {
        this.getInitMenuName(this.menuListData);
        this.openName[0] = this.menuListData[0].courseName;
      }
    },

    getInitMenuName(menuData) {
      menuData.forEach((item, index) => {
        if (index === 0) {
          if (item.children && item.children.length) {
            this.getInitMenuName(item.children);
          } else {
            this.activeName = item.courseName;
            this.urlFileLocation = item.urlFileLocation;
            this.urlFileName = item.urlFileName;
            // this.htmlSrc = require(`@/assets/learningcurriculum/${item.urlFileLocation}${item.urlFileName}`);
            // this.showPage = true;
          }
        }
      });
    },

    updateActiveName() {},

    getClickMenuName(menuData, name) {
      menuData.forEach(item => {
        if (item.children && item.children.length) {
          this.getClickMenuName(item.children, name);
        } else {
          if (item.courseName === name) {
            // this.htmlSrc = require(`@/assets/learningcurriculum/${item.urlFileLocation}${item.urlFileName}`);
            this.showPage = true;
          }
        }
      });
    },

    handleSkip(name) {
      this.showPage = false;
      this.getClickMenuName(this.menuListData, name);
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
    height: calc(100% - 3rem);
    left: 0;
    overflow: auto;
    width: 15rem !important;
    min-width: 15rem !important;
    max-width: 15rem !important;
    ::v-deep .ivu-menu {
      .ivu-menu-submenu-title {
        text-align: left;
        display: flex;
        align-items: center;
      }
      .ivu-menu-item {
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
