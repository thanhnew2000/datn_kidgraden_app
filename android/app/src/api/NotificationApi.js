import axios from 'axios';
import React ,{ useState, useEffect }from 'react';
import http from "./axiosApi";

const getNofiByIdUser = (token,id) => {
    return http.axiosAPItoken(token).get('/get-thong-bao-by-user/'+id);
};
const allNofiByIdUser = (token,id) => {
    return http.axiosAPItoken(token).get('/get-all-thong-bao-by-user/'+id);
};
export default {
    getNofiByIdUser,
    allNofiByIdUser
};