<script setup lang="ts">
import { ref } from "vue";
import Warning from "@iconify-icons/ep/warning";

const withdrawalAmount = ref(124345);
const payableCost = ref(0);
const prepaidBalance = ref(1200);

const formatAmount = (amount: number) => {
  return amount.toLocaleString();
};
</script>

<template>
  <div class="flex flex-col gap-6 text-sm">
    <div class="flex items-center gap-4">
      <div class="w-16 h-16 bg-[#69b1ff] rounded-full mx-auto" />
      <div class="flex-1">
        <div class="flex items-center justify-between">
          <div class="text-gray-500 flex items-center gap-1">
            可提现金额
            <el-tooltip content="可提现金额说明" placement="top">
              <IconifyIconOffline :icon="Warning" />
            </el-tooltip>
          </div>
          <el-button type="primary">申请提现</el-button>
        </div>
        <div class="text-2xl font-bold">
          ¥{{ formatAmount(withdrawalAmount) }}
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4 py-6">
      <div class="flex flex-col border-r border-gray-200">
        <div class="text-gray-500 flex items-center justify-center gap-1">
          待支付成本
          <el-tooltip content="待支付成本说明" placement="top">
            <IconifyIconOffline :icon="Warning" />
          </el-tooltip>
        </div>
        <div class="text-xl font-bold mt-1 text-center">
          ¥{{ formatAmount(payableCost) }}
        </div>
      </div>
      <div class="flex flex-col">
        <div class="text-gray-500 flex items-center justify-center gap-1">
          预付款余额
          <el-tooltip content="预付款余额说明" placement="top">
            <IconifyIconOffline :icon="Warning" />
          </el-tooltip>
        </div>
        <div class="text-xl font-bold text-center mt-1">
          ¥{{ formatAmount(prepaidBalance) }}
        </div>
      </div>
    </div>
  </div>
</template>
