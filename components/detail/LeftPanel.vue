<template>
  <div class="leftpanel">
    <div class="leftpanel-item" v-show="!isFullScreen" id="like" @click="handleLike">
      <svg
        t="1675659424530"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="4807"
        width="200"
        height="200"
      >
        <path
          d="M710.549333 384.810667a12409.045333 12409.045333 0 0 0 47.466667-0.32l8.746667-0.085334c83.989333-0.618667 141.44 67.584 126.72 150.229334L847.296 794.026667c-10.026667 56.448-63.914667 101.546667-121.130667 101.589333L298.624 896a42.730667 42.730667 0 0 1-42.666667-42.410667l-0.810666-383.978666a42.666667 42.666667 0 0 1 42.026666-42.666667l3.157334-0.064c5.226667-0.042667 11.797333-0.042667 19.626666 0 91.946667 0.768 170.88-86.698667 170.709334-170.944-0.149333-86.741333 39.786667-126.762667 106.453333-127.573333 62.250667-0.746667 106.602667 59.605333 107.349333 149.12 0.213333 26.602667-6.293333 73.237333-14.506666 107.434666 6.186667 0 13.077333-0.042667 20.586666-0.085333z m-497.706666 63.232L213.333333 874.624A21.312 21.312 0 0 1 191.786667 896H149.525333A21.333333 21.333333 0 0 1 128 874.624l0.042667-426.581333A21.269333 21.269333 0 0 1 149.44 426.666667h41.984c11.669333 0 21.418667 9.578667 21.418667 21.376z"
          fill="#8a919f"
          p-id="4808"
        ></path>
      </svg>
      <div class="circle-count">{{ like }}</div>
    </div>
    <div class="leftpanel-item item-zan" v-show="!isFullScreen">
      <svg
        t="1675660041003"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="7397"
        width="200"
        height="200"
      >
        <path
          d="M892 141.6H134c-37.6 0-68 30.4-68 68v534.5c0 37.6 30.4 68 68 68h109.1l18.5 82c8.6 38 55.1 52.5 83.7 26l117-108H892c37.6 0 68-30.4 68-68V209.6c0-37.5-30.5-68-68-68zM314 507.8c-31.8 0-57.5-25.8-57.5-57.5s25.8-57.5 57.5-57.5c31.8 0 57.5 25.8 57.5 57.5s-25.7 57.5-57.5 57.5z m209.4 4c-31.8 0-57.5-25.8-57.5-57.5s25.8-57.5 57.5-57.5c31.8 0 57.5 25.8 57.5 57.5s-25.7 57.5-57.5 57.5z m209.4 0c-31.8 0-57.5-25.8-57.5-57.5s25.8-57.5 57.5-57.5c31.8 0 57.5 25.8 57.5 57.5s-25.7 57.5-57.5 57.5z"
          p-id="7398"
          fill="#8a919f"
        ></path>
      </svg>
      <div class="circle-count">666</div>
    </div>
    <div class="leftpanel-item" v-show="!isFullScreen">
      <svg
        t="1675659523431"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="5201"
        width="200"
        height="200"
      >
        <path
          d="M720.398507 959.573333c73.045333 31.317333 136.96-15.317333 129.706666-94.293333l-20.650666-226.218667 174.634666-199.722666c38.144-43.648 19.2-102.229333-37.418666-115.114667l-258.474667-58.794667-135.68-228.010666c-29.738667-49.877333-91.306667-49.92-121.045333 0L315.74784 265.429333 57.273173 324.224C0.953173 337.066667-18.33216 395.648 19.854507 439.338667l174.634666 199.722666-24.021333 264.405334c-5.248 57.770667 44.544 94.037333 97.877333 71.125333l243.626667-104.533333 208.426667 89.472z"
          fill="#8a919f"
          p-id="5202"
        ></path>
      </svg>
    </div>
    <div class="leftpanel-item" v-show="!isFullScreen">
      <svg
        t="1675660095453"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="10880"
        width="200"
        height="200"
      >
        <path
          d="M551.6 276V141.4c12.1-56.3 58.2-22 58.2-22L930 395.9c70.4 48.9 4.8 85.7 4.8 85.7L619.5 755.7c-63.1 46.5-67.9-24.5-67.9-24.5V606.4C231.4 506.1 100.4 907.5 100.4 907.5c-12.1 22-19.4 0-19.4 0C-42.8 305.4 551.6 276 551.6 276z"
          fill="#8a919f"
          p-id="10881"
        ></path>
      </svg>
    </div>
    <div class="item-share" v-show="!isFullScreen"></div>
    <div class="leftpanel-item" v-show="!isFullScreen">
      <svg
        t="1675659944351"
        class="icon"
        viewBox="0 0 1026 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3222"
        width="200"
        height="200"
      >
        <path
          d="M1004.657 801.716 602.263 91.599c-49.213-86.817-129.646-86.817-178.866 0L21.004 801.716c-49.207 86.906-8.949 157.798 89.388 157.798l804.877 0C1013.606 959.514 1053.825 888.622 1004.657 801.716zM544.635 832.216l-63.649 0 0-63.649 63.649 0L544.635 832.216zM544.635 641.27l-63.649 0L480.986 259.377l63.649 0L544.635 641.27z"
          p-id="3223"
          fill="#8a919f"
        ></path>
      </svg>
    </div>
    <div class="leftpanel-item" @click="handleFullScreen">
      <svg
        t="1675659835964"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3423"
        width="200"
        height="200"
      >
        <path
          d="M983.04 727.04a40.96 40.96 0 0 0-40.96 40.96v173.592381h-174.08a40.96 40.96 0 1 0 0 82.407619h173.592381A82.407619 82.407619 0 0 0 1024 941.592381v-173.592381a40.96 40.96 0 0 0-40.96-40.96zM941.592381 0h-173.592381a40.96 40.96 0 1 0 0 82.407619h173.592381v173.592381a40.96 40.96 0 1 0 82.407619 0V82.407619A82.407619 82.407619 0 0 0 941.592381 0zM256 941.592381H82.407619v-173.592381a40.96 40.96 0 1 0-82.407619 0v173.592381A82.407619 82.407619 0 0 0 82.407619 1024h173.592381a40.96 40.96 0 1 0 0-82.407619zM40.96 296.96a40.96 40.96 0 0 0 40.96-40.96V82.407619h174.08a40.96 40.96 0 1 0 0-82.407619H82.407619A82.407619 82.407619 0 0 0 0 82.407619v173.592381a40.96 40.96 0 0 0 40.96 40.96z"
          fill="#8a919f"
          p-id="3424"
        ></path>
        <path
          d="M219.428571 219.428571m82.407619 0l420.32762 0q82.407619 0 82.407619 82.407619l0 420.32762q0 82.407619-82.407619 82.407619l-420.32762 0q-82.407619 0-82.407619-82.407619l0-420.32762q0-82.407619 82.407619-82.407619Z"
          fill="#8a919f"
          p-id="3425"
        ></path>
      </svg>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const emit = defineEmits(['likePlus']);
