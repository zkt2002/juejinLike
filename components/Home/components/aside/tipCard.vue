<script lang="ts" setup>
import { ref } from '#imports';
const Hour = new Date().getHours();
const greet = ref('');
const getGreet = () => {
  if (Hour >= 6 && Hour < 12) {
    greet.value = '早上好!';
  } else if (Hour >= 12 && Hour < 14) {
    greet.value = '中午好!';
  } else if (Hour >= 14 && Hour < 18) {
    greet.value = '下午好!';
  } else if (Hour <= 24) {
    greet.value = '晚上好!';
  }
};
getGreet();
</script>
<template>
  <div class="tips-wrapper">
    <div class="tips-text">
      <h1>{{ greet }}</h1>
      <span>点亮在社区的每一天</span>
    </div>
    <button class="sign"><span>去签到</span></button>
  </div>
</template>
<style lang="less">
.tips-wrapper {
  display: flex;
  justify-content: space-between;
  padding: 16px;
  margin-bottom: 16px;
  width: 240px;
  height: 80px;
  background: var(--theme-main-base);

  .tips-text {
    h1 {
      font-size: 16px;
      color: var(--theme-model-title);
      line-height: 24px;
      font-weight: 600;
    }

    span {
      font-size: 12px;
      color: var(--theme-creator-sign);
      font-weight: 400;
      line-height: 24px;
    }
  }

  .sign {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 74px;
    height: 36px;
    background-color: rgb(30 128 255 / 5%);
    border: 1px solid rgb(30 128 255 / 30%);
    border-radius: 4px;

    span {
      font-size: 14px;
      white-space: nowrap;
      color: var(--theme-main-color);
      font-weight: 400;
    }
  }
}
</style>
