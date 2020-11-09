import axios from 'axios';
import React ,{ useState, useEffect }from 'react';
import http from "./axiosApi";

const getHoatDongByLop = (token,id_lop) => {
    return http.axiosAPItoken(token).get('get-hoat-dong-hoc-sinh/'+id_lop);
};
export default {
    getHoatDongByLop,
};