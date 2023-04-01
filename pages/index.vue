<template>
  <NuxtLayout name="index">
    <main class="container">
      <div class="timeline-index-view">
        <nav class="view-nav" :class="[scroll.y > 400 ? 'top' : '']">
          <div class="nav-list">
            <a class="nav-item" :class="[active.value == '综合' ? 'active' : '']" @click="thChangeNav('综合')">综合 </a>
            <a class="nav-item" :class="[active.value == '关注' ? 'active' : '']" @click="thChangeNav('关注')">关注 </a>
            <a
              v-for="(item, index) in navList.config"
              :key="item.categoryName"
              :id="item.categoryName"
              class="nav-item"
              :class="[active.value == item.categoryName ? 'active' : '']"
              @click="thChangeNav(item, index)"
              @mouseover="showDetail(item.categoryName)"
              @mouseleave="hideDetail(item.categoryName)"
            >
              <div class="category-popover-box">
                <div v-if="showNavDeatil[item.categoryName]" class="category-popover" @click.stop="">
                  <ul class="tag-list">
                    <li
                      v-for="elem in item.subcategoryList"
                      :key="elem.subcategoryName"
                      class="tag"
                      @click="thChangeTag(elem, item, index)"
                    >
                      <a> {{ elem.subcategoryName }}</a>
                    </li>
                  </ul>
                </div>
                <span>{{ item.categoryName }}</span>
              </div>
            </a>
            <span class="nav-item right" id="lable-manage" key="标签管理">标签管理</span>
          </div>
        </nav>
        <div class="timeline-container">
          <nav v-if="navTagList.value.length > 0">
            <ul class="nav-list tag-list">
              <li
                class="tag nav-item"
                @click="thChangeTag('全部')"
                :class="[activeTag.value === '全部' ? 'active' : '']"
              >
                全部
              </li>
              <li
                v-for="item in navTagList.value"
                class="tag nav-item"
                :class="[activeTag.value === item.subcategoryName ? 'active' : '']"
                @click="thChangeTag(item)"
                :key="item.subcategoryName"
              >
                <a>{{ item.subcategoryName }}</a>
              </li>
            </ul>
          </nav>
          <div class="timeline-content">
            <div class="timeline-entry-list">
              <div class="entry-list-container">
                <header class="list-header">
                  <nav class="list-nav">
                    <ul class="nav-list">
                      <li class="nav-item" @click="changeActiveHead(1)">
                        <a :class="[activeHead.value === 1 ? 'active-head' : '']">推荐</a>
                      </li>
                      <li class="nav-item" @click="changeActiveHead(2)">
                        <a :class="[activeHead.value === 2 ? 'active-head' : '']">最新</a>
                      </li>
                      <li class="nav-item" @click="changeActiveHead(3)">
                        <a :class="[activeHead.value === 3 ? 'active-head' : '']">热榜</a>
                      </li>
                    </ul>
                    <client-only>
                      <el-select
                        v-show="activeHead.value === 3"
                        v-model="timeLimit"
                        class="m-2"
                        placeholder="3天内"
                        size="small"
                      >
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                      </el-select>
                    </client-only>
                  </nav>
                </header>
                <div class="entry-list-wrap">
                  <div v-if="!isLoading && homeList.rows.length > 0" name="entry-list" tag="div" class="entry-list">
                    <MessageBox v-for="item in homeList.rows" :key="item.id" :msg-info="item"></MessageBox>
                  </div>

                  <div v-else-if="isLoading === true">
                    <client-only>
                      <el-skeleton :rows="3" animated :style="{ padding: '30px' }" />
                    </client-only>
                  </div>
                </div>
              </div>
            </div>
            <aside :class="['aside']">
              <div :class="['aside-content', targetIsVisible ? '' : 'fixed']">
                <TipCard />
                <AdCard />
              </div>
              <AuthorCard ref="target" />
              <!-- <div ref="target"></div> -->
            </aside>
          </div>
        </div>
      </div>
    </main>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, Ref } from 'vue';
import AdCard from '@/components/Home/components/aside/adCard.vue';
import TipCard from '@/components/Home/components/aside/tipCard.vue';
import AuthorCard from '@/components/Home/components/aside/authorCard.vue';
import MessageBox from '~~/components/MessageBox/messageBox.vue';
import { useHomeTab, useHomeList, subcategoryItem, configItem } from '@/composables/useHome';
import { HomeTabType, HomePostItem } from '@/composables/useHome';
import { useElementVisibility } from '@vueuse/core';
import _ from 'lodash';

