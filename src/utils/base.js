/**
 * @description: 判断是否为ie浏览器
 * @returns {Boolean}
 */
export const isIE =
  window.navigator.userAgent.toLowerCase() &&
  /msie|trident/.test(window.navigator.userAgent.toLowerCase());

/**
 *  判断是否为开发环境
 *  @returns Boolean
 */
export const isDev = () => process.env.NODE_ENV === "development";

/**
 * 判断当前路由是否在路由表中注册
 * name: 当前路由的名称
 * routes： 全部路由的数组集合
 * returnData: 是否需要返回该叶子节点，如果为true，则返回该叶子节点，如果是false，则返回是否存在（Boolean）
 */

export const hasRegisterRoute = (name, routes, returnData = false) => {
  if (returnData) {
    return routes.some(item => {
      if (item.children) {
        return hasRegisterRoute(name, item.children);
      } else {
        return item.name === name;
      }
    });
  } else {
    let data;
    routes.forEach(item => {
      if (item.children) {
        if (hasRegisterRoute(name, item.children))
          data = hasRegisterRoute(name, item.children);
      } else {
        if (item.name === name) data = item;
      }
    });
    if (data) return data;
  }
};
