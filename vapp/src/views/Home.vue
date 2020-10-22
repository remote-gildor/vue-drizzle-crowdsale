<template>
    <div>
        <b-jumbotron header="Welcome to crowdsale!" lead="Help us launch the project">
            <br>
            <p>Click the button below to see the Crowdsale page</p>
            <router-link to="/crowdsale">
                <b-button variant="primary" href="/crowdsale">Buy tokens!</b-button>
            </router-link>
        </b-jumbotron>
    </div>
</template>

<script>
export default {
     name: "Home"
}
</script>

<style>

</style>