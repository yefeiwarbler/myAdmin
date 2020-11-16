<template>
    <el-row>
        <el-row>
            <PageTitle pageTitle="订单管理 - MARKET ADMIN" />
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
                    <el-form-item label="订单ID" prop="orderNo">
                        <el-input
                            placeholder="请输入订单ID"
                            v-model="searchForm.orderNo"
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
                    :data="orderList"
                    stripe
                >
                    <el-table-column
                        prop="orderNo"
                        label="订单号"
                        width="150"
                    ></el-table-column>
                    <el-table-column
                        label="收件人"
                        prop="receiverName"
                        width="120"
                    >
                    </el-table-column>
                    <el-table-column
                        label="订单状态"
                        width="150"
                        prop="statusDesc"
                    >
                    </el-table-column>
                    <el-table-column
                        label="订单总价"
                        width="160"
                    >
                        <template slot-scope="scope">
                            <p>{{ `￥${scope.row.payment}` }}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="创建时间"
                        width="250"
                    >
                        <template slot-scope="scope">
                            <p>{{ scope.row.createTime | localeTime }}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                    >
                        <template slot-scope="scope">
                            <router-link :to="`/order/detail/${scope.row.orderNo}`">
                                <el-button 
                                    size="small"
                                >详情</el-button>
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
import {
    Loading,
    Message,
    MessageBox,
    Form,
    FormItem,
    Tag,
    Input,
    Table,
    TableColumn,
    Pagination,
    Button,
} from "element-ui";
import { Order } from "service/orderService.js";

const _order = new Order();

export default {
    name: "Order",
    data(){
        return {
            // 面包屑
            breadcrumbs: [
                {
                    path: "/",
                    name: "首页",
                },
                {
                    path: "/order",
                    name: "订单管理",
                },
            ],
            // 订单列表数据
            orderList: new Array(10).fill({
                orderNo: "-",
                receiverName: "-",
                status: "-",
                statusDesc: "-",
                payment: "-",
                createTime: "-",
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
                orderNo: "",
            },
            // 表单校验
            rules: {
                orderNo: [
                    {type: "string", pattern: /^\d*$/, message: "ID必须是数字", trigger: "blur"},
                    {type: "string", max: 20, message: "ID长度不能超过20", trigger: "blur"},
                ],
            },
        }
    },
    components: {
        PageTitle,
        Breadcrumb,
        ElForm: Form,
        ElFormItem: FormItem,
        ElTag: Tag,
        ElInput: Input,
        ElTable: Table,
        ElTableColumn: TableColumn,
        ElPagination: Pagination,
        ElButton: Button,
    },
    methods: {
        // 页数发生变化时，获取新页数的数据
        onPageNumChange( currentPage ){
            this.getOrderList( currentPage );
        },
        // 获取第pageNum页的数据
        getOrderList(pageNum){
            const params = { pageNum };
            params.orderNo = this.searchForm.orderNo;
            this.loading = true;
            _order.getOrderList( params )
                .then(
                    (data) => {
                        // 分页器
                        this.pager.total = data.total || 0;
                        this.pager.pageSize = data.pageSize || 10;
                        this.pager.currentPage = data.pageNum || 1;
                        // 商品列表
                        this.orderList = data.list;
                    },
                    // 错误处理
                    errMsg => {
                        this.orderList = [];
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
                })
                .catch( errMsg => {
                    console.log(errMsg);
                });
        },
        // 查询
        onSearch(formName){
            this.$refs[formName].validate( valid => {
                if(valid){
                    this.getOrderList(1);
                }
            });
        },
        // 表单重置
        resetForm(formName){
            this.$refs[formName].resetFields();
            this.getOrderList(1);
        }
    },
    created(){
        this.getOrderList(1);
    },
    filters: {
        localeTime: function(timestamp){
            return new Date(timestamp).toLocaleString().replaceAll('/', '-');
        }
    }
}
</script>

<style lang="scss" scope>

</style>