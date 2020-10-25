<template>
  <section></section>
</template>

<script>
import Toasted from 'vue-toasted';
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

Vue.use(Toasted);

export default {
  computed: {
    ...mapGetters("drizzle", ["drizzleInstance"])
  },
  methods: {
    ...mapActions("profile", ["fetchTestTokenBalance"])
  },
  mounted() {
    const contractEventHandler = ({ contractName, eventName, data }) => {
      let display = `${contractName}(${eventName}) - ${data}`;

      if(eventName === 'TokensPurchased') {
        this.$store.dispatch("profile/fetchTestTokenBalance"); // update the user's token balance in vuex store

        let tokens = this.drizzleInstance.web3.utils.fromWei(data.amount, "ether");
        display = "You have just bought " + tokens + " TT tokens! :)";
      }

      const subOptions = { duration: 5000 };
      this.$toasted.show(display, subOptions);
    };

    this.$drizzleEvents.$on('drizzle/contractEvent', payload => {
      contractEventHandler(payload);
    });
  }
}
</script>
