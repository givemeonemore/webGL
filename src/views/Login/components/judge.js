export default {
  methods: {
    highSwitch(val) {
      const comparaTiveTotles = new Map([
        [0, this.Method1],
        [1, this.Method2],
        [2, this.Method3],
        [3, this.Method4]
      ]);
      let getMap = comparaTiveTotles.get(val);
      // 如果查找不到就返回undefined
      if (!getMap) {
        this.$Message.error("未找到对应方法");
      } else {
        let result = getMap();
        return result;
      }
    },
    Method1() {
      this.$Message.error("用户名和密码输入错误!");
    },

    Method2() {
      this.$Message.error("用户名输入错误!");
    },

    Method3() {
      this.$Message.error("密码输入错误!");
    },

    Method4() {
      this.$Message.success("登录成功!");
      return true;
    }
  }
};
