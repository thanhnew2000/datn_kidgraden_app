import hocsinh from './hocsinh';
import notification from './notification';
import token from './token';
import { combineReducers } from 'redux';
var myReducer = combineReducers({
    hocsinh : hocsinh,
    notification:notification,
    token:token
})

export default myReducer;