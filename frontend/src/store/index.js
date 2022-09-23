import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";


export default new Vuex.Store({
  state: {
    user: null,
    token: null,
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    })],
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    setToken({ commit }, token) {
        commit("SET_TOKEN", token);
      },
    setUser({ commit }, user) {
        commit("SET_USER", user);
      },
  },
  getters: {
    user(state) {
        return state.user;
      },
  },
});