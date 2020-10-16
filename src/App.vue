<template>
    <div id="app">
        <el-container>
            <el-header class="main-header">
                <Header />
            </el-header>
            <el-container style="margin-top: 60px;">
                <Aside />
                <el-main></el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import Header from "./components/Header.vue";
import Aside from "./components/Aside.vue";

export default {
    name: "App",
    components: {
        Header,
        Aside
    }
}
</script>

<style>
@import "./index.css";

.main-header{
    position:fixed;
    width: 100%;
    background-color:#262F3E;
    text-align: right;
    font-size: 12px;
    z-index: 3000;
}
</style>
