<script setup lang="ts">
import { ref, h } from "vue";
import { addDialog } from "@/components/ReDialog";
import approveProgress from "./approveProgress.vue";

const props = defineProps({
  formInline: {
    type: Object,
    default: () => ({
      id: ""
    })
  }
});

const dataList = ref([
  {
    batchNo: "2025-02-10",
    cardCount: "100"
  },
  {
    batchNo: "2025-02-10",
    cardCount: "100"
  }
]);
const loading = ref(false);
const columns: TableColumnList = [
  {
    label: "提现单号",
    prop: "batchNo"
  },
  {
    label: "提现状态",
    prop: "cardDate"
  },
  {
    label: "提现金额",
    prop: "cardCount"
  },
  {
    label: "提现前余额",
    prop: "activateRate"
  },
  {
    label: "提现后余额",
    prop: "activateCount"
  },
  {
    label: "提现手续费",
    prop: "activateCount"
  },
  {
    label: "提现类型",
    prop: "activateCount"
  },
  {
    label: "申请时间",
    prop: "activateCount"
  },
  {
    label: "审批时间",
    prop: "activateCount"
  },
  {
    label: "创建人",
    prop: "activateCount"
  }
];

const handleCurrentChange = row => {
  console.log("handleCurrentChange", row);
  addDialog({
    title: "审批进度",
    props: {
      formInline: {
        id: row?.id ?? ""
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
</script>

<template>
  <div>
    <pure-table
      row-key="id"
      alignWhole="center"
      border
      showOverflowTooltip
      :loading="loading"
      :loading-config="{ background: 'transparent' }"
      highlight-current-row
      :data="dataList"
      :columns="columns"
      @cell-click="handleCurrentChange"
    >
      <template #empty>
        <el-empty description="暂无数据" :image-size="60" />
      </template>
    </pure-table>
  </div>
</template>
