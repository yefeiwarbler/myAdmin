<template>
    <el-row>
        <PageTitle pageTitle="添加商品 - MARKET ADMIN" />
        <Breadcrumb :breadcrumbs="this.breadcrumbs" />
        <el-col :span="12" :offset="4">
            <el-form
                v-loading="submitting"
                element-loading-text="正在提交，请稍等"
                element-loading-background="rgba(255, 255, 255, 0.7)"
                :model="productForm"
                :rules="rules"
                ref="productForm"
                label-width="100px"
            >
                <el-form-item prop="name" label="商品名称">
                    <el-input
                        placeholder="请输入商品名称"
                        v-model="productForm.name"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="subTitle" label="商品描述">
                    <el-input
                        placeholder="请输入商品描述"
                        v-model="productForm.subTitle"
                    ></el-input>
                </el-form-item>
                <CategorySelector 
                    :onCategoryChange="(firstCategoryId, secondCategoryId) => {
                        handleCategoryChange(firstCategoryId, secondCategoryId);
                    }"
                    prop="firstCategoryId"
                />
                <el-form-item prop="price" label="商品价格">
                    <el-input
                        placeholder=""
                        v-model.number="productForm.price"
                    >
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="stock" label="商品库存">
                    <el-input
                        placeholder=""
                        v-model.number="productForm.stock"
                    >
                        <template slot="append">件</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="商品图片">
                    <el-upload
                        action="http://150.158.165.30:3000/image"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :file-list="productForm.subImage"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialog.dialogVisible">
                        <img width="100%" :src="dialog.dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
                <el-form-item label="商品详情">
                    <quill-editor
                        style="line-height: 22px;"
                        ref="productDetail"
                        v-model="productForm.detail"
                        :options="editorOption"
                    ></quill-editor>
                </el-form-item>
                <el-form-item>
                    <el-button 
                        type="primary"
                        @click="submitForm('productForm')"
                    >提交</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
import PageTitle from "components/PageTitle.vue";
import Breadcrumb from "components/Breadcrumb.vue";
import { Message, MessageBox } from "element-ui";
import { Product } from "service/index.js";
import CategorySelector from "./CategorySelector.vue";
import editorOption from "util/editorOption.js";

const _product = new Product();

export default {
    name: "ProductSave",
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
                },
                {
                    path: "/product/save",
                    name: "添加商品",
                },
            ],
            // 商品信息
            productForm: {
                firstCategoryId: "",
                secondCategoryId: "",
                name: "",
                subTitle: "",
                subImage: [],
                detail: "",
                price: "",
                stock: "",
                status: "",
                productId: this.$route.params.id || "",
            },
            // 提交动画
            submitting: false,
            // 表单校验
            rules: {
                name: [
                    {required: true, message: "商品名称不能为空", trigger: "blur"},
                    {required: true, max: 50, type: "string", message: "商品名称不能超过50个字符", trigger: "blur"}
                ],
                subTitle: [
                    {required: true, message: "商品描述不能为空", trigger: "blur"},
                    {required: true, max: 100, type: "string", message: "商品名称不能超过100个字符", trigger: "blur"}
                ],
                firstCategoryId: [
                    {required: true, message: "请选择商品分类", trigger: "change"},
                ],
                price: [
                    {required: true, message: "商品价格不能为空", trigger: "blur"},
                    {required: true, type: "number", message: "价格必须是数字", trigger: "blur"},
                    {required: true, type: "number", min: 0.01, message: "价格必须大于0", trigger: "blur"}
                ],
                stock: [
                    {required: true, message: "商品库存不能为空", trigger: "blur"},
                    {required: true, type: "number", message: "库存必须是数字", trigger: "blur"},
                    {required: true, type: "number", min: 0.01, message: "库存必须大于0", trigger: "blur"},
                ]
            },
            // 图片预览
            dialog: {
                dialogImageUrl: "",
                dialogVisible: false,
                disabled: false,
            },
            // 编辑器配置
            editorOption
        }
    },
    components: {
        PageTitle,
        Breadcrumb,
        CategorySelector,
    },
    methods: {
        // 二级分类菜单数据获取
        handleCategoryChange( firstCategoryId, secondCategoryId ){
            console.log(firstCategoryId,secondCategoryId)
            this.productForm.firstCategoryId = firstCategoryId;
            this.productForm.secondCategoryId = secondCategoryId;
        },
        // 图片预览
        handlePictureCardPreview(file) {
            this.dialog.dialogImageUrl = file.url;
            this.dialog.dialogVisible = true;
        },
        // 表单提交
        submitForm( formName ){
            this.$refs[formName].validate( valid => {
                if( valid ){
                    this.submitting = true;
                    _product.saveProductInfo(this.productForm)
                        .then(
                            res => {
                                if( res.status == '0' ){
                                    const msg = this.$route.params.id 
                                        ? "商品信息修改成功，是否返回商品列表？" 
                                        : "商品添加成功，是否返回商品列表？";
                                    MessageBox.confirm(msg, '提示', {
                                        confirmButtonText: '确定',
                                        cancelButtonText: '取消',
                                        type: 'success',
                                    })
                                    .then(() => {
                                        this.$router.push('/product');
                                    })
                                    .catch(cancelMsg => {
                                        console.log(cancelMsg);
                                    });
                                }
                                else{
                                    MessageBox.warn({
                                        showClose: true,
                                        message: "网络连接故障，请稍后再试",
                                        customClass: "message-z-index",
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
                        .catch( errMsg => {
                            Message.error({
                                showClose: true,
                                message: errMsg,
                                customClass: "message-z-index"
                            });
                        })
                        .finally(() => {
                            this.submitting = false;
                        });
                }
            });
        },
        // 编辑时，获取商品信息
        getProductInfo(productId){
            _product.getProductInfo(productId)
                .then( 
                    data => {
                        this.productForm = data.data;
                    },
                    errMsg => {
                        Message.error({
                            showClose: true,
                            message: errMsg,
                            customClass: "message-z-index"
                        });
                    }
                )
        }
    },
    mounted(){
        console.log(this.$route.params.id)
        const productId = this.$route.params.id;
        if( productId !== undefined && productId.length > 0 ){
            this.getProductInfo(productId);
        }
    }
}
</script>

<style lang="scss" scope>
    .container-button-manage{
        display: flex;
        justify-content: flex-end;
        padding-right: 20px;
    }
    .el-input-group--append{
        max-width: 200px;
    }
</style>