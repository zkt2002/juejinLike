<template>
  <div class="detail-main">
    <div>
      <div class="article-title">
        <h1>{{ articleData.title }}</h1>
      </div>
      <div class="author-box">
        <div class="author-title">
          <a href="" class="avator-link">
            <img :src="authorInfo.avatarURL" alt="" class="author-avator" />
          </a>
          <div class="author-info-box">
            <div class="author-info">
              <span class="author-name">{{ authorInfo.authorName }}</span>
              &nbsp;
              <img
                class="rank"
                :src="`${runtimeConfig.app.baseURL}img/lv/lv-${authorInfo.level}.png`"
                :alt="authorInfo.level"
              />
            </div>
            <div class="meta-box">
              {{ articleData.createdAt }} &nbsp;·&nbsp;
              <span>阅读 {{ articleData.view }}</span>
            </div>
          </div>
        </div>
      </div>
      <img :src="articleData.coverImgURL" class="article-image" :style="{ display: imgVisible }" />
      <div class="markdown-body" id="article-body" v-html="articleContent"></div>
      <div class="article-end">
        <div class="tag-list" :style="{ display: isVisible }">
          <div class="tag-list-box">
            分类：<button class="sort-button button-item">
              {{ articleData.categoryName }}
            </button>
          </div>
          <div class="tag-list-box">
            标签：
            <button class="tag-button button-item">
              {{ articleData.subcategoryName }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import md from 'markdown-it';
import 'assets/css/markdown.css';
import { useHListStore } from '~~/composables/hData';
import { ref, useRuntimeConfig } from '#imports';
const runtimeConfig = useRuntimeConfig();

//获取传来的数据
const props = defineProps({
  data: {},
});
const articleData = ref({});
// eslint-disable-next-line vue/no-setup-props-destructure
articleData.value = props.data;
const authorInfo = ref({});
// eslint-disable-next-line vue/no-setup-props-destructure
authorInfo.value = props.data.authorInfo;

//md 转 html
const renderer = md();
let articleContent = renderer.render(articleData.value.content);

// 把h1和h2的内容提取出来，传标签size，标签内容，标签id
const tocs = articleContent.match(/<h[1-2].*?>.*?<\/h[1-2]>/g);

tocs.forEach((item, index) => {
  let _tocs = `<div id="jump-${index}">${item}</div>`;
  articleContent = articleContent.replace(item, _tocs);
});
let hData = tocs.map((item, index) => {
  let hContent = item.match(/<h(\d).*?>(.*?)<\/h[1-2]>/);
  const jump = `#jump-${index}`;
  return { id: hContent[1], content: hContent[2], jumpId: jump };
});
//传给子组件 目录
const hListStore = useHListStore();
hListStore.$patch({ hList: hData });

//是广告没有分类标签,有就显示没有就不显示
let isVisible = ref('none');
if (articleData.value.isArticle) {
  isVisible.value = 'flex';
}

//文章封面没有不显示
let imgVisible = ref('none');
if (articleData.value.coverImgURL != null) {
  imgVisible.value = 'block';
}
</script>

<style lang="less" scoped>
.detail-main {
  position: relative;
  padding: 32px;
  margin-top: 20px;
  width: 820px;
  background-color: var(--theme-main-base);
  box-sizing: border-box;

  .article-body {
    margin: 35px 0;
  }
}

//文章内容页面
//文章标题
.article-title {
  display: flex;
  margin-bottom: 20px;
  font-size: 32px;
  color: var(--theme-model-title);
  font-weight: 800;
}

//文章作者
.author-box {
  display: flex;
  justify-content: space-between;
  color: var(--theme-model-title);

  .author-title {
    display: flex;
    margin-bottom: 20px;

    .author-avator {
      margin-right: 1rem;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .author-info-box {
      .author-info {
        font-size: 16px;
        line-height: 16px;

        .author-name {
          font-weight: 500;
        }

        .rank {
          position: relative;
          top: 1.5px;
          display: inline-block;
          width: 35px;
          height: 16px;
        }
      }

      .meta-box {
        margin-top: 8px;
        font-size: 14px;
        color: #8a919f;
        line-height: 14px;
      }
    }
  }
}

.article-image {
  width: 756px;
  height: 425px;
}

.article-end {
  padding: 10px 0;

  .tag-list {
    display: flex;
    color: var(--theme-model-title);

    .tag-list-box {
      margin-right: 20px;
      font-size: 14px;
      line-height: 14px;
    }

    .button-item {
      align-items: center;
      padding: 0 1rem;
      height: 32px;
      border-radius: 4px;
      transition: background-color 0.15s linear;
    }

    .sort-button {
      color: #515767;
      background-color: #f2f3f5;
    }

    .sort-button:hover {
      background-color: #e4e6eb;
    }

    .tag-button {
      color: #1e80ff;
      background-color: #eaf2ff;
    }

    .tag-button:hover {
      background-color: rgb(30 128 255 / 16%);
    }
  }
}

//修改markdown样式
#article-body {
  margin-bottom: 20px;
  color: var(--theme-article-color);
  background-color: var(--theme-main-base);
}

@media (max-width: 1140px) {
  .detail-main {
    width: calc(100% - 320px);
  }
}

@media screen and (max-width: 1000px) {
  .detail-main {
    width: 100%;
  }

  .article-image {
    width: 100%;
    height: auto;
  }
}
</style>
