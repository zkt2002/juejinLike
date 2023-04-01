<script setup lang="ts">
import Button from '@/components/Button/creatorBtn.vue';
import NavBar from '@/components/HeaderList/navbar.vue';
import { Scroll } from '@/composables/useScroll';
import { useTheme } from '@/composables/useTheme';
import { ref, reactive, onMounted, computed } from '#imports';
const Theme = useTheme();
const theme = computed(() => {
  return Theme.theme;
});
const scroll: Scroll = reactive({
  x: 0,
  y: 0,
});
const useSwitchTheme = () => {
  Theme.theme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('class', Theme.theme);
};

onMounted(() => {
  Theme.theme = localStorage.getItem('theme') || 'light';
  useSwitchTheme();
  /* 滚动监听 */
  window.addEventListener('scroll', () => {
    scroll.y = window.scrollY;
    console.log(scroll.y);
  });
});
/* 隐藏Button */
const Actived = ref(false);
</script>
<template>
  <div :class="['header-fixed', scroll.y > 400 ? 'overhidden' : '']">
    <div class="header-block"></div>

    <header :class="scroll.y > 400 ? 'overhidden' : ''">
      <div :class="['header-wrapper']">
        <div class="header-left">
          <div id="juejin-logo1">
            <span :class="['icon-logo', theme]"></span>
            <span :class="['icon-txt', theme]"></span>
          </div>
          <NavBar></NavBar>
        </div>
        <div :class="['header-right', 'cmb01']">
          <ul>
            <li :class="['nav-item', 'cmb02']">
              <div class="nav-item item-search">
                <search :enlarge="true" @onFocus=" (val: boolean) => { Actived = val }"></search>
              </div>
              <div class="nav-item item-creatorBtn" :class="['creator', Actived ? 'hidden01' : '']">
                <Button>创作者中心</Button>
              </div>
            </li>
            <li :class="['nav-item', 'item-tm-change', Actived ? 'hidden02' : '']">
              <img
                v-if="theme === 'dark'"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASBAMAAACk4JNkAAAAHlBMVEWenp+fn59HcEyenp+enp+bm5+fn5+Xl52dnZ+dnZ/0acoEAAAACnRSTlP/EADfoDAgIEA4m5VJjAAAAH5JREFUCNdNzjEOwjAMheEnJReoI7HHSGVtKFEZvXCCMjCTE9ArIO7dFy/UUqJviKMfypmFF3hGbK7nlmcdH5SV/JJzpFoxxHXp7xqAIl1GRW6cMoEwvDHdu7AGTNX1DbgMLvkcNjQnqna1aril/rNd809S9AJWecG/SpVVnB2nABW1O32fqAAAAABJRU5ErkJggg=="
                alt="load failed"
                @click="Theme.switchTheme(), useSwitchTheme()"
              />
              <img
                v-else
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASBAMAAACk4JNkAAAAKlBMVEVHcExhY2ZhZGZgY2diY2ViZGZgZGZhY2VgZGVhY2VhY2VhZGZhZGZiZGZV2ylzAAAADXRSTlMA354e739ATzBs7L/PQzMNtQAAAIxJREFUCNdjYGBgU7x7qIABCJj33r1796IBkNVyFwQ8gEK+d4WArCsGDIx3r7KCBDcw1N4NYAKxrjHoXmQAsy4xnL3JwAliXWQACjPIgpgMd69DDWKQvQo0CSh4B6QDaOFMoI7cuwFAJitQEfddoDRD7F0BkG2S6YEg2xAuAGu8exvkKgZ2nbtCCQwMABiaThCZTsbgAAAAAElFTkSuQmCC"
                alt="load failed"
                @click="Theme.switchTheme(), useSwitchTheme()"
              />
            </li>
            <li :class="['nav-item', 'item-avator', Actived ? 'hidden02' : '']">
              <div class="avator"></div>
            </li>
          </ul>
        </div>
      </div>
    </header>
    <div :class="[theme === 'dark' ? 'mask' : '', scroll.y > 0 ? 'hidden03' : '']"></div>
  </div>
