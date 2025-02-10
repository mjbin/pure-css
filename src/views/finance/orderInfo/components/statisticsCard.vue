<script setup lang="ts">
import { ref } from "vue";
import ReCol from "@/components/ReCol";

const withdrawalAmount = ref(124345);
const payableCost = ref(0);
const prepaidBalance = ref(1200);
const formatAmount = (amount: number) => {
  return amount.toLocaleString();
};
const cardMap = [
  {
    titles: ["累计充值金额", "累计充值量"],
    amounts: [
      formatAmount(withdrawalAmount.value),
      formatAmount(prepaidBalance.value)
    ]
  },
  {
    titles: ["累计退款金额", "累计退款量"],
    amounts: [
      formatAmount(prepaidBalance.value),
      formatAmount(payableCost.value)
    ]
  }
];
</script>
<template>
  <el-row :gutter="24" justify="space-around" class="mb-4">
    <re-col
      v-for="(item, index) in cardMap"
      :key="index"
      :md="12"
      :sm="12"
      :xs="24"
      :value="12"
    >
      <el-card class="line-card" shadow="never">
        <div>
          <div class="grid grid-cols-2 gap-4 py-6">
            <div class="flex border-r border-gray-200 flex-row justify-center">
              <div class="w-16 h-16 bg-[#69b1ff] rounded-full mr-4" />
              <div>
                <div
                  class="text-gray-500 flex items-center justify-center text-sm"
                >
                  {{ item.titles[0] }}
                </div>
                <div class="font-bold mt-1 text-center text-4xl">
                  ¥{{ item.amounts[0] }}
                  <span class="text-sm">(元)</span>
                </div>
              </div>
            </div>
            <div class="flex flex-col">
              <div
                class="text-gray-500 flex items-center justify-center text-sm"
              >
                {{ item.titles[1] }}
              </div>
              <div class="font-bold text-center mt-1 text-4xl">
                {{ item.amounts[1] }}
                <span class="text-sm">(张)</span>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </re-col>
  </el-row>
</template>
