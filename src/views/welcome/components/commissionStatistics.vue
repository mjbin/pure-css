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
  isActive: boolean;
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
    isActive: true,
    color: "#409EFF"
  },
  {
    label: "首充返润",
    value: 122000,
    unit: "元",
    isActive: true,
    color: "#67C23A"
  },
  {
    label: "多充返润",
    value: 12700,
    unit: "元",
    isActive: true,
    color: "#E6A23C"
  }
]);

const chartLineRef = ref();
const switchNameLine = (item: CommissionData) => {
  item.isActive = !item.isActive;
  chartLineRef.value.switchNameLine(item.label);
};

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
  <div class="flex justify-end">
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
      class="flex-none border py-2 px-4 rounded-2xl min-w-36 relative cursor-pointer"
      :class="
        item.isActive
          ? 'border-[var(--el-color-primary)] bg-[#E9F1FF]'
          : 'border-gray-200'
      "
      @click="switchNameLine(item)"
    >
      <div v-if="item.isActive" class="badge" />
      <div class="flex items-center gap-2">
        <div class="w-1 h-4" :style="{ backgroundColor: item.color }" />
        <span
          :class="
            item.isActive ? 'text-[var(--el-color-primary)]' : 'text-gray-500'
          "
          >{{ item.label }}</span
        >
      </div>
      <div class="text-lg font-bold">
        ¥ {{ formatNumber(item.value) }}
        <!-- <span class="text-base ml-1">({{ item.unit }})</span> -->
      </div>
    </div>
  </div>
  <ChartLine
    ref="chartLineRef"
    class="mt-2"
    :xAxisData="barChartData[type].xAxisData"
    :totalData="barChartData[type].totalData"
    :firstData="barChartData[type].firstData"
    :moreData="barChartData[type].moreData"
  />
</template>

<style lang="scss" scoped>
.badge {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 20px;
  height: 20px;
  clip-path: polygon(100% 0, 100% 100%, 0 0);
  background-color: var(--el-color-primary);
  border-top-right-radius: 12px;
}
</style>
