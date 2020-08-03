export default {
  path: "/Layout",
  name: "Layout",
  meta: {
    requireAuth: true, // 判断是否需要登录
    sysName: "个人测试"
  },
  component: () =>
    import(
      /* webpackChunkName: "ComponentTest" */
      "@/views/Layout"
    ),
  redirect: {
    name: "personalTest"
  },
  children: [
    {
      path: "/personalTest",
      name: "personalTest",
      meta: {
        requireAuth: true, // 判断是否需要登录
        sysName: "前端学习"
      },
      component: () =>
        import(
          /* webpackChunkName: "personalTest" */
          "@/views/Layout/PersonalTest"
        ),
      redirect: {
        name: "css-1"
      },
      children: [
        {
          path: "css-1",
          name: "css-1",
          meta: {
            requireAuth: true // 判断是否需要登录
          },
          // component: () =>
          //   import(/* webpackChunkName: "1-2" */ "@/views/WebGL/Body/1/1-2.vue")
          component: () =>
            import(
              /* webpackChunkName: "MapTest" */
              "@/views/Layout/PersonalTest/CSS/CSS-1.vue"
            )
        }
      ]
    }
  ]
};
