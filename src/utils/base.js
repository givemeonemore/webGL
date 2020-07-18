/**
 * @description: 判断是否为ie浏览器
 * @returns {Boolean}
 */
export const isIE =
  window.navigator.userAgent.toLowerCase() &&
  /msie|trident/.test(window.navigator.userAgent.toLowerCase());
