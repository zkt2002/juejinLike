<template>
  <div class="more-article-block">
    <div class="block-title">相关文章</div>
    <div class="article-items">
      <div class="item" v-for="i in aboutArticlesList" :key="i">
        <a :href="`${runtimeConfig.app.baseURL}article/${i.id}`">
          <div class="article-title show-title" :title="i.title">{{ i.title }}</div>
          <div class="article-meta">{{ i.like }}点赞&nbsp;·&nbsp;{{ i.view }}评论</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, useRuntimeConfig } from '#imports';
const runtimeConfig = useRuntimeConfig();
//获取传来的数据
const props = defineProps({
  list: {},
});
const aboutArticlesList = ref({});
// eslint-disable-next-line vue/no-setup-props-destructure
aboutArticlesList.value = props.list;
</script>

<style lang="less" scoped>
.more-article-block {
  margin-bottom: 20px;
  background-color: var(--theme-main-base);
  border-radius: 4px 4px 0 0;

  .block-title {
    padding: 15px 0;
    margin: 0 20px;
    font-size: 16px;
    color: var(--theme-model-title);
    font-weight: 500;
    border-bottom: 1px solid #e4e6eb;
  }

  .article-items {
    box-sizing: border-box;
    padding: 8px 0 16px;

    .item {
      padding: 8px 0;
      margin: 0 20px;

      .article-title {
        font-size: 14px;
        color: var(--theme-model-title);
        line-height: 20px;
        font-weight: 400;
      }

      .show-title {
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .article-meta {
        margin-top: 8px;
        font-size: 14px;
        color: #8a919f;
        line-height: 14px;
      }
    }

    .item:hover {
      .article-title {
        color: var(--theme-relart-hover);
      }
    }
  }

  a {
    text-decoration: none;
  }
}
</style>
