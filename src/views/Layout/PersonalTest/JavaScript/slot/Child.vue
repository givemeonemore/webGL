<template>
  <div class="child">
    <slot name="content">
      <div class="img-container">
        <img
          class="img"
          ref="imgContainer"
          v-for="item in imgLists"
          :key="item.name"
          :data-src="item.src"
        />
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        title: "这里是插槽",
        name: "这里是真正的插槽"
      },
      imgLists: [
        {
          name: "item1",
          src:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201804%2F04%2F20180404130201_mk2zd.thumb.700_0.png&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621133961&t=a9dbd6ff6f82bd6f6583cd75bf0a280e"
        },
        {
          name: "item2",
          src:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201804%2F04%2F20180404130201_mk2zd.thumb.700_0.png&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621133961&t=a9dbd6ff6f82bd6f6583cd75bf0a280e"
        },
        {
          name: "item3",
          src:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201804%2F04%2F20180404130201_mk2zd.thumb.700_0.png&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621133961&t=a9dbd6ff6f82bd6f6583cd75bf0a280e"
        },
        {
          name: "item4",
          src:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201804%2F04%2F20180404130201_mk2zd.thumb.700_0.png&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621133961&t=a9dbd6ff6f82bd6f6583cd75bf0a280e"
        },
        {
          name: "item5",
          src:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201804%2F04%2F20180404130201_mk2zd.thumb.700_0.png&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621133961&t=a9dbd6ff6f82bd6f6583cd75bf0a280e"
        },
        {
          name: "item6",
          src:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201804%2F04%2F20180404130201_mk2zd.thumb.700_0.png&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621133961&t=a9dbd6ff6f82bd6f6583cd75bf0a280e"
        },
        {
          name: "item7",
          src:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201804%2F04%2F20180404130201_mk2zd.thumb.700_0.png&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621133961&t=a9dbd6ff6f82bd6f6583cd75bf0a280e"
        },
        {
          name: "item8",
          src:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201804%2F04%2F20180404130201_mk2zd.thumb.700_0.png&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621133961&t=a9dbd6ff6f82bd6f6583cd75bf0a280e"
        },
        {
          name: "item9",
          src:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201804%2F04%2F20180404130201_mk2zd.thumb.700_0.png&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621133961&t=a9dbd6ff6f82bd6f6583cd75bf0a280e"
        },
        {
          name: "item10",
          src:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201804%2F04%2F20180404130201_mk2zd.thumb.700_0.png&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621133961&t=a9dbd6ff6f82bd6f6583cd75bf0a280e"
        },
        {
          name: "item11",
          src:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201804%2F04%2F20180404130201_mk2zd.thumb.700_0.png&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621133961&t=a9dbd6ff6f82bd6f6583cd75bf0a280e"
        },
        {
          name: "item12",
          src:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201804%2F04%2F20180404130201_mk2zd.thumb.700_0.png&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621133961&t=a9dbd6ff6f82bd6f6583cd75bf0a280e"
        }
      ]
    };
  },
  mounted() {
    let io = new IntersectionObserver(entries => this.showImg(entries));
    if (Array.isArray(this.$refs.imgContainer)) {
      for (let key in this.$refs.imgContainer) {
        io.observe(this.$refs.imgContainer[key]);
      }
    }
  },
  methods: {
    showImg(entries) {
      entries.forEach(item => {
        if (item.isIntersecting) {
          item.target.src = item.target.getAttribute("data-src");
        } else {
          item.target.src = "";
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.child {
  width: 100%;
  height: 100%;
  position: relative;
  .img-container {
    width: 100%;
    height: 100%;
    position: relative;
    display: inline-block;
    overflow-y: auto;
    .img {
      width: 200px;
      height: 100px;
    }
  }
}
</style>
