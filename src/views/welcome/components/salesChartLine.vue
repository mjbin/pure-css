<script setup lang="ts">
import { useDark, useECharts } from "@pureadmin/utils";
import { type PropType, ref, computed, watch, nextTick } from "vue";

const props = defineProps({
  xAxisData: {
    type: Array as PropType<Array<string>>,
    default: () => []
  },
  totalData: {
    type: Array as PropType<Array<number>>,
    default: () => []
  },
  firstData: {
    type: Array as PropType<Array<number>>,
    default: () => []
  },
  moreData: {
    type: Array as PropType<Array<number>>,
    default: () => []
  }
});

const { isDark } = useDark();

const theme = computed(() => (isDark.value ? "dark" : "light"));

const chartRef = ref();
const { setOptions } = useECharts(chartRef, {
  theme
});

watch(
  () => props,
  async () => {
    await nextTick(); // 确保DOM更新完成后再执行
    setOptions({
      tooltip: {
        trigger: "axis",
        show: false
      },
      legend: {
        show: false
      },
      grid: {
        top: "10px",
        bottom: 0,
        left: 0,
        right: 0
      },
      xAxis: {
        show: false,
        type: "category"
        // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] // X轴数据
      },
      yAxis: {
        show: false,
        type: "value"
      },
      series: [
        {
          name: "本周",
          type: "line",
          data: [120, 132, 101, 134, 90, 230, 210],
          smooth: true, // 平滑曲线
          symbol: "none",
          lineStyle: {
            color: "#2461FF"
          },
          areaStyle: {
            color: "#2461FF" + "66" // 设置填充颜色，使用透明度
          }
        },
        {
          name: "上周",
          type: "line",
          data: [220, 182, 191, 234, 290, 330, 310],
          smooth: true,
          symbol: "none",
          lineStyle: {
            color: "#71d3fa"
          },
          areaStyle: {
            color: "#71d3fa" + "66" // 设置填充颜色，使用透明度
          }
        }
      ]
    });
  },
  {
    deep: true,
    immediate: true
  }
);
</script>

<template>
  <div ref="chartRef" class="w-[100%] h-[100%]" />
</template>
