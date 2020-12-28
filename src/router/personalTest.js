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
          component: () =>
            import(
              /* webpackChunkName: "CSS-1" */
              "@/views/Layout/PersonalTest/CSS/CSS-1.vue"
            )
        },
        {
          path: "css-2",
          name: "css-2",
          meta: {
            requireAuth: true // 判断是否需要登录
          },
          component: () =>
            import(
              /* webpackChunkName: "CSS-2" */
              "@/views/Layout/PersonalTest/CSS/CSS-2.vue"
            )
        },

        // --------------------------------------- vue --------------------------------------
        {
          path: "vue-1",
          name: "vue-1",
          meta: {
            requireAuth: true // 判断是否需要登录
          },
          component: () =>
            import(
              /* webpackChunkName: "Vue1" */
              "@/views/Layout/PersonalTest/Vue/VUE-1.vue"
            )
        }
      ]
    }
  ]
};
