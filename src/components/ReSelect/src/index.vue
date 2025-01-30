<script lang="ts" setup>
import { useAttrs, ref, computed } from "vue";

defineOptions({
  name: "ReSelect"
});

const emits = defineEmits(["search"]);
const props = defineProps({
  options: {
    type: Array<{
      label: string;
      value: string | number;
      disabled?: boolean;
    }>,
    default: () => []
  }
});
const attrs = useAttrs();
const searchValue = ref("");

const handleChange = () => {
  emits("search", searchValue.value);
};
const handleClear = () => {
  searchValue.value = "";
  emits("search", searchValue.value);
};

const localOptions = computed(() => {
  if (searchValue.value) {
    return props.options.filter(item => item.label.includes(searchValue.value));
  }
  return props.options;
});
</script>

<template>
  <el-select v-bind="attrs">
    <template #header>
      <el-input
        v-model="searchValue"
        clearable
        @input="handleChange"
        @clear="handleClear"
      />
    </template>
    <el-option
      v-for="item in localOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled"
    />
  </el-select>
</template>
