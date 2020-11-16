<template>
    <el-row>
        <PageTitle pageTitle="添加分类 - MARKET ADMIN" />
        <Breadcrumb :breadcrumbs="this.breadcrumbs" />
        <el-col :span="12" :offset="4">
            <el-form
                v-loading="submitting"
                element-loading-text="正在提交，请稍等"
                element-loading-background="rgba(255, 255, 255, 0.7)"
                :model="categoryForm"
                :rules="rules"
                ref="categoryForm"
                label-width="100px"
            >
                <el-form-item
                    prop="parentCategoryId"
                    label="父级分类"
                >
                    <el-select
                        v-model="categoryForm.parentCategoryId"
                    >
                        <el-option
                            :value="0"
                            :label="'所有'"
                        ></el-option>
                        <el-option
                            v-for="(category, index) in categoryList"
                            :key="index"
                            :value="category.categoryId"
                            :label="category.categoryName"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="categoryName" label="分类名称">
                    <el-input
                        placeholder="请输入分类名称"
                        v-model="categoryForm.categoryName"
                        @keyup.enter.native="onKeyUpEnter('categoryForm')"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button 
                        type="primary"
                        @click="submitForm('categoryForm')"
                    >提交</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
import PageTitle from "components/PageTitle.vue";
import Breadcrumb from "components/Breadcrumb.vue";
import {
    Message,
    MessageBox,
    Loading,
    Form,
    FormItem,
    Input,
    Option,
    Select,
    Button,
} from "element-ui";
import { Product } from "service/index.js";

const _product = new Product();

export default {
    name: "ProductCategoryAdd",
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
                },
                {
                    path: "/product/category/add",
                    name: "添加分类",
                },
            ],
            // 新增的分类信息
            categoryForm: {
                parentCategoryId: 0,
                categoryName: "",
            },
            categoryList: [],
            // 提交动画
            submitting: false,
            // 表单校验
            rules: {
                categoryName: [
                    {required: true, message: "分类名称不能为空", trigger: "blur"},
                    {required: true, max: 10, type: "string", message: "分类名称不能超过10个字符", trigger: "blur"}
                ],
            },
            // 防止重复提交
            submitting: false,
        }
    },
    components: {
        PageTitle,
        Breadcrumb,
        ElForm: Form,
        ElFormItem: FormItem,
        ElButton: Button,
        ElInput: Input,
        ElOption: Option,
        ElSelect: Select,
    },
    methods: {
        // 获取分类信息
        getCategoryList( categoryId ){
            _product.getCategoryList({categoryId})
                .then(
                    (data) => {
                        // 商品分类列表
                        console.log(data.list);
                        this.categoryList = data.list;
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
        // 表单提交
        submitForm( formName ){
            this.$refs[formName].validate( valid => {
                if( valid ){
                    this.submitting = true;
                    const params = this.categoryForm;
                    _product.addNewCategory(params)
                        .then( 
                            res => {
                                // 添加成功
                                if(res.status == 0){
                                    MessageBox.confirm('分类添加成功，是否返回分类列表', '提示', {
                                        confirmButtonText: '确定',
                                        cancelButtonText: '取消',
                                    })
                                    // 确认修改
                                    .then(({ value }) => {
                                        this.$router.push("/product/category/list");
                                    })
                                    // 取消修改
                                    .catch(() => {

                                    })
                                }
                                // 添加失败
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
                        // 重置当前修改的分类id
                        .finally(() => {
                            this.submitting = false;
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
            });
        },
        // 回车
        onKeyUpEnter( formName ){
            this.submitForm(formName);
        }
    },
    mounted(){
        console.log(this.$route.params.id)
        const categoryId = this.$route.params.id || 0;
        this.getCategoryList(categoryId);
    }
}
</script>

<style lang="scss" scope>

</style>