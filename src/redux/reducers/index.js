import hocsinh from './hocsinh';
import notification from './notification';
import token from './token';
import route_notifi from './route_notifi';
import { combineReducers } from 'redux';
var myReducer = combineReducers({
    hocsinh : hocsinh,
    notification:notification,
    token:token,
    route_notifi:route_notifi
})

export default myReducer;