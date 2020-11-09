<template>
    <el-row>
        <PageTitle pageTitle="首页 - MARKET AMIN" />
        <el-row>
            <Breadcrumb :breadcrumbs="this.breadcrumbs"/>
        </el-row>
        <el-col :span="8">
            <router-link to="/product">
                <div class="data-panel-container">
                    <div class="data-panel data-panel__brown">
                        <p class="data-number">{{this.homeData.productCount ? this.homeData.productCount : "-"}}</p>
                        <p class="data-title">
                            <i class="el-icon-tickets"></i>
                            <span>商品总数</span>
                        </p>
                    </div>
                </div>
            </router-link>
        </el-col>
        <el-col :span="8">
            <router-link to="/order">
                <div class="data-panel-container">
                    <div class="data-panel data-panel__green">
                        <p class="data-number">{{this.homeData.orderCount ? this.homeData.orderCount : "-"}}</p>
                        <p class="data-title">
                            <i class="el-icon-s-operation"></i>
                            <span>订单总数</span>
                        </p>
                    </div>
                </div>
            </router-link>
        </el-col>
        <el-col :span="8">
            <router-link to="/user">
                <div class="data-panel-container">
                    <div class="data-panel data-panel__red">
                        <p class="data-number">{{this.homeData.userCount ? this.homeData.userCount : "-"}}</p>
                        <p class="data-title">
                            <i class="el-icon-user"></i>
                            <span>用户总数</span>
                        </p>
                    </div>
                </div>
            </router-link>
        </el-col>
    </el-row>
</template>

<script>
import PageTitle from "components/PageTitle.vue";
import Breadcrumb from "components/Breadcrumb.vue";
import { getHomeData } from "service/index.js";
import { Message } from "element-ui";

export default {
    name: "Home",
    data(){
        return {
            // 面包屑
            breadcrumbs: [
                {
                    path: "/",
                    name: "首页"
                }
            ],
            // 首页数据：用户总数、订单总数、商品总数
            homeData: {
                userCount: "-",
                orderCount: "-",
                productCount: "-",
            }
        }
    },
    components: {
        PageTitle,
        Breadcrumb,
        Message,
    },
    created(){
        // 获取商品、订单、用户统计数据
        getHomeData().then(
            data => {
                this.homeData = data.data;
            },
            // 接口错误处理
            err => {
                Message.error({
                    showClose: true,
                    message: err,
                    customClass: "message-z-index"
                });
            }
        );
    },
}
</script>

<style lang="scss">
    // 首页卡片样式开始
    .data-panel-container{
        padding: 0 28px;

        .data-panel{
            overflow: hidden;
            text-align: center;
            color: #fff;
            opacity: 1;
            transition: all .3s;

            .data-number{
                margin-top: 30px;
                font-size: 50px;
            }

            .data-title{
                margin: 20px 0 30px;
                font-size: 16px;
            }

            &:hover, &:focus{
                transform: scale(1.08);
                opacity: .9;
                color: #222;
            }
            &.data-panel__brown{
                background: #f0ad4e;
            }
            &.data-panel__green{
                background: #2a7f2e;
            }
            &.data-panel__red{
                background: #f0433d;
            }
        }
    }
    // 首页卡片样式结束
</style>
