import hocsinh from './hocsinh';
import notification from './notification';
import token from './token';
import route_notifi from './route_notifi';
import arr_notification from './arr_notification';
import { combineReducers } from 'redux';
var myReducer = combineReducers({
    hocsinh : hocsinh,
    notification:notification,
    token:token,
    arr_notification:arr_notification
})

export default myReducer;