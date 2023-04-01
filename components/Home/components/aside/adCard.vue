<script lang="ts" setup>
import { useRequest } from '@/utils/useRequest';
import { useRuntimeConfig } from '#imports';
export interface AdList {
  imgURL: string;
  jumpURL: string;
}
export interface GetAdListRes {
  rows: Array<AdList>;
  total: number;
}
const runtimeConfig = useRuntimeConfig();
console.log(runtimeConfig.app.baseURL);

const { data } = await useRequest<GetAdListRes>({
  url: '/advertisement/List',
});
const adList = data.value || undefined;
const handleClose = (index: number) => {
  adList.rows.splice(index, 1);
};
</script>
<template>
  <figure class="ad-wrapper" v-for="(item, index) in adList.rows" :key="item.imgURL">
    <a :href="item.jumpURL">
      <!--  本地环境 -->
      <!-- <img :src="`http://101.35.245.109/${item.imgURL}`" alt="" /> -->
      <!--  生产环境 -->
      <img :src="item.imgURL" alt="网络错误" />
    </a>
    <span class="icon-delete" @click="handleClose(index)"></span>
    <div class="ad-label">
      <span>广告</span>
    </div>
  </figure>
</template>
<style lang="less" scoped>
.ad-wrapper {
  position: relative;
  margin-bottom: 16px;
  width: 240px;
  background: var(--theme-main-base);

  img {
    object-fit: cover;
  }

  &:hover {
    .icon-delete {
      opacity: 1;
    }
  }

  .icon-delete {
    position: absolute;
    top: 12px;
    right: 14px;
    opacity: 0;

    &:hover {
      &::before {
        color: (rgb(236 236 236 / 80%));
      }
    }
  }

  .ad-label {
    position: absolute;
    right: 14px;
    bottom: 12px;
    padding: 4px;
    background: rgb(36 36 36 / 40%);
    border: 1px solid rgb(236 236 236 / 70%);
    border-radius: 4px;
    cursor: pointer;

    span {
      font-size: 12px;
      color: rgb(236 236 236 / 100%);
    }
  }
}
</style>
