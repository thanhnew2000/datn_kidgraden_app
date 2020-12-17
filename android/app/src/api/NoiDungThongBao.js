import axios from 'axios';
import React ,{ useState, useEffect }from 'react';
import http from "./axiosApi";

const getNoiDungThongBaoId = (token,id) => {
    return http.axiosAPItoken(token).get('/get-noi-dung-thong-bao/'+id);
};


export default {
    getNoiDungThongBaoId,
};