<script lang="ts" setup>
import { useAttrs, ref, watch, computed } from "vue";
import dayjs from "dayjs";

defineOptions({
  name: "ReDateRange"
});

interface Props {
  modelValue?: any[]; // 时间范围
  defaultDateBtn?: string; // 默认选中的日期按钮
  btnOptions?: string[]; // 需要展示的快捷按钮配置列表
}

// const props = defineProps<Props>();
const props = withDefaults(defineProps<Props>(), {
  btnOptions: () => ["今日", "本周", "本月", "最近一月", "最近三月", "今年"]
});
const emit = defineEmits(["update:modelValue", "onChange"]);

const dateValue = ref(props.modelValue);
const attrs = useAttrs();

const changeDate = val => {
  currentBtn.value = "";
  handleChange(val);
};

const handleChange = val => {
  emit("update:modelValue", val);
  emit("onChange", val);
};

const currentBtn = ref();
// 所有快捷按钮的配置项
const btns = [
  {
    btnText: "全部",
    text: true,
    type: "default" as const,
    onClick(i) {
      currentBtn.value = i;
      dateValue.value = [];
      handleChange(dateValue.value);
    }
  },
  {
    btnText: "今日",
    text: true,
    type: "default" as const,
    onClick(i) {
      currentBtn.value = i;
      dateValue.value = [
        dayjs().startOf("day").format("YYYY-MM-DD"),
        dayjs().endOf("day").format("YYYY-MM-DD")
      ];
      handleChange(dateValue.value);
    }
  },
  {
    btnText: "昨日",
    text: true,
    type: "default" as const,
    onClick(i) {
      currentBtn.value = i;
      dateValue.value = [
        dayjs().subtract(1, "d").format("YYYY-MM-DD"),
        dayjs().subtract(1, "d").format("YYYY-MM-DD")
      ];
      handleChange(dateValue.value);
    }
  },
  {
    btnText: "本周",
    text: true,
    type: "default" as const,
    onClick(i) {
      currentBtn.value = i;
      dateValue.value = [
        dayjs().startOf("week").format("YYYY-MM-DD"),
        dayjs().endOf("week").format("YYYY-MM-DD")
      ];
      handleChange(dateValue.value);
    }
  },
  {
    btnText: "上周",
    text: true,
    type: "default" as const,
    onClick(i) {
      currentBtn.value = i;
      dateValue.value = [
        dayjs().subtract(1, "week").startOf("week").format("YYYY-MM-DD"),
        dayjs().subtract(1, "week").endOf("week").format("YYYY-MM-DD")
      ];
      handleChange(dateValue.value);
    }
  },
  {
    btnText: "本月",
    text: true,
    type: "default" as const,
    onClick(i) {
      currentBtn.value = i;
      dateValue.value = [
        dayjs().startOf("month").format("YYYY-MM-DD"),
        dayjs().endOf("month").format("YYYY-MM-DD")
      ];
      handleChange(dateValue.value);
    }
  },
  {
    btnText: "上月",
    text: true,
    type: "default" as const,
    onClick(i) {
      currentBtn.value = i;
      dateValue.value = [
        dayjs().subtract(1, "month").startOf("month").format("YYYY-MM-DD"),
        dayjs().subtract(1, "month").endOf("month").format("YYYY-MM-DD")
      ];
      handleChange(dateValue.value);
    }
  },
  {
    btnText: "最近一月",
    text: true,
    type: "default" as const,
    onClick(i) {
      currentBtn.value = i;
      dateValue.value = [
        dayjs().subtract(1, "month").format("YYYY-MM-DD"),
        dayjs().format("YYYY-MM-DD")
      ];
      handleChange(dateValue.value);
    }
  },
  {
    btnText: "最近三月",
    text: true,
    type: "default" as const,
    onClick(i) {
      currentBtn.value = i;
      dateValue.value = [
        dayjs().subtract(3, "month").format("YYYY-MM-DD"),
        dayjs().format("YYYY-MM-DD")
      ];
      handleChange(dateValue.value);
    }
  },
  {
    btnText: "今年",
    text: true,
    type: "default" as const,
    onClick(i) {
      currentBtn.value = i;
      dateValue.value = [
        dayjs().startOf("year").format("YYYY-MM-DD"),
        dayjs().endOf("year").format("YYYY-MM-DD")
      ];
      handleChange(dateValue.value);
    }
  }
];

const btnsConfig = computed(() => {
  return btns.filter(btn => props.btnOptions.includes(btn.btnText));
});

watch(
  () => props.defaultDateBtn,
  val => {
    const current = btns.find(i => i.btnText === val);
    if (current) {
      current.onClick(current.btnText);
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="bg-[#E9F1FF] rounded-2xl">
    <el-button
      v-for="(item, index) in btnsConfig"
      :key="index"
      class="!ml-1"
      :type="currentBtn === item.btnText ? 'primary' : item.type"
      :text="currentBtn === item.btnText ? false : item.text"
      size="small"
      round
      @click="item.onClick(item.btnText)"
    >
      {{ item.btnText }}
    </el-button>
    <el-date-picker
      v-model="dateValue"
      class="ml-1 !w-[260px]"
      type="daterange"
      value-format="YYYY-MM-DD"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      v-bind="attrs"
      @change="changeDate"
    />
  </div>
</template>
