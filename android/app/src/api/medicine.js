import axios from 'axios';
import React ,{ useState, useEffect }from 'react';
import http from "./axiosApi";

const getUser = (token) => {
    return http.axiosAPItoken(token).get('/users');
};


export default {
    getUser,
};