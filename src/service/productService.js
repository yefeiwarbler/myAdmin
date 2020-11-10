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
}

export {
    Product
}