import { delay } from "@pureadmin/utils";
import { ref, onMounted, reactive, h } from "vue";
import type { PaginationProps } from "@pureadmin/table";
import applyForm from "./components/applyForm.vue";
import approveDialog from "./components/approveDialog.vue";
import { addDialog } from "@/components/ReDialog";
import { deviceDetection } from "@pureadmin/utils";
import type { SearchForm } from "types/global";

export function useHooks() {
  const dataList = ref([]);
  const loading = ref(true);
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

  /** 分页配置 */
  const pagination = reactive<PaginationProps>({
    pageSize: 10,
    currentPage: 1,
    pageSizes: [10, 50, 100],
    total: 0,
    background: true
  });

  function onCurrentChange(page: number) {
    fetchList({
      page
    });
  }

  const handleSearch = (form: SearchForm.formData) => {
    console.log("search", form);
  };

  const fetchList = filters => {
    const params = {
      ...filters
    };
    console.log(params);

    // 发起请求
    loading.value = true;
    delay(300).then(() => {
      dataList.value = [
        {
          id: "1",
          batchNo: "123",
          cardDate: "2024-06-21",
          cardCount: 3000,
          activateRate: "10%",
          activateCount: 300
        },
        {
          id: "2",
          batchNo: "345",
          cardDate: "2024-06-21",
          cardCount: 2000,
          activateRate: "10%",
          activateCount: 200
        }
      ];
      pagination.total = dataList.value.length;
      loading.value = false;
    });
  };
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

  onMounted(() => {
    fetchList({
      // ...formFilter,
      page: 1
    });
  });

  return {
    loading,
    columns,
    dataList,
    pagination,
    handleSearch,
    fetchList,
    openDialog,
    openApproveDialog,
    onCurrentChange
  };
}