defineProps({
  like: {
    type: Number,
    default() {
      return 123;
    },
  },
});
const isFullScreen = ref(false);
// 点击改变svg颜色
const handleLike = (e: any) => {
  emit('likePlus');
  e.currentTarget.classList.toggle('active');
};
// 处理全屏显示
const handleFullScreen = (e: any) => {
  handleLike(e);
  isFullScreen.value = !isFullScreen.value;
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

li {
  list-style: none;
}

.leftpanel {
  width: 48px;
  height: 430px;
}

.leftpanel-item {
  position: relative;
  margin-bottom: 20px;
  width: 48px;
  height: 48px;
  text-align: center;
  background-color: var(--theme-main-base);
  border-radius: 50%;
  line-height: 48px;
}

.circle-count {
  position: absolute;
  top: 0;
  left: 33px;
  padding: 3px 5px;
  height: 18px;
  font-size: 12px;
  text-align: center;
  color: #fff;
  background-color: #c2c8d1;
  border-radius: 8px;
  line-height: 14px;
}

.item-share {
  margin: 0 auto;
  margin-bottom: 20px;
  width: 32px;
  height: 1px;
  background-color: #e4e6eb;
}

svg {
  display: inline-block;
  width: 20px;
  height: 48px;
}

svg:hover path {
  fill: #515767;
}

.active svg path {
  fill: #1e80ff;
}

.active .circle-count {
  background-color: #1e80ff;
}
</style>
