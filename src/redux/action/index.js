import * as types from '../constants/ActionType';
import AsyncStorage from '@react-native-community/async-storage';
import database from '@react-native-firebase/database';

export const status = () =>{
        return {
            type: types.TOGGLE_STATUS
        }
}

export const numberNotification = () =>{
  return {
      type: types.NUMBER_NOTIFI
  }
}



export const data_hs = () =>{
    return {
        type: types.DATA_HS
    }
}

export function getDataSuccess(data) {
    return {
      type: types.FETCHING_DATA_ASYNCSTOAGE,
      data,
    }
}


export const setNumberNotification = (newNumber) =>{
  return {
      type: types.SET_NUMBER_NOTIFI,
      newNumber
  }
}




export function fetchDataAsyncStorage() {
    return (dispatch) => {
       async function fetchData() {
            try{
              var hs = await AsyncStorage.getItem('data_hs');
              if(hs !== null){
                let data_HocSinh =  JSON.parse(hs);
                dispatch(getDataSuccess(data_HocSinh))
              }
            }catch (e){
              console.log(e);
            }
        }
      fetchData();
  }
}





export function setTokenRedux(token) {
  return {
    type: types.TOKEN_ASYNC,
    token,
  }
}

export function fetchTokenAsyncStorage() {
  return (dispatch) => {
     async function fetchToken() {
          try{
            var token = await AsyncStorage.getItem('data_token');
            dispatch(setTokenRedux(token))
          }catch (e){
            console.log(e);
          }
      }
      fetchToken();
}
}


export function setRouteNotifi(route_notifi) {
  return {
    type: types.SET_ROUTE,
    route_notifi,
  }
}