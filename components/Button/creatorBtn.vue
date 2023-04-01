<template>
  <div class="header-btn-wrapper">
    <button class="header-btn-left">
      <slot></slot>
    </button>
    <button class="header-btn-right">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 10L1.66987 4L10.3301 4L6 10Z" fill="#D9D9D9" />
      </svg>
    </button>
  </div>
</template>

<style lang="less" scoped>
.dark {
  .header-btn-wrapper {
    box-shadow: 0 5px 5px rgb(0 0 0 / 20%);
  }
}

button {
  background: none;
}

.header-btn-wrapper {
  display: flex;
  height: 36px;
  background: var(--theme-creator-btn);
  border-radius: 4px;
  transform: all 0.4s linear;
}

.header-btn-left {
  padding: 0 12px;
  color: var(--theme-creator-btn-text);
  border-radius: 4px;

  &:hover {
    background: var(--theme-creator-btn-hover);
  }
}

.header-btn-right {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 100%;
  border-radius: 0 4px 4px 0;
  border-left: 1px solid rgb(255 255 255 / 10%);

  &:hover {
    cursor: pointer;
    background: var(--theme-creator-btn-hover);
  }
}

.actived {
  transform-origin: left;
  transform: translateX(100%);
}
</style>
