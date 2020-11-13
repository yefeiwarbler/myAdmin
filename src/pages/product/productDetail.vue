<template>
    <el-row>
        <PageTitle pageTitle="商品详情 - MARKET ADMIN" />
        <Breadcrumb :breadcrumbs="this.breadcrumbs" />
        <el-col :span="12" :offset="4"
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-background="rgba(255, 255, 255, 0.7)"
        >
            <el-form
                :model="productForm"
                ref="productForm"
                label-width="100px"
            >
                <el-form-item label="商品名称">
                    <p>{{ productForm.name }}</p>
                </el-form-item>
                <el-form-item label="商品描述">
                    <p>{{ productForm.subTitle }}</p>
                </el-form-item>
                <el-form-item label="所属分类">
                    <p>
                        <span>{{ productForm.firstCategoryName }}</span>
                        <span v-if="productForm.secondCategoryId">{{` > ${productForm.secondCategoryId}`}}</span>
                    </p>
                </el-form-item>
                <el-form-item label="商品价格">
                    <p>{{ productForm.price }} 元</p>
                </el-form-item>
                <el-form-item prop="stock" label="商品库存">
                    <p>{{ productForm.stock }} 件</p>
                </el-form-item>
                <el-form-item label="商品图片">
                    <el-upload
                        action="http://150.158.165.30:3000/image"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :file-list="productForm.subImage"
                        disabled
                        class="el-upload__disabled"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialog.dialogVisible">
                        <img width="100%" :src="dialog.dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
                <el-form-item label="商品详情">
                    <quill-editor
                        style="line-height: 22px; z-index: 3000;"
                        ref="productDetail"
                        v-model="productForm.detail"
                        :options="editorOption"
                        @focus="onQuillEditorFocus"
                    ></quill-editor>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
// 自定义组件、配置
import PageTitle from "components/PageTitle.vue";
import Breadcrumb from "components/Breadcrumb.vue";
import CategorySelector from "./CategorySelector.vue";
import editorOptionDisabled from "util/editorOptionDisabled.js";

// element-ui
import {
    Message,
    Form,
    FormItem,
    Upload,
    Dialog,
} from "element-ui";

// quill-editor
import quillEditor from '../../vendor/QuillEditor.js';

// service
import { Product } from "service/index.js";
const _product = new Product();

export default {
    name: "ProductDetail",
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
                    path: "",
                    name: "商品详情",
                },
            ],
            // 商品信息
            productForm: {
                firstCategoryName: "",
                secondCategoryName: "",
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
            // 图片预览
            dialog: {
                dialogImageUrl: "",
                dialogVisible: false,
                disabled: false,
            },
            // 编辑器配置
            editorOption: editorOptionDisabled,
            loading: true,
        }
    },
    components: {
        PageTitle,
        Breadcrumb,
        CategorySelector,
        quillEditor,
        ElForm: Form,
        ElFormItem: FormItem,
        ElUpload: Upload,
        ElDialog: Dialog,
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
        // 编辑时，获取商品信息
        getProductInfo(productId){
            this.loading = true;
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
                .finally(() => {
                    this.loading = false;
                });
        },
        onQuillEditorFocus(e){
            e.enable(false);
        }
    },
    mounted(){
        const productId = this.$route.params.id;
        if( productId !== undefined && productId.length > 0 ){
            this.getProductInfo(productId);
        }
    }
}
</script>

<style lang="scss" scope>
    .el-upload__disabled{
        .el-upload{
            display: none;
        }
    }
</style>