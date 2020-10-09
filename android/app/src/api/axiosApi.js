import axios from "axios";

const axiosAPItoken = (token) => {
    return axios.create({
        baseURL: "  ",
        headers: {
            "Content-type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    });
};

export default {axiosAPItoken}