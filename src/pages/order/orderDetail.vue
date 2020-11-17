<template>
    <el-row>
        <PageTitle pageTitle="商品详情 - MARKET ADMIN" />
        <Breadcrumb :breadcrumbs="this.breadcrumbs" />
        <el-col :span="18"
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-background="rgba(255, 255, 255, 0.7)"
        >
            <el-form
                :model="orderInfo"
                label-width="100px"
            >
                <el-form-item label="订单号">
                    <p>{{ orderInfo.orderNo }}</p>
                </el-form-item>
                <el-form-item label="创建时间">
                    <p>{{ orderInfo.createTime | localeTime }}</p>
                </el-form-item>
                <el-form-item label="收件人">
                    {{receiverInfo.receiverName}}
                    {{receiverInfo.receiverProvince}}
                    {{receiverInfo.receiverCity}}
                    {{receiverInfo.receiverAddress}}
                    {{receiverInfo.mobile || receiverInfo.receiverPhone}}
                </el-form-item>
                <el-form-item label="订单状态">
                    <span>{{ orderInfo.statusDesc }}</span>
                    <el-button
                        v-if="orderInfo.statusDesc == '已支付'"
                        size="mini"
                        plain
                        type="primary"
                        @click="onSendGoods()"
                    >确认发货</el-button>
                </el-form-item>
                <el-form-item label="支付方式">
                    <p>{{ orderInfo.paymentTypeDesc }}</p>
                </el-form-item>
                <el-form-item label="订单金额">
                    <p>￥{{ orderInfo.payment }}</p>
                </el-form-item>
                <el-form-item prop="stock" label="商品列表">
                    <el-table 
                        :data="orderInfo.orderItemVoList"
                        border
                    >
                        <el-table-column
                            label="商品图片"
                            width="150"
                            style="text-align: center"
                        >
                            <template slot-scope="scope">
                                <div class="image-container">
                                    <el-image
                                        style="width: 100px; height: 100px;"
                                        :src="scope.row.productImage"
                                        fit="fill"
                                    ></el-image>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="商品名称"
                            prop="productName"
                        >
                        </el-table-column>
                        <el-table-column
                            label="单价"
                            width="150"
                        >
                            <template slot-scope="scope">
                                <p>{{ `￥${scope.row.currentUnitPrice}` }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="数量"
                            width="160"
                            prop="quantity"
                        ></el-table-column>
                        <el-table-column
                            label="合计"
                            width="250"
                        >
                            <template slot-scope="scope">
                                <p>{{ `￥${scope.row.totalPrice}` }}</p>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
// 自定义组件、配置
import PageTitle from "components/PageTitle.vue";
import Breadcrumb from "components/Breadcrumb.vue";

// element-ui
import {
    Message,
    MessageBox,
    Form,
    FormItem,
    Table,
    TableColumn,
    Image,
    Button,
} from "element-ui";

// service
import { Order } from "service/orderService.js";
const _order = new Order();

export default {
    name: "OrderDetail",
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
                {
                    path: "",
                    name: "订单详情",
                },
            ],
            // 订单信息
            orderInfo: {},
            receiverInfo: {},
            loading: true,
            orderNo: "",
        }
    },
    components: {
        PageTitle,
        Breadcrumb,
        ElForm: Form,
        ElFormItem: FormItem,
        ElTable: Table,
        ElTableColumn: TableColumn,
        ElImage: Image,
        ElButton: Button,
    },
    methods: {
        // 获取订单信息
        getOrderInfo(orderNo){
            this.loading = true;
            _order.getOrderInfo({orderNo})
                .then( 
                    res => {
                        this.orderInfo = res.data || {};
                        this.receiverInfo = res?.data?.shippingVo || {};
                    },
                    errMsg => {
                        Message.error({
                            showClose: true,
                            message: errMsg,
                            customClass: "message-z-index"
                        });
                    }
                )
                .finally(() => {
                    this.loading = false;
                });
        },
        // 发货
        onSendGoods(){
            MessageBox.confirm("是否确认该订单已经发货？", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
            // 确认操作
            .then(() => {
                const orderNo = this.prderNo,
                    params = {orderNo}
                _order.sendGoods(params)
                    .then(
                        res => {
                            if(res.status == 0){
                                Message.success({
                                    showClose: true,
                                    message: "确认发货成功",
                                    customClass: "message-z-index"
                                });
                                this.getOrderInfo(params);
                            }
                            else {
                                Message.error({
                                    showClose: true,
                                    message: "操作失败，请稍后重试",
                                    customClass: "message-z-index"
                                });
                            }
                        },
                        errMsg => {
                            Message.error({
                                showClose: true,
                                message: errMsg,
                                customClass: "message-z-index"
                            });
                        }
                    )
            })
            // 取消操作
            .catch((msg) => {
                console.log(typeof msg);
            });
        }
    },
    mounted(){
        const orderNo = this.$route.params.orderNo;
        if( orderNo !== undefined && orderNo.length > 0 ){
            this.orderNo = orderNo;
            this.getOrderInfo(orderNo);
        }
    },
    filters: {
        localeTime: function(timestamp){
            return new Date(timestamp).toLocaleString().replaceAll('/', '-');
        }
    }
}
</script>

<style lang="scss" scope>
    .image-container{
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>