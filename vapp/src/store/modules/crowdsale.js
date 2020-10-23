const state = {
  testCrowdsaleEtherCap: 0
};

const getters = {
  getTestCrowdsaleEtherCap(state) {
    return state.testCrowdsaleEtherCap;
  }
};

const actions = {
  async fetchTestCrowdsaleEtherCap({ commit, rootState }) {
    
    let drizzleInstance = rootState.drizzle.drizzleInstance;

    const weiCap = await drizzleInstance.contracts.TestCrowdsale.methods.cap().call();

    commit("setTestCrowdsaleEtherCap", drizzleInstance.web3.utils.fromWei(weiCap, "ether"));
  }
};

const mutations = {
  setTestCrowdsaleEtherCap(state, cap) {
    state.testCrowdsaleEtherCap = cap;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};