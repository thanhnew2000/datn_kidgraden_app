
import React ,{ useState, useEffect }from 'react';
import axios from 'axios';
import { View, Text, Image, TouchableOpacity, FlatList,StyleSheet, Button } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import ListItem from './ListItem';
const DayOff =  ({ navigation }) => {
  return (
            <View style={styles.containers}>
                <View  style={{width:'100%',marginTop:5}}>
                <TouchableOpacity onPress={()=>{
                        navigation.navigate('Tạo đơn xin nghỉ')
                    }} >
                      <AntDesign name="pluscircleo" size={35} color="green" />
                </TouchableOpacity>
                </View>

                 <ListItem />
                 <ListItem />
            </View>
  );
};

const styles = StyleSheet.create({
    containers:{ 
        flex:1 , 
        flexDirection: 'column',
        paddingLeft:5,
        paddingRight:5,
        backgroundColor:'#fff',
    },
    status:{
        width:95    ,
        height:20,
        backgroundColor:'#ddd',
        paddingHorizontal:3,
        marginTop:10,
        marginLeft:-2,
    }
   
  });

export default DayOff;
