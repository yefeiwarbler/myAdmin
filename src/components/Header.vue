<template>
    <header class="main-header">
        <Logo />
        <el-menu 
            :default-active="activeIndex"
            mode="horizontal"
            @select="handleSelect"
            background-color="#262F3E"
            text-color="#c1c6c8"
            active-text-color="#fff"
        >
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-user-solid"></i>
                    <span v-if="this.username">欢迎，{{this.username}}</span>
                    <span v-else>欢迎您</span>
                </template>
                <el-menu-item
                    index="1-1"
                    @click="logout()"
                >退出登录</el-menu-item>
            </el-submenu>
        </el-menu>
    </header>
</template>

<script>
import Logo from "./Logo.vue";
import { getLocalStorage, removeLocalStorage } from "util/index";
import { User } from "service/index";

import {
    Menu,
    MenuItem,
    Submenu,
} from 'element-ui';

const user = new User();

export default {
    name: "Header",
    data() {
        return {
            activeIndex: "1",
            activeIndex2: "1",
            username: "",
        };
    },
    beforeCreate(){
        let userInfo = getLocalStorage("userInfo");
        if( userInfo === null ){
            this.$router.push("login");
        }
    },
    created(){
        let userInfo = getLocalStorage("userInfo");
        this.username = userInfo?.username || "";
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        logout(){
            user.logout()
                .then(response => {
                    if(response.status === 0){
                        removeLocalStorage("userInfo");
                        this.$router.push("/login");
                    }
                })
                .catch(err => {
                    alert("err");
                    console.log(err);
                });
        }
    },
    components: {
        Logo,
        ElMenu: Menu,
        ElMenuItem: MenuItem,
        ElSubmenu: Submenu,
    },
}
</script>

<style lang="scss">
    .main-header{
        display: flex;
        justify-content: space-between;
        width: 100%;
        background-color:#262F3E;
        font-size: 12px;
        z-index: 3000;
    }
</style>