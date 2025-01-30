<script lang="ts" setup>
import { useAttrs, computed } from "vue";

defineOptions({
  name: "ReNumberRange"
});

const attrs = useAttrs();
const emits = defineEmits(["update:min", "update:max", "change"]);

const min = defineModel("min", { default: null });
const max = defineModel("max", { default: null });
const type = defineModel("type", { default: "gt" });

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
</script>

<template>
  <div class="flex items-center">
    <div v-if="type === 'range'" class="flex items-center">
      <el-input
        v-bind="attrs"
        v-model="min"
        style="width: 120px"
        :controls="false"
        placeholder="最小值"
      />
    </div>
    <span v-if="type === 'range'" class="px-1">~</span>
    <div class="w-[205px]">
      <el-input v-model="max" :placeholder="maxPlaceholder" v-bind="attrs">
        <template #append>
          <el-select v-model="type" style="width: 85px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
      </el-input>
    </div>
  </div>
</template>
