import axios from 'axios';
import React ,{ useState, useEffect }from 'react';
import http from "./axiosApi";

const getThangNamOfNamHocHienTai = (token) => {
    return http.axiosAPItoken(token).get('/get-nam-hoc-hien-tai');
};

const getDataByThangNam = (token,data) => {
    return http.axiosAPItoken(token).post('/get-diem-danh-thang',data);
};

const getDataByThangNamTest = (token,data) => {
    return http.axiosAPItoken(token).get('/test-d-d',data);
};


export default {
    getThangNamOfNamHocHienTai,
    getDataByThangNam,
    getDataByThangNamTest
};