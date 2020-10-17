import axios from 'axios';
import React ,{ useState, useEffect }from 'react';
import http from "./axiosApi";

const insertDanhGiaGiaoVien = (token,data) => {
    return http.axiosAPItoken(token).post('/tao-danh-gia-giao-vien',data);
};

export default {
    insertDanhGiaGiaoVien,
};