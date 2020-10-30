import axios from 'axios';
import http from "./axiosApi";

const getBinhLuanOfDonThuoc = (token,id_don_thuoc) => {
    return http.axiosAPItoken(token).get('/get-binh-luan-phan-hoi-thuoc/'+id_don_thuoc);
};

const insertPhanHoi = (token,data) => {
    return http.axiosAPItoken(token).post('/insert-binh-luan-phan-hoi',data);
};

export default {
    getBinhLuanOfDonThuoc,
    insertPhanHoi
};