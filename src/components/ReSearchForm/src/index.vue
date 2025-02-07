<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { debouncedWatch } from "@vueuse/core";
import SearchTools from "@/components/SearchTools/index.vue";
import ReNumberRange from "@/components/ReNumberRange";
import { SearchForm } from "types/global";

const emit = defineEmits(["change"]);
const formRef = ref();

const props = defineProps({
  formOpt: {
    type: Object as () => SearchForm.FormOpt,
    default: () => {}
  }
});
const params: SearchForm.formData = reactive({});

const resetForm = () => {
  formRef.value.resetFields();
  for (const key in params) {
    params[key] = null;
  }
  // emit("change", params);
};

// 监听表单对象值的变化
debouncedWatch(
  params,
  newVal => {
    emit("change", newVal);
  },
  {
    debounce: 300 // 防抖时间为 500 毫秒
  }
);
// 筛选框折叠展示处理
const handleSelectLabel = (item: SearchForm.FormCondition) => {
  const findItem = item.options.find(sub => sub.id === params[item.prop]);
  return findItem?.name || "全部";
};
// 比对值框折叠展示处理
const handleCompareLabel = (item: SearchForm.FormCondition) => {
  const value = params[item.prop];
  if (!value || value.length === 0) {
    return "全部";
  }
  const [min, max] = value;
  const compareTypeValue = params[item.operatorProp];
  if (compareTypeValue === "gt" || compareTypeValue === undefined) {
    return `> ${min}`;
  } else if (compareTypeValue === "lt") {
    return `< ${max}`;
  } else if (compareTypeValue === "eq") {
    return `= ${min}`;
  } else if (compareTypeValue === "range") {
    return `${min}~${max}`;
  }
  return "--";
};

const changeNumberRange = (
  item: { type: string; value: [] },
  operatorProp: string
) => {
  params[operatorProp] = item.type;
};

// 设置各个搜索组件的初始值
const configParams = (configs: SearchForm.FormCondition[]) => {
  if (Array.isArray(configs)) {
    configs.forEach(config => {
      const propType = typeof config.prop;
      if (propType === "string") {
        params[config.prop] = config.defaultValue
          ? config.defaultValue
          : config.defaultValue === null
            ? null
            : "";
        // 日期时间控件，暂时不需要
        // if (config.itemType === 'daterange' || config.itemType === 'datetimerange') {
        //   params[config.propLabel[0]] = config.defaultValue ? config.defaultValue[0] : ''
        //   params[config.propLabel[1]] = config.defaultValue ? config.defaultValue[1] : ''
        // }
      }
    });
  }
};

onMounted(() => {
  configParams(props.formOpt.conditions);
});
</script>

<template>
  <SearchTools form="form" @clear="resetForm">
    <template #default>
      <div class="flex items-center text-sm">
        <span class="flex-none">筛选条件：</span>
        <div class="flex-auto text-[13px]">
          <div
            v-for="(item, index) in formOpt.conditions"
            :key="index"
            class="mr-3 mt-2 px-4 py-1 inline-block border rounded-full bg-[#eef5fe] border-[#589ef8] text-[#589ef8]"
          >
            <!-- 普通输入框 -->
            <span
              v-if="item.itemType === 'input' || item.itemType === undefined"
              >{{ item["label"] }}:{{ params[item["prop"]] || "全部" }}</span
            >
            <!-- 筛选框 -->
            <span v-else-if="item.itemType === 'select'"
              >{{ item["label"] }}:{{ handleSelectLabel(item) }}</span
            >
            <!-- 对比数值框 -->
            <span v-else-if="item.itemType === 'compareInput'"
              >{{ item["label"] }}:{{ handleCompareLabel(item) }}</span
            >
            <!-- 可在此定义其他通用折叠查询组件 -->
          </div>
        </div>
      </div>
    </template>
    <template #expand>
      <el-form
        ref="formRef"
        name="formRef"
        :model="params"
        :label-position="!!formOpt.inline ? 'left' : 'top'"
        :inline="!!formOpt.inline"
      >
        <el-row class="condition-row" :gutter="32">
          <el-col
            v-for="(condition, index) in formOpt.conditions"
            v-show="!!condition.autoVisible"
            :key="index"
            :sm="condition.sm ? condition.sm : !!formOpt.inline ? 12 : 12"
            :md="condition.md ? condition.md : !!formOpt.inline ? 12 : 8"
            :lg="condition.lg ? condition.lg : !!formOpt.inline ? 8 : 6"
            :xl="condition.xl ? condition.xl : !!formOpt.inline ? 6 : 4"
          >
            <el-form-item
              v-show="!!condition.autoVisible"
              :prop="condition.prop"
              :label="condition.label"
              :class="condition.isRequired ? 'is-required' : ''"
              style="width: 100%"
            >
              <!-- 输入框 -->
              <el-input
                v-if="
                  condition.itemType === 'input' ||
                  condition.itemType === undefined
                "
                v-model="params[condition.prop]"
                :placeholder="condition.placeholder || '全部'"
                clearable
              />
              <!-- 筛选框 -->
              <el-select
                v-else-if="condition.itemType === 'select'"
                v-model="params[condition.prop]"
                style="width: 100%"
                filterable
                :value-key="`key${index}`"
                :clearable="
                  condition.hasOwnProperty('clearable')
                    ? condition.clearable
                    : true
                "
                :multiple="!!condition.multiple"
                :collapse-tags="!!condition.multiple"
                :placeholder="condition.placeholder || '全部'"
              >
                <el-option
                  v-for="(option, optionIndex) in condition.options"
                  :key="`${optionIndex}_local`"
                  :value="
                    typeof option === 'object'
                      ? option[condition.valueKey || 'value']
                      : option
                  "
                  :label="
                    typeof option === 'object'
                      ? option[condition.labelKey || 'label']
                      : option
                  "
                />
              </el-select>
              <!-- 对比数值框 -->
              <re-number-range
                v-else-if="condition.itemType === 'compareInput'"
                v-model="params[condition.prop]"
                :placeholder="condition.placeholder || '请输入'"
                clearable
                @change="changeNumberRange($event, condition.operatorProp)"
              />
              <!-- 可在此定义其他通用查询组件 -->
              <!-- 自定义组件 -->
              <template v-else-if="condition.itemType === 'render'">
                <slot :name="condition.renderName" />
              </template>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </SearchTools>
</template>
