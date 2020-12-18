
import React ,{ useState }from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    FlatList,Text,Image, Button
  } from 'react-native';
  import Foundation from 'react-native-vector-icons/Foundation';
  import { DrawerActions } from '@react-navigation/native';
  import ApiHocSinh from '../android/app/src/api/HocSinhApi';
  import AsyncStorage from '@react-native-community/async-storage';
  import  color_app  from './color_app';
  import { useSelector,useDispatch,useStore  } from 'react-redux'

const Header =  ({navigation}) => {
  const data_redux = useSelector(state => state)
  const hs = data_redux.hocsinh.data;

  return (
            <View style={styles.container}>
              <View style={{width:'35%'}}>
                  <TouchableOpacity onPress={()=> navigation.openDrawer()} >
                    <Foundation name="align-left" size={30} color="#fffdfa" />
                  </TouchableOpacity>
              </View>
              <View style={{width:'50%'}}>
                <TouchableOpacity onPress={()=> getData()} >
                  <Image style={{flex:1,  width:100, resizeMode: 'contain' }}  source={require('../android/app/src/logo.png')}/>
                </TouchableOpacity>
              </View>
              <View style={{width:'15%'}}>
                 <Image style={{width:45,height:45,borderRadius:10}}  source={{
                    uri: hs.avatar,
                  }}/>
              </View>

            </View>
  );
};

const styles = StyleSheet.create({
    container: {
      alignItems:'center',
      flexDirection:'row',
   },

    
  });
export default Header;
