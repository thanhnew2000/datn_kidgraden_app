import axios from 'axios';
import React ,{ useState, useEffect }from 'react';
import http from "./axiosApi";

const insertXinNghiHoc = (token,id_hs,data) => {
    return http.axiosAPItoken(token).post('/xin-nghi-hoc/'+id_hs,data);
};

const getAll = (token) => {
    return http.axiosAPItoken(token).get('/all-don-xin-nghi');
};

const getAllByHs = (token,id_hs) => {
    return http.axiosAPItoken(token).get('/get-don-xin-nghi-hs/'+id_hs);
};
const getOne = (token,id) => {
    return http.axiosAPItoken(token).get('/get-one-don-dayoff/'+id);
};

export default {
    insertXinNghiHoc,
    getAll,
    getAllByHs,
    getOne
};