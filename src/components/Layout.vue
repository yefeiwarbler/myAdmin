<template>
    <div>
        <Header />
        <div class="main-container">
            <Aside />
            <main class="main-content">
                <router-view></router-view>
            </main>
        </div>
    </div>
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
    .main-container{
        position: absolute;
        top: 60px;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .main-content{
        position: absolute;
        top: 0;
        left: $asideWidth;
        right: 0;
        bottom: 0;
        height: 100%;
        padding: 20px;
        overflow: auto;
    }
</style>