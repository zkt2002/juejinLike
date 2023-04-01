<template>
  <div id="catalog-main" :class="[isTop ? 'is-top' : '']" ref="catalog">
    <div class="catalog-box">
      <div class="block-title">文章目录</div>
      <div class="catalog-list">
        <!-- 遍历目录 -->
        <ul>
          <li
            v-for="(hItem, index) in hList"
            :key="index"
            :title="hItem.content"
            :class="[hItem.id * 1 === 1 ? 'a-container-h1' : 'a-container-h2', activeIndex === index ? 'active' : '']"
          >
            <div class="a-container" :style="{ marginLeft: `${hItem.id * 10}px` }">
              <a :href="hItem.jumpId" @click="jump(index)">{{ hItem.content }}</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHListStore } from '~~/composables/hData';
import { ref, onMounted, onUnmounted } from '#imports';

let boxTop = ref(0);
let scrollTop = ref(0);
let scroll;
let timer;
onMounted(() => {
  setTimeout(() => {
    boxTop.value = document.querySelector('.catalog-box').offsetTop;
  }, 0);
  setTimeout(() => {
    getHTopList();
  }, 2000);
  getHTopList();
  window.addEventListener(
    'scroll',
    (scroll = () => {
      if (timer) {
        return;
      }
      timer = setTimeout(() => {
        scrollTop.value = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
        handleScroll();
        watchActive();
        timer = null;
      }, 100);
    }),
  );
});

//文章目录贴顶
let isTop = ref(false);
const handleScroll = () => {
  if (scrollTop.value >= boxTop.value + 60) {
    isTop.value = true;
  } else {
    isTop.value = false;
  }
};

//显示目录
const hListStore = useHListStore();
const hList = hListStore.hList;

//点击目录高亮
let activeIndex = ref(0);
const jump = (index) => {
  activeIndex.value = index;
};

//获取所有h标签的offsetTop
let hTopList = ref([]);
const getHTopList = () => {
  let arr = [];
  for (let i = 0; i < hList.length; i++) {
    arr.push(document.querySelector(hList[i].jumpId).offsetTop);
  }
  arr.push(Number.MAX_VALUE); //兜底
  hTopList.value = arr;
};

//滚动目录高亮
const watchActive = () => {
  if (scrollTop.value < hTopList.value[0]) {
    activeIndex.value = 0;
  }
  for (let i = 0; i < hTopList.value.length; i++) {
    if (scrollTop.value > hTopList.value[i] && scrollTop.value < hTopList.value[i + 1] && activeIndex.value != i) {
      activeIndex.value = i;
    }
  }
  let catalogList = document.querySelector('.catalog-list');
  const keep = 7;
  let hListLength = hList.length;
  if (activeIndex.value <= keep) {
    catalogList.scrollTop = 0;
  } else if (activeIndex.value > hListLength - keep) {
    catalogList.scrollTop = 34 * (hListLength - keep);
  } else {
    catalogList.scrollTop = 34 * (activeIndex.value - keep);
  }
};
onUnmounted(() => {
  window.removeEventListener('scroll', scroll);
});
</script>

<style lang="less" scoped>
// 吸顶样式
// 吸顶样式
.is-top {
  position: fixed;
  top: 20px;
  width: 300px;
}

.catalog-box {
  background-color: var(--theme-main-base);
  border-radius: 4px 4px 0 0;
}

.block-title {
  padding: 16px 0;
  margin: 0 20px;
  font-size: 16px;
  color: var(--theme-model-title);
  font-weight: 500;
  border-bottom: 1px solid #e4e6eb;
}

.catalog-list {
  overflow: auto;
  // max-height: 200px;
  padding: 8px 0;
  margin: 8px 3px 0 0;
  max-height: 612px;

  ul li {
    position: relative;
    list-style: none;
  }

  .a-container {
    display: block;
    padding: 10px;
  }

  .a-container a {
    font-size: 14px;
  }

  ul li:hover {
    background-color: var(--theme-dir-hover);
  }

  .a-container-h1 {
    color: var(--theme-dir-h1);
  }

  .a-container-h2 {
    color: var(--theme-dir-h2);
  }
}

.active {
  a {
    color: var(--theme-dir-active);
  }

  & ::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 0;
    margin-top: 7px;
    width: 4px;
    height: 16px;
    background: var(--theme-dir-active);
    border-radius: 0 4px 4px 0;
  }
}

.catalog-list::-webkit-scrollbar {
  width: 5px;
}

.catalog-list::-webkit-scrollbar-thumb {
  background: rgb(190 190 190);
  box-shadow: inset 0 0 10px rgb(221 221 221 / 50%);
}
</style>
