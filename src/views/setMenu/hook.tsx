import editForm from "./components/form.vue";
import { message } from "@/utils/message";
import { addDialog } from "@/components/ReDialog";
import { deviceDetection } from "@pureadmin/utils";
import { reactive, ref, h } from "vue";
import { useTables } from "@/hooks/useTables";

export function useHooks() {
  const form = reactive({
    name: "",
    code: "",
    status: ""
  });
  const formRef = ref();
  const {
    dataList,
    loading,
    pagination,
    handleSearch,
    onCurrentChange,
    onSizeChange
  } = useTables();
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
  async function onSearch() {
    // loading.value = true;
    // const { data } = await getRoleList(toRaw(form));
    // dataList.value = data.list;
    // pagination.total = data.total;
    // pagination.pageSize = data.pageSize;
    // pagination.currentPage = data.currentPage;
    // setTimeout(() => {
    //   loading.value = false;
    // }, 500);
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  function openDialog(title = "自定义", row?: any) {
    addDialog({
      title: `${title}套餐`,
      props: {
        formInline: {
          id: row?.id ?? "",
          name: row?.name ?? "",
          code: row?.code ?? "",
          remark: row?.remark ?? ""
        }
      },
      width: "40%",
      draggable: true,
      fullscreen: deviceDetection(),
      fullscreenIcon: true,
      hideFooter: title !== "自定义",
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef, formInline: null }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as any;
        function chores() {
          console.log("curData", curData);
          message(`${title}了名称为${curData.name}的这条数据`, {
            type: "success"
          });
          done(); // 关闭弹框
          onSearch(); // 刷新表格数据
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

  return {
    form,
    loading,
    columns,
    dataList,
    pagination,
    handleSearch,
    onCurrentChange,
    onSizeChange,
    onSearch,
    resetForm,
    openDialog
  };
}
