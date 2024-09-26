// stores/userStore.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    userIds: [],  
  }),
  actions: {
    addUserId(id) {
      this.userIds.push(id);  
    },
    removeUserId(id) {
      this.userIds = this.userIds.filter(userId => userId !== id);  
    },
  },
});
