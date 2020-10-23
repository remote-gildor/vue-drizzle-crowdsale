const state = {
  testTokenBalance: 0
};

const getters = {
  getTestTokenBalance(state) {
    return state.testTokenBalance;
  }
};

const actions = {
  async fetchTestTokenBalance({ commit, rootState }) {
    /*
    let drizzleInstance = rootState.drizzle.drizzleInstance;
    let activeAccount = rootState.accounts.activeAccount;

    window.console.log(drizzleInstance);

    let drizzleState = drizzleInstance.store.getState();
    window.console.log(drizzleState);

    const dataKey =  await drizzleInstance.contracts.TestToken.methods.balanceOf.cacheCall(activeAccount);
    window.console.log(dataKey);

    window.console.log(drizzleState.contracts.TestToken.balanceOf);

    const balanceSmall = drizzleState.contracts.TestToken.balanceOf[dataKey]["value"];
    window.console.log(balanceSmall);

    // remove the 18 decimals and commit as balance
    commit("setTestTokenBalance", drizzleInstance.web3.utils.fromWei(balanceSmall, "ether"));
    */
   
    let drizzleInstance = rootState.drizzle.drizzleInstance;
    let web3 = drizzleInstance.web3;
    let activeAccount = rootState.accounts.activeAccount;

    let testTokenContract = new web3.eth.Contract(
      drizzleInstance.contracts.TestToken.abi,
      drizzleInstance.contracts.TestToken.address
    );

    // call balanceOf function
    let smallUnitBalance = await testTokenContract.methods.balanceOf(activeAccount).call();

    // remove the 18 decimals and commit as balance
    commit("setTestTokenBalance", web3.utils.fromWei(smallUnitBalance, "ether"));
  }
};

const mutations = {
  setTestTokenBalance(state, balance) {
    state.testTokenBalance = balance
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};