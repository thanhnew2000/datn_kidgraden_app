import axios from "axios";

const axiosAPItoken = (token) => {
    return axios.create({
        baseURL: "http://10.24.11.88:8080/api",
        headers: {
            "Content-type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    });
};

export default {axiosAPItoken}