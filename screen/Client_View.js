
import React ,{ useState }from 'react';
import {
    StyleSheet,
    View,
    FlatList,Text,Image
  } from 'react-native';

const Client_View =  () => {
  return (
            <View style={styles.container2}>
                 <Image style={{width: 50 , height:50 }}  source={require('../android/app/src/logo.png')}/>
            </View>
  );
};


export default Client_View;
