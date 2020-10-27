import axios from 'axios';

class User{
    async login(userData){
        return axios.post('/login', userData)
                .then( response => {
                    return response.data;
                });
    }
    
}

export default User;