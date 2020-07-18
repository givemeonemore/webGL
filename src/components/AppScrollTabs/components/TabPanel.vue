<template>
  <div>
    <Tabs type="card" closable>
      <TabPane v-for="tab in tabs" :key="tab.id" :label="'标签' + tab.label">
        <Button :type="tab.type">{{ tab.info }}</Button>
      </TabPane>
      <Button @click="handleTabsAdd" size="small" slot="extra">增加</Button>
    </Tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        {
          id: 1,
          type: "primary",
          info: "普通",
          label: "测试tab的最大宽度的"
        },
        {
          id: 2,
          type: "dashed",
          info: "虚线",
          label: "好巧，我也是测试tab的最大宽度的"
        },
        {
          id: 3,
          type: "success",
          info: "成功",
          label: "大家好啊，没想到我也是测试tab的最大宽度的吧"
        },
        {
          id: 4,
          type: "success",
          info: "成功",
          label: "大家好啊，没想到我也是测试tab的最大宽度的吧"
        },
        {
          id: 5,
          type: "success",
          info: "成功",
          label: "大家好啊，没想到我也是测试tab的最大宽度的吧"
        },
        {
          id: 6,
          type: "success",
          info: "成功",
          label: "大家好啊，没想到我也是测试tab的最大宽度的吧"
        }
      ]
    };
  }
};
</script>
