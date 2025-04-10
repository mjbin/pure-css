<script setup lang="ts">
import { ref } from "vue";
import ReSearchForm from "@/components/ReSearchForm";
import { SearchForm } from "types/global";
import { Download } from "@element-plus/icons-vue";
import { useHooks } from "./hook";

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
    // 展示示例，后续删除
    // {
    //   label: "日期",
    //   prop: "date",
    //   lg: 6,
    //   xl: 4,
    //   placeholder: "请选择日期",
    //   autoVisible: true,
    //   clearable: true,
    //   itemType: "date",
    //   defaultValue: ""
    // },
    // {
    //   label: "日期范围",
    //   prop: "dateRange",
    //   lg: 6,
    //   xl: 5,
    //   propLabel: ["startDate", "endDate"],
    //   placeholder: ["开始日期", "结束日期"],
    //   autoVisible: true,
    //   clearable: true,
    //   itemType: "daterange",
    //   defaultValue: []
    // },
    // {
    //   label: "时间范围",
    //   prop: "datetimeRange",
    //   lg: 8,
    //   xl: 7,
    //   propLabel: ["startTime", "endTime"],
    //   placeholder: ["开始时间", "结束时间"],
    //   autoVisible: true,
    //   clearable: true,
    //   itemType: "datetimerange",
    //   defaultValue: []
    // }
  ]
});

const {
  loading,
  columns,
  dataList,
  pagination,
  handleSearch,
  onCurrentChange,
  onSizeChange,
  openDialog
} = useHooks();
const multipleSelection = ref([]);
const handleSelectionChange = val => {
  multipleSelection.value = val;
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
        <el-button type="primary" round :icon="Download">导出</el-button>
        <el-button type="primary" round @click="openDialog()">
          自定义套餐信息
        </el-button>
      </div>
      <pure-table
        row-key="id"
        alignWhole="center"
        border
        adaptive
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
        @page-size-change="onSizeChange"
        @selection-change="handleSelectionChange"
      >
        <template #operation="scope">
          <el-button
            type="primary"
            size="small"
            plain
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
