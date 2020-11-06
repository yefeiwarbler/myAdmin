<template>
    <el-container>
        <el-header class="main-header">
            <Header />
        </el-header>
        <el-container style="margin-top: 60px;">
            <Aside />
            <el-main class="main-container">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import Header from "components/Header.vue";
import Aside from "components/Aside.vue";

export default {
    name: "Layout",
    components: {
        Header,
        Aside,
    }
}
</script>

<style lang="scss">
$asideWidth: 200px;
.main-header{
    position:fixed;
    width: 100%;
    background-color:#262F3E;
    text-align: right;
    font-size: 12px;
    z-index: 3000;
}
.main-container{
    margin-left: $asideWidth;
    min-height: 100%;
}
</style>