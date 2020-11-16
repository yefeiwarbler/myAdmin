import axios from 'axios';

class Order{
    constructor(){}

    // 商品列表数据获取
    async getOrderList(params){
        return axios.get('/order/list', {params})
            .then(response => {
                return response.data;
            });
    }
}

export {
    Order
};