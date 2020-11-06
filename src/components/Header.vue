<template>
    <el-row>
        <el-col :span="6">
            <el-row type="flex" justify="start">
                <Logo />
            </el-row>
        </el-col>
        <el-col :span="18">
            <el-row type="flex" justify="end">
                <el-menu 
                    :default-active="activeIndex"
                    class="el-menu-demo"
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
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
import Logo from "./Logo.vue";
import { getLocalStorage, removeLocalStorage } from "util/index";
import User from "service/index";

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
    created(){
        let userInfo = getLocalStorage("userInfo");
        this.username = userInfo.username || "";
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
        Logo
    }
}
</script>

<style>

</style>