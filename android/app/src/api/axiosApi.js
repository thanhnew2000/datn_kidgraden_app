import axios from "axios";

const axiosAPItoken = (token) => {
    return axios.create({
        baseURL: "http://34.122.241.19:8080/api",
        headers: {
            "Content-type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    });
};

export default {axiosAPItoken}