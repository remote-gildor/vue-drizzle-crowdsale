<template>
  <div v-if="isDrizzleInitialized" id="app">
    <Navbar />

    <router-view />
  </div>

  <div v-else>Loading...</div>
</template>

<script>
import { mapGetters } from 'vuex';
import Navbar from "./components/Navbar";

export default {
  name: 'app',
  components: {
    Navbar
  },
  computed: mapGetters('drizzle', ['isDrizzleInitialized'])
}
</script>

<style>
</style>
