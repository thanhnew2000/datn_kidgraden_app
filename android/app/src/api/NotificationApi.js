import axios from 'axios';
import React ,{ useState, useEffect }from 'react';
import http from "./axiosApi";

const getNofiByIdUser = (token,id) => {
    return http.axiosAPItoken(token).get('/get-thong-bao-by-user/'+id);
};
const allNofiByIdUser = (token,id) => {
    return http.axiosAPItoken(token).get('/get-all-thong-bao-by-user/'+id);
};

const updateBellHs = (token,id_hs) => {
    return http.axiosAPItoken(token).post('/update-bell-hs/'+id_hs);
};

const updateTypeOneNoti = (token,id_notification) => {
    return http.axiosAPItoken(token).post('/update-type-one-notifi/'+id_notification);
};

const getArrNotifiNumberHs = (token,data) => {
    return http.axiosAPItoken(token).post('/get-arr-notifi-hs-by-user/',data);
};

const getNumberNotifiNumberOneHs = (token,id_hs) => {
    return http.axiosAPItoken(token).get('/get-number-notifition-hs/'+id_hs);
};


const getMoreThongBao = (token,id_hs) => {
    return http.axiosAPItoken(token).get('/get-more-thong-bao-by-id-hs/'+id_hs);
};
export default {
    getNofiByIdUser,
    allNofiByIdUser,
    updateBellHs,
    updateTypeOneNoti,
    getArrNotifiNumberHs,
    getNumberNotifiNumberOneHs,
    getMoreThongBao
};