
import React ,{ useState }from 'react';
import {
    StyleSheet,
    View,
    FlatList,Text,Image
  } from 'react-native';

const Wait_loading =  () => {
  return (
    <View style={{backgroundColor:'#000000aa',flex:1}}>
            <View style={{  height:'100%', alignItems:'center', justifyContent:'center'}}>
                <Image style={{width: 200 , height:150 }}  source={require('../android/app/src/asset/img/loading_wait.gif')}/>
            </View>
    </View>
  );
};

const styles = StyleSheet.create({

  });
export default Wait_loading;
