import Mock from "mockjs";

function getUrlParam(url, name){
    let queryString = url.split("?")[1] || "";
    let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
    let res = queryString.match(reg);
    return res === null ? "" : decodeURIComponent(res[2]);
}

// 商品列表
Mock.mock(/order\/list*/, "get", function(options){
    const { url } = options;
    console.log(url);
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
                "statusDesc": /[a-z]{5,10}/,
                "status": "1",
                "status": "1",
                "payment|10-15000": 1,
                "createTime": new Date().getTime(),
            }
        ]
    });
});