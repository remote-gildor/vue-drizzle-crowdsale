import Vuex from 'vuex';

export default function createStore(initializeDrizzle) {

  return new Vuex.Store({
    modules: {
      drizzle: {
        state: {},
        actions: {},
        getters: {
          isDrizzleInitialized() {
            return initializeDrizzle;
          }
        },
        namespaced: true
      }
    }
  });
  
};
