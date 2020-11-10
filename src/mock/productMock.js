import Mock from "mockjs";

// 商品列表
Mock.mock(`/product/list`, "post", function(options){
    const data = JSON.parse(options.body);
    // pageSize：默认10，pageNum：从1开始，默认1
    const {pageSize = 10, pageNum = 1, productId, productName} = data;
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
                "categoryId|1-1000": 1,
                "id|1-1000": 1,
                "imageHost": /[a-z]{8,20}/,
                "mainImage": "1",
                "name": /^(\d{5,10}@qq\.com|[a-z]{5,16}@163\.com)$/,
                "subTitle": /^(\d{5,10}@qq\.com|[a-z]{5,16}@163\.com)$/,
                "price|50-1000": 1000,
                // 1：已上架，2：已下架
                "status|1-2": 1,
            }
        ]
    });
});

// 商品状态变更
Mock.mock(`/product/set_sale_status`, "post", function(options){
    const {productId, status} = options.body;
    return Mock.mock({
        "status": 0,
        "data": "修改商品状态成功"
    })
    // return Mock.mock({
    //     "status": 1,
    //     "data": "修改商品状态失败"
    // })
});