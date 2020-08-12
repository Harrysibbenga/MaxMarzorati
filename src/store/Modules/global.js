const global = {
  namespaced: true,
  state: {
    loading: false,
    modal: false
  },
  mutations: {
    setLoading(state, val) {
      state.loading = val;
    },
    setModal(state, val) {
      state.modal = val;
    }
  },
  actions: {
    setLoading({
      commit
    }, value) {
      commit('setLoading', value)
    },
    setModal({
      commit
    }, value) {
      commit('setModal', value)
    }
  },
  getters: {
    getLoading(state) {
      return state.loading;
    },
    getModal(state) {
      return state.modal;
    }
  }
}

export default global;