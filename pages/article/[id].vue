<template>
  <div>
    <CommonHeader />
    <div class="detail-container">
      <div class="main-area">
        <!-- 左侧栏 -->
        <LeftPanel :like="like" @likePlus="likePlus" />
        <!-- 文章内容 -->
        <DetailArticleContent :data="articleView" />
        <div class="detail-side">
          <!-- 本文作者 -->
          <Author
            :userText="authorInfo.authorName"
            :userDesc="authorInfo.description"
            :avatar="authorInfo.avatarURL"
            :userlevel="authorInfo.level"
            :like="like"
            :view="view"
          />
          <!-- 相关文章 -->
          <DetailAboutArticles :list="aboutArticles" :style="{ display: isVisible }" />
          <!-- 本文目录 -->
          <DetailCatalog />
        </div>
      </div>
    </div>
    <div class="suspension-panel">
      <ButtonBackTopBtn />
    </div>
  </div>
</template>

<script setup>
import { ref } from '#imports';
import { useRoute } from 'vue-router';
import Author from '~~/components/detail/Author.vue';
import LeftPanel from '~~/components/detail/LeftPanel.vue';
import { useArticleView } from '@/composables/useArticleView';

//查看当前路由
const route = useRoute();
const articleId = route.params.id;
const { data, error } = await useArticleView(articleId);

// 获取数据
const articleView = ref({});
if (data.value) {
  articleView.value = data.value;
} else {
  console.log('文章数据获取失败', error.value?.message);
}
//父组件传给子组件
const aboutArticles = data.value.relatedArticles;
// 解构出作者信息
let { authorInfo, like, view } = articleView.value;
like = ref(like);
let flag = true;
// console.log(articleView.value);
// 处理点赞加一
const likePlus = () => {
  flag ? like.value++ : like.value--;
  flag = !flag;
};
//当前文章页面title设置
// eslint-disable-next-line no-undef
useHead({
  title: articleView.value.title,
});

//若是广告，没有相关文章，作者信息，分类标签，左侧栏
let isVisible = ref('block');
if (articleId > 3000 && articleId <= 3005) {
  isVisible.value = 'none';
}
</script>

<style lang="less" scoped>
// 整体布局
.detail-container {
  width: 100%;

  // 左侧栏
  .leftpanel {
    position: fixed;
    top: 140px;
    margin-left: -7rem;
  }

  .main-area {
    display: flex;
    margin: 0 auto;
    max-width: 1140px;

    .detail-side {
      position: relative;
      display: flex;
      margin-top: 20px;
      margin-left: 20px;
      width: 300px;
      height: 100%;
      border-radius: 4px 4px 0 0;
      flex-direction: column;
      box-sizing: border-box;
    }
  }
}

.suspension-panel {
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  z-index: 1000;
}

@media screen and (max-width: 1350px) and (min-width: 1140px) {
  .leftpanel {
    display: none;
  }
}

@media screen and (max-width: 1140px) and (min-width: 1000px) {
  .detail-container .main-area .detail-side {
    width: 300px;
  }

  .detail-container {
    width: 100%;
  }
}

@media screen and (max-width: 1000px) {
  .detail-container .main-area .detail-side {
    display: none;
  }

  .suspension-panel {
    display: none;
  }
}
</style>
