import axios from "axios";

const axiosAPItoken = (token) => {
    return axios.create({
        baseURL: "http://172.19.200.248:8080/api",
        headers: {
            "Content-type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    });
};

export default {axiosAPItoken}