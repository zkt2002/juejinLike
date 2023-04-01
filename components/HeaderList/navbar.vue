<script setup lang="ts">
import { ref, toRefs, useRoute, computed } from '#imports';
import { HeaderTab, useHeaderTab } from '@/composables/useHeaderTab';

// 获取数据
const headerTabList = ref<Array<HeaderTab>>();
const { data, error } = await useHeaderTab();
if (data.value) {
  headerTabList.value = data.value.rows;
} else {
  console.log('HeaderTab获取失败', error.value?.message);
}

const { path } = toRefs(useRoute());
const Display = ref('none');
const curIndex = computed(() => {
  if (!headerTabList.value) return;
  return headerTabList.value.find((tab) => tab.jumpURL === path.value)?.tabName || '首页';
});
const showMenu = () => {
  Display.value = Display.value === 'none' ? 'flex' : 'none';
};
</script>
<template>
  <div class="navbar">
    <div :class="['cur-menu']" @click="showMenu">
      <span class="main-menu">{{ curIndex }}</span>
      <span :class="['icon-tri', Display === 'flex' ? 'actived' : '']"></span>
    </div>
    <ul :class="['header-list', Display === 'flex' ? 'actived' : '']">
      <li class="header-list-item" v-for="tab in headerTabList" :key="tab.tabName">
        <NuxtLink :to="tab.jumpURL">
          <span :class="['tab-item', path === tab.jumpURL ? 'cur-index' : '']">{{ tab.tabName }}</span>
          <span class="superscript" v-if="tab.superscript">{{ tab.superscript }}</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style lang="less">
.navbar {
  position: relative;
  display: flex;
  align-items: center;
}

.cur-menu {
  display: none;

  .icon-tri {
    font-size: 4px;
    transition: all 0.2s linear;
  }
}

.cur-index {
  color: var(--theme-main-color);
}

.header-list {
  position: relative;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: var(--theme-headerlist);

  li {
    padding: 0 12px;
    height: 60px;
    transition: color 0.2s linear;

    .tab-item {
      line-height: 60px;
    }

    &:hover ~ {
      border-bottom: 2px solid var(--theme-main-color);
    }
  }

  .header-list-item {
    position: relative;

    .superscript {
      position: absolute;
      top: 5px;
      left: 7px;
      z-index: 9;
      padding: 2px 7px;
      height: auto;
      font-size: 16px;
      text-align: center;
      white-space: nowrap;
      color: #fff;
      background-color: #ee502f;
      border-radius: 50px;
      font-weight: 500;
      transform: scale(0.5);
      line-height: 18px;
    }
  }

  a,
  span {
    display: block;
    height: inherit;
  }
}

@media screen and (max-width: 1100px) {
  .header-list {
    position: absolute;
    top: 52px;
    left: -54px;
    z-index: 999;
    display: none;
    padding: 8px;
    width: 160px;
    background: var(--theme-main-base);
    border-radius: 4px;
    box-shadow: 0 3px 15px rgb(0 0 0 / 10%);
    flex-direction: column;

    &.actived {
      display: flex;
    }

    li {
      height: 48px;

      span {
        line-height: 48px;
      }
    }
  }

  .cur-menu {
    display: flex;
    align-items: center;
    padding: 0 12px;
    color: var(--theme-main-color);

    .main-menu {
      margin-right: 4px;
      font-size: 16px;
    }

    .actived {
      color: var(--theme-main-color);
      transform: rotate(-180deg);

      &::before {
        color: var(--theme-main-color);
      }
    }
  }
}
</style>
