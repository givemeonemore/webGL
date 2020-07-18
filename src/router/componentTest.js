export default {
  path: "/Layout",
  name: "Layout",
  meta: {
    requireAuth: true, // 判断是否需要登录
    sysName: "组件测试"
  },
  component: () =>
    import(
      /* webpackChunkName: "ComponentTest" */
      "@/views/Layout"
    ),
  redirect: {
    name: "ComponentTest"
  },
  children: [
    {
      path: "/ComponentTest",
      name: "ComponentTest",
      meta: {
        requireAuth: true, // 判断是否需要登录
        name: "ComponentTest",
        label: "自定义组件测试",
        icon: "ios-analytics"
      },
      component: () =>
        import(
          /* webpackChunkName: "ComponentTest" */
          "@/views/Layout/ComponentTest"
        ),
      children: [
        {
          path: "ScrollTab",
          name: "ScrollTab",
          meta: {
            requireAuth: true, // 判断是否需要登录
            name: "ScrollTab",
            label: "Tab标签"
          },
          component: () =>
            import(
              /* webpackChunkName: "ScrollTab" */
              "@/views/Layout/ComponentTest/ScrollTab"
            )
        }
      ]
    }
  ]
};
