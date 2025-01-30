<script setup lang="ts">
import { ref } from "vue";
import ReSelect from "@/components/ReSelect";
import ReNumberRange from "@/components/ReNumberRange";

defineOptions({
  name: "Welcome"
});

const value = ref("111");
const min = ref();
const max = ref(10);
const type = ref("lt");
const options = ref([
  {
    value: "aaa",
    label: "aaa"
  },
  {
    value: "bbb",
    label: "bbb"
  },
  {
    value: "aab",
    label: "aab"
  }
]);
</script>

<template>
  <div>
    <h1>Pure-Admin-Thin（非国际化版本）</h1>
    <div class="w-[200px]">
      <re-select v-model="value" multiple :options="options" />
    </div>
    {{ min }} {{ max }} {{ type }}
    <re-number-range v-model:min="min" v-model:max="max" v-model:type="type" />
  </div>
</template>
