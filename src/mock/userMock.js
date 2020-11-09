import Mock from "mockjs";

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

// 退出登录接口
Mock.mock(`/user/logout`, "post", function(){
    return {
        "status": 0,
        "msg"   : "退出成功",
    };
    // return {
    //     "status": 1,
    //     "msg"   : "服务器异常",
    // };
});

// 用户列表
Mock.mock(`/user/list`, "post", function(options){
    const data = JSON.parse(options.body);
    // pageSize：默认10，pageNum：从1开始，默认1
    const {pageSize = 10, pageNum = 1} = data;
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
                "id|1-1000": 1,
                "username": /[a-z]{8,20}/,
                "password": "1",
                "email": /^(\d{5,10}@qq\.com|[a-z]{5,16}@163\.com)$/,
                "phone": /^(13\d{9,9}|18\d{9}|14[5-9]\d{8}|16[2|5-7]\d{8}|17[0-8]\d{8}|19[1|5|8|9]\d{8}|15[0-3|5-9]{1}\d{8})$/,
                "question": "",
                "answer": "",
                "role": 0,
                "createTime": new Date().getTime(),
                "updateTime": new Date().getTime(),
            }
        ]
    });
});