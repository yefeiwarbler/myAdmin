import Mock from "mockjs";

// 首页：数据统计接口
Mock.mock(`/statistic/base-count`, "get", 
        {
            "status": 0,
            "data": {
                "userCount|1000-2000": 1000,
                "orderCount|5000-10000": 5888,
                "productCount|500-1000": 1000,
        }
});