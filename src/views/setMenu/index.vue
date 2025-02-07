<script setup lang="ts">
import { ref } from "vue";
import ReSearchForm from "@/components/ReSearchForm";
import { useColumns } from "./columns";
import { SearchForm } from "types/global";
import { Download } from "@element-plus/icons-vue";
import { useSetMenu } from "./hook";

defineOptions({
  name: "SetMenu"
});

// 查询配置项
const formOpt = ref<SearchForm.FormOpt>({
  inline: true,
  conditions: [
    {
      label: "套餐编码",
      prop: "code",
      lg: 6,
      xl: 4,
      defaultValue: "",
      autoVisible: true
    },
    {
      label: "名称",
      prop: "name",
      lg: 6,
      xl: 4,
      defaultValue: "",
      autoVisible: true
    },
    {
      label: "副标题",
      prop: "subTitle",
      lg: 6,
      xl: 4,
      defaultValue: "",
      autoVisible: true
    },
    {
      label: "类型",
      prop: "type",
      lg: 6,
      xl: 4,
      autoVisible: true,
      itemType: "select",
      multiple: false,
      options: [
        {
          id: "option1",
          name: "选项1"
        },
        {
          id: "option2",
          name: "选项2"
        }
      ],
      valueKey: "id",
      labelKey: "name",
      clearable: true,
      defaultValue: ""
    },
    {
      label: "G类型",
      prop: "gType",
      lg: 6,
      xl: 4,
      autoVisible: true,
      itemType: "select",
      multiple: false,
      options: [
        {
          id: "option1",
          name: "选项1"
        },
        {
          id: "option2",
          name: "选项2"
        }
      ],
      valueKey: "id",
      labelKey: "name",
      clearable: true,
      defaultValue: ""
    },
    {
      label: "是否热门",
      prop: "isHot",
      lg: 6,
      xl: 4,
      autoVisible: true,
      itemType: "select",
      multiple: false,
      options: [
        {
          id: "1",
          name: "是"
        },
        {
          id: "0",
          name: "否"
        }
      ],
      valueKey: "id",
      labelKey: "name",
      clearable: true,
      defaultValue: ""
    },
    {
      label: "二级类型",
      prop: "secondType",
      lg: 6,
      xl: 4,
      autoVisible: true,
      itemType: "select",
      multiple: false,
      options: [
        {
          id: "option1",
          name: "选项1"
        },
        {
          id: "option2",
          name: "选项2"
        }
      ],
      valueKey: "id",
      labelKey: "name",
      clearable: true,
      defaultValue: ""
    },
    {
      label: "套餐价格",
      prop: "price",
      operatorProp: "price_operator",
      itemType: "compareInput",
      lg: 8,
      xl: 6,
      defaultValue: [],
      placeholder: "请输入",
      autoVisible: true
    },
    {
      label: "套餐原价",
      prop: "oldPrice",
      operatorProp: "oldPrice_operator",
      itemType: "compareInput",
      lg: 8,
      xl: 6,
      defaultValue: [],
      placeholder: "请输入",
      autoVisible: true
    },
    {
      label: "有效期(月)",
      prop: "remainMonth",
      operatorProp: "remainMonth_operator",
      itemType: "compareInput",
      lg: 6,
      xl: 6,
      defaultValue: [],
      placeholder: "请输入",
      autoVisible: true
    },
    {
      label: "语音描述",
      prop: "voiceDesc",
      lg: 6,
      xl: 4,
      defaultValue: "",
      autoVisible: true
    },
    {
      label: "流量描述",
      prop: "flowDesc",
      lg: 6,
      xl: 4,
      defaultValue: "",
      autoVisible: true
    },
    {
      label: "规则",
      prop: "rule",
      lg: 6,
      xl: 4,
      defaultValue: "",
      autoVisible: true
    }
  ]
});

const { loading, columns, dataList, pagination, onCurrentChange } = useColumns(
  []
);

const multipleSelection = ref([]);
const handleSelectionChange = val => {
  multipleSelection.value = val;
};

const handleSearch = (form: SearchForm.formData) => {
  console.log("search", form);
};

const { openDialog } = useSetMenu();

const openAddDialog = () => {
  openDialog();
};

const viewDetail = item => {
  console.log(item);
  openDialog("查看", {
    id: "1",
    name: "1",
    code: "2",
    status: "3"
  });
};
</script>

<template>
  <div>
    <ReSearchForm :form-opt="formOpt" @change="handleSearch" />
    <el-card shadow="never" class="mt-4">
      <div class="mb-4">
        <el-button type="primary" :icon="Download">导出</el-button>
        <el-button type="primary" @click="openAddDialog">
          自定义套餐信息
        </el-button>
      </div>
      <pure-table
        row-key="id"
        alignWhole="center"
        border
        showOverflowTooltip
        :loading="loading"
        :loading-config="{ background: 'transparent' }"
        :data="
          dataList.slice(
            (pagination.currentPage - 1) * pagination.pageSize,
            pagination.currentPage * pagination.pageSize
          )
        "
        :columns="columns"
        :pagination="pagination"
        @page-current-change="onCurrentChange"
        @selection-change="handleSelectionChange"
      >
        <template #operation="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click.prevent="viewDetail(scope.row)"
          >
            查看
          </el-button>
        </template>
        <template #empty>
          <el-empty description="暂无数据" :image-size="60" />
        </template>
      </pure-table>
    </el-card>
  </div>
</template>
