import { defineStore } from 'pinia';

export const useTheme = defineStore('theme', {
  state: () => ({
    theme: '',
  }),
  actions: {
    switchTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', this.theme);
    },
  },
});
