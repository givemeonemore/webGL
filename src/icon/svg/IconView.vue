<script>
// 获取所有icon的名称
const icons = require
  .context("/", false, /\.svg$/)
  .keys()
  .map(name => name.replace(/^\.\/([\w-]+)\.svg/, "$1"));
export default {
  name: "svg-view",
  /* eslint-disable-next-line */
  render(h) {
    return (
      <div class="svg-view">
        <p>点一点就能取代码</p>
        {icons.map(iconName => (
          <div class="icon" on-click={() => this.handleIconClick(iconName)}>
            <app-icon icon-class={iconName} />
            <span class="icon-name">{iconName}</span>
          </div>
        ))}
      </div>
    );
  },
  methods: {
    async handleIconClick(iconName) {
      await navigator.clipboard.writeText(
        `<AppIcon icon-class='${iconName}' />`
      );
      this.$Message.success(`${iconName}图标已复制到剪切板`);
    }
  }
};
</script>

<style lang="scss" scoped>
.svg-view {
  width: 100%;
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
    line-height: 1.5;
    cursor: pointer;
    svg {
      transition: transform 0.2s;
    }
    .icon-name {
      font-size: 12px;
      margin-top: 5px;
      display: block;
    }
    &:hover {
      svg {
        transform: scale(1.5);
      }
    }
  }
}
</style>
