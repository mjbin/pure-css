<script setup lang="ts">
import { ref, h } from "vue";
import ReSearchForm from "@/components/ReSearchForm";
import notice from "./components/notice.vue";
import statisticsCard from "./components/statisticsCard.vue";
import { addDialog } from "@/components/ReDialog";
import approveProgress from "./components/approveProgress.vue";
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
  openApproveDialog,
  onSizeChange,
  onCurrentChange
} = useHooks();

const viewDetail = item => {
  addDialog({
    title: "审批进度",
    props: {
      formInline: {
        id: item?.id ?? ""
      }
    },
    width: "40%",
    draggable: true,
    fullscreenIcon: false,
    hideFooter: true,
    closeOnClickModal: true,
    contentRenderer: () => h(approveProgress)
  });
};

const handleApply = () => {
  openDialog("提现申请", {
    id: "123"
  });
};

const handleRecord = () => {
  openApproveDialog({
    id: "123"
  });
};
</script>

<template>
  <div>
    <notice />
    <statisticsCard @handle-apply="handleApply" @handle-record="handleRecord" />
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
        @page-size-change="onSizeChange"
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
