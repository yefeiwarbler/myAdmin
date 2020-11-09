import axios from 'axios';

class User{
    // 用户登录
    async login(userData){
        return axios.post('/user/login', userData)
                .then( response => {
                    return response.data;
                });
    }

    // 退出登录
    async logout(){
        return axios.post('/user/logout')
            .then(response => {
                return response.data;
            });
    }

    // 获取用户列表数据和分页信息
    async getUserList( pageNum ){
        return axios.post('/user/list', {pageNum})
            .then(response => {
                return response.data;
            });
    }
}

export default User;