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
                            <span>欢迎，adminxxx</span>    
                        </template>
                        <el-menu-item index="1-1">退出登录</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
import Logo from './Logo.vue';

export default {
    name: "Header",
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1'
            };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    components: {
        Logo
    }
}
</script>

<style>

</style>