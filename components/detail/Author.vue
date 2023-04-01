<template>
  <div class="author">
    <div class="user">
      <img class="user-avator" :src="avatar" alt="" />
      <div class="user-info">
        <div class="user-info-title">
          <div class="user-text">{{ userText }}</div>
          <img class="rank" :src="`${runtimeConfig.app.baseURL}img/lv/lv-${userlevel}.png`" :alt="userlevel" />
        </div>
        <div class="user-info-desc">{{ userDesc }}</div>
      </div>
    </div>
    <div class="operate-btn">
      <button class="btn-item non-follow" v-if="isFollowed" @click="isFollowed = false">已关注</button>
      <button class="btn-item follow" v-else @click="isFollowed = true">关注</button>
      <a href="#" class="btn-item letter">私信</a>
    </div>
    <div class="cut-off"></div>
    <div class="cut-off"></div>
    <div class="stat-item">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="26"
        viewBox="0 0 25 26"
        class="zan"
        data-v-71f2d09e=""
        data-v-bdf6e7fa=""
      >
        <g fill="none" fill-rule="evenodd" transform="translate(0 .57)" data-v-71f2d09e="" data-v-bdf6e7fa="">
          <ellipse
            cx="12.5"
            cy="12.57"
            fill="#E1EFFF"
            rx="12.5"
            ry="12.57"
            data-v-71f2d09e=""
            data-v-bdf6e7fa=""
          ></ellipse>
          <path
            fill="#7BB9FF"
            d="M8.596 11.238V19H7.033C6.463 19 6 18.465 6 17.807v-5.282c0-.685.483-1.287 1.033-1.287h1.563zm4.275-4.156A1.284 1.284 0 0 1 14.156 6c.885.016 1.412.722 1.595 1.07.334.638.343 1.687.114 2.361-.207.61-.687 1.412-.687 1.412h3.596c.38 0 .733.178.969.488.239.317.318.728.21 1.102l-1.628 5.645a1.245 1.245 0 0 1-1.192.922h-7.068v-7.889c1.624-.336 2.623-2.866 2.806-4.029z"
            data-v-71f2d09e=""
            data-v-bdf6e7fa=""
          ></path>
        </g>
      </svg>
      <div class="stat-item-content">
        <span class="stat-item-content-text">获得点赞</span>
        <span class="stat-item-content-count">{{ like }}</span>
      </div>
    </div>
    <div class="stat-item">
      <svg width="25" height="25" viewBox="0 0 25 25" class="icon stat-view-icon" data-v-71f2d09e="" data-v-bdf6e7fa="">
        <g fill="none" fill-rule="evenodd" data-v-71f2d09e="" data-v-bdf6e7fa="">
          <circle cx="12.5" cy="12.5" r="12.5" fill="#E1EFFF" data-v-71f2d09e="" data-v-bdf6e7fa=""></circle>
          <path
            fill="#7BB9FF"
            d="M4 12.5S6.917 7 12.75 7s8.75 5.5 8.75 5.5-2.917 5.5-8.75 5.5S4 12.5 4 12.5zm8.75 2.292c1.208 0 2.188-1.026 2.188-2.292 0-1.266-.98-2.292-2.188-2.292-1.208 0-2.188 1.026-2.188 2.292 0 1.266.98 2.292 2.188 2.292z"
            data-v-71f2d09e=""
            data-v-bdf6e7fa=""
          ></path>
        </g>
      </svg>
      <div class="stat-item-content">
        <span class="stat-item-content-text">文章被阅读</span>
        <span class="stat-item-content-count">{{ view }}</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, useRuntimeConfig } from '#imports';
const runtimeConfig = useRuntimeConfig();
defineProps({
  userText: {
    type: String,
    default() {
      return '作者昵称';
    },
  },
  userDesc: {
    type: String,
    default() {
      return '文章描述文章描述文章描述';
    },
  },
  avatar: {
    type: String,
    default() {
      return 'https://p3-passport.byteimg.com/img/user-avatar/ed1c47cae46d8f791e496be77f1ad6f0~100x100.awebp';
    },
  },
  userlevel: {
    type: Number,
    default() {
      return 1;
    },
  },
  like: {
    // 点赞数
    type: Number,
    default() {
      return 123334444;
    },
  },
  view: {
    // 阅读量
    type: Number,
    default() {
      return 666666666;
    },
  },
});
const isFollowed = ref(false);
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.rank {
  position: relative;
  top: 1.5px;
  display: inline-block;
  width: 35px;
  height: 16px;
}

.author {
  padding: 20px;
  margin-bottom: 20px;
  width: 300px;
  height: 227px;
  font-size: 14px;
  color: var(--theme-model-title);
  background-color: var(--theme-main-base);
}

/* user */
.user {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  width: 260px;
  height: 67px;
}

.user-avator {
  width: 48px;
  height: 48px;
}

.user-info-title {
  display: flex;
  font-size: 16px;
}

.user-text {
  display: inline-block;
  width: 80px;
  height: 24px;
}

.user-level {
  margin: 0 3px;
  width: 35px;
  height: 15px;
}

.user-tooltip {
  width: 16px;
  height: 16px;
}

.user-info-desc {
  overflow: hidden;
  margin-top: 5px;
  width: 196px;
  height: 22px;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 22px;
}

/*  operate-btn */
.operate-btn {
  padding-bottom: 16px;
  border-bottom: 1px solid rgb(228 230 235);
}

.btn-item {
  display: inline-block;
  width: 122px;
  height: 36px;
  font-size: 14px;
  text-align: center;
  border: none;
  border-radius: 3px;
  outline: none;
  vertical-align: middle;
}

.follow {
  color: #fff;
  background-color: var(--theme-main-color);
}

.letter {
  margin-left: 16px;
  line-height: 36px;
  text-decoration: none;
  background-color: #1e80ff0d;
  border: 1px solid rgb(30 128 255 / 30%);
}

/* stat-item */
.stat-item {
  display: flex;
  align-items: center;
  margin-top: 8px;
}

.stat-item-content-text {
  margin: 0 12px;
}
</style>
