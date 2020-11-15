<template>
    <el-row>
        <el-row>
            <PageTitle pageTitle="分类管理 - MARKET ADMIN" />
            <Breadcrumb :breadcrumbs="breadcrumbs" />
        </el-row>
        <el-row
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-background="rgba(255, 255, 255, 0.7)"
            element-loading-spinner="el-icon-loading"
        >
            <el-col :span="18">
                <el-form>
                    <el-form-item>
                        <p>当前分类：{{parentCategoryName}}</p>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="6">
                <div class="container-button-manage">
                    <router-link to="/product/category/add">
                        <el-button type="primary">添加分类</el-button>
                    </router-link>
                </div>
            </el-col>
            <el-col :span="24">
                <el-table 
                    :data="categoryList"
                    stripe
                >
                    <el-table-column
                        prop="categoryId"
                        label="分类ID"
                        width="100"
                    ></el-table-column>
                    <el-table-column
                        prop="categoryName"
                        label="分类名称"
                        width="400"
                    ></el-table-column>
                    <el-table-column
                        label="操作"
                    >
                        <template slot-scope="scope">
                            <el-button 
                                size="small"
                                @click="openMessageBox(scope.row.categoryId)"
                            >修改分类名称</el-button>
                            <router-link 
                                v-if="parentCategoryId === 0"
                                :to="`/product/category/list/${scope.row.categoryId}`"
                            >
                                <el-button 
                                    size="small"
                                >查看子分类</el-button>
                            </router-link>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </el-row>
</template>

<script>
import PageTitle from "components/PageTitle.vue";
import Breadcrumb from "components/Breadcrumb.vue";
import {
    Loading,
    Message,
    MessageBox,
    Table,
    TableColumn,
    Button,
} from "element-ui";
import { Product } from "service/index.js";

const _product = new Product();

export default {
    name: "ProductCategoryList",
    data(){
        return {
            // 面包屑
            breadcrumbs: [
                {
                    path: "/",
                    name: "首页",
                },
                {
                    path: "/product/category/list",
                    name: "分类管理",
                }
            ],
            // 分类列表数据
            categoryList: new Array(10).fill({
                categoryId: "-",
                categoryName: "-",
            }),
            parentCategoryId: 0,
            parentCategoryName: "-",
            // loading样式
            loading: true,
            // 当前修改的分类id
            modifyCategoryId: "",
        }
    },
    components: {
        PageTitle,
        Breadcrumb,
        ElTable: Table,
        ElTableColumn: TableColumn,
        ElButton: Button,
    },
    methods: {
        // 获取商品分类列表数据
        getCategoryList( parentCategoryId = 0 ){
            const params = {parentCategoryId};
            this.loading = true;
            _product.getCategoryList(params)
                .then(
                    (data) => {
                        // 商品分类列表
                        this.categoryList = data.list;
                        this.parentCategoryId = data.parentCategoryId;
                        this.parentCategoryName = data.parentCategoryName;
                    },
                    // 错误处理
                    errMsg => {
                        this.categoryList = [];
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
        // 路由变化时，修改父级分类信息，请求新分类列表
        onRouteChange(){
            const parentCategoryId = this.$route.params.id || 0;
            this.parentCategoryId = parentCategoryId;
            this.getCategoryList(parentCategoryId);
        },
        // 打开模态框，修改分类名称
        openMessageBox(categoryId){
            this.modifyCategoryId = categoryId;
            // 模态框提示信息、校验正则设置
            MessageBox.prompt('请输入分类名称', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /\w{1,10}/,
                inputErrorMessage: '分类名称长度需在1到10之间'
            })
            // 确认修改
            .then(({ value }) => {
                this.updateCategoryName(this.modifyCategoryId, value);
            })
            // 取消修改
            .catch(() => {

            })
        },
        // 请求修改分类名称
        updateCategoryName(categoryId, newCategoryName){
            _product.updateCategoryName({categoryId, newCategoryName})
                .then( 
                    res => {
                        // 修改成功
                        if(res.status == 0){
                            Message.success({
                                showClose: true,
                                message: "分类名称修改成功",
                                customClass: "message-z-index"
                            });
                            this.getCategoryList(this.parentCategoryId);
                        }
                        // 修改失败
                        else {
                            Message.error({
                                showClose: true,
                                message: res.msg,
                                customClass: "message-z-index"
                            });
                        }
                    },
                    // 接口错误
                    errMsg => {
                        Message.error({
                            showClose: true,
                            message: errMsg,
                            customClass: "message-z-index"
                        });
                    }
                )
                // 重置当前
                .finally(() => {
                    this.modifyCategoryId = "";
                })
                // 代码错误
                .catch( errMsg => {
                    Message.error({
                        showClose: true,
                        message: errMsg,
                        customClass: "message-z-index"
                    });
                });
        }
    },
    mounted(){
        const parentCategoryId = this.$route.params.id || 0;
        this.parentCategoryId = parentCategoryId;
        this.getCategoryList(parentCategoryId);
    },
    // 监听路由变化
    watch: {
        "$route": "onRouteChange"
    }
}
</script>

<style lang="scss" scope>
    .container-button-manage{
        display: flex;
        justify-content: flex-end;
        padding-right: 30px;
    }
</style>