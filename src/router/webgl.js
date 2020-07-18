export default {
  path: "/Layout",
  name: "Layout",
  meta: {
    requireAuth: true, // 判断是否需要登录
    sysName: "WG学习"
  },
  component: () =>
    import(
      /* webpackChunkName: "ComponentTest" */
      "@/views/Layout"
    ),
  redirect: {
    name: "WebGL"
  },
  children: [
    {
      path: "/webGL",
      name: "WebGL",
      meta: {
        requireAuth: true, // 判断是否需要登录
        sysName: "WG学习"
      },
      component: () =>
        import(
          /* webpackChunkName: "webGL" */
          "@/views/Layout/WebGL/WebGL.vue"
        ),
      redirect: {
        name: "1-1"
      },
      children: [
        {
          path: "1-1",
          name: "1-1",
          meta: {
            requireAuth: true // 判断是否需要登录
          },
          component: () =>
            import(
              /* webpackChunkName: "1-1" */
              "@/views/Layout/WebGL/Body/1/1-1.vue"
            )
        },
        {
          path: "1-2",
          name: "1-2",
          meta: {
            requireAuth: true // 判断是否需要登录
          },
          // component: () =>
          //   import(/* webpackChunkName: "1-2" */ "@/views/WebGL/Body/1/1-2.vue")
          component: () =>
            import(
              /* webpackChunkName: "MapTest" */
              "@/views/Layout/WebGL/Body/1/MapTest.vue"
            )
        },
        {
          path: "1-3",
          name: "1-3",
          meta: {
            requireAuth: true // 判断是否需要登录
          },
          component: () =>
            import(
              /* webpackChunkName: "1-3" */
              "@/views/Layout/WebGL/Body/1/1-3.vue"
            )
        },
        {
          path: "1-4",
          name: "1-4",
          meta: {
            requireAuth: true // 判断是否需要登录
          },
          component: () =>
            import(
              /* webpackChunkName: "1-3" */
              "@/views/Layout/WebGL/Body/1/CanvasTexture.vue"
            )
        }
      ]
    }
  ]
};
