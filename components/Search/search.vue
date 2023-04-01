<script setup lang="ts">
import { ref } from '#imports';
const props = defineProps<{
  enlarge?: boolean;
  theme?: {
    type: string;
    default: 'light';
  };
}>();

const isEnlarge = ref(false);
const isActive = ref(false);
const emit = defineEmits(['onFocus']);
function isFocus(status: boolean) {
  emit('onFocus', status);
}
const setFocus = (model: number) => {
  if (model === 1) {
    isActive.value = true;
    isEnlarge.value = props.enlarge ? true : false;
    isFocus(true);
  } else {
    isActive.value = false;
    isEnlarge.value = false;
    isFocus(false);
  }
};
</script>
<template>
  <div :class="['search-wrapper', isActive ? 'actived' : '', isEnlarge ? 'enlarge' : '']">
    <form action="">
      <input type="text" placeholder="探索稀土掘金" @focus="setFocus(1)" @blur="setFocus(2)" />
    </form>
    <div :class="['search-btn', isActive ? 'actived' : '']">
      <span class="icon-search"></span>
    </div>
  </div>
</template>

<style lang="less">
.search-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 180px;
  height: 34px;
  background: var(--theme-search-base);
  border: 1px solid var(--theme-search-border);
  border-radius: 4px;
  transition: all 0.2s linear;

  form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1px;
    width: 100%;
  }

  input {
    padding: 0 12px;
    width: 100%;
    font-size: 14px;
    color: var(--theme-search-text);
    background: none;
    outline: none;
  }

  .search-btn {
    margin-right: 2px;
    width: 44px;
    height: 30px;
    font-size: 20px;
    text-align: center;
    background: var(--theme-search-btn);
    border-radius: 4px;
    flex-shrink: 0;

    &.actived {
      background: var(--theme-search-btn-actived);

      .icon-search::before {
        color: var(--theme-search-icon-actived);
      }
    }

    .icon-search {
      line-height: 30px;
    }
  }
}

.dark {
  .search-wrapper.actived {
    border-image: var(--theme-search-border-actived) 10;
    border-radius: 4px;
    box-shadow: 0 5px 5px rgb(0 0 0 / 25%);
  }
}

.light {
  .search-wrapper.actived {
    border: 1px solid var(--theme-search-border-actived);
    border-radius: 4px;
  }
}

.search-wrapper.enlarge {
  width: calc(180px + 140px);
}
</style>
