import axios from 'axios';

class User{
    async login(userData){
        return axios.post('/user/login', userData)
                .then( response => {
                    return response.data;
                });
    }

    async logout(){
        return axios.post('/user/logout')
            .then(response => {
                return response.data;
            });
    }
    
}

export default User;