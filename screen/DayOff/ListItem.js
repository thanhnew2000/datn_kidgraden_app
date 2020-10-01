
import React ,{ useState, useEffect }from 'react';
import axios from 'axios';
import { View, Text, Image, TouchableOpacity, FlatList,StyleSheet, Button } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';

const ListItem =  ({ navigation }) => {
  return (
                         <View  style={styles.contain}>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{width:'35%',marginLeft:10}}>
                                    <Text  style={{fontWeight:'bold'}}>Ngày gửi: </Text>
                                    <Text>10/5/1999</Text>
                                </View>

                                <View style={{width:'35%'}}>
                                    <Text style={{fontWeight:'bold'}}>Thời gian nghỉ:</Text>
                                    <Text>10/2/1999 - 10/3/1999</Text>
                                </View>

                                <View style={{width:'35%'}}>
                                    <Text style={styles.status}>Chờ xác nhận</Text>
                                </View>
                             
                            </View>
                            <View style={{flexDirection: 'row',marginLeft:10}}>
                                <Text style={{fontWeight:'bold'}} >Lý do :</Text>
                                <Text> Cháu hôm nay sốt cô cho cháu nghỉ nhé hihi, ThankYou baby </Text>
                            </View>
                          </View>
  );
};

const styles = StyleSheet.create({
    contain:{
        padding:5,
        marginVertical:10,
        borderRadius:4,
        backgroundColor:'#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        
        elevation: 10,
    },
    status:{
        width:95,
        height:20,
        backgroundColor:'#ddd',
        paddingHorizontal:3,
        marginTop:10,
        marginLeft:-2,
    }
  });

export default ListItem;
