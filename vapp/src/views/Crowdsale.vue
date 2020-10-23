<template>
<div v-if="isDrizzleInitialized">
  <b-container class="mt-3">

    <b-row>
      <b-col md="4" offset-md="4" class="text-center">
        <h1>Crowdsale</h1>

        <p>Crowdsale cap: {{ getTestCrowdsaleEtherCap }} ETH</p>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols=12>
        <b-progress :max="getTestCrowdsaleEtherCap" height="2rem">
          <b-progress-bar :value="currentValue">
            <span><strong>{{ currentValue.toFixed(2) }} ETH / {{ getTestCrowdsaleEtherCap }} ETH</strong></span>
          </b-progress-bar>
        </b-progress>

      </b-col>
    </b-row>

    <b-row class="mt-4">
      <b-col md="4" offset-md="4" class="text-center">
        <b-card title="Buy tokens" sub-title="Enter the amount of ETH to invest">
          <b-form @submit.prevent="onSubmit">
            <b-form-group id="input-group-1" label-for="crowdsale-ether-field">

              <b-input-group append="ETH">
                <b-form-input 
                  id="crowdsale-ether-field" 
                  v-model="ethValue" 
                  type="text" 
                  required 
                  placeholder="0.0"
                >
                </b-form-input>
              </b-input-group>

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
import { mapGetters, mapActions } from "vuex";

export default {
    name: "Crowdsale",
    computed: {
      ...mapGetters("drizzle", ["isDrizzleInitialized", "drizzleInstance"]),
      ...mapGetters("contracts", ["getContractData"]),
      ...mapGetters("accounts", ["activeAccount", "activeBalance"]),
      ...mapGetters("crowdsale", ["getTestCrowdsaleEtherCap"]),
    },
    methods: {
      ...mapActions("crowdsale", ["fetchTestCrowdsaleEtherCap"]),

      onSubmit() {
        let sender = this.activeAccount;
        let recipient = this.drizzleInstance.contracts["TestCrowdsale"].address;
        let valueWei = this.drizzleInstance.web3.utils.toWei(this.ethValue, "ether");

        this.drizzleInstance.web3.eth.sendTransaction({
            from: sender,
            to: recipient,
            value: valueWei
        });
      }
    },
    created() {
      this.fetchTestCrowdsaleEtherCap();
    },
    data() {
      return {
        ethValue: "",
        currentValue: 10
      }
    }
}
</script>

<style>

</style>