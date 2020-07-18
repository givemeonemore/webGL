<template>
  <div class="header">
    <div class="header-name" @click="gotoPortal">{{ sysName }}</div>
    <div>
      <Dropdown @on-click="handleClick">
        <a href="javascript:void(0)">
          {{ userName }}
          <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem name="operation">设置</DropdownItem>
          <DropdownItem name="quit">退出</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>

<script>
// import Header from "./Header";
export default {
  name: "Header",
  data() {
    return {};
  },
  computed: {
    sysName() {
      if (this.$store.state.config.sysName) {
        return this.$store.state.config.sysName;
      } else {
        return window.localStorage.getItem("sysName");
      }
    },
    userName() {
      if (this.$store.state.config.userInfo.userName) {
        return this.$store.state.config.userInfo.userName;
      } else {
        let userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
        return userInfo.userName;
      }
    }
  },
  methods: {
    handleClick(name) {
      switch (name) {
        case "operation":
          this.handleOpertion();
          break;
        case "quit":
          this.handleQuit();
          break;
        default:
          break;
      }
    },
    handleQuit() {
      window.localStorage.removeItem("token");
      this.$router.push({
        name: "Login",
        params: {}
      });
    },
    handleOpertion() {
      // TODO:
    },
    gotoPortal() {
      this.$router.push({
        name: "Portal",
        params: {}
      });
    }
  }
};
</script>

<style scoped lang="scss">
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 0 1.5rem;
  justify-content: space-between;
  -webkit-box-orient: horizontal;
  // padding-right: 0;
  background-color: $colorffffff;
  &-name {
    @include SystemTitleFs();
    cursor: pointer;
  }
}
</style>
