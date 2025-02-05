<script setup lang="ts">
import AccountStatistics from "./components/accountStatistics.vue";
</script>

<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="8" :span="8">
        <el-card shadow="hover" class="card">
          <template #header>
            <span class="text-[#4aa4ea] font-bold border-b-2 pb-4"
              >账户统计</span
            >
          </template>
          <div>
            <AccountStatistics />
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="16" :span="16">
        <el-card shadow="hover" class="card">
          <template #header>
            <span class="text-[#4aa4ea] font-bold border-b-2 pb-4"
              >卡片销售情况</span
            >
          </template>
          <div>456</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.card {
  margin-bottom: 16px;

  :deep(.el-card__header) {
    padding: 14px 20px;
  }
}
</style>
