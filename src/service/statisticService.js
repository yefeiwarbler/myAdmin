import axios from 'axios';

async function getHomeData(){
    return axios.get('/statistic/base-count')
            .then( response => {
                return response.data;
            });
}

export {
    getHomeData
}