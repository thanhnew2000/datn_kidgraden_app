import axios from 'axios';
import React ,{ useState, useEffect }from 'react';
import http from "./axiosApi";

const getUser = (token) => {
    return http.axiosAPItoken(token).get('/users');
};
const edit = (token,id,data) => {
    return http.axiosAPItoken(token).post('/sua-info-user/'+id,data);
};

const update_device_user = (id) => {
    return http.axiosAPItoken('token').post('/update-device-user/'+id);
};

const sendMaOTP = (data) => {
    return http.axiosAPItoken('token').post('check-mail-sent-ma-otp',data);
};
const checkOTP = (data) => {
    return http.axiosAPItoken('token').post('check-otp',data);
};
const changePassWhenForgotPass = (data) => {
    return http.axiosAPItoken('token').post('change-password-when-forgot-pass',data);
};  
const removeOTP = (data) => {
    return http.axiosAPItoken('token').post('remove-otp-token',data);
};  
export default {
    getUser,
    edit,
    update_device_user,
    sendMaOTP,
    checkOTP,
    changePassWhenForgotPass,
    removeOTP
};