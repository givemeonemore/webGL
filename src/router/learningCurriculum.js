export default {
  path: "/Layout",
  name: "Layout",
  meta: {
    requireAuth: true, // 判断是否需要登录
    sysName: "在线文档"
  },
  component: () =>
    import(
      /* webpackChunkName: "ComponentTest" */
      "@/views/Layout"
    ),
  redirect: {
    name: "learningCurriculum"
  },
  children: [
    {
      path: "/learningCurriculum",
      name: "learningCurriculum",
      meta: {
        requireAuth: true, // 判断是否需要登录
        sysName: "在线文档"
      },
      component: () =>
        import(
          /* webpackChunkName: "LearningCurriculum" */
          "@/views/Layout/LearningCurriculum"
        )
    }
  ]
};
