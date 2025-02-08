export default {
  path: "/system",
  redirect: "/system/userInfo",
  meta: {
    title: "平台系统",
    showLink: false,
    rank: 103
  },
  children: [
    {
      path: "/system/userInfo",
      name: "UserInfo",
      component: () => import("@/views/system/userInfo/index.vue"),
      meta: {
        title: "基本资料"
      }
    },
    {
      path: "/system/updatePwd",
      name: "UpdatePwd",
      component: () => import("@/views/system/updatePwd/index.vue"),
      meta: {
        title: "修改密码"
      }
    }
  ]
};
