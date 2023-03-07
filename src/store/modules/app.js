const app = {
  namespaced: true,
  state: () => ({
    count: 0,
  }),
  mutations: {
    increment(state) {
      state.count++;
    },
  },
  actions: {
    incrementIfOddOnRootSum({ state, commit, rootState }) {
      console.log("rootState", rootState.app.count);
      commit("increment");
    },
  },
  getters: {
    doubleCount(state) {
      return state.count * 2;
    },
  },
};

export default app;
