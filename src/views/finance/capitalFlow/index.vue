<script setup lang="ts">
import { onMounted, ref } from "vue";

defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: "Withdrawal"
});

const num = ref(1);

onMounted(() => {
  console.log("123");
});
</script>

<template>
  <h1 @click="() => (num += 1)">资金流水{{ num }}</h1>
</template>
