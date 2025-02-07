<script setup lang="ts">
import { ref, reactive } from "vue";
import ReSearchForm from "@/components/ReSearchForm";
import "@pureadmin/table/dist/style.css";
import { PureTable } from "@pureadmin/table";
import { SearchForm } from "types/global";

defineOptions({
  name: "SetMenu"
});

const dataList = ref([
  // {
  //   date: "2016-05-02",
  //   name: "王小虎",
  //   address: "上海市普陀区金沙江路 1518 弄"
  // },
  // {
  //   date: "2016-05-04",
  //   name: "王小虎",
  //   address: "上海市普陀区金沙江路 1517 弄"
  // },
  {
    date: "2016-05-01"
  }
]);

const columns = reactive([
  {
    label: "套餐编码",
    prop: "date",
    width: "180px"
  },
  {
    label: "姓名",
    prop: "name",
    width: "180px"
  },
  {
    label: "地址",
    prop: "address"
  }
]);

const formOpt = reactive<SearchForm.FormOpt>({
  inline: true,
  conditions: [
    {
      label: "套餐编码",
      prop: "applicant",
      lg: 6,
      xl: 4,
      defaultValue: "",
      autoVisible: true
    },
    {
      label: "筛选框",
      prop: "name",
      lg: 6,
      xl: 4,
      autoVisible: true,
      itemType: "select",
      multiple: false,
      options: [
        {
          id: "option1",
          name: "选项1"
        },
        {
          id: "option2",
          name: "选项2"
        }
      ],
      valueKey: "id",
      labelKey: "name",
      clearable: true,
      defaultValue: ""
    },
    {
      label: "范围",
      prop: "fanwei",
      operatorProp: "fanwei_operator",
      itemType: "compareInput",
      lg: 6,
      xl: 4,
      defaultValue: [],
      placeholder: "请输入",
      autoVisible: true
    }
  ]
});

const handleSearch = (form: SearchForm.formData) => {
  console.log("search", form);
};
</script>

<template>
  <div>
    <ReSearchForm :form-opt="formOpt" @change="handleSearch" />
    <el-card shadow="never" class="mt-4">
      <pure-table locale="zhCn" :data="dataList" :columns="columns" />
    </el-card>
  </div>
</template>
