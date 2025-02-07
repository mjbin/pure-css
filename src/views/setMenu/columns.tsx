import { delay } from "@pureadmin/utils";
import { ref, onMounted, reactive, watch } from "vue";
import type { PaginationProps } from "@pureadmin/table";

export function useColumns(formFilter) {
  const dataList = ref([]);
  const loading = ref(true);
  const columns: TableColumnList = [
    {
      type: "selection",
      align: "left"
    },
    {
      label: "套餐编码",
      prop: "batchNo",
      sortable: true
    },
    {
      label: "名称",
      prop: "cardDate",
      sortable: true
    },
    {
      label: "所属用户",
      prop: "cardCount",
      sortable: true
    },
    {
      label: "副标题",
      prop: "activateRate",
      sortable: true
    },
    {
      label: "类型",
      prop: "activateCount",
      sortable: true
    },
    {
      label: "类型",
      prop: "activateCount",
      sortable: true
    },
    {
      label: "是否热门",
      prop: "activateCount",
      sortable: true
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
