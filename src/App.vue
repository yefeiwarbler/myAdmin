<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import Login from "pages/login/index.vue";
import Layout from "components/Layout.vue";

export default {
    name: "App",
    components: {
        Layout,
        Login,
    }
}
</script>

<style>
@import "./index.css";
</style>
