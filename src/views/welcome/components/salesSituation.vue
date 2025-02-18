<script setup lang="ts">
import { ref } from "vue";
import ReDateRange from "@/components/ReDateRange";
import chartPie from "./chartPie.vue";
import salesChartLine from "./salesChartLine.vue";
import ArrowDownDoubleFill from "@iconify-icons/ri/arrow-down-double-fill";
import ArrowUpDoubleFill from "@iconify-icons/ri/arrow-up-double-fill";

interface StatData {
  label: string;
  value: number;
  trend: string;
  unit: string;
}

const statistics = ref<StatData[]>([
  {
    label: "已激活",
    value: 120,
    trend: "up",
    unit: "张"
  },
  {
    label: "已过期",
    value: 163,
    trend: "down",
    unit: "张"
  },
  {
    label: "已退款",
    value: 680,
    trend: "up",
    unit: "张"
  },
  {
    label: "可激活",
    value: 120,
    trend: "down",
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
  <div class="flex mt-4 flex-wrap">
    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
      <chartPie />
    </el-col>
    <el-col :xs="24" :sm="24" :md="12" :lg="16" :xl="18">
      <el-row class="flex-1" justify="space-between">
        <el-col
          v-for="item in statistics"
          :key="item.label"
          :xs="12"
          :sm="12"
          :md="12"
          :lg="6"
          :xl="6"
          class="px-1 pb-1"
        >
          <el-card>
            <div class="card-header">{{ item.label }}</div>
            <div class="text-3xl font-semibold">
              {{ formatNumber(item.value) }}
            </div>
            <div class="bg-[#EDF2FC] p-2 text-[#888]">
              <div class="sub-card-header text-xs">上周激活数量</div>
              <div class="flex justify-between text-xs">
                <div>较上周同比</div>
                <div class="flex">
                  <IconifyIconOffline
                    v-if="item.trend === 'up'"
                    class="text-sm text-[green]"
                    :icon="ArrowUpDoubleFill"
                  />
                  <IconifyIconOffline
                    v-else-if="item.trend === 'down'"
                    class="text-sm text-[red]"
                    :icon="ArrowDownDoubleFill"
                  />
                  <span>20%</span>
                </div>
              </div>
              <div class="h-[60px] w-[100%]">
                <salesChartLine />
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-col>
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
