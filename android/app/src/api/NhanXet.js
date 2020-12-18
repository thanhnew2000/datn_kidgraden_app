import axios from 'axios';
import React ,{ useState, useEffect }from 'react';
import http from "./axiosApi";

const getNhanXetOfHs = (token,id) => {
    return http.axiosAPItoken(token).get('/get-nhan-xet-of-hoc-sinh/'+id);
};
const getOne = (token,id) => {
    return http.axiosAPItoken(token).get('/get-one-nhan-xet/'+id);
};
export default {
    getNhanXetOfHs,
    getOne
};