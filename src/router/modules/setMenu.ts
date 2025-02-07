export default {
  path: "/setMenu",
  redirect: "/setMenu/index",
  meta: {
    title: "套餐管理",
    icon: "ep:document",
    rank: 1
  },
  children: [
    {
      path: "/setMenu/index",
      name: "SetMenu",
      component: () => import("@/views/setMenu/index.vue"),
      meta: {
        title: "套餐管理"
      }
    }
  ]
};
