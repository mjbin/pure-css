<script setup lang="ts">
import { ref, reactive } from "vue";
import rules from "@/utils/rules";
import ReCol from "@/components/ReCol";
import { PureDescriptions } from "@pureadmin/descriptions";

// const props = withDefaults(defineProps<Props>(), {
//   formInline: () => ({
//     name: "",
//     code: "",
//     remark: ""
//   })
// });
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

const isHotOptions = reactive([
  {
    id: 1,
    name: "是"
  },
  {
    id: 0,
    name: "否"
  }
]);

const columns = [
  {
    label: "所属用户",
    value: "ccc"
  },
  {
    label: "类型",
    value: "标准套餐"
  },
  {
    label: "G类型",
    value: "4G"
  },
  {
    label: "编码",
    value: "liangnian#120//199/4G"
  },
  {
    label: "名称",
    value: "www"
  },
  {
    label: "状态",
    value: "是"
  },
  {
    label: "二级类型",
    value: "收费"
  },
  {
    label: "顺序",
    value: "5"
  },
  {
    label: "上架渠道",
    value: "主页"
  },
  {
    label: "套餐价格",
    value: "5"
  },
  {
    label: "上架楼层",
    value: "30个月套餐"
  },
  {
    label: "赠送流量数",
    value: "30"
  },
  {
    label: "有效期(月)",
    value: "30"
  },
  {
    label: "赠送语音数",
    value: "30"
  }
];

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :disabled="!!newFormInline.id"
    label-width="80px"
  >
    <div class="my-2">
      <el-text size="large" type="primary">自定义信息</el-text>
    </div>
    <el-row :gutter="30">
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="副标题" prop="name" :rules="rules.required">
          <el-input
            v-model="newFormInline.name"
            clearable
            placeholder="请输入副标题"
          />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="套餐原价" prop="oldPrice">
          <el-input
            v-model="newFormInline.oldPrice"
            clearable
            placeholder="请输入套餐原价"
          />
        </el-form-item>
      </re-col>
    </el-row>
    <el-form-item label="是否热门" prop="isHot" :rules="rules.select">
      <el-select v-model="newFormInline.isHot" placeholder="请选择">
        <el-option
          v-for="item in isHotOptions"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="语音描述" prop="remark" :rules="rules.required">
      <el-input
        v-model="newFormInline.remark"
        placeholder="请输入语音描述"
        type="textarea"
      />
    </el-form-item>
    <el-form-item label="流量描述" prop="remark" :rules="rules.required">
      <el-input
        v-model="newFormInline.remark"
        placeholder="请输入流量描述"
        type="textarea"
      />
    </el-form-item>
    <el-form-item label="备注" prop="remark" :rules="rules.required">
      <el-input
        v-model="newFormInline.remark"
        placeholder="请输入备注"
        type="textarea"
      />
    </el-form-item>
    <div class="my-2">
      <el-text size="large" type="primary">基本信息</el-text>
    </div>
    <PureDescriptions border :columns="columns" :column="2" />
  </el-form>
</template>
