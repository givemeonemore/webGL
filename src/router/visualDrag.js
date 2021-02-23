export default {
  path: "/Layout",
  name: "Layout",
  meta: {
    requireAuth: true, // 判断是否需要登录
    sysName: "表单设计"
  },
  component: () =>
    import(
      /* webpackChunkName: "ComponentTest" */
      "@/views/Layout"
    ),
  redirect: {
    name: "visualDrag"
  },

  children: [
    {
      path: "/visualDrag",
      name: "visualDrag",
      meta: {
        requireAuth: true, // 判断是否需要登录
        sysName: "在线表单设计器"
      },
      component: () =>
        import(
          /* webpackChunkName: "VisualDrag" */
          "@/views/Layout/VisualDrag"
        )
    }
  ]
};
