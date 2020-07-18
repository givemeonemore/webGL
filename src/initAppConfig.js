import store from "@/store";
import getConfig from "@/utils/getConfig";
import { SET_CONFIG } from "@/store/types.js";
import { initInstance as initAxiosInstance } from "@/plugins/axios";

export default async () => {
  const appConfig = await getConfig();
  const { config } = appConfig;
  // vuex 挂载
  store.commit(SET_CONFIG, Object.freeze(config));

  // 注册 axios 实例
  initAxiosInstance(config);
};
