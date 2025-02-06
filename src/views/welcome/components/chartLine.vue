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
      color: ["#41b6ff", "#e85f33"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "none"
        }
      },
      grid: {
        top: "20px",
        left: "50px",
        right: 0
      },
      legend: {
        data: ["总利润", "首充返润", "多充返润"],
        textStyle: {
          color: "#606266",
          fontSize: "0.875rem"
        },
        bottom: 0
      },
      xAxis: [
        {
          type: "category",
          data: props.xAxisData,
          axisLabel: {
            fontSize: "0.875rem"
          },
          axisPointer: {
            type: "shadow"
          }
        }
      ],
      yAxis: [
        {
          type: "value",
          axisLabel: {
            fontSize: "0.875rem"
          },
          splitLine: {
            show: false // 去网格线
          }
          // name: "单位: 个"
        }
      ],
      series: [
        {
          name: "总利润",
          type: "line",
          smooth: true,
          itemStyle: {
            color: "#289fe8",
            borderRadius: [10, 10, 0, 0]
          },
          data: props.totalData
        },
        {
          name: "首充返润",
          type: "line",
          smooth: true,
          itemStyle: {
            color: "#5dad23",
            borderRadius: [10, 10, 0, 0]
          },
          data: props.firstData
        },
        {
          name: "多充返润",
          type: "line",
          smooth: true,
          itemStyle: {
            color: "#fc8f31",
            borderRadius: [10, 10, 0, 0]
          },
          data: props.moreData
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
  <div ref="chartRef" style="width: 100%; height: 365px" />
</template>
