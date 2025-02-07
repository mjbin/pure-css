export default {
  path: "/finance",
  redirect: "/finance/index",
  meta: {},
  children: [
    {
      path: "/finance/index",
      name: "Finance",
      component: () => import("@/views/finance/index.vue"),
      meta: {
        title: "加油",
        keepAlive: true
      },
      showParent: true
    }
  ]
};
