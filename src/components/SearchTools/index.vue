<template>
  <el-card>
    <div class="flex">
      <div class="flex-auto">
        <div v-show="!isExpanded">
          <slot />
        </div>
        <div v-show="isExpanded">
          <slot name="expand" />
        </div>
      </div>
      <div class="flex-none pl-2 ml-4 flex">
        <IconifyIconOffline
          class="text-[28px] cursor-pointer hover:text-primary bg-[#F2F3F6] rounded-xl px-[4px] mr-2"
          :icon="BrushLine"
          @click="reset"
        />
        <IconifyIconOffline
          v-show="!isExpanded"
          class="text-[28px] cursor-pointer hover:text-primary bg-[#F2F3F6] rounded-xl px-[4px]"
          :icon="ArrowDownDoubleFill"
          @click="toggle"
        />
        <IconifyIconOffline
          v-show="isExpanded"
          class="text-[28px] cursor-pointer hover:text-primary bg-[#F2F3F6] rounded-xl px-[4px]"
          :icon="ArrowUpDoubleFill"
          @click="toggle"
        />
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import BrushLine from "@iconify-icons/ri/brush-2-line";
import ArrowDownDoubleFill from "@iconify-icons/ri/arrow-down-double-fill";
import ArrowUpDoubleFill from "@iconify-icons/ri/arrow-up-double-fill";

const emit = defineEmits(["clear"]);
const isExpanded = ref(true);
const toggle = () => {
  isExpanded.value = !isExpanded.value;
};

const reset = () => {
  emit("clear");
};
</script>
