import { ref, h } from "vue";
import applyForm from "./components/applyForm.vue";
import approveDialog from "./components/approveDialog.vue";
import { addDialog } from "@/components/ReDialog";
import { deviceDetection } from "@pureadmin/utils";
import { useTables } from "@/hooks/useTables";

export function useHooks() {
  const columns: TableColumnList = [
    {
      type: "selection",
      align: "left"
    },
    {
      label: "提现单号",
      prop: "batchNo"
    },
    {
      label: "提现状态",
      prop: "cardDate"
    },
    {
      label: "提现金额",
      prop: "cardCount"
    },
    {
      label: "提现前余额",
      prop: "activateRate"
    },
    {
      label: "提现后余额",
      prop: "activateCount"
    },
    {
      label: "提现手续费",
      prop: "activateCount"
    },
    {
      label: "提现类型",
      prop: "activateCount"
    },
    {
      label: "申请时间",
      prop: "activateCount"
    },
    {
      label: "审批时间",
      prop: "activateCount"
    },
    {
      label: "创建人",
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

  const formRef = ref();

  function openDialog(title = "提现申请", row?: any) {
    addDialog({
      title,
      props: {
        formInline: {
          id: row?.id ?? ""
        }
      },
      width: "40%",
      draggable: true,
      fullscreen: deviceDetection(),
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(applyForm, { ref: formRef, formInline: null }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as any;
        function chores() {
          console.log("curData", curData);
          done(); // 关闭弹框
          // onSearch(); // 刷新表格数据
        }
        FormRef.validate(valid => {
          if (valid) {
            console.log("curData", curData);
            // 表单规则校验通过
            if (title === "新增") {
              // 实际开发先调用新增接口，再进行下面操作
              chores();
            } else {
              // 实际开发先调用修改接口，再进行下面操作
              chores();
            }
          }
        });
      }
    });
  }

  function openApproveDialog(row?: any) {
    addDialog({
      title: "正在审批",
      props: {
        formInline: {
          id: row?.id ?? ""
        }
      },
      width: "50%",
      draggable: true,
      fullscreen: deviceDetection(),
      fullscreenIcon: true,
      hideFooter: true,
      closeOnClickModal: false,
      contentRenderer: () => h(approveDialog)
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
    openApproveDialog,
    onSizeChange,
    onCurrentChange
  };
}
