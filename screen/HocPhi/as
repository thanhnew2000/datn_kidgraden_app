
import React ,{ useState, useEffect }from 'react';
import axios from 'axios';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Button } from 'react-native'
import IconNews from '../../android/app/src/asset/img/icon-news.png';
import IconKidsExercise from '../../android/app/src/asset/img/icon-kids-exercise.jpg';
import IconKidsStudy from '../../android/app/src/asset/img/icon-kids-study.jpg';
import IconKidsOutSide from '../../android/app/src/asset/img/icon-kids-outside.jpg';
import { ScrollView } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';

const HocPhi =  ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
            <View>
                {/*  chọn năm hiện */}
                  <View  style={{width:'100%',marginTop:5,flexDirection:'row'}}>
                      <View>
                          <Button title="2018" />
                      </View>
                      <View  style={{paddingLeft:10}}>
                          <Button title="2019" />
                      </View>
                   </View>
                {/*  list danh sách học phí */}

            

                <TouchableOpacity  onPress={()=>{ navigation.navigate('ChiTietHocPhi',{ hocphi: 'something', }) }}>

                    <View style={styles.boxList}>
                            <View style={{width:'20%'}}>
                                <AntDesign name="checkcircle" size={35} color='#32AE16' />
                            </View>
                            <View style={{width:'50%'}}>
                                    <Text style={{fontWeight:'bold'}}>Tháng 5</Text>
                                    <Text style={{color:'green'}}>Đã hoàn thành</Text>
                            </View>
                            <View style={{width:'30%'}}>
                                <Text style={{color:'green'}}>5,000,000 vnđ</Text>
                            </View>
                    </View>

                </TouchableOpacity>
                

                <View style={styles.boxList}>
                      <View style={{width:'20%'}}>
                          <AntDesign name="closecircle" size={35} color='#ee5d40' />
                      </View>
                      <View style={{width:'50%'}}>
                            <Text style={{fontWeight:'bold'}}>Tháng 6</Text>
                            <Text style={{color:'#ee5d40'}}>Chưa hoàn thành</Text>
                      </View>
                      <View style={{width:'30%'}}>
                          <Text style={{color:'red'}}>5,400,000 vnđ</Text>
                      </View>
                </View>

            </View>

     </ScrollView>
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

export default HocPhi;
