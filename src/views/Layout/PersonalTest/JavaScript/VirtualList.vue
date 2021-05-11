<!--
 * @Descripttion: 
 * @version: 
 * @Author: zhouran
 * @Date: 2021-04-09 09:31:57
 * @LastEditors: zhouran
 * @LastEditTime: 2021-04-09 13:41:59
-->
<template>
  <div class="list-dom">
    <div class="child-list-dom">
      <header class="tip">注意：本例仅适用用单元格高度固定的列表</header>
      <div class="list" ref="listDom">
        <div class="total-list" ref="totalListDom">
          <div
            class="list-content"
            v-for="item in listData"
            :key="item.id"
            :style="item.style"
          >
            <header class="list-item-header">
              <span class="title">{{ item.name }}</span>
              <span class="date">{{ item.time }}</span>
            </header>
            <div class="list-item-content">{{ item.content }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="child-list-dom">
      <header class="tip">注意：本例适用于单元格任意高度的列表</header>
      <div class="list">
        <Child>
          <template v-slot:content></template>
        </Child>
        <!-- <div class="list-content" v-for="item in allListData" :key="item.id">
          <header class="list-item-header">
            <span class="title">{{ item.name }}</span>
            <span class="date">{{ item.time }}</span>
          </header>
          <div class="list-item-content">{{ item.content }}</div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import Child from "./slot/Child";
// import { debounce } from "@/utils/utils";
const fontSize = parseFloat(
  window.getComputedStyle(document.documentElement)["fontSize"]
);
export default {
  name: "VirtualList",
  components: {
    Child
  },
  data() {
    return {
      totalListLength: 0,
      singleItemHeight: 4 * fontSize, // 这里使用rem，需要转换为像素计算
      pageHeight: 15 * fontSize, // 当前容器的高度
      onePageListLength: 0, // 一页应该显示多少条数据
      startIndex: 0, // 获取渲染数据的起始下标
      endIndex: 0, // 获取渲染数据的终止下标
      tableData: {
        id: 0,
        name: "这里是标题",
        time: 1617937551894,
        content:
          "这里是很长很长的内容这里是很长很长的内容这里是很长很长的内容这里是很长很长的内容这里是很长很长的内容这里是很长很长的内容这里是很长很长的内容这里是很长很长的内容这里是很长很长的内容这里是很长很长的内容这里是很长很长的内容这里是很长很长的内容这里是很长很长的内容这里是很长很长的内容这里是很长很长的内容这里是很长很长的内容这里是很长很长的内容这里是很长很长的内容"
      },
      allListData: [],
      listData: []
    };
  },
  created() {
    console.time();
    // 通过当前父容器的高度和每一个子容器的高度相除，即可获得一页应该显示几条数据
    // 向上取整，因为界面上只要一个子容器冒了头，就默认其是可视化区域中的部分
    this.onePageListLength = Math.ceil(this.pageHeight / this.singleItemHeight);
    this.startIndex = 0;
    this.endIndex = this.startIndex + this.onePageListLength;
    this.allListData = Array.from({ length: 20000 }, (item, index) => {
      const { name, time, content } = this.tableData;
      return {
        id: index,
        name: name + index,
        time: time + index,
        content
      };
    });
    this.totalListLength = this.allListData.length;
    this.getListData();
  },
  mounted() {
    // const listDom = this.$refs.listDom;
    // this.$refs.totalListDom.style.height =
    //   this.totalListLength * (this.singleItemHeight / fontSize) + "rem";
    // listDom.addEventListener("scroll", e => {
    //   const currentDom = e.target;
    //   // 取出当前向上滚动的距离
    //   const { scrollTop } = currentDom;
    //   // 计算滚动之后的stratIndex，需要向下取整，因为界面上面只要能看到一点子容器，那就认为该子容器存在在视图中
    //   // 比如说向上滚动100px，每个子容器的高度为30px，所以当前第四个子容器的部分仍在可是区域内
    //   this.startIndex = Math.floor(scrollTop / this.singleItemHeight);
    //   this.endIndex = this.startIndex + this.onePageListLength;
    //   window.requestAnimationFrame(() => {
    //     this.getListData();
    //   });
    // });
    console.timeEnd();
  },
  methods: {
    getListData() {
      this.listData = this.allListData.filter((item, index) => {
        if (this.startIndex <= index && index <= this.endIndex) {
          item.style = {
            top: index * this.singleItemHeight + "px",
            position: "absolute"
          };
          return item;
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.list-dom {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;

  .child-list-dom {
    flex-grow: 1;
    border: 1px solid #e3e3e3;
    float: left;
    width: 50%;
    flex-direction: column;
    margin: -0.5px;
    display: flex;
    .tip {
      color: red;
      height: 2rem;
      width: 100%;
      line-height: 2rem;
      text-align: center;
    }
    .list {
      // flex-grow: 1;
      position: relative;
      padding: 0.5rem;
      height: 15rem;
      overflow-y: auto;
      .total-list {
        width: 100%;
        overflow-y: auto;
        .list-content {
          height: 4rem;
          width: calc(100% - 1rem);
          .list-item-header {
            height: 1.5rem;
            display: flex;
            justify-content: space-between;
            .title {
              font-size: 0.93rem;
              font-weight: bold;
            }
            .date {
              font-size: 0.83rem;
            }
          }
          .list-item-content {
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
  }
}
</style>
