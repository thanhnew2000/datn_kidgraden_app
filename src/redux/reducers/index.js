import hocsinh from './hocsinh';
import notification from './notification';
import { combineReducers } from 'redux';
var myReducer = combineReducers({
    hocsinh : hocsinh,
    notification:notification
})

export default myReducer;