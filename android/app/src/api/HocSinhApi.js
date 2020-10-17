import axios from 'axios';
import React ,{ useState, useEffect }from 'react';
import http from "./axiosApi";

const getOne = (token,id) => {
    return http.axiosAPItoken(token).get('/get-one-hoc-sinh/'+id);
};
const editInfoHS = (token,id,data) => {
    return http.axiosAPItoken(token).post('/edit-thong-tin-hoc-sinh/'+id,data);
};
export default {
    getOne,
    editInfoHS
};