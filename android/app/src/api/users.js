import axios from 'axios';
import React ,{ useState, useEffect }from 'react';
import http from "./axiosApi";

const getUser = (token) => {
    return http.axiosAPItoken(token).get('/users');
};
const edit = (token,id,data) => {
    return http.axiosAPItoken(token).post('/sua-info-user/'+id,data);
};

export default {
    getUser,
    edit
};