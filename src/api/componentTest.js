import { JGET } from "@/plugins/axios";

export function getScrollTabsData() {
  return JGET(`static/scrollTabData.hjson`, `获取本地Tab数据`);
}