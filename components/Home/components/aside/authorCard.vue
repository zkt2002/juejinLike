<script lang="ts" setup>
import { ref, reactive, useRuntimeConfig } from '#imports';

import { Ref } from 'vue';

import { HomeAuthorItem, useAuthorList } from '~~/composables/useHome';
const runtimeConfig = useRuntimeConfig();
const authorList = reactive({
  rows: [] as Array<HomeAuthorItem>,
});

const showAuthor: Ref<Array<HomeAuthorItem>> = ref([]);
const { data: homeAuthorList } = await useAuthorList();
if (homeAuthorList) authorList.rows = homeAuthorList.value.rows;
if (authorList.rows.length > 3) showAuthor.value = authorList.rows.filter((v, index) => index < 3);
function changeAuthorList() {
  if (showAuthor.value.length <= 3) {
    showAuthor.value = authorList.rows.filter((v, index) => index < 10);
  } else {
    showAuthor.value = authorList.rows.filter((v, index) => index < 3);
  }
}
</script>
<template>
  <div class="sidebar-block">
    <div class="recommend-author-block">
      <header class="user-block-header">🎖️作者榜</header>
      <div v-if="authorList.rows.length <= 3">
        <a class="link" v-for="item in authorList.rows" :key="item.avatarURL">
          <img :src="item.avatarURL" class="avatar" />
          <div class="userInfo">
            <a class="username">
              <span class="name">{{ item.authorName }}</span>

              <img class="rank" :src="`${runtimeConfig.app.baseURL}img/lv/lv-${item.level}.png`" />
            </a>
            <div class="position">{{ item.description }}</div>
          </div>
        </a>
      </div>
      <div v-else-if="authorList.rows.length > 3">
        <a class="link" v-for="item in showAuthor" :key="item.avatarURL">
          <img :src="item.avatarURL" class="avatar" />
          <div class="userInfo">
            <a class="username">
              <span class="name">{{ item.authorName }}</span>
              <img class="rank" :src="`${runtimeConfig.app.baseURL}img/lv/lv-${item.level}.png`" />
            </a>
            <div class="position">{{ item.description }}</div>
          </div>
        </a>
        <a @click="changeAuthorList">
          <div class="more">
            <span v-if="showAuthor.length <= 3">完整榜单 ></span>
            <span v-else-if="showAuthor.length > 3">完整榜单 {{ '<' }}</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
<style lang="less">
.sidebar-block {
  margin-bottom: 1.3rem;
  font-size: 1.16rem;
  color: #333;
  background-color: var(--theme-main-base);
  border-radius: 2px;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
  line-height: 1.29;

  .recommend-author-block {
    background-color: var(--theme-main-base);

    .user-block-header {
      padding: 1rem 1.3rem;
      border-bottom: 1px solid hsl(0deg 0% 59.2% / 10%);
      color: var(--theme-artlist-title);
    }

    .link {
      display: flex;
      align-items: center;
      padding: 1rem 1.3rem;
      cursor: pointer;

      .avatar {
        position: relative;
        display: inline-block;
        margin-right: 0.5rem;
        width: 3.8rem;
        height: 3.8rem;
        background-position: 50%;
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 50%;
        flex: 0 0 auto;
      }

      .user-info {
        overflow: hidden;
      }

      .username {
        display: flex;
        align-items: center;
        overflow: hidden;
        margin-bottom: 3px;
        font-size: 14px;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: var(--theme-artlist-title);
        font-weight: 400;

        .name {
          display: inline-block;
          overflow: hidden;
          max-width: 130px;
          text-overflow: ellipsis;
          white-space: nowrap;
          vertical-align: top;
        }

        .rank {
          display: inline-flex;
          display: inline-block;
          align-items: center;
          margin-left: 0.33rem;
          width: 35px;
          height: 16px;
          vertical-align: middle;

          img {
            width: 35px;
            height: 16px;
          }
        }
      }

      .position {
        overflow: hidden;
        margin-bottom: 3px;
        font-size: 1rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #909090;
      }
    }

    .link:hover {
      background-color: var(--theme-artlist-hover);
    }
  }

  .more {
    padding: 1rem 0;
    text-align: center;
    color: var(--theme-main-color);
    border-top: 1px solid hsl(0deg 0% 59.2% / 10%);
  }
}
</style>
