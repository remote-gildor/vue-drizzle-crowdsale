const state = {
  testCrowdsaleEtherCap: 0,
  testCrowdsaleEtherRaised: 0
};

const getters = {
  getTestCrowdsaleEtherCap(state) {
    return state.testCrowdsaleEtherCap;
  },
  getTestCrowdsaleEtherRaised(state) {
    return state.testCrowdsaleEtherRaised;
  }
};

const actions = {
  async fetchTestCrowdsaleEtherCap({ commit, rootState }) {
    let drizzleInstance = rootState.drizzle.drizzleInstance;
    const weiCap = await drizzleInstance.contracts.TestCrowdsale.methods.cap().call();

    commit("setTestCrowdsaleEtherCap", drizzleInstance.web3.utils.fromWei(weiCap, "ether"));
  },
  async fetchTestCrowdsaleEtherRaised({ commit, rootState }) {
    let drizzleInstance = rootState.drizzle.drizzleInstance;
    const weiRaised = await drizzleInstance.contracts.TestCrowdsale.methods.weiRaised().call();

    commit("setTestCrowdsaleEtherRaised", drizzleInstance.web3.utils.fromWei(weiRaised, "ether"));
  }
};

const mutations = {
  setTestCrowdsaleEtherCap(state, cap) {
    state.testCrowdsaleEtherCap = cap;
  },
  setTestCrowdsaleEtherRaised(state, raised) {
    state.testCrowdsaleEtherRaised = raised;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};