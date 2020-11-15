import Mock from "mockjs";

function getUrlParam(url, name){
    let queryString = url.split("?")[1] || "";
    let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
    let res = queryString.match(reg);
    return res === null ? "" : decodeURIComponent(res[2]);
}

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
        "data": "商品状态修改成功"
    })
    // return Mock.mock({
    //     "status": 1,
    //     "data": "修改商品状态失败"
    // })
});

// 获取商品分类
Mock.mock("/product/category", "post", function(options){
    const {categoryId = 0} = options;
    return Mock.mock({
        "status": 0,
        "level": 1,
        "categoryList|10": [
            {
                "categoryId|1-100": 1,
                "categoryName|10-30": "",
            }
        ]
    })
});

// 添加/编辑商品
Mock.mock("/product/save", "post", function(options){
    const { productId } = options.body;
    if( typeof productId === "undefined" || (typeof productId === "string" && productId.length === 0) ){
        return Mock.mock({
            "status": 0,
            "msg": "",
        });
    }
});

// 获取商品详情
Mock.mock("/product/info", "post", function(options){
    const { productId } = options.body;
    return Mock.mock({
        "status": 0,
        "data": {
            productId,
            "firstCategoryId|1-100": 1,
            "secondCategoryId|1-100": 1,
            "firstCategoryName|1-10": "",
            "secondCategoryName|1-10": "",
            "name": "商品名称",
            "subTitle": "商品描述",
            "subImage": [
                {
                    "name": "demo.jpg",
                    "url": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605186968102&di=4b71958619df4f1cfe4313df212f7d16&imgtype=0&src=http%3A%2F%2Fa4.att.hudong.com%2F22%2F59%2F19300001325156131228593878903.jpg"
                },
                {
                    "name": "demo2.jpg",
                    "url": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605186968102&di=a52949a8843c866a9eef789cfda7f0db&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F30%2F29%2F01300000201438121627296084016.jpg"
                }
            ],
            "detail": "<p><strong>加粗测试</strong></p><p><em>斜体</em></p><p><u>下划线</u></p><p><s>中划线</s></p><blockquote>引用</blockquote><h1>一级标题</h1><h2>二级标题</h2><h3>三级标题</h3><h4>四级标题</h4><h5>五级标题</h5><h6>六级标题</h6><ol><li>有序列表</li><li>有序列表</li></ol><pre class=\"ql-syntax\" spellcheck=\"false\">code block\n\n</pre><p>下标：x<sub>2 </sub></p><p>上标：x<sup>2</sup></p><p><br></p><p>居左</p><p class=\"ql-align-center\">居中</p><p class=\"ql-align-right\">居右</p><p><span style=\"color: rgb(230, 0, 0);\">字体颜色测试</span></p><p><br></p><p><span style=\"background-color: rgb(0, 0, 0); color: rgb(255, 255, 255);\">文字背景颜色</span></p><p><br></p><p><span style=\"background-color: rgb(0, 0, 0); color: rgb(255, 255, 255);\"><span class=\"ql-cursor\">﻿</span></span><img src=\"data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAABILAAASCwAAAAAAAAAAAAD29vb/9vb2//X19f/29vb/9vb2//b29v/29vb/9vb2//b29v/29vb/9vb2//b29v/29vb/9vb2//b29v/29vb/9vb2//b29v/7+vn/9PX1//T09P/19fX/9PX1//X19f/19vX/9vb2//b29v/19vb/9vb2//b29v/29vb/9vb2//b29v/29vb/3+bn//v7/P///v////v9///9/f///P3/+/j6//T19v/z9fb/+ff2//P09v/2+Pb/9/f2//b29v/09fX//vz7/567vv+Irq7/vtPQ/8re2P/H1dX/zdra/+Ds5P/9+PX//vz3/+rx9P/+/vj/9fH1//Pz9f/39/b/9vb2//b29v/6+vr/09/f/6/Kx/+01MX/bnuX/4CRn/+W0qv/ccKr/2as6P+nw+//19Pw/1aB3v/e3PD/+vr3//b29v/29vb/9fX1//37+////v//+P///5G93P9at9//Tavy/w114/8YXOL/d4bi/yCj2f82rNn/wMLo//r69//29vb/9vb2//T29v/99/b/y+ru/4bo7P945O//Hpno/xJd3/8VLuH/RXLg/4HR3P+w6Or/9Pj0//z89//19vb/9vb2//X29v/89/f/2e7x/4Lp7/+Z8PL/MI7m/wxF5P8SGeH/GBrj/47G5//1/fH///b4//f29//09fb/9vb2//b29v/19vb/+/b1/5/m7v+i/PX/YrLk/w9C3f9ReOb/VH3q/3626f/u/fL/+fT3//L19f/19vb/9vb2//b29v/29vb/9vb2//b19f+W6PD/le/y/3bY6f+H3u//mfv0/6397//s+fH/+vX3//T29v/29vb/9vb2//b29v/29vb/9vb2//T29v/99vX/h+Pu/3fy9f+n9vb/nfPy/7rp7f/v7/P/+fX3//X29v/29vb/9vb2//b29v/29vb/9vb2//X29v/49fb/6/zz/1Sh6v9Qgdn/he3l/7jq8P//9vX/9vf3//X29v/29vb/9vb2//b29v/29vb/9vb2//b29v/29vb/9fX2//389//n3fT/eHzh/6Pc5//s9fT/9/b2//X29v/29vb/9vb2//b29v/29vb/9vb2//b29v/29vb/9vb2//b29v/19fb/+Pr2//37+P/69Pf/+ff2//X29v/29vb/9vb2//b29v/29vb/9vb2//b29v/29vb/9vb2//b29v/29vb/9vb2//X19v/09Pb/9ff2//X29v/29vb/9vb2//b29v/29vb/9vb2//b29v/29vb/9vb2//b29v/29vb/9vb2//b29v/29vb/9vb2//b29v/29vb/9vb2//b29v/29vb/9vb2//b29v/29vb/9vb2//b29v/29vb/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==\"></p>",
            "price|50-1000": 1000,
            "stock|50-1000": 1000,
            "status": "1",
        },
    });
});

// 商品分类列表
Mock.mock(/product\/category\/list*/, "get", function(options){
    const url = options.url;
    const parentCategoryId = +getUrlParam(url, "parentCategoryId");
    if( parentCategoryId === 0 ){
        return Mock.mock({
            "status": 0,
            "parentCategoryId": parentCategoryId,
            "parentCategoryName": "所有",
            "list|10": [
                {
                    "categoryId|100000-999999": 1,
                    "categoryName|5-10": "",
                }
            ]
        });
    }
    else {
        return Mock.mock({
            "status": 0,
            "parentCategoryId": parentCategoryId,
            "parentCategoryName|5-10": "",
            "list|10": [
                {
                    "categoryId|100000-999999": 1,
                    "categoryName|5-10": "",
                }
            ]
        });
    }
});


// 添加/编辑商品
Mock.mock("/product/category", "put", function(options){
    const { categoryId, newCategoryName } = options.body;
    const n = Math.random() > 0.01;
    if( n ){
        return Mock.mock({
            "status": 0,
            "msg": "分类名称修改成功",
        });
    }
    else {
        return Mock.mock({
            "status": 1,
            "msg": "服务器错误",
        });
    }
});