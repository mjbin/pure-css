<script setup lang="ts">
import { reactive, computed, ref } from "vue";
import SearchTools from "@/components/SearchTools/index.vue";

const emit = defineEmits(["change"]);
const formRef = ref();

const form = reactive({
  input: "",
  input2: ""
});

const formLabels = reactive({
  input: "输入框",
  input2: "输入框2"
});

const filters = computed(() => {
  return Object.keys(form);
});

const rules = reactive({
  input: [
    {
      required: true,
      message: "请输入输入框",
      trigger: "blur"
    }
  ]
});

const resetForm = () => {
  formRef.value.resetFields();
  emit("change", form);
};

const onChange = () => {
  emit("change", form);
};
</script>

<template>
  <SearchTools form="form" @clear="resetForm">
    <template #default>
      <div class="flex items-center text-sm">
        <span class="flex-none">筛选条件：</span>
        <div class="flex-auto text-[13px]">
          <span
            v-for="(key, index) in filters"
            :key="index"
            class="mr-3 px-4 py-1 inline-block border rounded-full bg-[#eef5fe] border-[#589ef8] text-[#589ef8]"
          >
            {{ formLabels[key] }}:{{ form[key] || "全部" }}
          </span>
        </div>
      </div>
    </template>
    <template #expand>
      <el-form ref="formRef" :model="form" :rules="rules">
        <el-form-item prop="input" :label="formLabels['input']">
          <el-input v-model="form.input" @change="onChange" />
        </el-form-item>

        <el-form-item prop="input2" :label="formLabels['input2']">
          <el-input v-model="form.input2" @change="onChange" />
        </el-form-item>
      </el-form>
    </template>
  </SearchTools>
</template>
