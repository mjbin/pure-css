<script setup lang="ts">
import { ref } from "vue";
import ReSearchForm from "@/components/ReSearchForm";
import { useHooks } from "./hook";
import { SearchForm } from "types/global";
import { Download } from "@element-plus/icons-vue";

defineOptions({
  name: "Withdrawal"
});

// 查询配置项
const formOpt = ref<SearchForm.FormOpt>({
  inline: true,
  conditions: [
    {
      label: "申请时间",
      prop: "date",
      propLabel: ["startDate", "endDate"],
      itemType: "customDate",
      lg: 24,
      md: 24,
      xl: 24,
      sm: 24,
      defaultValue: [],
      autoVisible: true
    },
    {
      label: "提现单号",
      prop: "user",
      lg: 6,
      xl: 4,
      defaultValue: "",
      autoVisible: true
    },
    {
      label: "提现状态",
      prop: "status",
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
      label: "提现类型",
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
      label: "提现金额",
      prop: "price",
      operatorProp: "price_operator",
      itemType: "compareInput",
      lg: 8,
      xl: 6,
      defaultValue: [],
      placeholder: "请输入",
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
  onCurrentChange
} = useHooks();

const viewDetail = item => {
  console.log(item);
  openDialog("查看明细", {
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
