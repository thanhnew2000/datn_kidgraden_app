import axios from 'axios';
import React ,{ useState, useEffect }from 'react';
import http from "./axiosApi";

const getNamThangOfHocPhiHs = (token,id_hs) => {
    return http.axiosAPItoken(token).get('get-id-dot-thu-hs/'+id_hs);
};

const getAllDanhSachThuTienFromIdThangThuHs = (token,id_thang_thu_tien,id_hs) => {
    return http.axiosAPItoken(token).get('get-all-ds-thu-tien-thang-nam-hs/'+id_thang_thu_tien+'/'+id_hs);
};

const getChiTietDot = (token,id_chi_tiet_dot,id_hs) => {
    return http.axiosAPItoken(token).get('get-chi-tiet-dot-thu/'+id_chi_tiet_dot+'/'+id_hs);
};
export default {
    getNamThangOfHocPhiHs,
    getAllDanhSachThuTienFromIdThangThuHs,
    getChiTietDot
};