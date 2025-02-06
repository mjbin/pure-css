<script setup lang="ts">
import { ref } from "vue";
import ReDateRange from "@/components/ReDateRange";

interface StatData {
  label: string;
  value: number;
  unit: string;
}

const totalCards = ref<StatData>({
  label: "出卡数量",
  value: 124345,
  unit: "张"
});

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
  <div class="text-right">
    <ReDateRange
      v-model="dateRange"
      :defaultDateBtn="dateBtn"
      @onChange="handleChange"
    />
  </div>
  <div class="flex mt-4 text-sm">
    <!-- 总数据展示 -->
    <div class="flex-none text-center border-r px-16 border-gray-200">
      <div class="w-20 h-20 bg-[#69b1ff] rounded-full mx-auto" />
      <div class="text-gray-500 mt-1">{{ totalCards.label }}</div>
      <div class="text-2xl font-bold mt-1">
        {{ formatNumber(totalCards.value) }}
        <span class="text-base">({{ totalCards.unit }})</span>
      </div>
    </div>

    <!-- 统计数据网格 -->
    <div class="flex-1 grid grid-cols-2 text-center items-center">
      <div v-for="item in statistics" :key="item.label">
        <div class="text-gray-500">{{ item.label }}</div>
        <div class="text-xl font-bold mt-1">
          {{ formatNumber(item.value) }}
          <span class="text-base">({{ item.unit }})</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.el-icon {
  --el-icon-size: inherit;
}
</style>
