<script setup lang="ts">
import { ref } from "vue";
import ReSearchForm from "@/components/ReSearchForm";
import { useHooks } from "./hook";
import { SearchForm } from "types/global";
import { Download } from "@element-plus/icons-vue";
import dayjs from "dayjs";

defineOptions({
  name: "CapitalFlow"
});

// 查询配置项
const formOpt = ref<SearchForm.FormOpt>({
  inline: true,
  conditions: [
    {
      label: "查询日期",
      prop: "dateRange",
      lg: 6,
      xl: 5,
      propLabel: ["startDate", "endDate"],
      placeholder: ["开始日期", "结束日期"],
      autoVisible: true,
      clearable: true,
      itemType: "daterange",
      defaultValue: [
        dayjs().startOf("month").format("YYYY-MM-DD"),
        dayjs().format("YYYY-MM-DD")
      ]
    },
    {
      label: "客户名",
      prop: "user",
      lg: 6,
      xl: 4,
      defaultValue: "ccc",
      disabled: true,
      autoVisible: true
    }
  ]
});

const {
  loading,
  columns,
  dataList,
  pagination,
  handleSearch,
  openDialog,
  onSizeChange,
  onCurrentChange
} = useHooks();

const viewDetail = item => {
  console.log(item);
  openDialog("查看", {
    id: "123"
  });
};
</script>

<template>
  <div>
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
        show-summary
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
        <template #operation="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click.prevent="viewDetail(scope.row)"
          >
            查看明细
          </el-button>
        </template>
        <template #empty>
          <el-empty description="暂无数据" :image-size="60" />
        </template>
      </pure-table>
    </el-card>
  </div>
</template>
