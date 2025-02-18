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
      title: {
        text: "出卡数量",
        left: "center",
        top: "center"
      },
      tooltip: {
        trigger: "item"
      },
      legend: {
        orient: "horizontal",
        bottom: -5,
        itemGap: 0,
        width: "100%",
        left: "center"
      },
      series: [
        {
          name: "",
          type: "pie",
          radius: ["50%", "70%"], // 内半径和外半径，形成圆环效果
          avoidLabelOverlap: false,
          // label: {
          //   show: false,
          //   position: 'left',
          // },
          label: {
            show: true, // 显示标签
            position: "inner", // 标签位置
            formatter: "{c}" // 格式化显示内容，{b} 是名称，{c} 是数值
          },
          // emphasis: {
          //   label: {
          //     show: true,
          //     fontSize: '30',
          //     fontWeight: 'bold',
          //   },
          // },
          labelLine: {
            show: false
          },
          data: [
            { value: 335, name: "已激活" },
            { value: 310, name: "已退款" },
            { value: 234, name: "已过期" },
            { value: 135, name: "可激活" }
          ],
          // 使得圆环图的颜色更加美观
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2
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
  <div ref="chartRef" class="w-[100%] h-[200px]" />
</template>
