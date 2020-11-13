<template>
    <aside class="main-aside">
        <el-menu
            background-color="#1e222d"
            text-color="#c1c6c8"
            active-text-color="#fff"
            :default-active="this.$route.path"
            router
            class="main-nav-vertical"
        >
            <el-menu-item index="/" route="/">
                <i class="el-icon-s-home"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-tickets"></i>
                    <span>商品</span>
                </template>
                <el-menu-item index="/product" route="/product">商品管理</el-menu-item>
                <el-menu-item index="/product-category" route="/product-category">品类管理</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-s-operation"></i>
                    <span slot="title">订单</span>
                </template>
                <el-menu-item index="/order" route="/order">订单管理</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-user"></i>
                    <span slot="title">用户</span>
                </template>
                <el-menu-item index="/user" route="/user">用户管理</el-menu-item>
            </el-submenu>
        </el-menu>
    </aside>
</template>

<script>
export default {
    name: "Aside",
}
</script>

<style lang="scss">
    .main-aside{
        position: relative;
        height: 100%;

        .el-menu{
            height: 100%;
        }

        .main-nav-vertical{
            height: 100%;
            width: 200px;
        }
    }
</style>