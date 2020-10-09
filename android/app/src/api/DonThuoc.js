import axios from 'axios';
import React ,{ useState, useEffect }from 'react';
import http from "./axiosApi";


const themDon = (token,formData) => {
    return http.axiosAPItoken(token).post('/dan-thuoc',formData);
};


export default {
    themDon,
};