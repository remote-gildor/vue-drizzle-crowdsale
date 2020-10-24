<template>
    <div>
        <div v-if="isDrizzleInitialized">
        <b-jumbotron header="Welcome to crowdsale!" lead="Help us launch the project" class="text-center">
            <br>
            <p>Click the button below to see the Crowdsale page</p>
            <router-link to="/crowdsale">
                <b-button variant="primary" href="/crowdsale">Buy TT tokens!</b-button>
            </router-link>
        </b-jumbotron>
        </div>

        <div v-else>Loading...</div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
     name: "Home",
     computed: {
      ...mapGetters("drizzle", ["isDrizzleInitialized", "drizzleInstance"]),
     }
}
</script>

<style>

</style>