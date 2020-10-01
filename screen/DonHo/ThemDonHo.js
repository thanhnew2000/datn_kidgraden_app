
import React ,{ useState, useEffect }from 'react';
import axios from 'axios';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet,Button } from 'react-native'
import IconNews from '../../android/app/src/asset/img/icon-news.png';
import IconKidsExercise from '../../android/app/src/asset/img/icon-kids-exercise.jpg';
import IconKidsStudy from '../../android/app/src/asset/img/icon-kids-study.jpg';
import IconKidsOutSide from '../../android/app/src/asset/img/icon-kids-outside.jpg';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Input } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
const ThemDonHo =  ({ navigation }) => {

    const [avatarSource , setAvatarSource] =  useState(null)
    const options = {
        title: 'Select Avatar',
        customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };

      
      function chosePickImage(){
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            console.log(image);
          });
      }
  return (
    <ScrollView style={styles.container}>
            <View>
                    <Input 
                    //   onChangeText={text  => {setOneMedicineAdd({...oneMedicineAdd,name:text})}}
                      style={{width:'100%',height:50}}      
                      label="Tên người đón hộ"
                      />
                      
                      <Input 
                    //   onChangeText={text  => {setOneMedicineAdd({...oneMedicineAdd,name:text})}}
                      style={{width:'100%',height:50}}      
                      label="Số CMND:"
                      />
                <TouchableOpacity onPress={()=>chosePickImage()} >
                    <Text style={{backgroundColor:'green'}}>Choose Anh</Text>
                </TouchableOpacity>


                  
                      
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



    oBox:{
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

export default ThemDonHo;
