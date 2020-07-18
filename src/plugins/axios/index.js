/*
 * @Author: raojw
 * @Date: 2018-11-23
 */
import Hjson from "hjson";
import { isIE } from "@/utils/base";
import HttpRequest from "./httpRequest";
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;

const instanceMap = {
  // 系统基础服务
  base: null
};

// 注册实例
export const initInstance = config => {
  const { API, API_FILE_DIR } = config;
  const BASEURL = API + API_FILE_DIR || "";
  instanceMap.base = new HttpRequest({
    BASEURL
  });
};

/**
 * get方法
 * @param {String} url [请求的url地址]
 * @param {String} serviceName [请求服务名和服务描述(和swagger对应)]
 * @param {Object} params [请求时携带的参数] (可选)
 * @param {Boolean} showErrorMessage [是否需要错误信息提示 iview.message]
 */
const get = (
  axiosInstance,
  url,
  serviceName = "未知服务",
  params = {},
  onProgress,
  showErrorMessage = true
) => {
  return new Promise((resolve, reject) => {
    axiosInstance({
      url,
      method: "get",
      params,
      // 对原生进度事件的处理
      onUploadProgress: onProgress,
      // fix ie get 缓存问题
      headers: isIE
        ? {
            "Cache-Control": "no-cache"
          }
        : {},
      showErrorMessage
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error);
        throw new Error(`请求---${serviceName}---接口失败`);
      });
  });
};

/**
 * post方法
 * @param {String} url [请求的url地址]
 * @param {String} serviceName [请求服务名和服务描述(和swagger对应)]
 * @param {Object} params [请求时携带的参数] (可选)
 * @param {Object} headers [请求时的请求头信息] （可选）
 */
const post = (
  axiosInstance,
  url,
  serviceName = "未知服务",
  params = {},
  headers = {},
  withCredentials = true,
  onUploadProgress
) => {
  return new Promise((resolve, reject) => {
    axiosInstance({
      url,
      method: "post",
      // data: qs.stringify(params)
      data: params,
      headers: headers,
      withCredentials,
      onUploadProgress: onUploadProgress
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error);
        throw new Error(`请求---${serviceName}---接口失败`);
      });
  });
};

/**
 * put方法
 * @param {string} url [请求的url地址]
 * @param {string} serviceName [请求服务名与服务描述(与swagger一致)]
 * @param {Object} params [请求是携带的参数(可选)]
 */
const put = (axiosInstance, url, serviceName = "未知服务", params = {}) => {
  return new Promise((resolve, reject) => {
    axiosInstance({
      url,
      method: "put",
      data: params
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error);
        throw new Error(`请求---${serviceName}---接口失败`);
      });
  });
};

/**
 * delete方法
 * @param {string} url [请求url]
 * @param {string} serviceName [请求服务名和服务描述(与swagger一致)]
 * @param {Object} params [请求携带参数(可选)]
 */

const del = (axiosInstance, url, serviceName = "未知服务", params = {}) => {
  return new Promise((resolve, reject) => {
    axiosInstance({
      url,
      method: "delete",
      data: params,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      }
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error);
        throw new Error(`请求---${serviceName}---接口失败`);
      });
  });
};
// 基础get请求
export const GET = (url, serviceName, params, showErrorMessage) => {
  return get(instanceMap.base, url, serviceName, params, showErrorMessage);
};

// 基础post请求
export const POST = (url, serviceName, params, headers, onUploadProgress) => {
  return post(
    instanceMap.base,
    url,
    serviceName,
    params,
    headers,
    true,
    onUploadProgress
  );
};

// 基础put请求
export const PUT = (url, serviceName, params) => {
  return put(instanceMap.base, url, serviceName, params);
};

// 基础delete请求
export const DELETE = (url, serviceName, params) => {
  return del(instanceMap.base, url, serviceName, params);
};

// 静态json下载，统一采用Hjson格式化
export const JGET = async (url, serviceName) => {
  try {
    const res = await HttpRequest.get(url, {
      // 阻止 axios 自动 JSON.parse, 不知为什么没有阻止成功
      // refer https://github.com/axios/axios/issues/907
      transformResponse: undefined,
      // 不缓存 hjson
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate"
      }
    });
    const { data } = res;
    // axios 自动JSON.parse
    return Hjson.parse(data);
  } catch (error) {
    console.error(error);
    throw new Error(`请求---${serviceName}---失败`);
  }
};