// 统一每次请求页面数
const pageSize = 10;
// const left = reactive({
//   value: 0,
// });
const scroll = reactive({
  x: 0,
  y: 0,
});
const active = reactive({
  value: '综合',
});
const showNavDeatil: any = reactive({});
const navList: HomeTabType = reactive({
  config: [],
});
const navTagList = reactive({
  value: [] as Array<subcategoryItem>,
});
const activeTag = reactive({
  value: '全部',
});
// 1代表推荐,2代表最新,3代表热榜
const activeHead = reactive({
  value: 1,
});

const timeLimit: Ref<number | undefined> = ref(1);

const homeList = reactive({
  rows: [] as Array<HomePostItem>,
});
const pageNum = ref(0);
const categoryId = ref(0);
const subcategoryId = ref(0);
const isLoading = ref(true);
const target = ref(null);
const targetIsVisible = useElementVisibility(target);
const options = [
  {
    value: 1,
    label: '3天内',
  },
  {
    value: 2,
    label: '7天内',
  },
  {
    value: 3,
    label: '30天内',
  },
  {
    value: 0,
    label: '全部',
  },
];

interface paramsType {
  categoryId?: number;
  subcategoryId?: number;
  order: number;
  page_size: number;
  time_limit?: number;
  page_num: number;
}

onMounted(() => {
  window.addEventListener('scroll', (e: any) => {
    scroll.y = window.scrollY;
    debounceLoadMoreList(e.target?.scrollingElement);
  });
});

const { data: homeListData } = await useHomeList({
  order: 1,
  page_size: 10,
  page_num: 0,
});
if (homeListData) {
  // homeListData._rawValue
  homeListData.value.rows.map((data) => {
    data.type = '推荐';
  });
  homeList.rows = homeListData.value.rows;
  homeList.rows.push();
  isLoading.value = false;
  // console.log(homeListData, homeList.rows);
}

let { data: homeTabData } = await useHomeTab();
navList.config = homeTabData.value.config;
// console.log(homeTabData);
for (let item of homeTabData.value.config) {
  // showNavDeatil[item.categoryName] = false;
  showNavDeatil[item.categoryName] = false;
}

function changeNav(activeItem: configItem, index: number) {
  isLoading.value = true;
  pageNum.value = 0;
  activeHead.value = 1;
  if (typeof activeItem === 'string') {
    active.value = activeItem;
    navTagList.value = [];
    categoryId.value = 0;
    let params: paramsType = {
      order: activeHead.value,
      page_size: pageSize,
      page_num: pageNum.value,
    };

    fetchHomeList(params, false).then(() => {
      isLoading.value = false;
    });
    return;
  }

  let activeName = activeItem.categoryName;
  active.value = activeName;

  activeTag.value = '全部';

  navTagList.value = navList.config[index].subcategoryList;
  categoryId.value = activeItem.id;

  let params = {
    categoryId: categoryId.value,
    order: activeHead.value,
    page_size: pageSize,
    page_num: pageNum.value,
  };

  fetchHomeList(params, false).then(() => {
    isLoading.value = false;
  });
}

function showDetail(activeName: string | number) {
  // let el = document.getElementById(activeName);
  showNavDeatil[activeName] = true;
  // left.value = el.offsetLeft + el.clientWidth / 2;
}

function hideDetail(activeName: string | number) {
  showNavDeatil[activeName] = false;
}

function changeTag(subcategoryItem: subcategoryItem, activeItem: { categoryName: string; id: number }, index: number) {
  isLoading.value = true;
  pageNum.value = 0;
  if (typeof subcategoryItem === 'string') {
    activeTag.value = subcategoryItem;
    activeHead.value = 1;
    let params = {
      categoryId: categoryId.value,
      order: activeHead.value,
      page_size: pageSize,
      page_num: pageNum.value,
    };

    fetchHomeList(params, false).then(() => {
      isLoading.value = false;
    });

    return;
  }

  activeTag.value = subcategoryItem.subcategoryName;
  subcategoryId.value = subcategoryItem.id;
  // 当切换nav中的tag时
  if (activeItem) {
    active.value = activeItem.categoryName;
    navTagList.value = navList.config[index].subcategoryList;
    categoryId.value = activeItem.id;
  }

  let params = {
    categoryId: categoryId.value,
    subcategoryId: subcategoryId.value,
    order: activeHead.value,
    page_size: pageSize,
    page_num: pageNum.value,
  };

  fetchHomeList(params, false).then(() => {
    isLoading.value = false;
  });
}

