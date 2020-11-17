<template>
    <el-form-item 
        label="所属分类"
        :prop="prop"    
    >
        <el-select
            v-model="firstCategoryId"
            placeholder="请选择一级分类"
            @change="onFirstCategoryChange"
        >
            <el-option
                v-for="(category, index) in firstCategoryList"
                :key="index"
                :value="category.categoryId"
                :label="category.categoryName"
            ></el-option>
        </el-select>
        <el-select
            v-model="secondCategoryId"
            placeholder="请选择二级分类"
            @change="onSecondCategoryChange"
        >
            <el-option
                v-for="(category, index) in secondCategoryList"
                :key="index"
                :value="category.categoryId"
                :label="category.categoryName"
            ></el-option>
        </el-select>
    </el-form-item>
</template>

<script>
// element-ui
import {
    Message,
    MessageBox,
    Option,
    Select,
    FormItem,
} from "element-ui";

// service
import { Product } from "service/index.js";
const _product = new Product();

export default {
    name: "CategorySelector",
    props: {
        onCategoryChange: Function,
        prop: String,
    },
    data(){
        return {
            firstCategoryId: "",
            firstCategoryList: [],
            secondCategoryId: "",
            secondCategoryList: [],
        }
    },
    components: {
        ElOption: Option,
        ElSelect: Select,
        ElFormItem: FormItem,
    },
    methods:{
        // 加载一级分类
        getFirstCategory(categoryId = 0){
            _product.getCategoryList({parentCategoryId: categoryId})
                .then(
                    res => {
                        console.log("categoryListResponse", res);
                        if( res.status == 0){
                            this.firstCategoryList = res.categoryList;
                        }
                        else{
                            Message.error({
                                showClose: true,
                                message: "网络连接故障，请稍后再试",
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
                ).catch( errMsg => {
                    Message.error({
                        showClose: true,
                        message: errMsg,
                        customClass: "message-z-index"
                    });
                })
        },
        // 加载二级分类
        getSecondCategory(firstCategoryId = 0){
            _product.getCategoryList({parentCategoryId: firstCategoryId})
                .then(
                    res => {
                        console.log("categoryListResponse", res);
                        if( res.status == 0){
                            this.secondCategoryList = res.categoryList;
                        }
                        else{
                            Message.error({
                                showClose: true,
                                message: "网络连接故障，请稍后再试",
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
                ).catch( errMsg => {
                    Message.error({
                        showClose: true,
                        message: errMsg,
                        customClass: "message-z-index"
                    });
                });
        },
        // 一级分类变化检测
        onFirstCategoryChange(firstCategoryId){
            this.secondCategoryId = "";
            this.secondCategoryList = [];
            this.getSecondCategory(firstCategoryId);            
            if(this.hasCategoryChangeProp()){
                const firstCategoryId = this.firstCategoryId || 0,
                    secondCategoryId = this.secondCategoryId || 0;
                this.$props.onCategoryChange(firstCategoryId, secondCategoryId)
            }
        },
        // 二级分类变化检测
        onSecondCategoryChange(secondCategoryId){
            if(this.hasCategoryChangeProp()){
                const firstCategoryId = this.firstCategoryId || 0,
                    secondCategoryId = this.secondCategoryId || 0;
                this.$props.onCategoryChange(firstCategoryId, secondCategoryId)
            }
        },
        // 检验父组件是否传递函数
        hasCategoryChangeProp(){
            return typeof this.$props.onCategoryChange === 'function';
        }
    },
    mounted(){
        this.getFirstCategory();
    }
}
</script>

<style lang="scss" scoped>

</style>>