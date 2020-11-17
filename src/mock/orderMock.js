import Mock from "mockjs";

function getUrlParam(url, name){
    let queryString = url.split("?")[1] || "";
    let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
    let res = queryString.match(reg);
    return res === null ? "" : decodeURIComponent(res[2]);
}

// 订单列表
Mock.mock(/order\/list*/, "get", function(options){
    const { url } = options;
    const pageSize = getUrlParam(url, "pageSize") || 10;
    const pageNum = getUrlParam(url, "pageNum") || 1;
    const orderNo = getUrlParam(url, "orderId") || 10;

    const total = 1000;
    return Mock.mock({
        "status": 0,
        "pageNum": pageNum,
        "pageSize": pageSize,
        "size": 1,
        "orderBy": null,
        "startRow": 1,
        "endRow": 1,
        "total": total,
        "pages": Math.ceil(total / pageSize),
        "list|10": [
            {
                "orderNo|1000000000-9999999999": 1,
                "receiverName|2-6": "",
                "statusDesc|1": [
                    "未支付",
                    "已支付",
                    "已取消",
                    "已发货",
                ],
                "status|1": ["0","1","2","3","4"],
                "payment|10-15000": 1,
                "createTime": new Date().getTime(),
            }
        ]
    });
});

// 获取订单详情
Mock.mock(/order*/, "get", function(options){
    const { url } = options;
    const orderNo = getUrlParam(url, "orderNo") || 10;
    return Mock.mock({
        "status": 0,
        "data": {
            orderNo,
            "statusDesc|1": [
                "未支付",
                "已支付",
                "已取消",
                "已发货",
            ],
            "status|1": ["0","1","2","3","4"],
            "payment|10-15000": 1,
            "paymentType": 1,
            "paymentTypeDesc": "在线支付",
            "status": 10,
            "createTime": new Date().getTime(),
            "paymentTime": new Date().getTime(),
            "sendTime": new Date().getTime(),
            "endTime": new Date().getTime(),
            "closeTime": new Date().getTime(),
            "orderItemVoList|1-5": [
                {
                    orderNo,
                    "productId": 1,
                    "productName": "商品名称",
                    "productImage": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605186968102&di=4b71958619df4f1cfe4313df212f7d16&imgtype=0&src=http%3A%2F%2Fa4.att.hudong.com%2F22%2F59%2F19300001325156131228593878903.jpg",
                    "currentUnitPrice|10-10000": 1,
                    "quantity|1-3": 1,
                    "totalPrice|10-30000": 1,
                    "createTime": new Date().getTime()
                }
            ],
            "imageHost": "",
            "shippingId": 3,
            "receiverName|3-5": "",
            "shippingVo": {
                "receiverName|3-5": "",
                "receiverPhone": "13411111111",
                "receiverMobile": "13411111111",
                "receiverProvince": "北京市",
                "receiverCity": "北京市市区",
                "receiverDistrict": "昌平区",
                "receiverAddress": "某小区",
                "receiverZip": "100000",
            }
        },
    });
});

// 订单状态修改：确认发货
Mock.mock('/order/send_goods', "put", function(options){
    const {orderNo} = options;
    if( Math.random() > 0.5 ){
        return Mock.mock({
            "status": "0",
            "msg": "发货成功"
        });
    }
    else {
        return Mock.mock({
            "status": "1",
            "msg": "服务器错误，请稍后再试"
        });
    }
});
