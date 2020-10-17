import axios from 'axios';
import React ,{ useState, useEffect }from 'react';
import http from "./axiosApi";

const getGVbyIdLop = (token,lop_id) => {
    return http.axiosAPItoken(token).get('/get-giao-vien-lop/'+lop_id);
};
export default {
    getGVbyIdLop,
};