import { delay } from "@pureadmin/utils";
import { ref, reactive } from "vue";
import type { PaginationProps } from "@pureadmin/table";
import type { SearchForm } from "types/global";

export function useTables() {
  const dataList = ref([]);
  const loading = ref(true);
  const formFilter = ref({});
  // const columns: TableColumnList = [];

  /** 分页配置 */
  const pagination = reactive<PaginationProps>({
    pageSize: 10,
    currentPage: 1,
    pageSizes: [10, 50, 100],
    total: 0,
    background: true
  });

  function handleSearch(form: SearchForm.formData) {
    console.log("search====>", form);
    fetchList({
      ...formFilter,
      page: 1
    });
  }

  function onCurrentChange(page: number) {
    console.log("onCurrentChange", page);
    fetchList({
      ...formFilter,
      page
    });
  }

  function onSizeChange(val: number) {
    console.log("onSizeChange", val);
    fetchList({
      ...formFilter,
      page: 1
    });
  }

  const fetchList = filters => {
    const params = {
      ...filters
    };
    console.log(params);
    // 模拟发起请求，后续在这里真正调用接口
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

  // onMounted(() => {
  //   console.log(666)
  //   fetchList({
  //     ...formFilter,
  //     page: 1
  //   });
  // });

  return {
    loading,
    // columns,
    dataList,
    pagination,
    onCurrentChange,
    onSizeChange,
    handleSearch,
    fetchList
  };
}
