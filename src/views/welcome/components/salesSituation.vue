<script setup lang="ts">
import { ref } from "vue";
import ReDateRange from "@/components/ReDateRange";
import chartPie from "./chartPie.vue";

interface StatData {
  label: string;
  value: number;
  unit: string;
}

const statistics = ref<StatData[]>([
  {
    label: "已激活",
    value: 120,
    unit: "张"
  },
  {
    label: "已过期",
    value: 163,
    unit: "张"
  },
  {
    label: "已退款",
    value: 680,
    unit: "张"
  },
  {
    label: "可激活",
    value: 120,
    unit: "张"
  }
]);

const dateBtn = ref("最近一月");
const dateRange = ref([]);

const formatNumber = (num: number) => {
  return num.toLocaleString();
};

const handleChange = dateRange => {
  console.log(dateRange);
};
</script>

<template>
  <div class="flex justify-between">
    <div class="text-md font-semibold">卡片销售概况</div>
    <ReDateRange
      v-model="dateRange"
      :defaultDateBtn="dateBtn"
      @onChange="handleChange"
    />
  </div>
  <div class="flex mt-4">
    <chartPie />
    <el-row class="flex-1" justify="space-between">
      <el-col
        v-for="item in statistics"
        :key="item.label"
        :span="6"
        class="px-1"
      >
        <el-card>
          <div class="card-header">{{ item.label }}</div>
          <div class="text-3xl font-semibold">
            {{ formatNumber(item.value) }}
          </div>
          <div class="bg-[#EDF2FC] p-2 text-[#888]">
            <div class="sub-card-header text-sm">上周激活数量</div>
            <div class="flex justify-between text-xs">
              <div>较上周同比</div>
              <div>+20%</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.el-icon {
  --el-icon-size: inherit;
}

.card-header,
.sub-card-header {
  margin: 8px 0;

  &::before {
    width: 4px;
    padding-left: 8px;
    content: "";
    border-left: 4px solid var(--el-color-primary);
  }
}

.sub-card-header {
  padding-bottom: 6px;
  margin: 0;
  margin-bottom: 6px;
  border-bottom: 1px solid #e6e2e2;

  &::before {
    border-left: 4px solid #71d3fa;
  }
}
</style>
