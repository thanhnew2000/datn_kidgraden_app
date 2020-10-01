import axios from 'axios';


const checkLogin = data => {
    return axios.post('http://127.0.0.1:8000/api/login',data);
};


export default {
    checkLogin,
};