import axios from 'axios';

class Product{
    constructor(){}

    // 商品列表数据获取
    async loadProductList(listParams){
        return axios.post('/product/list', listParams)
            .then(response => {
                return response.data;
            });
    }

    // 设置商品状态
    async setProductStatus(productKeyObject){
        return axios.post('/product/set_sale_status', {productKeyObject})
            .then(response => {
                return response.data;
            });
    }

    // 获取商品分类
    async getCategoryList(categoryId){
        return axios.post('/product/category', {categoryId})
            .then( response => {
                return response.data;
            })
    }

    // 添加/编辑商品
    async saveProductInfo(productInfo){
        return axios.post('/product/save', productInfo)
            .then( response => {
                return response.data;
            });
    }

    // 获取商品信息
    async getProductInfo(productId){
        return axios.post('/product/info', {productId})
            .then( response => {
                return response.data;
            });
    }
}

export {
    Product
}