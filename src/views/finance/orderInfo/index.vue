<script setup lang="ts">
import { ref } from "vue";
import statisticsCard from "./components/statisticsCard.vue";
import ReSearchForm from "@/components/ReSearchForm";
import { useHooks } from "./hook";
import { SearchForm } from "types/global";
import { Download } from "@element-plus/icons-vue";

defineOptions({
  name: "OrderInfo"
});

// 查询配置项
const formOpt = ref<SearchForm.FormOpt>({
  inline: true,
  conditions: [
    {
      label: "充值时间",
      prop: "datetimeRange1",
      lg: 8,
      xl: 7,
      propLabel: ["startTime1", "endTime1"],
      placeholder: ["开始时间", "结束时间"],
      autoVisible: true,
      clearable: true,
      itemType: "datetimerange",
      defaultValue: []
    },
    {
      label: "退款时间",
      prop: "datetimeRange2",
      lg: 8,
      xl: 7,
      propLabel: ["startTime2", "endTime2"],
      placeholder: ["开始时间", "结束时间"],
      autoVisible: true,
      clearable: true,
      itemType: "datetimerange",
      defaultValue: []
    },
    {
      label: "订单完成",
      prop: "datetimeRange3",
      lg: 8,
      xl: 7,
      propLabel: ["startTime3", "endTime3"],
      placeholder: ["开始时间", "结束时间"],
      autoVisible: true,
      clearable: true,
      itemType: "datetimerange",
      defaultValue: []
    },
    {
      label: "客户名",
      prop: "user",
      lg: 6,
      xl: 4,
      defaultValue: "",
      autoVisible: true
    },
    {
      label: "订单号",
      prop: "orderNo",
      lg: 6,
      xl: 4,
      defaultValue: "",
      autoVisible: true
    },
    {
      label: "iccid",
      prop: "iccid",
      lg: 6,
      xl: 4,
      defaultValue: "",
      autoVisible: true
    },
    {
      label: "号码",
      prop: "phone",
      lg: 6,
      xl: 4,
      defaultValue: "",
      autoVisible: true
    },
    {
      label: "批次",
      prop: "pc",
      lg: 6,
      xl: 4,
      defaultValue: "",
      autoVisible: true
    },
    {
      label: "套餐",
      prop: "tc",
      lg: 6,
      xl: 4,
      defaultValue: "",
      autoVisible: true
    },
    {
      label: "支付状态",
      prop: "payType",
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
      label: "首充类型",
      prop: "firstPayType",
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
      label: "套餐类型:",
      prop: "tcType",
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
    }
  ]
});

const {
  loading,
  columns,
  dataList,
  pagination,
  handleSearch,
  onCurrentChange,
  onSizeChange
} = useHooks();
</script>

<template>
  <div>
    <statisticsCard />
    <ReSearchForm :form-opt="formOpt" @change="handleSearch" />
    <el-card shadow="never" class="mt-4">
      <div class="mb-4">
        <el-button type="primary" :icon="Download">导出</el-button>
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
      >
        <template #empty>
          <el-empty description="暂无数据" :image-size="60" />
        </template>
      </pure-table>
    </el-card>
  </div>
</template>
