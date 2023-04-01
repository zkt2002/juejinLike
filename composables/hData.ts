import { defineStore } from 'pinia';

export const useHListStore = defineStore('hData', {
  state: () => {
    return {
      hList: [],
    };
  },
});
