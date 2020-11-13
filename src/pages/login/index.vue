<template>
    <div class="login-form-outter-container">
        <el-row type="flex" justify="center" :gutter="15" >
            <PageTitle pageTitle="登录 - MARKET ADMIN" />
            <el-col :md="6" :xs="24">
                <div class="login-form-container">
                    <p class="login-title">欢迎登录 - ADMIN</p>
                    <el-form
                        :model="loginForm"
                        :rules="rules"
                        label-width="80px"
                        ref="loginForm"
                    >
                        <el-form-item label="用户名" prop="username">
                            <el-input
                                placeholder="请输入用户名"
                                v-model="loginForm.username"
                                @keyup.enter.native="onSubmit('loginForm')"
                            >
                            </el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input
                                type="password"
                                placeholder="请输入密码"
                                v-model="loginForm.password"
                                @keyup.enter.native="onSubmit('loginForm')"
                            ></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button 
                                type="primary"
                                @click="onSubmit('loginForm')"
                            >登录</el-button>
                            <el-button
                                @click="resetForm('loginForm')"
                            >重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import PageTitle from "components/PageTitle.vue";
import { User } from "service/index";
import { setLocalStorage, getUrlParam, getLocalStorage } from "util/index";

import { 
    Message,
    Form,
    FormItem,
    Input,
    Button,
} from "element-ui";

import {

} from 'element-ui';

const user = new User();

export default {
    name: "Login",
    data(){
        return {
            loginForm: {
                username: "",
                password: "",
                redirect: "",
            },
            // 表单校验
            rules: {
                username: [
                    {required: true, message: "请输入用户名", trigger: "blur"}
                ],
                password: [
                    {required: true, message: "请输入密码", trigger: "blur"}
                ]
            },
        }
    },
    created(){
        // 获取url参数，用于登录成功后的跳转
        this.redirect = getUrlParam("redirect") || "/";
        // 用户已登录，跳转
        const userInfo = getLocalStorage("userInfo");
        if( userInfo ){
            this.$router.push(this.redirect);
        }
    },
    methods: {
        // 表单提交
        onSubmit( formName ){
            // element-ui方法：校验后执行回调
            this.$refs[formName].validate( valid => {
                // 校验通过
                if( valid ){
                    const userInfo = {
                        username: this.loginForm.username,
                        password: this.loginForm.password
                    };
                    user.login(this.loginForm)
                        .then( data => {
                            const status = data.status;
                            // 登录成功
                            if( status == 0 ){
                                this.doLogin(data.data);
                            }
                            // 登录失败
                            else{
                                Message.error({
                                    showClose: true,
                                    message: data.msg,
                                    customClass: "message-z-index",
                                    center: true,
                                });
                            }
                        }, err => {
                            Message.error({
                                showClose: true,
                                message: err,
                                customClass: "message-z-index",
                                center: true,
                            });
                        })
                        .catch( err => {
                            Message.error({
                                showClose: true,
                                message: err,
                                customClass: "message-z-index",
                                center: true,
                            });
                        });
                }
                // 校验未通过
                else {
                    Message.warning({
                        showClose: true,
                        message: "请输入用户名和密码",
                        customClass: "message-z-index",
                        center: true,
                    });
                }
            });
        },
        // 重置表单
        resetForm( formName ){
            this.$refs[formName].resetFields();
        },
        // 登录成功，保存用户信息，跳转回登录前的页面
        doLogin( userInfo ){
            setLocalStorage("userInfo", JSON.stringify(userInfo));
            this.$router.push({
                path : this.redirect
            });
        },
    },
    components:{
        PageTitle,
        ElForm: Form,
        ElFormItem: FormItem,
        ElInput: Input,
        ElButton: Button,
    },
}
</script>

<style scoped>
    .login-form-outter-container{
        padding: 0 7.5px;
        min-height: 100%;
        background: #eee;
    }
    .login-form-container{
        margin-top: 30%;
        padding: 54px 20px 10px 0;
        background: #fff;
        border-radius: 5%;
        box-shadow:3px 3px 4px #888;
    }
    .login-title{
        margin-bottom: 24px;
        font-size: 30px;
        text-align: center;
    }
</style>