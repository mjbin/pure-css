import { delay } from "@pureadmin/utils";
import { ref, onMounted, reactive, watch } from "vue";
import type { PaginationProps } from "@pureadmin/table";

export function useColumns(formFilter) {
  const dataList = ref([]);
  const loading = ref(true);
  const columns: TableColumnList = [
    {
      label: "批次号",
      prop: "batchNo"
    },
    {
      label: "出卡日期",
      prop: "cardDate"
    },
    {
      label: "出卡数量",
      prop: "cardCount"
    },
    {
      label: "激活率",
      prop: "activateRate"
    },
    {
      label: "激活明细",
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
    pageSize: 1,
    currentPage: 1,
    layout: "prev, pager, next",
    total: 2
  });

  function onCurrentChange(page: number) {
    fetchList({
      ...formFilter,
      page
    });
  }

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
          batchNo: "123" + params.batchNo,
          cardDate: "2024-06-21",
          cardCount: 3000,
          activateRate: "10%",
          activateCount: 300
        },
        {
          batchNo: "345" + params.batchNo,
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

  watch(
    formFilter,
    v => {
      fetchList({
        ...v,
        page: 1
      });
    },
    {
      deep: true,
      immediate: true
    }
  );

  onMounted(() => {
    fetchList({
      ...formFilter,
      page: 1
    });
  });

  return {
    loading,
    columns,
    dataList,
    pagination,
    onCurrentChange
  };
}
