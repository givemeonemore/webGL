// 这里是 JS 一些常用方法的集合工具

// -------------------------------------------------------------    Map 实现 switch 的操作 --------------------------------------------------
// 一般这种可写在mixin文件中，将多条件判断单独拎出来
function Method1() {
  console.log("方法1");
  return "方法1";
}

function Method2() {
  console.log("方法2");
  return "方法2";
}

function Method3() {
  console.log("方法3");
  return "方法3";
}

function Method4() {
  console.log("方法4");
  return "方法4";
}

/**
 *
 * @param {*} val val指的是在 Map 中设置的 key 值，也就是我们这里放着的0、1、2、3，在项目中使用的时候，可以自行设置
 */
// 多条件判断的高级写法
// 结合 ES6 的 Map 属性
export function highSwitch(val) {
  const comparaTiveTotles = new Map([
    [0, Method1],
    [1, Method2],
    [2, Method3],
    [3, Method4]
  ]);
  let getMap = comparaTiveTotles.get(val);
  // 如果查找不到就返回undefined
  if (!getMap) {
    this.$Message.error("未找到对应方法");
  } else {
    // 获取到的getMap只是Map中的定义的方法的一个索引，需要加上()才可以执行该方法
    let newData = getMap();
    return newData;
  }
}

// -------------------------------------------------------------    reduce 实现数组对象去重    --------------------------------------------------
/**
 * 根据数组对象的不同value值，获取数组中不同的部分， 默认返回一个新的数组
 * 如果需要从简单的数组中遍历出不同的部分，可直接使用reduce方法
 * @param {*} arr 进行筛选的原数组
 * @param {*} key 获取value值，根据该value值的不同，将不同的部分push到一起
 * @param {*} fc 是否存在对于数据的其他操作，如果有，则对其进行其他自定义的操作
 * reduce 的两个参数
 * function (total, currentValue, currentIndex, arr)
 *   total： 初始值, 或者计算结束后的返回值。可以看见我们这里的初始值就是一个空数组。
 *   currentValue： 当前元素、
 *   currentIndex：当前元素的索引
 *   arr：当前的数组，即用于reduce的原数组
 * initValue: 可选。 传递给函数的初始值，就是total的初始值
 */
export function reduceData(arr, key, fc = null) {
  let obj = {};
  let newArr = arr.reduce((total, currentValue, currentIndex, arr) => {
    if (fc) {
      // 在这里进行对 currentIndex、arr 的操作
      fc(currentValue, currentIndex, arr);
    }
    obj[currentValue[key]]
      ? ""
      : (obj[currentValue[key]] = true && total.push(currentValue));
    return total;
  }, []);
  return newArr;
}

// -------------------------------------------------------------    数字转换为数字数组    -------------------------------------------------
export function converToArray(number) {
  // 检测数字是否是number类型
  if (number && typeof number === "number") {
    let data = number => [...`${number}`].map(item => parseInt(item));
    return data;
  }
}

// -------------------------------------------------------------    时间戳转换时间方法    --------------------------------------------------
// 时间戳转换为 2019-01-01 00:00:00的形式
/*
timestamp: 时间戳
dayMinSecFlag： 是否只要显示年月日
 */
export function timestampToTime(timestamp, dayMinSecFlag) {
  const date = new Date(timestamp);
  const Y = date.getFullYear() + "-";
  const M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  const D =
    date.getDate() < 10 ? "0" + date.getDate() + " " : date.getDate() + " ";
  const h =
    date.getHours() < 10 ? "0" + date.getHours() + ":" : date.getHours() + ":";
  const m =
    date.getMinutes() < 10
      ? "0" + date.getMinutes() + ":"
      : date.getMinutes() + ":";
  const s =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  if (!dayMinSecFlag) {
    return Y + M + D;
  } else {
    return Y + M + D + h + m + s;
  }
}

// -------------------------------------------------------------- 分割指定长度的数组 -----------------------------------------------------------
/**
 *
 * @param {*} list 需要进行分割的数组
 * @param {*} size 分割后的一个数组中的元素个数
 * @param {*} cacheList 本地暂存数组
 */
export function listChunk(list, size = 1, cacheList = []) {
  const temp = [...list];
  if (size <= 0) {
    return cacheList;
  }
  while (temp.length > 0) {
    cacheList.push(temp.splice(0, size));
  }
  return cacheList;
}
