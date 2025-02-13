import { useTables } from "@/hooks/useTables";

export function useHooks() {
  const columns: TableColumnList = [
    {
      type: "selection",
      align: "left"
    },
    {
      label: "客户名",
      prop: "batchNo"
    },
    {
      label: "所属公众号",
      prop: "cardDate"
    },
    {
      label: "订单号",
      prop: "cardCount"
    },
    {
      label: "iccid",
      prop: "activateRate"
    },
    {
      label: "号码",
      prop: "activateCount"
    },
    {
      label: "批次",
      prop: "activateCount"
    },
    {
      label: "套餐",
      prop: "activateCount"
    },
    {
      label: "支付状态",
      prop: "activateCount"
    },
    {
      label: "售价",
      prop: "activateCount"
    },
    {
      label: "返润",
      prop: "activateCount"
    },
    {
      label: "首充类型",
      prop: "activateCount"
    },
    {
      label: "套餐类型",
      prop: "activateCount"
    },
    {
      label: "激活时间",
      prop: "activateCount"
    },
    {
      label: "充值时间",
      prop: "activateCount"
    },
    {
      label: "订单完成时间",
      prop: "activateCount"
    },
    {
      label: "退款时间",
      prop: "activateCount"
    },
    {
      label: "编辑时间",
      prop: "activateCount"
    },
    {
      label: "订单创建时间",
      prop: "activateCount"
    }
  ];

  const {
    dataList,
    loading,
    pagination,
    handleSearch,
    fetchList,
    onCurrentChange,
    onSizeChange
  } = useTables();

  return {
    loading,
    columns,
    dataList,
    pagination,
    handleSearch,
    fetchList,
    onSizeChange,
    onCurrentChange
  };
}
