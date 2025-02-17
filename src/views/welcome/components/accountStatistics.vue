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
  <div
    class="flex flex-col gap-6 text-sm w-[310px] h-[280px] left-card mx-[10px] p-4 text-[#fff]"
  >
    <div>账户统计</div>
    <div class="flex flex-col self-center">
      <div class="text-[#ccc] text-center">可提现余额</div>
      <div class="text-4xl font-bold mb-4">
        ¥{{ formatAmount(withdrawalAmount) }}
      </div>
      <el-button type="primary" plain round>申请提现</el-button>
    </div>
    <div class="grid grid-cols-2 gap-4 py-1">
      <div class="flex flex-col border-r border-gray-200">
        <div class="flex items-center justify-center gap-1">
          待支付成本
          <el-tooltip content="待支付成本说明" placement="top">
            <IconifyIconOffline :icon="Warning" />
          </el-tooltip>
        </div>
        <div class="text-2xl font-bold mt-1 text-center">
          ¥{{ formatAmount(payableCost) }}
        </div>
      </div>
      <div class="flex flex-col">
        <div class="flex items-center justify-center gap-1">
          预付款余额
          <el-tooltip content="预付款余额说明" placement="top">
            <IconifyIconOffline :icon="Warning" />
          </el-tooltip>
        </div>
        <div class="text-2xl font-bold text-center mt-1">
          ¥{{ formatAmount(prepaidBalance) }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.left-card {
  background-image: url("../../../assets/home/account-statistics.png");
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
