const state = {
  testCrowdsaleEtherCap: 0, // this value (cap) could be hardcoded in order to save on node calls
  testCrowdsaleEtherRaised: 0,
  testCrowdsaleRate: 0 // this could also be hardcoded if it remains the same through the whole crowdsale
};

const getters = {
  getTestCrowdsaleEtherCap(state) {
    return state.testCrowdsaleEtherCap;
  },
  getTestCrowdsaleEtherRaised(state) {
    return state.testCrowdsaleEtherRaised;
  },
  getTestCrowdsaleRate(state) {
    return state.testCrowdsaleRate;
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
  },
  async fetchTestCrowdsaleRate({ commit, rootState }) {
    let drizzleInstance = rootState.drizzle.drizzleInstance;
    const rate = await drizzleInstance.contracts.TestCrowdsale.methods.rate().call();

    commit("setTestCrowdsaleRate", rate);
  }
};

const mutations = {
  setTestCrowdsaleEtherCap(state, cap) {
    state.testCrowdsaleEtherCap = cap;
  },
  setTestCrowdsaleEtherRaised(state, raised) {
    state.testCrowdsaleEtherRaised = raised;
  },
  setTestCrowdsaleRate(state, rate) {
    state.testCrowdsaleRate = rate;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};