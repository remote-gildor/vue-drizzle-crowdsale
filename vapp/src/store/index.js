import Vue from 'vue';
import Vuex from 'vuex';
import crowdsale from "./modules/crowdsale";
import profile from "./modules/profile";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        crowdsale,
        profile
    }
});
