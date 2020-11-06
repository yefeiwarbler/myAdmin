import Mock from "mockjs";

// 模拟接口延时
Mock.setup({
    timeout: '200-600'
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
        "msg": "密码错误"
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