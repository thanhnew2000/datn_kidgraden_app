import axios from "axios";

const axiosAPItoken = (token) => {
    return axios.create({
        baseURL: "http://192.168.9.7:8080/api",
        headers: {
            "Content-type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    });
};

export default {axiosAPItoken}