<script setup lang="ts">
import { ref } from "vue";
import { Vue3Marquee } from "vue3-marquee";
import { ArrowDownBold, ArrowUpBold } from "@element-plus/icons-vue";

const isFold = ref(true);
const title =
  ref(`vue3-marquee 的核心优势在于其简洁性和高效性。它不依赖任何第三方库，确保了组件的轻量级和加载速度vue3-marquee 的核心优势在于其简洁性和高效性
它不依赖任何第三方库，确保了组件的轻量级和加载速度。vue3-marquee 的核心优势在于其简洁性和高效性。它不依赖任何第三方库，确保了组件的轻量级和加载速度。
vue3-marquee 的核心优势在于其简洁性和高效性。它不依赖任何第三方库，确保了组件的轻量级和加载速度。。`);
</script>

<template>
  <div class="marquee flex">
    <Vue3Marquee
      v-if="isFold"
      :pauseOnHover="true"
      :duration="35"
      :delay="1"
      :clone="true"
      :animateOnOverflowOnly="true"
    >
      <el-alert :closable="false" :title="title" type="warning" />
    </Vue3Marquee>
    <el-alert v-else :closable="false" :title="title" type="warning" />
    <el-icon
      class="mt-2 mx-4 cursor-pointer"
      :size="20"
      @click="isFold = !isFold"
    >
      <ArrowDownBold v-if="isFold" />
      <ArrowUpBold v-else />
    </el-icon>
  </div>
</template>

<style lang="scss" scoped>
.marquee {
  color: var(--el-color-warning);
  background-color: var(--el-color-warning-light-9);
}

.el-alert--warning.is-light {
  color: #eb6e38;
}
</style>
