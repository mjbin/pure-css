<script setup lang="ts">
import { ref } from "vue";
// import ReTimeStep from "@/components/ReTimeStep";
import { LocationFilled } from "@element-plus/icons-vue";
import { PureDescriptions } from "@pureadmin/descriptions";

defineProps({
  formInline: {
    type: Object,
    default: () => ({
      id: ""
    })
  }
});

const currentStep = ref(2);

const columns = [
  {
    label: "用户名:",
    value: "ccc"
  },
  {
    label: "提现账号:",
    value: "621700332xxxxxx90200"
  },
  {
    label: "提现金额:",
    value: "200.00"
  },
  {
    label: "开户名称:",
    value: "www"
  },
  {
    label: "开户行:",
    value: "建设银行"
  },
  {
    label: "",
    value: ""
  },
  {
    label: "备注:",
    value: "这是一条备注"
  }
];
</script>

<template>
  <div>
    <div class="my-4">
      <el-text size="large" type="primary">处理进度</el-text>
    </div>
    <!-- <ReTimeStep :list="list" :current="currentStep"></ReTimeStep> -->
    <el-steps :active="currentStep">
      <el-step :icon="LocationFilled" description="发起申请" />
      <el-step :icon="LocationFilled" description="申请中" />
      <el-step :icon="LocationFilled" description="完成" />
    </el-steps>
    <div class="my-4">
      <el-text size="large" type="primary">申请信息</el-text>
    </div>
    <PureDescriptions :columns="columns" :column="2" />
  </div>
</template>
