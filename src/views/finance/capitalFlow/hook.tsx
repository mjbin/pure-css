import { delay } from "@pureadmin/utils";
import { ref, onMounted, reactive, h } from "vue";
import type { PaginationProps } from "@pureadmin/table";
import detailForm from "./components/form.vue";
import { addDialog } from "@/components/ReDialog";
import { deviceDetection } from "@pureadmin/utils";
import type { SearchForm } from "types/global";

export function useHooks() {
  const dataList = ref([]);
  const loading = ref(true);
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
    onCurrentChange
  };
}
