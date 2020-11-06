import Mock from "mockjs";

// 模拟接口延时
Mock.setup({
    timeout: '600-1200'
});

// 用户登录接口
Mock.mock(`/user/login`, "post", function(options){
    const data = JSON.parse(options.body);
    const {username, password} = data;
    if( username === "admin" && password === "admin"){
        return {    
            "status": 0,
            "data": {
                "id"            : 1,
                "username"      : "admin",
                "emain"         : "damin@admin.com",
                "phone"         : null,
                "role"          : 0,
                "createTime"    : "1603787927676",
                "updateTime"    : "1603787927676"
            }
        }
    }
    return {
        "status": 1,
        "msg": "用户名或密码不正确"
    }
});

// 用户登录接口
Mock.mock(`/user/logout`, "post", function(){
    return {
        "status": 0,
        "msg"   : "退出成功",
    };
    // return {
    //     "status": 1,
    //     "msg"   : "服务端异常",
    // };
});

Mock.mock(`/statistic/base-count`, "get", 
        {
            "status": 0,
            "data": {
                "userCount|1000-2000": 1000,
                "orderCount|5000-10000": 5888,
                "productCount|500-1000": 1000,
        }
});