export default {
  path: "/finance",
  redirect: "/finance/withdrawal",
  meta: {
    title: "财务管理",
    icon: "ep:menu"
  },
  children: [
    {
      path: "/finance/withdrawal",
      name: "Withdrawal",
      component: () => import("@/views/finance/withdrawal/index.vue"),
      meta: {
        title: "提现管理"
      }
    },
    {
      path: "/finance/capitalFlow",
      name: "CapitalFlow",
      component: () => import("@/views/finance/capitalFlow/index.vue"),
      meta: {
        title: "资金流水"
      }
    },
    {
      path: "/finance/orderInfo",
      name: "CapitalFlow",
      component: () => import("@/views/finance/orderInfo/index.vue"),
      meta: {
        title: "订单明细"
      }
    }
  ]
};
