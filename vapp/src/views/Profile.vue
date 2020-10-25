<template>
    <div v-if="isDrizzleInitialized">
        <b-container class="mt-3">
            <b-row class="mt-4">
                <b-col md="4" offset-md="4" class="text-center">
                    <h1>Profile</h1>

                    <b-card class="mb-2">
                        <Gravatar class="img-fluid" :email="activeAccount" default-img="robohash" :size=200 />

                        <b-card-text class="mt-2">
                            <p>{{ activeAccount }}</p>
                            <p><strong>Your ETH balance:</strong> {{ Number(getEthBalance).toFixed(4) }} ETH</p>
                            <p><strong>Your TT balance:</strong> {{ Number(getTestTokenBalance).toFixed(2) }} TT</p>
                        </b-card-text>

                        <router-link to="/crowdsale">
                            <b-button variant="primary" href="/crowdsale">Buy tokens!</b-button>
                        </router-link>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
    </div>

    <div v-else>Loading...</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Gravatar from "vue-gravatar";

export default {
    name: "Profile",
    components: {
        Gravatar
    },
    computed: {
        ...mapGetters("accounts", ["activeAccount", "activeBalance"]),
        ...mapGetters("drizzle", ["isDrizzleInitialized", "drizzleInstance"]),
        ...mapGetters("profile", ["getTestTokenBalance"]),

        userAccount() {
            return this.activeAccount
        },
        getEthBalance() {
            return this.drizzleInstance.web3.utils.fromWei(this.activeBalance, "ether");
        }
    },
    created() {
        this.$store.dispatch("profile/fetchTestTokenBalance");
    },
    methods: {
        ...mapActions("profile", ["fetchTestTokenBalance"])
    }
}
</script>

<style>

</style>