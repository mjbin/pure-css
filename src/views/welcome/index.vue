<script setup lang="ts">
import { ref } from "vue";
import AccountStatistics from "./components/accountStatistics.vue";
import SalesSituation from "./components/salesSituation.vue";
import CommissionStatistics from "./components/commissionStatistics.vue";
import OrderStatistics from "./components/orderStatistics.vue";
import CardTable from "./components/CardTable/index.vue";

const activeName = ref("commission");
</script>

<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="8" :span="8">
        <el-card shadow="hover" class="card__px-0">
          <el-tabs :model-value="'commission'">
            <el-tab-pane label="账户统计" name="commission">
              <AccountStatistics />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="16" :span="16">
        <el-card shadow="hover" class="card__px-0">
          <el-tabs :model-value="'sales'">
            <el-tab-pane label="卡片销售情况" name="sales">
              <SalesSituation />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>

    <el-card shadow="hover" class="card__px-0">
      <el-tabs v-model="activeName">
        <el-tab-pane label="佣金统计" name="commission">
          <CommissionStatistics />
        </el-tab-pane>
        <el-tab-pane label="订单统计" name="order">
          <OrderStatistics />
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <el-card shadow="hover" class="card__px-0">
      <el-tabs :model-value="'cardActivate'">
        <el-tab-pane label="卡片激活情况" name="cardActivate">
          <CardTable />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.card__px-0 {
  margin-bottom: 16px;

  :deep(.el-card__body) {
    padding: 14px 20px 20px;
  }

  :deep(.el-tabs__item) {
    padding-bottom: 14px;
    font-size: 16px;
  }
}
</style>
