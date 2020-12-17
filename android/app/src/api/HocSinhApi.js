import axios from 'axios';
import React ,{ useState, useEffect }from 'react';
import http from "./axiosApi";

const getOne = (token,id) => {
    return http.axiosAPItoken(token).get('/get-one-hoc-sinh/'+id);
};
const editInfoHS = (token,id,data) => {
    return http.axiosAPItoken(token).post('/edit-thong-tin-hoc-sinh/'+id,data);
};
const getHocSinhIdUser = (token,id) => {
    return http.axiosAPItoken(token).get('/get-hoc-sinh-id-user/'+id);
}
const checkHaveHsByIdUser = (token,id_user) => {
    return http.axiosAPItoken(token).get('/check-token-have-hs-by-id-user/'+id_user);
}
export default {
    getOne,
    editInfoHS,
    getHocSinhIdUser,
    checkHaveHsByIdUser
};