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

    // 获取分类列表
    async getCategoryList(params){
        const { parentCategoryId } = params;
        return axios.get('/product/category/list', { params: {parentCategoryId} })
            .then( response => {
                return response.data;
            });
    }

    // 修改商品分类名称
    async updateCategoryName(params){
        const { categoryId, newCategoryName } = params;
        return axios.put('/product/category', { categoryId, newCategoryName })
            .then( response => {
                return response.data;
            });
    }

    // 新增商品分类
    async addNewCategory(params){
        const { parentCategoryId, categoryName } = params;
        return axios.post('/product/category', { parentCategoryId, categoryName })
            .then( response => {
                return response.data;
            });
    }
}

export {
    Product
}