<script setup lang="ts">
import { ref } from "vue";
import rules from "@/utils/rules";
import ReCol from "@/components/ReCol";

const props = defineProps({
  formInline: {
    type: Object,
    default: () => ({
      name: "",
      code: "",
      remark: ""
    })
  }
});

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
</script>

<template>
  <el-form ref="ruleFormRef" :model="newFormInline" label-width="100px">
    <el-alert
      class="warn-banner"
      :closable="false"
      title=""
      type="warning"
      show-icon
    >
      <div class="flex flex-col">
        <div>1.无论交易金额大小，用户都需支付固定的手续费金额</div>
        <div>
          2.手续费根据交易金额的一定比例来计算，佣金费率可能设定为交易金额的0.1%至0.3%不等
        </div>
      </div>
    </el-alert>
    <el-row class="mt-4" :gutter="30">
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="用户名" prop="name"> ccc </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="可提现金额" prop="oldPrice"> 777 </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="提现金额" prop="price" :rules="rules.required">
          <el-input
            v-model="newFormInline.price"
            clearable
            placeholder="请输入提现金额"
          />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="提现手续费" prop="oldPrice"> 12.00 </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="提现账号" prop="name"> 663331 </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="开户名称" prop="oldPrice"> ccc </el-form-item>
      </re-col>
    </el-row>
    <el-form-item label="开户行" prop="remark"> 建设银行 </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input
        v-model="newFormInline.remark"
        placeholder="请输入备注"
        type="textarea"
        :rows="5"
      />
    </el-form-item>
  </el-form>
</template>
