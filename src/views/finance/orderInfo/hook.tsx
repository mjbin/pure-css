import { delay } from "@pureadmin/utils";
import { ref, onMounted, reactive } from "vue";
import type { PaginationProps } from "@pureadmin/table";
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
    onCurrentChange
  };
}
