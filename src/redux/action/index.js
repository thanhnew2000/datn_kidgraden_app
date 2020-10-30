import * as types from '../constants/ActionType';
import AsyncStorage from '@react-native-community/async-storage';

export const status = () =>{
        return {
            type: types.TOGGLE_STATUS
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


export function fetchDataAsyncStorage() {
    return (dispatch) => {
       async function fetchData() {
            try{
              var hs = await AsyncStorage.getItem('data_hs');
              if(hs !== null){
                let data_HocSinh =  JSON.parse(hs);
                dispatch(getDataSuccess(data_HocSinh))
              }
              console.log(hs)
            }catch (e){
              console.log(e);
            }
        }
      fetchData();
  }
}