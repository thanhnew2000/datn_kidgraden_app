import axios from 'axios';
import React ,{ useState, useEffect }from 'react';
import http from "./axiosApi";

const insertDonThuoc = (token,id_hs,data) => {
    return http.axiosAPItoken(token).post('/dan-thuoc/'+id_hs,data);
};

const getAll = (token) => {
    return http.axiosAPItoken(token).get('/all-dan-thuoc');
};
export default {
    insertDonThuoc,
    getAll
};