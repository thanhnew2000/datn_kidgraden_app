import axios from 'axios';
import React ,{ useState, useEffect }from 'react';
import http from "./axiosApi";

const insertDonThuoc = (token,id_hs,data) => {
    return http.axiosAPItoken(token).post('/dan-thuoc/'+id_hs,data);
};

const getAll = (token) => {
    return http.axiosAPItoken(token).get('/all-dan-thuoc');
};
const getAllByHs = (token,id_hs) => {
    return http.axiosAPItoken(token).get('/all-dan-thuoc-hs/'+id_hs);
};

const getDonThuocById = (token,id) => {
    return http.axiosAPItoken(token).get('/get-one-don-thuoc/'+id);
};

export default {
    insertDonThuoc,
    getAll,
    getAllByHs,
    getDonThuocById
};