import { h } from "vue";
import detailForm from "./components/form.vue";
import { addDialog } from "@/components/ReDialog";
import { deviceDetection } from "@pureadmin/utils";
import { useTables } from "@/hooks/useTables";

export function useHooks() {
  const columns: TableColumnList = [
    {
      label: "变动日期",
      prop: "batchNo"
    },
    {
      label: "主账号",
      prop: "cardDate"
    },
    {
      label: "充值数量",
      prop: "cardCount"
    },
    {
      label: "充值金额",
      prop: "activateRate"
    },
    {
      label: "充值返润",
      prop: "activateCount"
    },
    {
      label: "收款手续费",
      prop: "activateCount"
    },
    {
      label: "退款数量",
      prop: "activateCount"
    },
    {
      label: "退款金额",
      prop: "activateCount"
    },
    {
      label: "退款手续费",
      prop: "activateCount"
    },
    {
      label: "退款返润",
      prop: "activateCount"
    },
    {
      label: "消费金额",
      prop: "activateCount"
    },
    {
      label: "提现金额",
      prop: "activateCount"
    },
    {
      label: "充值金额",
      prop: "activateCount"
    },
    {
      label: "剩余可提现金额",
      prop: "activateCount"
    },
    {
      label: "操作",
      fixed: "right",
      slot: "operation"
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

  function openDialog(_title = "资金明细", row?: any) {
    addDialog({
      title: "资金明细",
      props: {
        formInline: {
          id: row?.id ?? ""
        }
      },
      width: "60%",
      draggable: true,
      fullscreen: deviceDetection(),
      fullscreenIcon: true,
      hideFooter: true,
      closeOnClickModal: false,
      contentRenderer: () => h(detailForm)
    });
  }

  return {
    loading,
    columns,
    dataList,
    pagination,
    handleSearch,
    fetchList,
    openDialog,
    onSizeChange,
    onCurrentChange
  };
}
