import {
  SET_USER_INFO,
  SET_LOGIN_STATUS,
  SET_SYSNAME,
  SET_CONFIG
} from "../types";

const config = {
  // 命名空间
  // namespaced: true,

  state: {
    userInfo: {},
    sysName: "",
    loginStatus: false,
    appConfig: {}
  },

  mutations: {
    [SET_USER_INFO](state, userInfo) {
      state.userInfo = userInfo;
    },
    [SET_LOGIN_STATUS](state, status) {
      state.loginStatus = status;
    },
    [SET_SYSNAME](state, sysName) {
      state.sysName = sysName;
    },
    [SET_CONFIG](state, appConfig) {
      state.appConfig = appConfig;
    }
  },

  getters: {
    userInfo: state => state.userInfo,
    sysName: state => state.sysName,
    loginStatus: state => state.status,
    appConfig: state => state.appConfig
  }
};

export default config;
