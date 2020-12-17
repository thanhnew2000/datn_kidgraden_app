import axios from "axios";

const axiosAPItoken = (token) => {
    return axios.create({
        baseURL: "http://35.187.236.213:8080/api",
        headers: {
            "Content-type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    });
};

export default {axiosAPItoken}