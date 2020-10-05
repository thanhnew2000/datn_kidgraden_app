
import React ,{ useState, useEffect }from 'react';
import axios from 'axios';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import IconNews from '../../android/app/src/asset/img/icon-news.png';
import IconKidsExercise from '../../android/app/src/asset/img/icon-kids-exercise.jpg';
import IconKidsStudy from '../../android/app/src/asset/img/icon-kids-study.jpg';
import IconKidsOutSide from '../../android/app/src/asset/img/icon-kids-outside.jpg';
import { ScrollView } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Medicine =  ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
            <View >
                  <View  style={{width:'100%',marginTop:5}}>
                        <TouchableOpacity onPress={()=>{
                                navigation.navigate('add_medicine')
                            }} >
                              <AntDesign name="medicinebox" size={35} color="green" />
                        </TouchableOpacity>
                   </View>

                   <View style={styles.oDonThuc}>
                          <View style={styles.chia2thanh}>
                            <View style={{width:'20%'}}>
                               <Image style={{width:50,height:50}} source={IconKidsStudy}/>
                            </View>
                            <View style={{width:'60%'}}>
                                <Text style={{fontWeight:'bold',fontSize:17}}>Pham Trung Hiếu</Text>
                                <Text>13/5/2019</Text>
                            </View>
                            <View style={{width:'20%',alignItems:'center'}}>
                            <TouchableOpacity onPress={()=>{
                                navigation.navigate('detail_medicine')
                            }} >
                                <Text>Chi Tiết</Text>
                           </TouchableOpacity>

                            </View>
                          </View>
                          <View style={styles.chia2thanh}>
                              <Text>Nhớ cho nó uống thuốc không lên trường oánh đấy</Text>
                          </View>

                          <View style={styles.oDuoi}>
                              <Text style={{width:'20%',fontWeight:'bold'}}>Siro</Text>
                              <Text style={{width:'20%'}}>(300ml)</Text>
                              <Text style={{width:'50%'}}>Uống sau giờ trưa</Text>
                              <Text style={{width:'10%'}}>(..5)</Text>
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
      flexDirection:'column',
    },
    oDonThuc:{
      flexDirection:'column',
      marginVertical:10,
      padding:10,
      borderRadius:4,
      backgroundColor:'#fff',
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 7,
      },
      shadowOpacity: 1.70,
      shadowRadius: 6.27,
      
      elevation: 15,
    },
    chia2thanh:{
      flexDirection:'row',
      paddingVertical:5
    },
    oDuoi:{
      flexDirection:'row',
      borderTopWidth:1,
      paddingVertical:2 
    },
   
});

export default Medicine;
