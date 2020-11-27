import axios from 'axios';
import React ,{ useState, useEffect }from 'react';
import http from "./axiosApi";

const getAlbumByLop = (token,lop_id) => {
    return http.axiosAPItoken(token).get('/get-album-by-lop/'+lop_id);
};

export default {
    getAlbumByLop,
};