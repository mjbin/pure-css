<script setup lang="ts">
// import { ref } from "vue";
import ReCol from "@/components/ReCol";
const emit = defineEmits<{
  (e: "handleApply"): void;
  (e: "handleRecord"): void;
}>();
</script>
<template>
  <el-card class="mb-4 py-6">
    <el-row :gutter="24" justify="space-around">
      <re-col
        :md="12"
        :sm="24"
        :xs="24"
        :value="8"
        class="border-r-2 border-[#E9F1FF]"
      >
        <div class="flex flex-row justify-center">
          <div class="w-16 h-16 bg-[#69b1ff] rounded-full mr-4" />
          <div>
            <div
              class="flex items-center justify-center text-[var(--el-color-primary)] font-semibold"
            >
              累计提现（元）
            </div>
            <div class="font-bold mt-1 text-center text-4xl">¥ 222</div>
            <div class="text-xs text-[#999]">今年累计 ￥66,876</div>
          </div>
        </div>
      </re-col>
      <re-col
        :md="12"
        :sm="24"
        :xs="24"
        :value="8"
        class="border-r-2 border-[#E9F1FF]"
      >
        <div class="flex justify-center items-end">
          <div>
            <div
              class="flex items-center justify-center text-[var(--el-color-primary)] font-semibold"
            >
              可提现（元）
            </div>
            <div class="font-bold mt-1 text-center text-4xl">
              <span>¥ 666</span>
            </div>
          </div>
          <el-button
            class="ml-2 mb-1"
            type="primary"
            plain
            round
            @click="emit('handleApply')"
            >申请提现</el-button
          >
        </div>
      </re-col>
      <re-col :md="12" :sm="24" :xs="24" :value="8">
        <div class="flex justify-center items-end">
          <div>
            <div
              class="flex items-center justify-center text-[var(--el-color-primary)] font-semibold"
            >
              审批中（元）
            </div>
            <div class="font-bold mt-1 text-center text-4xl">
              <span>¥ 888</span>
            </div>
          </div>
          <el-button
            class="ml-2 mb-1"
            type="primary"
            round
            @click="emit('handleRecord')"
            >查看记录</el-button
          >
        </div>
      </re-col>
    </el-row>
  </el-card>
</template>
