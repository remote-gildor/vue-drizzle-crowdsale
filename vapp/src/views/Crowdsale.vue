<template>
<div v-if="isDrizzleInitialized">
  <b-container class="mt-3">

    <b-row>
      <b-col md="4" offset-md="4" class="text-center">
        <h1>Crowdsale</h1>

        <p>Crowdsale cap: {{ getCrowdsaleCap }} ETH</p>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols=12>
        <b-progress :max="getCrowdsaleCap" height="2rem">
          <b-progress-bar :value="getCrowdsaleRaised">
            <span><strong>{{ getCrowdsaleRaised }} ETH</strong></span>
          </b-progress-bar>
        </b-progress>

      </b-col>
    </b-row>

    <b-row class="mt-4">
      <b-col md="4" offset-md="4" class="text-center">
        <b-card title="Buy TT tokens" sub-title="Enter the amount of ETH to invest">
          <b-form @submit.prevent="onSubmit">
            <b-form-group id="input-group-1" label-for="crowdsale-ether-field">

              <b-input-group append="ETH" class="mt-4 mb-2">
                <b-form-input 
                  id="crowdsale-ether-field" 
                  v-model="ethValue" 
                  type="text" 
                  required 
                  placeholder="0.0"
                  trim
                >
                </b-form-input>
                
              </b-input-group>
              <b-form-text id="crowdsale-ether-field-feedback">
                You will receive <strong>{{ ethValue * getCrowdsaleRate }} TT</strong> tokens.
                </b-form-text>

              <b-button class="mt-2" type="submit" variant="primary">Submit</b-button>
            </b-form-group>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</div>

<div v-else>Loading...</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "Crowdsale",
    computed: {
      ...mapGetters("accounts", ["activeAccount", "activeBalance"]),
      ...mapGetters("contracts", ["getContractData"]),
      ...mapGetters("drizzle", ["isDrizzleInitialized", "drizzleInstance"]),

      getCrowdsaleCap() {
        let capWei = this.getContractData({
          contract: "TestCrowdsale",
          method: "cap"
        });

        if (capWei === "loading") return "0";

        let cap = this.drizzleInstance.web3.utils.fromWei(capWei, "ether");

        return cap
      },
      getCrowdsaleRate() {
        let rate = this.getContractData({
          contract: "TestCrowdsale",
          method: "rate"
        });

        if (rate === "loading") return "0";

        return rate
      },
      getCrowdsaleRaised() {
        let raisedWei = this.getContractData({
          contract: "TestCrowdsale",
          method: "weiRaised"
        });

        if (raisedWei === "loading") return "0";

        let raised = Number(this.drizzleInstance.web3.utils.fromWei(raisedWei, "ether")).toFixed(2);

        return raised
      }
    },
    methods: {
      // buy tokens with ETH
      onSubmit() {
        let sender = this.activeAccount;
        let recipient = this.drizzleInstance.contracts["TestCrowdsale"].address;
        let valueWei = this.drizzleInstance.web3.utils.toWei(this.ethValue, "ether");

        let component = this;

        this.drizzleInstance.web3.eth.sendTransaction({
          from: sender,
          to: recipient,
          value: valueWei
        }, function(error, hash){
          window.console.log("The transaction has been sent. Please wait for the block confirmation.");

          // create a waiting toast
          let waitingToast = component.$toasted.show('Waiting for transaction to complete...', {
            type: 'info',
            duration: null,
            theme: "bubble",
            position: "top-center"
          });

          if (error) {
            waitingToast.goAway(0); // remove the waiting toast

            // create an error toast
            component.$toasted.show('Your transaction has failed. Please try again, perhaps with a higher gas limit.', {
              type: 'error',
              duration: 9000,
              theme: "bubble",
              position: "top-center"
            });
          }

          if (hash) {
            waitingToast.goAway(0); // remove the waiting toast
          }
            
        });
      }
    },
    created() {
      this.$store.dispatch("drizzle/REGISTER_CONTRACT", {
        contractName: "TestCrowdsale",
        method: "cap",
        methodArgs: []
      });

      this.$store.dispatch("drizzle/REGISTER_CONTRACT", {
        contractName: "TestCrowdsale",
        method: "rate",
        methodArgs: []
      });

      this.$store.dispatch("drizzle/REGISTER_CONTRACT", {
        contractName: "TestCrowdsale",
        method: "weiRaised",
        methodArgs: []
      });
    },
    data() {
      return {
        ethValue: "1"
      }
    }
}
</script>

<style>

</style>