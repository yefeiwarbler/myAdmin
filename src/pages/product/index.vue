<template>
    <el-row>
        <el-row>
            <PageTitle pageTitle="商品管理 - MARKET ADMIN" />
            <Breadcrumb :breadcrumbs="this.breadcrumbs" />
        </el-row>
        <el-row
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-background="rgba(255, 255, 255, 0.7)"
            element-loading-spinner="el-icon-loading"
        >
            <el-col :span="24">
                <el-form
                    :inline="true"
                    :model="searchForm"
                    :rules="rules"
                    ref="searchForm"
                >
                    <el-form-item label="ID" prop="productId">
                        <el-input
                            placeholder="请输入商品ID"
                            v-model="searchForm.productId"
                            @keyup.enter.native="onSearch('searchForm')"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="商品名称" prop="productName">
                        <el-input
                            placeholder="请输入商品名称"
                            v-model="searchForm.productName"
                            @keyup.enter.native="onSearch('searchForm')"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            type="primary"
                            @click="onSearch('searchForm')"
                        >查询</el-button>
                        <el-button
                            @click="resetForm('searchForm')"
                        >重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="24">
                <el-table 
                    :data="productDataList"
                    stripe
                >
                    <el-table-column
                        prop="id"
                        label="ID"
                        width="60"
                    ></el-table-column>
                    <el-table-column
                        label="信息"
                    >
                        <template slot-scope="scope">
                            <p>{{ scope.row.name }}</p>
                            <p>{{ scope.row.subTitle }}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="价格"
                        width="120"
                    >
                        <template slot-scope="scope">
                            <p>{{ `￥${scope.row.price}` }}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="状态"
                        width="160"
                    >
                        <template slot-scope="scope">
                            <el-tag type="primary" v-if="scope.row.status === 1">在售中</el-tag>
                            <el-tag type="warning" v-else>已下架</el-tag>
                            <el-button 
                                type="primary"
                                size="small"
                                @click="onSetProductStatus($event, scope.row.status)"
                            >{{scope.row.status === 1 ? "下架" : "上架"}}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="150"
                    >
                        <template slot-scope="scope">
                            <router-link :to="`/product/detail/${scope.row.id}`">
                                <el-button 
                                    size="small"
                                >查看</el-button>
                            </router-link>
                            <router-link :to="`/product/save/${scope.row.id}`">
                                <el-button 
                                    size="small"
                                >编辑</el-button>
                            </router-link>
                        </template>
                    </el-table-column>
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
import { Loading, Message, MessageBox } from "element-ui";
import { Product } from "service/index.js";
import axios from "axios";

const _product = new Product();

export default {
    name: "Product",
    data(){
        return {
            // 面包屑
            breadcrumbs: [
                {
                    path: "/",
                    name: "首页",
                },
                {
                    path: "/product",
                    name: "商品管理",
                }
            ],
            // 商品列表数据
            productDataList: new Array(10).fill({
                id: "-",
                name: "-",
                subTitle: "-",
                price: "-",
                status: "-",
                email: "-",
            }),
            // 分页器
            pager: {
                total: 0,
                pageSize: 10,
                currentPage: 1,
            },
            // loading样式
            loading: true,
            // 查询表单
            searchForm: {
                productId: "",
                productName: "",
            },
            // 表单校验
            rules: {
                productId: [
                    {type: "string", pattern: /^\d*$/, message: "ID必须是数字", trigger: "blur"},
                    {type: "string", max: 20, message: "ID长度不能超过20", trigger: "blur"},
                ],
                productName: [
                    {min: 0, max: 50, required: false, message: "商品名称长度不能超过50", trigger: "blur"},
                ]
            },
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
            this.getProductList( currentPage );
        },
        // 获取第pageNum页的数据
        getProductList(pageNum){
            const listParams = { pageNum };
            listParams.productId = this.searchForm.productId;
            listParams.productName = this.searchForm.productName;
            console.log(listParams);
            this.loading = true;
            _product.loadProductList( listParams )
                .then(
                    (data) => {
                        // 分页器
                        this.pager.total = data.total || 0;
                        this.pager.pageSize = data.pageSize || 10;
                        this.pager.currentPage = data.pageNum || 1;
                        // 商品列表
                        this.productDataList = data.list.map(productData => {
                            return productData;
                        });
                    },
                    // 错误处理
                    errMsg => {
                        this.productDataList = [];
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
        // 上架/下架商品
        onSetProductStatus( event, productId, currentStatus ){
            const newStatus = currentStatus === 1 ? 2 : 1,
                  manageType = currentStatus === 1 ? "下架" : "上架",
                  confirmTips = `确定要${manageType}该商品？`;
            // 确认操作
            MessageBox.confirm(confirmTips, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
            // 确认操作
            .then(() => {
                this.setProductStatus({
                    productId,
                    status: newStatus,
                });
            })
            // 取消操作
            .catch((msg) => {
                console.log(typeof msg);
            });
        },
        // 设置商品状态
        setProductStatus(productKeyObject){
            _product.setProductStatus(productKeyObject)
                .then(
                    res => {
                        // 设置状态成功
                        if( res.status === 0 ){
                            Message.success({
                                showClose: true,
                                message: res.data,
                                customClass: "message-z-index"
                            });
                            this.getProductList();
                        }
                        // 设置状态失败
                        else {
                            Message.error({
                                showClose: true,
                                message: res.data,
                                customClass: "message-z-index"
                            });
                        }
                    },
                    // 接口错误处理
                    errMsg => {
                        console.log(errMsg);
                        Message.error({
                            showClose: true,
                            message: errMsg,
                            customClass: "message-z-index"
                        });
                    }
                )
                // 代码错误处理
                .catch(errMsg => {
                    Message.error({
                        showClose: true,
                        message: errMsg,
                        customClass: "message-z-index"
                    });
                });
        },
        // 查询
        onSearch(formName){
            this.$refs[formName].validate( valid => {
                if(valid){
                    this.getProductList(1);
                }
            });
        },
        // 表单重置
        resetForm(formName){
            this.$refs[formName].resetFields();
        }
    },
    mounted(){
        this.getProductList(1);
    }
}
</script>

<style>

</style>