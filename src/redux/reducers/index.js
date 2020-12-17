import hocsinh from './hocsinh';
import notification from './notification';
import token from './token';
import route_notifi from './route_notifi';
import arr_notification from './arr_notification';
import id_param_thong_bao from './id_param_thong_bao';
import id_param_detail_medicine from './id_param_detail_medicine';
import { combineReducers } from 'redux';
var myReducer = combineReducers({
    hocsinh : hocsinh,
    notification:notification,
    token:token,
    arr_notification:arr_notification,
    id_param_thong_bao:id_param_thong_bao,
    id_param_detail_medicine:id_param_detail_medicine,
    route_notifi:route_notifi,

})

export default myReducer;