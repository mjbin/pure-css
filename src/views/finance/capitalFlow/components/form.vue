<script setup lang="ts">
import { ref } from "vue";
import ReSearchForm from "@/components/ReSearchForm";
import { SearchForm } from "types/global";
import { Download } from "@element-plus/icons-vue";

const props = defineProps({
  formInline: {
    type: Object,
    default: () => ({
      id: ""
    })
  }
});
const newFormInline = ref(props.formInline);
const typeOptions = [
  {
    id: 1,
    name: "变动类型1"
  },
  {
    id: 0,
    name: "变动类型2"
  }
];

// 查询配置项
const formOpt = ref<SearchForm.FormOpt>({
  inline: true,
  conditions: [
    {
      label: "查询日期",
      prop: "date",
      lg: 6,
      xl: 6,
      placeholder: "请选择日期",
      autoVisible: true,
      clearable: false,
      itemType: "date",
      defaultValue: ""
    },
    {
      label: "变动类型",
      prop: "type",
      lg: 6,
      xl: 6,
      autoVisible: true,
      itemType: "select",
      multiple: false,
      options: typeOptions,
      valueKey: "id",
      labelKey: "name",
      clearable: true,
      defaultValue: ""
    },
    {
      label: "变动单号",
      prop: "orderNo",
      lg: 6,
      xl: 6,
      defaultValue: "",
      autoVisible: true
    }
  ]
});
const handleSearch = (form: SearchForm.formData) => {
  console.log("search", form);
};
const dataList = ref([
  {
    batchNo: "2025-02-10",
    cardCount: "100"
  },
  {
    batchNo: "2025-02-10",
    cardCount: "100"
  }
]);
const loading = ref(false);
const columns: TableColumnList = [
  {
    label: "变动日期",
    prop: "batchNo"
  },
  {
    label: "变动类型",
    prop: "cardCount"
  },
  {
    label: "变动金额",
    prop: "cardCount"
  },
  {
    label: "变动前账户余额",
    prop: "cardCount"
  },
  {
    label: "变动后账户余额",
    prop: "cardCount"
  },
  {
    label: "变动单号",
    prop: "cardCount"
  }
];
</script>

<template>
  <div>
    <ReSearchForm :form-opt="formOpt" @change="handleSearch" />
    <el-card shadow="never" class="mt-4">
      <div class="mb-4">
        <el-button type="primary" :icon="Download">导出</el-button>
      </div>
      <pure-table
        row-key="id"
        alignWhole="center"
        border
        showOverflowTooltip
        :loading="loading"
        :loading-config="{ background: 'transparent' }"
        :data="dataList"
        :columns="columns"
      >
        <template #empty>
          <el-empty description="暂无数据" :image-size="60" />
        </template>
      </pure-table>
    </el-card>
  </div>
</template>
