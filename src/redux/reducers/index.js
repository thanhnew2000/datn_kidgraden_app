import hocsinh from './hocsinh';
import notification from './notification';
import token from './token';
import route_notifi from './route_notifi';
import arr_notification from './arr_notification';
import id_param_thong_bao from './id_param_thong_bao';
import id_param_detail_medicine from './id_param_detail_medicine';
import check_value_call_again from './check_value_call_again';
import { combineReducers } from 'redux';
var myReducer = combineReducers({
    hocsinh : hocsinh,
    notification:notification,
    token:token,
    arr_notification:arr_notification,
    id_param_thong_bao:id_param_thong_bao,
    id_param_detail_medicine:id_param_detail_medicine,
    check_value_call_again:check_value_call_again,
    route_notifi:route_notifi

})

export default myReducer;