<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import dayjs from "dayjs";
import { debouncedWatch } from "@vueuse/core";
import SearchTools from "@/components/SearchTools/index.vue";
import ReNumberRange from "@/components/ReNumberRange";
import ReDateRange from "@/components/ReDateRange";
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
  // 如果不可修改，不重新赋值为原来的默认值
  props.formOpt.conditions?.forEach(config => {
    if (config.disabled) {
      params[config.prop] = config.defaultValue;
    }
  });
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
// 日期筛选器快捷选项
function formatShortCuts(startInit: string, endInit: string) {
  const today = dayjs();
  return [
    {
      text: "昨天",
      value: () => {
        return [
          today.subtract(1, "d").format(startInit),
          today.subtract(1, "d").format(endInit)
        ];
      }
    },
    {
      text: "当天",
      value: () => {
        return [today.format(startInit), today.format(endInit)];
      }
    },
    {
      text: "当月",
      value: () => {
        return [
          today.startOf("month").format(startInit),
          today.format(endInit)
        ];
      }
    },
    {
      text: "最近一周",
      value: () => {
        return [
          today.subtract(1, "w").format(startInit),
          today.format(endInit)
        ];
      }
    },
    {
      text: "最近一个月",
      value: () => {
        return [
          today.subtract(1, "M").format(startInit),
          today.format(endInit)
        ];
      }
    }
  ];
}

const defaultTime: [Date, Date] = [
  new Date(2000, 1, 1, 0, 0, 0),
  new Date(2000, 2, 1, 23, 59, 59)
];
// 日期时间选择器处理
const handleDate = (e: string[], condition: SearchForm.FormCondition) => {
  if (!condition.propLabel) {
    return;
  }
  if (e) {
    params[condition.propLabel[0]] = e[0];
    params[condition.propLabel[1]] = e[1];
  } else {
    params[condition.propLabel[0]] = null;
    params[condition.propLabel[1]] = null;
  }
};

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
// 日期时间范围框折叠展示处理
const handleDateTimeLable = (item: SearchForm.FormCondition) => {
  const value = params[item.prop];
  if (value?.length) {
    return value.join(" ~ ");
  }
  return "全部";
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
        // 日期时间控件的默认值设置
        if (
          config.itemType === "daterange" ||
          config.itemType === "datetimerange"
        ) {
          params[config.propLabel[0]] = config.defaultValue
            ? config.defaultValue[0]
            : "";
          params[config.propLabel[1]] = config.defaultValue
            ? config.defaultValue[1]
            : "";
        }
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
            <!-- 普通输入框 / 单个日期框 -->
            <span
              v-if="
                item.itemType === 'input' ||
                item.itemType === 'date' ||
                item.itemType === undefined
              "
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
            <!-- 日期/时间范围框 -->
            <span
              v-else-if="
                item.itemType === 'daterange' ||
                item.itemType === 'datetimerange' ||
                item.itemType === 'customDate'
              "
              >{{ item["label"] }}:{{ handleDateTimeLable(item) }}</span
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
                :disabled="condition.disabled"
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
              <!-- 日期控件 -->
              <el-date-picker
                v-else-if="condition.itemType === 'date'"
                v-model="params[condition.prop]"
                type="date"
                value-format="YYYY-MM-DD"
                :placeholder="condition.placeholder || '请选择'"
              />
              <!-- 日期范围控件 -->
              <el-date-picker
                v-else-if="condition.itemType === 'daterange'"
                v-model="params[condition.prop]"
                :unlink-panels="true"
                style="width: 100%"
                value-format="YYYY-MM-DD"
                :shortcuts="formatShortCuts('YYYY-MM-DD', 'YYYY-MM-DD')"
                type="daterange"
                :clearable="
                  condition.hasOwnProperty('clearable')
                    ? condition.clearable
                    : true
                "
                range-separator="-"
                :start-placeholder="
                  (condition.placeholder && condition.placeholder[0]) ||
                  '请选择'
                "
                :end-placeholder="
                  (condition.placeholder && condition.placeholder[1]) ||
                  '请选择'
                "
                @change="handleDate(params[condition.prop], condition)"
              />
              <!-- 日期时间范围控件 -->
              <el-date-picker
                v-else-if="condition.itemType === 'datetimerange'"
                v-model="params[condition.prop]"
                :unlink-panels="true"
                style="width: 100%"
                :default-time="defaultTime"
                value-format="YYYY-MM-DD HH:mm:ss"
                :shortcuts="
                  formatShortCuts('YYYY-MM-DD 00:00:00', 'YYYY-MM-DD 23:59:59')
                "
                type="datetimerange"
                :clearable="
                  condition.hasOwnProperty('clearable')
                    ? condition.clearable
                    : true
                "
                range-separator="-"
                :start-placeholder="
                  (condition.placeholder && condition.placeholder[0]) ||
                  '请选择'
                "
                :end-placeholder="
                  (condition.placeholder && condition.placeholder[1]) ||
                  '请选择'
                "
                @change="handleDate(params[condition.prop], condition)"
              />
              <re-date-range
                v-else-if="condition.itemType === 'customDate'"
                v-model="params[condition.prop]"
                defaultDateBtn="全部"
                :btnOptions="[
                  '全部',
                  '今日',
                  '昨日',
                  '本周',
                  '上周',
                  '本月',
                  '上月'
                ]"
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