// 节流
const thChangeNav = _.throttle(changeNav, 500);
const thChangeTag = _.throttle(changeTag, 500);

function changeActiveHead(activeNum: number) {
  activeHead.value = activeNum;
  pageNum.value = 0;
  isLoading.value = true;

  if (activeNum === 3) {
    timeLimit.value = 1;
  } else {
    timeLimit.value = undefined;
  }
  let params: paramsType = {
    categoryId: categoryId.value,
    subcategoryId: subcategoryId.value,
    order: activeHead.value,
    page_size: pageSize,
    time_limit: timeLimit.value === 1 ? timeLimit.value : undefined,
    page_num: pageNum.value,
  };

  fetchHomeList(params, false).then(() => {
    isLoading.value = false;
  });
}

watch(timeLimit, () => {
  pageNum.value = 0;
  const params: paramsType = {
    categoryId: categoryId.value,
    subcategoryId: subcategoryId.value,
    order: activeHead.value,
    page_size: pageSize,
    time_limit: timeLimit.value === 0 ? undefined : timeLimit.value,
    page_num: pageNum.value,
  };
  fetchHomeList(params, false);
});

/**
 * @param categoryId?: number; 一级分类，一二级都不传表示综合
 * @param subcategoryId?: number;二级分类，传二级分类id不需要传对应的一级分类id，不传返回一级分类下的全部
 * @param order: number;1-推荐；2-最新；3-热榜
 * @param time_limit?: number;仅order=3时起作用，全部-不传；3天内-1；7天内-2；30天内-3
 * @param page_size: number;一页几条数据
 * @param page_num: number;第几页，从0开始
 */
async function fetchHomeList(params: paramsType, isLoadMore: boolean) {
  const { categoryId, subcategoryId, time_limit } = params;
  if (!categoryId) delete params.categoryId;
  if (!subcategoryId) delete params.subcategoryId;
  if (time_limit !== null && time_limit !== undefined)
    if ([1, 2, 3, 0].indexOf(time_limit) === -1) delete params.time_limit;

  let { data } = await useHomeList(params);
  if (params.order === 1) {
    homeListData.value.rows.map((data) => {
      data.type = '推荐';
    });
  }
  if (isLoadMore) {
    homeList.rows.push(...data.value.rows);
  } else {
    homeList.rows = data.value.rows;
  }
  // console.log(homeList);
}

function loadMoreList(e: { scrollHeight: number; scrollTop: number; clientHeight: number }) {
  const offset = Math.round(e.scrollHeight - e.scrollTop);

  // 判断滚动条是否到达底部
  if (offset <= e.clientHeight + 20) {
    // console.log(offset, e.scrollHeight, e.scrollTop, e.clientHeight);
    pageNum.value++;

    let params: paramsType = {
      categoryId: active.value == '综合' || active.value == '关注' ? undefined : categoryId.value, // 原null
      subcategoryId: subcategoryId.value == 0 ? undefined : subcategoryId.value, // null
      time_limit: activeHead.value == 3 ? timeLimit.value : undefined, // null
      order: activeHead.value,
      page_size: pageSize,
      page_num: pageNum.value,
    };
    fetchHomeList(params, true);
  }
}

const debounceLoadMoreList = _.debounce(loadMoreList, 500);
// const debounceLoadMoreList = _.debounce(loadMoreList, 500, true);
</script>

<style lang="less" scoped>
.container {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 960px;
}

.timeline-index-view {
  position: relative;
  margin-top: 5.17rem;
}

.view-nav,
.view-nav::before {
  left: 0;
  background-color: var(--theme-header-base);
  backdrop-filter: blur(12px);
}

