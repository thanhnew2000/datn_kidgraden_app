import axios from 'axios';
import React ,{ useState, useEffect }from 'react';
import http from "./axiosApi";

const insertDonHo = (token,id_hs,data) => {
    return http.axiosAPItoken(token).post('/tao-don-ho/'+id_hs,data);
};

const getNguoiDonHoByHs = (token,id_hs) => {
    return http.axiosAPItoken(token).get('/nguoi-don-ho-id-hs/'+id_hs);
};
export default {
    getNguoiDonHoByHs,
    insertDonHo
};