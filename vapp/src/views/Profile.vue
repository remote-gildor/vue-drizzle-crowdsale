<template>
    <div v-if="isDrizzleInitialized">
        <b-container class="mt-3">
            <h2>Profile</h2>

            <Gravatar :email="activeAccount" default-img="robohash" />

            <p>Your account: {{ activeAccount }}</p>
            <p>Your ETH balance: {{ getEthBalance }} ETH</p>  
            <p>Your TT balance: {{ getTestTokenBalance }} TT</p>
        </b-container>
    </div>

    <div v-else>Loading...</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Gravatar from "vue-gravatar";

export default {
    name: "Profile",
    components: {
        Gravatar
    },
    computed: {
        ...mapGetters("drizzle", ["isDrizzleInitialized", "drizzleInstance"]),
        ...mapGetters("accounts", ["activeAccount", "activeBalance"]),
        ...mapGetters("profile", ["getTestTokenBalance"]),
        userAccount() {
            return this.activeAccount
        },
        getEthBalance() {
            return this.drizzleInstance.web3.utils.fromWei(this.activeBalance, "ether");
        }
    },
    methods: {
        ...mapActions("profile", ["fetchTestTokenBalance"])
    },
    created() {
        this.$store.dispatch("profile/fetchTestTokenBalance");
    }
}
</script>

<style>

</style>