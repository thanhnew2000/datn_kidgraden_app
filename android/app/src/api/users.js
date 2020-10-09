import axios from 'axios';
import React ,{ useState, useEffect }from 'react';
import http from "./axiosApi";
// async function fetchToken() {
//     try{
//     var token = await AsyncStorage.getItem('user_token');
//     if(v !== null){
//         return token
//     }
//     }catch (e){
//     console.log(e);
//     }
// }


const getUser = (token) => {
    return http.axiosAPItoken(token).get('/users');
};


export default {
    getUser,
};