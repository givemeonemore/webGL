/*
 * @Author: raojw
 * @LastEditors: raojw
 * @Description: 获取系统自定义配置信息
 * @Date: 2019-04-22 12:45:43
 * @LastEditTime: 2019-10-30 11:07:22
 */

import { getAppConfig } from "@/api/public";

import cachedFn from "./cachedFn";

export default cachedFn(async () => {
  try {
    const config = await getAppConfig();
    const env = process.env.NODE_ENV;

    return {
      config: config[env] // 根据环境过滤
    };
  } catch (error) {
    console.log(error);
    return Promise.reject("无法读取配置文件的信息，请检测是否配置正确！");
  }
});
