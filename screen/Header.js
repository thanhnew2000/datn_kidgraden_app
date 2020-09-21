
import React ,{ useState }from 'react';
import {
    StyleSheet,
    View,
    FlatList,Text,Image
  } from 'react-native';

const Header =  () => {
  return (
            <View style={styles.container2}>
                 <Image style={{width: 50 , height:50 }}  source={require('../android/app/src/logo.png')}/>
            </View>
  );
};

const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:'100%',
        alignItems:'center',
        backgroundColor:'#dddd',
    },
    container2: {
      alignItems:'center',
   },

    
  });
export default Header;