.view-nav {
  position: fixed;
  top: 5rem;
  z-index: 100;
  width: 100%;
  height: 3.833rem;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
  transition: height 0.2s;
  transition: transform 0.2s ease-out;
  transform: translateZ(0);

  &.top {
    transform: translate3d(0, -5rem, 0);
  }

  .nav-list {
    position: relative;
    display: flex;
    align-items: center;
    margin: auto;
    width: auto;
    max-width: 960px;
    height: 100%;
    line-height: 1;

    .nav-item {
      display: flex;
      align-items: center;
      padding: 0 1rem;
      height: 100%;
      font-size: 1.16rem;
      color: var(--theme-headerlist2);
      flex-shrink: 0;
    }

    .active {
      color: var(--theme-main-color);
    }

    .nav-item:hover {
      color: var(--theme-dir-active);
    }

    .right {
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
    }
  }

  .category-popover-box {
    position: relative;

    .category-popover {
      position: absolute;
      top: 1.75rem;
      z-index: 250;
      padding: 1.17rem 1.17rem 0.17rem;
      width: 30rem;
      max-height: 16.67rem;
      background-color: var(--theme-main-base2);
      border: 1px solid var(--theme-line);
      border-radius: 2px;
      box-shadow: 0 1px 5px 0 rgb(0 0 0 / 15%);
      font-weight: 400;
      line-height: 1.2;
      box-sizing: border-box;
      cursor: default;

      .tag-list {
        display: flex;
        flex-wrap: wrap;

        .tag {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 0.83rem;
          margin-right: 1rem;
          margin-bottom: 1rem;
          height: 2rem;
          font-size: 1.1rem;
          color: #71777d;
          background-color: var(--theme-main-base);
          border-radius: 1rem;

          a {
            color: inherit;
          }

          a:hover {
            color: var(--theme-main-color);
          }
        }
      }
    }
  }
}

.timeline-container {
  margin-top: 0;

  .tag-list {
    display: flex;
    flex-wrap: wrap;
    height: auto;
  }

  .nav-list {
    position: relative;

    .nav-item {
      position: relative;
      cursor: pointer;
    }

    .tag {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 0.83rem;
      margin-right: 1rem;
      margin-bottom: 1rem;
      height: 2rem;
      font-size: 1.1rem;
      color: #8a9aa9;
      background-color: var(--theme-main-base);
      border-radius: 1rem;
    }

    .active {
      color: #fff;
      background-color: var(--theme-dir-active);
      box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%), 0 1px 2px 0 rgb(0 0 0 / 5%);
    }

    .tag:not(.active):hover {
      color: var(--theme-main-color);
    }
  }

  .timeline-content {
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-top: 0.33rem;

    .timeline-entry-list {
      width: 700px;
      border-radius: 2px;

      .entry-list-container {
        background-color: var(--theme-main-base);

        .list-header {
          padding: 1.3rem 1rem;
          border-bottom: 1px solid hsl(0deg 0% 59.2% / 10%);

          .list-header .list-nav,
          .list-header .nav-list {
            display: flex;
            justify-content: space-between;
          }

          .list-nav {
            display: flex;
            justify-content: flex-start !important;
          }

          .nav-list {
            align-items: center;
            line-height: 1;
          }

          .list-nav,
          .nav-list {
            display: flex;
            justify-content: space-between;
          }

          .nav-item {
            position: relative;
            padding: 0 1.2rem;
            font-size: 1.17rem;
            font-size: 1.16rem;
            cursor: pointer;
            border-right: 1px solid hsl(0deg 0% 59.2% / 20%);

            a {
              text-decoration: none;
              cursor: pointer;
              color: var(--theme-headerlist3);
            }

            a::before {
              content: '';
              position: absolute;
              top: 0;
              right: 0;
              bottom: 0;
              left: 0;
            }

            a:hover {
              color: var(--theme-main-color);
            }

            .active-head {
              color: var(--theme-main-color);
            }
          }
        }

        .entry-list-wrap {
          .entry-list {
            position: relative;
            width: 100%;
            background-color: #fff;
            content-visibility: auto;
          }
        }
      }
    }
  }

  .aside {
    height: fit-content;

    .aside-content {
      width: 240px;
      height: fit-content;
    }
  }

  .fixed {
    position: fixed;
    top: 67px;
    left: 50%;
    margin-left: 240px;
  }
}

@media (max-width: 960px) {
  .timeline-container {
    .tag-list {
      padding-left: 2rem;
    }

    .timeline-content .timeline-entry-list {
      width: 100%;
    }
  }

  .aside {
    display: none;
  }

  #lable-manage {
    display: none;
  }
}

@media screen and (max-width: 780px) {
  .view-nav {
    top: 4.333rem;

    &.top {
      transform: translate3d(0, -4.333rem, 0);
    }

    .category-popover {
      display: none;
    }

    .nav-list {
      overflow-x: auto;
      overflow-y: hidden;
    }
  }
}
</style>
