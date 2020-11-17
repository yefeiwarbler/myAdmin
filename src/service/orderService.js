import axios from 'axios';

class Order{
    constructor(){}

    // 获取订单列表数据
    async getOrderList(params){
        return axios.get('/order/list', {params})
            .then(response => {
                return response.data;
            });
    }

    // 获取订单详情
    async getOrderInfo(params){
        const orderNo = params;
        return axios.get('/order', {params})
            .then(response => {
                return response.data;
            });
    }

    // 发货
    async sendGoods(params){
        const orderNo = params;
        return axios.put('/order/send_goods', {params})
            .then(response => {
                return response.data;
            });
    }
}

export {
    Order
};