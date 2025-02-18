<script setup lang="ts">
import { ref, reactive } from "vue";
import ReDateRange from "@/components/ReDateRange";
import ReNumberRange from "@/components/ReNumberRange";
import { Search } from "@element-plus/icons-vue";
import { useColumns } from "./columns";

interface TableData {
  batchNo: string;
  cardDate: string;
  cardCount: number;
  activateRate: string;
  activateCount: number;
}

const dateBtn = ref("本月");

const handleDetail = (row: TableData) => {
  console.log("查看明细:", row);
};

const searchForm = reactive({
  batchNo: "",
  activateRate: [],
  activateRateType: "gt",
  dateRange: []
});

const { loading, columns, dataList, pagination, onCurrentChange } =
  useColumns(searchForm);
</script>

<template>
  <div class="p-4 rounded">
    <el-form class="flex justify-between" :model="searchForm" inline>
      <div>
        <el-form-item prop="batchNo">
          <el-input
            v-model="searchForm.batchNo"
            placeholder="批次号"
            class="!w-[160px]"
            :suffix-icon="Search"
            clearable
          />
        </el-form-item>
        <el-form-item prop="activateRate">
          <ReNumberRange
            v-model="searchForm.activateRate"
            v-model:type="searchForm.activateRateType"
            placeholder="激活率"
          />
        </el-form-item>
      </div>
      <el-form-item>
        <ReDateRange v-model="searchForm.dateRange" :defaultDateBtn="dateBtn" />
      </el-form-item>
    </el-form>

    <pure-table
      row-key="id"
      alignWhole="center"
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
      <template #empty>
        <el-empty description="暂无数据" :image-size="60" />
      </template>
    </pure-table>
  </div>
</template>

<style scoped>
.el-pagination {
  justify-content: flex-end;
}
</style>
