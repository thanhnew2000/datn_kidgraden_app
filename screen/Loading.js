
import React ,{ useState }from 'react';
import {
    StyleSheet,
    View,
    FlatList,Text,Image
  } from 'react-native';

const Loading =  () => {
  return (
            <View style={styles.container}>
                <View style={styles.content}>
                 <Image style={{width: 200 , height:100 }}  source={require('../android/app/src/asset/img/loading.gif')}/>
                </View>

            </View>
  );
};

const styles = StyleSheet.create({
    container: {
       flex:1,
       backgroundColor:'#fff',
    },
    content:{
        height:'100%',
        alignItems:'center',
        justifyContent:'center'
    }
  });
export default Loading;
