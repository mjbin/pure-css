<script setup lang="ts">
import { ref, reactive } from "vue";
import ReSelect from "@/components/ReSelect";
import ReNumberRange from "@/components/ReNumberRange";
import searchForm from "./searchForm.vue";
import ReDateRange from "@/components/ReDateRange";

defineOptions({
  name: "Welcome"
});

const value = ref("111");
// const min = ref();
// const max = ref(10);
const numberRange = ref([]);
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

const handleSearch = form => {
  console.log(form);
};

const dateRange = ref([]);
</script>

<template>
  <div>
    <searchForm @change="handleSearch" />
    <div class="w-[200px]">
      <re-select v-model="value" multiple :options="options" />
    </div>
    {{ numberRange }}
    <re-number-range v-model="numberRange" v-model:type="type" />
    {{ dateRange }}
    <re-date-range v-model="dateRange" />
  </div>
</template>
