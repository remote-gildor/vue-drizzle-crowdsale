<template>
  <b-container class="mt-3">
    <b-row>
      <b-col md="4" offset-md="4" class="text-center">
        <h1>Crowdsale</h1>

        <b-progress :max="crowdsaleCap" height="2rem">
          <b-progress-bar :value="currentValue">
            <span><strong>{{ currentValue.toFixed(2) }} ETH / {{ crowdsaleCap }} ETH</strong></span>
          </b-progress-bar>
        </b-progress>

      </b-col>
    </b-row>

    <b-row>
      <b-col cols=4>
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
</template>

<script>
import {mapGetters} from "vuex";

const args = {
  contractName: "TestCrowdsale",
  method: "cap",
  methodArgs: ""
}

export default {
    name: "Crowdsale",
    computed: {
      ...mapGetters("drizzle", ["drizzleInstance"]),
      ...mapGetters("contracts", ["getContractData"]),
      ...mapGetters("accounts", ["activeAccount", "activeBalance"]),
      crowdsaleCap() {
        let capWei = this.getContractData({
          contract: args.contractName,
          method: args.method
        });

        return this.drizzleInstance.web3.utils.fromWei(capWei.toString(), "ether");
      }
    },
    methods: {
      onSubmit() {
        window.console.log(this.ethValue);

        let sender = this.activeAccount;
        let recipient = this.drizzleInstance.contracts["TestCrowdsale"].address;
        window.console.log(sender);
        window.console.log(recipient);

        let valueWei = this.drizzleInstance.web3.utils.toWei(this.ethValue, "ether");
        window.console.log(valueWei);

        this.drizzleInstance.web3.eth.sendTransaction({
            from: sender,
            to: recipient,
            value: valueWei
        });
      }
    },
    created() {
        this.$store.dispatch("drizzle/REGISTER_CONTRACT", args);
    },
    data() {
      return {
        ethValue: "",
        currentValue: 1
      }
    }
}
</script>

<style>

</style>