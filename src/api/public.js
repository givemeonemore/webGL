import { JGET } from "@/plugins/axios";

export function getAppConfig() {
  return JGET(`static/appConfig.hjson`, `获取系统配置文件`);
}

export function getWmtsConfig() {
  return JGET(`static/mapInit.hjson`, `获取天地图配置文件`);
}
