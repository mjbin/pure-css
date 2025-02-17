<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
import rules from "@/utils/rules";

defineOptions({
  name: "UpdatePwd"
});
const userInfoFormRef = ref<FormInstance>();

const userInfos = reactive({
  nickname: "",
  companyName: "",
  oldPwd: "",
  newPwd: "",
  confirmPwd: ""
});

const onSubmit = async (formEl: FormInstance) => {
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log(userInfos);
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>

<template>
  <el-card>
    <h3 class="my-6">修改密码</h3>
    <el-form
      ref="userInfoFormRef"
      class="page-form"
      :model="userInfos"
      label-width="100px"
    >
      <el-row>
        <el-col :md="24" :lg="12" :xl="8">
          <el-form-item label="用户名" prop="nickname"> ccc </el-form-item>
          <el-form-item label="公司名称" prop="companyName"> ccc </el-form-item>
          <el-form-item label="旧密码" prop="oldPwd" :rules="rules.required">
            <el-input
              v-model="userInfos.oldPwd"
              placeholder="请输入旧密码"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="新密码"
            prop="newPwd"
            :rules="rules.validPwd(userInfos.oldPwd)"
          >
            <el-input
              v-model="userInfos.newPwd"
              placeholder="请输入新密码"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="确认密码"
            prop="confirmPwd"
            :rules="rules.validConfirmPwd(userInfos.newPwd)"
          >
            <el-input
              v-model="userInfos.confirmPwd"
              placeholder="请确认新密码"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button
              class="my-4"
              type="primary"
              @click="onSubmit(userInfoFormRef)"
            >
              更新信息
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-alert
        class="warn-banner"
        title="新密码不得与旧密码相同，修改密码后旧密码将不可用"
        type="warning"
        :closable="false"
        show-icon
      />
    </el-form>
  </el-card>
</template>
