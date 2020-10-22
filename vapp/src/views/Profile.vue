<template>
    <div v-if="isDrizzleInitialized">
        <b-container class="mt-3">
            <h2>Profile</h2>

            <p>Your account: {{ activeAccount }}</p>
            <p>Your ETH balance: {{ getEthBalance }} ETH</p>  
            <p>Your TT balance: {{ getTestTokenBalance }} TT</p>
        </b-container>
    </div>

    <div v-else>Loading...</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: "Profile",
    computed: {
        ...mapGetters("drizzle", ["isDrizzleInitialized", "drizzleInstance"]),
        ...mapGetters("accounts", ["activeAccount", "activeBalance"]),
        userAccount() {
            return this.activeAccount
        },
        getEthBalance() {
            return this.drizzleInstance.web3.utils.fromWei(this.activeBalance, "ether");
        },
        getTestTokenBalance() {
            let state = this.drizzleInstance.store.getState();
            const dataKey = this.drizzleInstance.contracts.TestToken.methods.balanceOf.cacheCall(this.activeAccount);

            let balanceSmall = state.contracts.TestToken.balanceOf[dataKey]["value"];

            // remove the 18 decimals
            return this.drizzleInstance.web3.utils.fromWei(balanceSmall, "ether");
        }
    }
}
</script>

<style>

</style>