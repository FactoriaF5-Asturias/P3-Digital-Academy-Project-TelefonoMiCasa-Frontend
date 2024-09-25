const store = new Vuex.Store({
    state: {
      currentUserId: null,
    },
    mutations: {
      setCurrentUserId(state, userId) {
        state.currentUserId = userId;
      }
    }
  });
   