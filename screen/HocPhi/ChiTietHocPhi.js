
import React ,{ useState, useEffect }from 'react';
import axios from 'axios';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Button } from 'react-native'
import IconNews from '../../android/app/src/asset/img/icon-news.png';
import IconKidsExercise from '../../android/app/src/asset/img/icon-kids-exercise.jpg';
import IconKidsStudy from '../../android/app/src/asset/img/icon-kids-study.jpg';
import IconKidsOutSide from '../../android/app/src/asset/img/icon-kids-outside.jpg';
import { ScrollView } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ChiTietHocPhi =  ({ navigation }) => {
  return (

            <View>
                {/*  chọn năm hiện */}
                  <View  style={{alignItems:'center',padding:10}}>
                        <Text style={{fontSize:17,fontWeight:'bold'}}>Tháng 5 năm 2019</Text>
                   </View>

                   <View  style={{padding:10}}>
                      <Text style={{fontSize:15,fontWeight:'bold'}}>1. Tiền được trừ</Text>
                        <View style={{flexDirection:'row',padding:10,borderBottomWidth:1,borderColor:'#D9D9DA'}}>
                            <Text style={{width:'70%'}}>Số buổi nghỉ học có phép</Text>
                            <Text  style={{width:'50%'}}>100,000 VND</Text>
                        </View>

                        <View style={{flexDirection:'row',padding:10,borderBottomWidth:1,borderColor:'#D9D9DA'}}>
                            <Text style={{width:'70%'}}>Số buổi nghỉ học có phép</Text>
                            <Text  style={{width:'50%'}}>100,000 VND</Text>
                        </View>
                   </View>


                   <View  style={{padding:10}}>
                      <Text style={{fontSize:15,fontWeight:'bold'}}>2. Tiền phải nộp</Text>
                        <View style={{flexDirection:'row',padding:10,borderBottomWidth:1,borderColor:'#D9D9DA'}}>
                            <Text style={{width:'70%'}}>Học phí:</Text>
                            <Text  style={{width:'50%'}}>5,000,000 VND</Text>
                        </View>

                        <View style={{flexDirection:'row',padding:10,borderBottomWidth:1,borderColor:'#D9D9DA'}}>
                            <Text style={{width:'70%'}}>Tiền ăn:</Text>
                            <Text  style={{width:'50%'}}>2,000,000 VND</Text>
                        </View>
                   </View>

                    <View style={{flexDirection:'row',paddingVertical:10,paddingRight:15}}>
                        <View style={{width:'70%',alignItems:'flex-end'}}>
                         <Text style={{fontSize:15,fontWeight:'bold'}}>Tổng tiền : </Text>
                        </View>
                        <View style={{width:'50%'}}>
                           <Text  style={{fontWeight:'bold',fontSize:16}}>5,000,000 VND</Text>
                        </View>
                    </View>

                    <View style={{flexDirection:'row',padding:10}}>
                       <View style={{width:'70%',alignItems:'flex-end'}}>
                         <Text style={{fontSize:15,fontWeight:'bold'}}>Trạng thái : </Text>
                        </View>
                        <View style={{width:'50%'}}>
                           <Text  style={{fontSize:16,color:'green'}}>Đã thanh toán</Text>
                        </View>
                    </View>
                   
                {/*  list danh sách học phí */}
            </View>
  );
};

const styles = StyleSheet.create({
    container:{
      flex:1,
      padding:10,
      backgroundColor:"#fff",
    },
    boxList:{
        flexDirection:'row',padding:10,borderWidth:1,marginVertical:10,borderRadius:5,borderColor:'#D9D9DA'
    }
   
   
});

export default ChiTietHocPhi;
