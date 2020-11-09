<template>
    <el-row>
        <el-row>
            <PageTitle pageTitle="用户列表 - MARKET ADMIN" />
            <el-col :span="24">
                <Breadcrumb :breadcrumbs="this.breadcrumbs"/>
            </el-col>
        </el-row>
        <el-row
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-background="rgba(255, 255, 255, 0.7)"
            element-loading-spinner="el-icon-loading"
        >            
            <el-col :span="24">
                <el-table 
                    :data="userDataList"
                >
                    <el-table-column
                        prop="id"
                        label="ID"
                        width="60"
                    ></el-table-column>
                    <el-table-column
                        prop="username"
                        label="用户名"
                    ></el-table-column>
                    <el-table-column
                        prop="email"
                        label="邮箱"
                    ></el-table-column>
                    <el-table-column
                        prop="phone"
                        label="联系方式"
                        width="160"
                    ></el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="注册时间"
                    ></el-table-column>
                </el-table>
            </el-col>
            <el-col :span="24">
                <el-pagination
                    layout="prev, pager, next"
                    :total="pager.total"
                    style="text-align: center"
                    :hide-on-single-page="true"
                    @current-change="onPageNumChange"
                    :page-size="pager.pageSize"
                >
                </el-pagination>
            </el-col>
        </el-row>
    </el-row>
</template>

<script>
import PageTitle from "components/PageTitle.vue";
import Breadcrumb from "components/Breadcrumb.vue";
import { Loading, Message } from "element-ui";
import { User } from "service/index.js";

const user = new User();

export default {
    name: "User",
        data(){
        return {
            // 面包屑
            breadcrumbs: [
                {
                    path: "/",
                    name: "首页",
                },
                {
                    path: "/user",
                    name: "用户列表",
                }
            ],
            // 用户列表页
            userDataList: new Array(10).fill({
                id: "-",
                username: "-",
                phone: "-",
                email: "-",
                createTime: "-",
            }),
            // 分页器
            pager: {
                total: 0,
                pageSize: 10
            },
            loading: true
        }
    },
    components: {
        PageTitle,
        Breadcrumb,
        Message,
    },
    methods: {
        // 页数发生变化时，获取新页数的数据
        onPageNumChange( currentPage ){
            this.getUserList( currentPage );
        },
        // 获取第pageNum页的数据
        getUserList( pageNum ){
            this.loading = true;
            user.getUserList( pageNum )
                .then( 
                    (data) => {
                        // 分页器
                        this.pager.total = data.total || 0;
                        this.pager.pageSize = data.pageSize || 10;
                        // 用户列表
                        this.userDataList = data.list.map(userData => {
                            // 时间戳 -> 本地格式时间字符串
                            userData.createTime = new Date(userData.createTime)
                                .toLocaleString()
                                .replaceAll("/", "-");
                            return userData;
                        });
                    },
                    // 错误处理
                    errMsg => {
                        Message.error({
                            showClose: true,
                            message: errMsg,
                            customClass: "message-z-index"
                        });
                    }
                )
                // 取消loading动画
                .finally(() => {
                    this.loading = false;
                });
        },
    },
    mounted(){
        this.getUserList( 1 );
    }
}
</script>

<style>

</style>