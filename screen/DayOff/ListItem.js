
import React ,{ useState, useEffect }from 'react';
import axios from 'axios';
import { View, Text, Image, TouchableOpacity, FlatList,StyleSheet, Button } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from "moment";

const ListItem =  ({ navigation , item }) => {
    function limit10character(string){
       let text =  string.slice(0,39);
       if(string.length > 20){
           return text+' ...';
       }else{
           return text;
       }
    }
  return (
                         <View  style={styles.contain}>
                             <TouchableOpacity onPress={()=> navigation.navigate('ChiTietNghiHoc', {item : item})}>

                            <View style={{flexDirection: 'row'}}>
                                <View style={{width:'25%',marginLeft:10}}>
                                    <Text  style={{fontWeight:'bold'}}>Ngày gửi: </Text>
                                    <Text>{moment(item['created_at']).format("YYYY-MM-DD") }</Text>
                                </View>

                                <View style={{width:'47%'}}>
                                        <Text style={{fontWeight:'bold'}}>Thời gian nghỉ:</Text>
                                        <Text>{item['ngay_bat_dau']} - {item['ngay_ket_thuc']}</Text> 
                                 </View>
                                 <View style={{width:'20%'}}>
                                          <Text style={item['trang_thai'] == 0 ? styles.statusChuaXacNhan : styles.statusDaXacNhan}> 
                                            {item['trang_thai'] == 0 ? 'Chưa xác nhận' : 'Đã xác nhận'}
                                            </Text>
                                 </View>

                             
                            </View>
                            <View style={{flexDirection: 'row',marginLeft:10}}>
                                <Text style={{fontWeight:'bold'}} >Lý do :</Text>
                                 <Text> {limit10character(item['noi_dung'])}</Text>
                            </View>

                            </TouchableOpacity>

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
    statusChuaXacNhan:{
        width:95,
        height:20,
        color:'gray',
        paddingHorizontal:3,
        fontWeight:'bold'
        // marginLeft:-2,
    },
    statusDaXacNhan:{
        width:95,
        height:20,
        color:'green',
        paddingHorizontal:3,
        fontWeight:'bold'

        // marginLeft:-2,
    }
  });

export default ListItem;
