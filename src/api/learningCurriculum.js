import { JGET } from "@/plugins/axios";

export function getLearnningCourse() {
  return JGET(`static/learn-curri-culum.hjson`, `获取课程文件信息`);
}
