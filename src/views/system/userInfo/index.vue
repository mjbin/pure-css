<script setup lang="ts">
import { reactive, ref } from "vue";
// import { formUpload } from "@/api/mock";
// import { message } from "@/utils/message";
// import { type UserInfo, getMine } from "@/api/user";
import type { FormInstance } from "element-plus";
import ReCropperPreview from "@/components/ReCropperPreview";
import { createFormData, deviceDetection } from "@pureadmin/utils";
import uploadLine from "@iconify-icons/ri/upload-line";
import rules from "@/utils/rules";

defineOptions({
  name: "UserInfo"
});

const imgSrc = ref("");
const cropperBlob = ref();
const cropRef = ref();
const uploadRef = ref();
const isShow = ref(false);
const userInfoFormRef = ref<FormInstance>();

const userInfos = reactive({
  avatar: "",
  nickname: "",
  companyName: "",
  contacts: "",
  email: "",
  phone: "",
  description: ""
});

function queryEmail(queryString, callback) {
  const emailList = [
    { value: "@qq.com" },
    { value: "@126.com" },
    { value: "@163.com" }
  ];
  let results: { value: string }[] = [];
  let queryList: { value: string }[] = [];
  emailList.map(item =>
    queryList.push({ value: queryString.split("@")[0] + item.value })
  );
  results = queryString
    ? queryList.filter(
        item =>
          item.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      )
    : queryList;
  callback(results);
}

const onChange = uploadFile => {
  const reader = new FileReader();
  reader.onload = e => {
    imgSrc.value = e.target?.result as string;
    isShow.value = true;
  };
  reader.readAsDataURL(uploadFile.raw);
};

const handleClose = () => {
  cropRef.value.hidePopover();
  uploadRef.value.clearFiles();
  isShow.value = false;
};

const onCropper = ({ blob }) => (cropperBlob.value = blob);

const handleSubmitImage = () => {
  const formData = createFormData({
    files: new File([cropperBlob.value], "avatar")
  });
  handleClose();
  const imgUrl = URL.createObjectURL(cropperBlob.value);
  userInfos.avatar = imgUrl;
  // formUpload(formData)
  //   .then(({ success, data }) => {
  //     if (success) {
  //       message("更新头像成功", { type: "success" });
  //       handleClose();
  //     } else {
  //       message("更新头像失败");
  //     }
  //   })
  //   .catch(error => {
  //     message(`提交异常 ${error}`, { type: "error" });
  //   });
};

// 更新信息
const onSubmit = async (formEl: FormInstance) => {
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log(userInfos);
      // message("更新信息成功", { type: "success" });
    } else {
      console.log("error submit!", fields);
    }
  });
};

// getMine().then(res => {
//   Object.assign(userInfos, res.data);
// });
</script>

<template>
  <el-card>
    <h3 class="my-6">个人信息</h3>
    <el-form ref="userInfoFormRef" :model="userInfos" label-width="100px">
      <el-row>
        <el-col :md="24" :lg="12">
          <el-form-item label="头像">
            <el-avatar :size="80" :src="userInfos.avatar" />
            <el-upload
              ref="uploadRef"
              accept="image/*"
              action="#"
              :limit="1"
              :auto-upload="false"
              :show-file-list="false"
              :on-change="onChange"
            >
              <el-button plain class="ml-4">
                <IconifyIconOffline :icon="uploadLine" />
                <span class="ml-2">修改头像</span>
              </el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="用户名" prop="nickname"> ccc </el-form-item>
          <el-form-item
            label="公司名称"
            prop="companyName"
            :rules="rules.required"
          >
            <el-input
              v-model="userInfos.companyName"
              placeholder="请输入公司名称"
              clearable
            />
          </el-form-item>
          <el-form-item label="联系人" prop="contacts" :rules="rules.required">
            <el-input
              v-model="userInfos.contacts"
              placeholder="请输入联系人"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="联系电话"
            prop="phone"
            :rules="rules.validatePhone(true)"
          >
            <el-input
              v-model="userInfos.phone"
              placeholder="请输入联系电话"
              clearable
            />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-autocomplete
              v-model="userInfos.email"
              :fetch-suggestions="queryEmail"
              :trigger-on-focus="false"
              placeholder="请输入邮箱"
              clearable
              class="w-full"
            />
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              v-model="userInfos.description"
              placeholder="请输入备注"
              type="textarea"
              :autosize="{ minRows: 6, maxRows: 8 }"
              maxlength="56"
              show-word-limit
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-alert
        title="请填写正确的联系电话，该号码将用于接收订单发货的短信通知，确保信息准确无误以便及时获取物流通知"
        type="warning"
        :closable="false"
        show-icon
      />
      <el-button
        class="my-4 float-right"
        type="primary"
        @click="onSubmit(userInfoFormRef)"
      >
        更新信息
      </el-button>
    </el-form>
    <el-dialog
      v-model="isShow"
      width="40%"
      title="编辑头像"
      destroy-on-close
      :closeOnClickModal="false"
      :before-close="handleClose"
      :fullscreen="deviceDetection()"
    >
      <ReCropperPreview ref="cropRef" :imgSrc="imgSrc" @cropper="onCropper" />
      <template #footer>
        <div class="dialog-footer">
          <el-button bg text @click="handleClose">取消</el-button>
          <el-button bg text type="primary" @click="handleSubmitImage">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </el-card>
</template>
