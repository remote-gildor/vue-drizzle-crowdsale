# An example Vue Drizzle token crowdsale dApp

## Smart contracts

- TestToken
- TestCrowdsale

## Dependencies

- Vue
- Drizzle & Drizzle Vue Plugin
- Vuex
- Vue Router
- Vue Bootstrap
- Vue Toasted
- Vue Gravatar

## Screenshots

### Home page

![](assets/home-page.png)

### Crowdsale page

![](assets/crowdsale-page.png)

### Profile page

![](assets/profile-page.png)

## Contract calls

There are different ways of getting data from a contract:

### Using getContractData

**JavaScript:**

```javascript
computed: {
  ...mapGetters("drizzle", ["isDrizzleInitialized", "drizzleInstance"]),
  ...mapGetters("accounts", ["activeAccount", "activeBalance"]),
  ...mapGetters("contracts", ["getContractData"]),

  getTestTokenBalance() {
    window.console.log(this.activeAccount);

    return this.getContractData({
      contract: "TestToken",
      method: "balanceOf",
      methodArgs: [this.activeAccount]
    });
  }
},
created() {
  this.$store.dispatch("drizzle/REGISTER_CONTRACT", {
      contractName: "TestToken",
      method: "balanceOf",
      methodArgs: [this.activeAccount]
  });
}
```

**HTML:**

```html
<p>Your token balance : {{ getTestTokenBalance }} TT</p>
```

### Using Vuex (recommended)

A better option is to use Vuex store, because it gives you more control.

This is how an action in Vuex store should look like:

```javascript
const actions = {
  async fetchTestTokenBalance({ commit, rootState }) {
    let drizzleInstance = rootState.drizzle.drizzleInstance;
    let activeAccount = rootState.accounts.activeAccount;

    // get token balance for the active user
    const smallUnitBalance = await drizzleInstance.contracts.TestToken.methods.balanceOf(activeAccount).call()

    // remove the 18 decimals and commit as balance
    commit("setTestTokenBalance", drizzleInstance.web3.utils.fromWei(smallUnitBalance, "ether"));
  }
};
```

You can see the rest od the implementation in this repository (`vapp/src/store/modules/profile.js` and `vapp/src/views/Profile.vue`).

## TODO

- Update the state when the event is returned
- Implement Vue Toasted
- Write Solidity sanity tests
- etc.
