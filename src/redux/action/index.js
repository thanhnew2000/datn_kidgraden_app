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


export const setArrNotification = (arr) =>{
  return {
      type: types.SET_NUMBER_ARR_NOTIFI,
      arr
  }
}





export function fetchDataAsyncStorage() {
    return (dispatch) => {
       async function fetchData() {
            try{
              var hs = await AsyncStorage.getItem('data_hs');
                let data_HocSinh =  JSON.parse(hs);
                dispatch(getDataSuccess(data_HocSinh))
            }catch (e){
              console.log(e);
            }
        }
      fetchData();
  }
}

// export function fetchDataAsyncStorage(id_hs) {
  //   return (dispatch) => {
  //      async function fetchData() {
  //           try{
  //             var hs = await AsyncStorage.getItem('data_hs');
  //             var json_all_hs = await AsyncStorage.getItem('data_hs');
  //             let data_HocSinh =  JSON.parse(hs);
  //             let data_all_hs =  JSON.parse(json_all_hs);
  //             if(id_hs == null){
  //               data_all_hs.forEach((item)=>{
  //                 if(item.id == id_hs){
  //                      dispatch(getDataSuccess(item))
  //                      break;
  //                    }
  //                })
  //             }else{
  //               dispatch(getDataSuccess(data_HocSinh))
  //             }
  //           }catch (e){
  //             console.log(e);
  //           }
  //       }
  //     fetchData();
  // }
  // }
  



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