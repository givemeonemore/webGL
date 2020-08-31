<script>
// 获取所有icon的名称
const icons = require
  .context(".", false, /\.svg$/)
  .keys()
  .map(name => name.replace(/^\.\/([\w-]+)\.svg/, "$1"));
export default {
  name: "icon-view",
  render() {
    return (
      <div class="icon-view">
        <p>点一点就能取代码</p>
        {icons.map(iconName => (
          <div class="icon" on-click={() => this.handleIconClick(iconName)}>
            <ers-icon name={iconName} />
            <span class="icon-name">{iconName}</span>
          </div>
        ))}
      </div>
    );
  },
  methods: {
    async handleIconClick(iconName) {
      await navigator.clipboard.writeText(`<ErsIcon name='${iconName}' />`);
      this.$Message.success(`${iconName}图标代码已复制到剪切板`);
    }
  }
};
</script>

<style lang="scss" scoped>
.icon-view {
  width: 100%;
  height: 100%;
  font-size: 32px;
  p {
    text-align: center;
    margin: 10px;
  }
  .icon {
    display: inline-block;
    text-align: center;
    margin: 9px 8px;
    width: 100px;
    height: 80px;
    border-radius: 8%;
    cursor: pointer;
    i {
      transition: transform 0.2s;
      &:hover {
        transform: scale(1.5);
      }
    }
    .icon-name {
      font-size: 12px;
      margin-top: 5px;
      display: block;
    }
  }
}
</style>
