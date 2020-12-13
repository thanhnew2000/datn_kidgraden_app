import axios from 'axios';
import React ,{ useState, useEffect }from 'react';
import http from "./axiosApi";

const getSucKhoeHocSinhByNam = (token,nam) => {
    return http.axiosAPItoken(token).get('/get-suc-khoe-hoc-sinh-theo-nam/'+nam);
};
const getYear= (token,id_hs) => {
    return http.axiosAPItoken(token).get('/get-nam-have-data-sk/'+id_hs);
};

const getAllDataSkHs= (token,id_hs) => {
    return http.axiosAPItoken(token).get('/get-all-data-sk-hs/'+id_hs);
};
export default {
    getSucKhoeHocSinhByNam,
    getYear,
    getAllDataSkHs
};