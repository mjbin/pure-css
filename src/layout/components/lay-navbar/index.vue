<script setup lang="ts">
import { unref } from "vue";
import { useNav } from "@/layout/hooks/useNav";
import { useTags } from "../../hooks/useTag";
import { handleAliveRoute } from "@/router/utils";
// import LaySearch from "../lay-search/index.vue";
// import LayNotice from "../lay-notice/index.vue";
// import LayNavMix from "../lay-sidebar/NavMix.vue";
import LaySidebarFullScreen from "../lay-sidebar/components/SidebarFullScreen.vue";
// import LaySidebarBreadCrumb from "../lay-sidebar/components/SidebarBreadCrumb.vue";
// import LaySidebarTopCollapse from "../lay-sidebar/components/SidebarTopCollapse.vue";

import LogoutCircleRLine from "@iconify-icons/ri/logout-circle-r-line";
// import RefreshRight from "@iconify-icons/ep/refresh-right";
import User from "@iconify-icons/ep/user";
import Setting from "@iconify-icons/ri/settings-3-line";

const { route, router } = useTags();

// function onFresh() {
//   const { fullPath, query } = unref(route);
//   router.replace({
//     path: "/redirect" + fullPath,
//     query
//   });
//   handleAliveRoute(route as ToRouteType, "refresh");
// }

const {
  layout,
  // device,
  logout,
  // onPanel,
  // pureApp,
  username,
  userAvatar,
  avatarsStyle
  // toggleSideBar
} = useNav();
</script>

<template>
  <div class="navbar bg-primary shadow-sm shadow-[rgba(0,21,41,0.08)]">
    <!-- <LaySidebarTopCollapse
      class="hamburger-container"
      :is-active="pureApp.sidebar.opened"
      @toggleClick="toggleSideBar"
    />

    <div class="hamburger-container">
      <IconifyIconOffline
        :icon="RefreshRight"
        class="hover:text-primary"
        @click="onFresh"
      />
    </div> -->

    <!-- <LaySidebarBreadCrumb
      v-if="layout !== 'mix' && device !== 'mobile'"
      class="breadcrumb-container"
    /> -->

    <!-- <LayNavMix v-if="layout === 'mix'" /> -->

    <div v-if="layout === 'vertical'" class="vertical-header-right">
      <!-- 菜单搜索 -->
      <!-- <LaySearch id="header-search" /> -->
      <!-- 全屏 -->
      <!-- <LaySidebarFullScreen id="full-screen" /> -->
      <!-- 消息通知 -->
      <!-- <LayNotice id="header-notice" /> -->
      <!-- 退出登录 -->
      <el-dropdown trigger="click">
        <span class="el-dropdown-link navbar-bg-hover select-none">
          <img :src="userAvatar" :style="avatarsStyle" />
          <p v-if="username" class="dark:text-white">{{ username }}</p>
        </span>
        <template #dropdown>
          <el-dropdown-item @click="router.push({ name: 'UserInfo' })">
            <IconifyIconOffline :icon="User" class="mr-[5px]" />
            基本资料
          </el-dropdown-item>
          <el-dropdown-item @click="router.push({ name: 'UpdatePwd' })">
            <IconifyIconOffline :icon="Setting" class="mr-[5px]" />
            修改密码
          </el-dropdown-item>
          <el-dropdown-menu class="logout">
            <el-dropdown-item @click="logout">
              <IconifyIconOffline :icon="LogoutCircleRLine" class="mr-[5px]" />
              退出系统
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <LaySidebarFullScreen id="full-screen" />
      <!-- <span
        class="set-icon navbar-bg-hover"
        title="打开系统配置"
        @click="onPanel"
      >
        <IconifyIconOffline :icon="Setting" />
      </span> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 48px;
  overflow: hidden;

  .hamburger-container {
    display: flex;
    align-items: center;
    float: left;
    height: 100%;
    padding: 0 10px;
    line-height: 48px;
    cursor: pointer;
  }

  .vertical-header-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-width: 280px;
    height: 48px;
    // color: #000000d9;
    color: #fff;

    .el-dropdown-link {
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 2px 8px;
      // height: 48px;
      // padding: 10px;
      color: var(--el-color-primary);
      cursor: pointer;
      background: #fff;
      border-radius: 30px;

      p {
        font-size: 14px;
      }

      img {
        width: 22px;
        height: 22px;
        border-radius: 50%;
      }
    }
  }

  .breadcrumb-container {
    float: left;
    margin-left: 16px;
  }
}

.logout {
  width: 120px;

  ::v-deep(.el-dropdown-menu__item) {
    display: inline-flex;
    flex-wrap: wrap;
    min-width: 100%;
  }
}
</style>
