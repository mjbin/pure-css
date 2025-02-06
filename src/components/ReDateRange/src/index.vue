<script lang="ts" setup>
import { useAttrs, ref, watch } from "vue";
import dayjs from "dayjs";

defineOptions({
  name: "ReDateRange"
});

interface Props {
  modelValue?: any[]; // 时间范围
  defaultDateBtn?: string; // 默认选中的日期按钮
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue", "onChange"]);

const dateValue = ref(props.modelValue);
const attrs = useAttrs();

const handleChange = val => {
  emit("update:modelValue", val);
  emit("onChange", val);
};

const currentBtn = ref();
const btns = [
  {
    btnText: "今日",
    text: true,
    type: "default" as const,
    onClick(i) {
      currentBtn.value = i;
      dateValue.value = [dayjs().startOf("day"), dayjs().endOf("day")];
      handleChange(dateValue.value);
    }
  },
  {
    btnText: "本周",
    text: true,
    type: "default" as const,
    onClick(i) {
      currentBtn.value = i;
      dateValue.value = [dayjs().startOf("week"), dayjs().endOf("week")];
      handleChange(dateValue.value);
    }
  },
  {
    btnText: "本月",
    text: true,
    type: "default" as const,
    onClick(i) {
      currentBtn.value = i;
      dateValue.value = [dayjs().startOf("month"), dayjs().endOf("month")];
      handleChange(dateValue.value);
    }
  },
  {
    btnText: "最近一月",
    text: true,
    type: "default" as const,
    onClick(i) {
      currentBtn.value = i;
      dateValue.value = [dayjs().subtract(1, "month"), dayjs()];
      handleChange(dateValue.value);
    }
  },
  {
    btnText: "最近三月",
    text: true,
    type: "default" as const,
    onClick(i) {
      currentBtn.value = i;
      dateValue.value = [dayjs().subtract(3, "month"), dayjs()];
      handleChange(dateValue.value);
    }
  },
  {
    btnText: "今年",
    text: true,
    type: "default" as const,
    onClick(i) {
      currentBtn.value = i;
      dateValue.value = [dayjs().startOf("year"), dayjs().endOf("year")];
      handleChange(dateValue.value);
    }
  }
];

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
  <div>
    <el-button
      v-for="(item, index) in btns"
      :key="index"
      class="!ml-1"
      :type="currentBtn === item.btnText ? 'primary' : item.type"
      :text="currentBtn === item.btnText ? false : item.text"
      size="small"
      @click="item.onClick(item.btnText)"
    >
      {{ item.btnText }}
    </el-button>
    <el-date-picker
      v-model="dateValue"
      class="ml-1"
      type="daterange"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      v-bind="attrs"
      @change="handleChange"
    />
  </div>
</template>
