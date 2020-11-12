<template>
    <router-link to="/">
        <div class="logo-container">
            <h1 class="logo-title">ADMIN</h1>
        </div>
    </router-link>
</template>

<script>

export default {
    name: "Logo",
    props: {

    }
}
</script>

<style>
    .logo-container{
        width: 200px;
        height: 60px;
        margin-left: -20px;
        padding: 10px 20px;
        text-align: left;
    }
    .logo-title{
        font-size: 30px;
        color: #409EFE;
    }
    .logo-title:hover{
        cursor: pointer;
    }
</style>