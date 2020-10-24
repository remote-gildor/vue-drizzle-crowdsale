<template>
    <!-- NAVBAR -->
    <b-navbar toggleable="lg" type="dark" variant="primary">
        <router-link to="/">
            <b-navbar-brand href="/">TestToken (TT) Crowdsale</b-navbar-brand>
        </router-link>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

            <router-link to="/crowdsale"><b-nav-item href="/crowdsale">Crowdsale</b-nav-item></router-link>
            <router-link to="/profile"><b-nav-item href="/profile">Profile</b-nav-item></router-link>

        </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
export default {
    name: "Navbar"
}
</script>

<style>

</style>