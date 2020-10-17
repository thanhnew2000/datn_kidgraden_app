import axios from 'axios';
import React ,{ useState, useEffect }from 'react';
import http from "./axiosApi";

const insertDonHo = (token,id_hs,data) => {
    return http.axiosAPItoken(token).post('/tao-don-ho/'+id_hs,data);
};

const getAll = (token) => {
    return http.axiosAPItoken(token).get('/all-nguoi-don-ho');
};
export default {
    insertDonHo,
    getAll
};