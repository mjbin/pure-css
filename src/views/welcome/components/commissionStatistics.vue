<script setup lang="ts">
import { ref } from "vue";
import Segmented, { type OptionsType } from "@/components/ReSegmented";
import ReDateRange from "@/components/ReDateRange";
import ChartLine from "./chartLine.vue";

interface CommissionData {
  label: string;
  value: number;
  unit: string;
  color: string;
}

const dateBtn = ref("本月");
const dateRange = ref([]);
const type = ref(0);

const optionsBasis: Array<OptionsType> = [
  {
    label: "按日"
  },
  {
    label: "按月"
  }
];

const commissionList = ref<CommissionData[]>([
  {
    label: "总返润",
    value: 432000,
    unit: "元",
    color: "#409EFF"
  },
  {
    label: "首充返润",
    value: 122000,
    unit: "元",
    color: "#67C23A"
  },
  {
    label: "多充返润",
    value: 12700,
    unit: "元",
    color: "#E6A23C"
  }
]);

const handleChange = dateRange => {
  console.log(dateRange);
};

const formatNumber = (num: number) => {
  return num.toLocaleString();
};

const barChartData = [
  {
    xAxisData: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    totalData: [2101, 5288, 4239, 4962, 6752, 5208, 7450],
    firstData: [2216, 1148, 1255, 1788, 4821, 1973, 4379],
    moreData: [2101, 3280, 4400, 1788, 5752, 4821, 7600]
  },
  {
    xAxisData: ["a", "b", "c"],
    totalData: [2101, 5288, 4239],
    firstData: [2216, 1148, 1255],
    moreData: [2101, 3280, 4400]
  }
];
</script>

<template>
  <div class="flex">
    <ReDateRange
      v-model="dateRange"
      :defaultDateBtn="dateBtn"
      @onChange="handleChange"
    />
    <!-- <el-radio-group v-model="type" class="ml-3 flex-none w-[120px]">
      <el-radio-button label="按日" :value="0" />
      <el-radio-button label="按月" :value="1" />
    </el-radio-group> -->
    <Segmented v-model="type" class="ml-3 flex-none" :options="optionsBasis" />
  </div>
  <div class="flex gap-4 mt-4 text-sm items-center">
    <div
      v-for="item in commissionList"
      :key="item.label"
      class="flex-none border p-4 border-gray-200 justify-center rounded min-w-40"
    >
      <div class="flex items-center justify-center gap-2">
        <div
          class="w-2 h-2 rounded-full"
          :style="{ backgroundColor: item.color }"
        />
        <span class="text-gray-500">{{ item.label }}</span>
      </div>
      <div class="text-base font-bold text-center">
        {{ formatNumber(item.value) }}
        <span class="text-base ml-1">({{ item.unit }})</span>
      </div>
    </div>
  </div>
  <ChartLine
    class="mt-2"
    :xAxisData="barChartData[type].xAxisData"
    :totalData="barChartData[type].totalData"
    :firstData="barChartData[type].firstData"
    :moreData="barChartData[type].moreData"
  />
</template>
