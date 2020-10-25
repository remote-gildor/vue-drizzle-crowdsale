<template>
  <div v-if="isDrizzleInitialized" id="app">
    <Navbar />

    <keep-alive>
      <router-view />
    </keep-alive>

    <Toast />
  </div>

  <div v-else>Loading...</div>
</template>

<script>
import { mapGetters } from 'vuex';
import Navbar from "./components/Navbar";
import Toast from "./components/Toast";

export default {
  name: 'app',
  components: {
    Navbar,
    Toast
  },
  computed: mapGetters('drizzle', ['isDrizzleInitialized'])
}
</script>

<style>
</style>
