<script lang="ts" setup>
import { useAttrs, computed, ref, watch } from "vue";

defineOptions({
  name: "ReNumberRange"
});

const attrs = useAttrs();
const emits = defineEmits(["update:modelValue", "change"]);

const type = defineModel("type", { default: "gt" });
const value = defineModel("modelValue", { default: [] });

const min = ref(value.value[0]);
const max = ref(value.value[1]);

watch(
  () => value.value,
  newValue => {
    // 监听若清空当前输入值，则大小值重置为null
    if (!newValue) {
      min.value = null;
      max.value = null;
    }
  }
);

const options = [
  {
    label: "大于",
    value: "gt"
  },
  {
    label: "小于",
    value: "lt"
  },
  {
    label: "等于",
    value: "eq"
  },
  {
    label: "范围",
    value: "range"
  }
];

const maxPlaceholder = computed(() => {
  if (type.value === "range") {
    return "最大值";
  } else {
    return "请输入";
  }
});

const changeMin = v => {
  emits("update:modelValue", [v, max.value]);
  emits("change", { type: type.value, value: [v, max.value] });
};

const handleEmit = (v: number, type: string) => {
  if (type === "lt") {
    emits("update:modelValue", [null, v]);
    emits("change", { type, value: [null, v] });
  }

  if (type === "gt") {
    emits("update:modelValue", [v, null]);
    emits("change", { type, value: [v, null] });
  }

  if (type === "eq") {
    emits("update:modelValue", [v]);
    emits("change", { type, value: [v] });
  }

  if (type === "range") {
    emits("update:modelValue", [min.value, v]);
    emits("change", { type, value: [min.value, v] });
  }
};

const changeMax = v => {
  handleEmit(v, type.value);
};

const changeType = (v: string) => {
  handleEmit(max.value, v);
};
</script>

<template>
  <div class="flex items-center re-number-range">
    <div v-if="type === 'range'" class="flex items-center">
      <el-input-number
        v-bind="attrs"
        v-model="min"
        style="width: 120px"
        :controls="false"
        placeholder="最小值"
        @change="changeMin"
      />
    </div>
    <span v-if="type === 'range'" class="px-1">~</span>
    <div class="w-[205px] flex">
      <el-input-number
        v-model="max"
        class="re-number-range-max"
        :placeholder="maxPlaceholder"
        :controls="false"
        v-bind="attrs"
        @change="changeMax"
      />
      <el-select
        v-model="type"
        class="re-number-range-select -ml-[1px]"
        style="width: 85px"
        @change="changeType"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.re-number-range {
  :deep(.el-input-number .el-input__inner) {
    text-align: left;
  }

  .re-number-range-max {
    :deep(.el-input__wrapper) {
      border-radius: var(--el-input-border-radius) 0 0
        var(--el-input-border-radius);
    }
  }

  .re-number-range-select {
    :deep(.el-select__wrapper) {
      border-radius: 0 var(--el-border-radius-base) var(--el-border-radius-base)
        0;
    }
  }
}
</style>