</template>
<style lang="less" scoped>
.hidden03 {
  &.mask::before {
    opacity: 0;
  }
}

.header-fixed {
  height: 60px;
}

.header-block {
  height: inherit;
}

header {
  position: fixed;
  top: 0;
  z-index: 101;
  width: 100%;
  height: inherit;
  background: var(--theme-header-base);
  border-bottom: 1px solid var(--theme-line);
  backdrop-filter: blur(7px);
  transition: height 0.2s linear;
  transition: transform 0.2s ease-out;

  &.overhidden {
    transform: translateY(-60px);
  }
}

.header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  margin: auto;
  width: 1280px;
  height: 100%;

  .logo {
    width: 28px;
    height: 22px;
  }
}

.header-left {
  display: flex;
  height: 100%;
  flex-shrink: 0;
}

.icon-txt {
  font-size: 20px;
  color: var(--theme-logo-txt);
}

#juejin-logo1 {
  .logo {
    width: 28px;
    height: 22px;
  }

  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 12px;
  width: 120px;

  .icon-logo {
    font-size: 22px;

    &.light {
      color: var(--theme-logo-symbol);
    }

    &.dark {
      background-image: var(--theme-logo-symbol);
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}

.header-right {
  display: flex;
  height: 100%;

  ul {
    display: flex;
    align-items: center;
  }

  .creator {
    transition: all 0.2s linear;
  }

  .avator {
    margin-left: 12px;
    width: 36px;
    height: 36px;
    background-color: antiquewhite;
    border-radius: 50%;
  }

  .item-tm-change {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 100%;
  }
}

.nav-item {
  display: flex;
  align-items: center;
  height: 100%;
  flex-shrink: 0;

  /* 防止变形 */
}

.cmb02 {
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  margin-right: 12px;
  width: 320px;
  height: 100%;
}

.hidden01 {
  flex-shrink: 0;
  opacity: 0;
}

@media screen and (max-width: 1280px) {
  .header-wrapper {
    width: 100vw;
  }
}

@media screen and (max-width: 1100px) and (min-width: 900px) {
  :deep(.search-wrapper) {
    width: 360px;
  }

  .cmb02 {
    width: calc(360px + 140px);
  }

  :deep(.search-wrapper.enlarge) {
    width: calc(360px + 140px);
  }
}

@media screen and (max-width: 780px) {
  .header-fixed {
    height: 52px;
  }

  .creator {
    display: none;
  }

  :deep(.search-wrapper) {
    width: 260px;
  }

  .cmb02 {
    overflow: visible;
    width: initial;
  }

  .cmb01 {
    ul {
      justify-content: space-between;
      width: 100%;
    }

    width: calc(260px + 140px);
  }

  :deep(.search-wrapper.enlarge) {
    width: calc(260px + 140px);
  }

  #juejin-logo1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    width: auto;

    .icon-logo {
      font-size: 24px;
    }

    .icon-txt {
      display: none;
    }
  }

  .hidden02 {
    opacity: 0;
  }
}

@media screen and (max-width: 550px) {
  :deep(.search-wrapper) {
    width: 140px;
  }

  .cmb01 {
    width: calc(140px + 88px);
  }

  :deep(.search-wrapper.enlarge) {
    width: calc(140px + 88px);
  }

  .header-right .item-tm-change {
    width: 30px;
  }
}

@media screen and (max-width: 400px) {
  :deep(.search-wrapper) {
    width: 35vw;
  }

  .nav-item:nth-child(1) {
    flex: 1;
  }

  .cmb01 {
    ul {
      justify-content: space-between;
      width: 100%;
    }

    width: calc(35vw + 88px);
  }

  :deep(.search-wrapper.enlarge) {
    width: calc(35vw + 88px);
  }
}

@media screen and (max-width: 330px) {
  .cmb02 {
    display: none;
  }

  .cmb01 {
    width: auto;
  }
}
</style>
