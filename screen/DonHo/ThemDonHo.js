
import React ,{ useState, useEffect }from 'react';
import axios from 'axios';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet,Button, Alert } from 'react-native'
import IconNews from '../../android/app/src/asset/img/icon-news.png';
import IconKidsExercise from '../../android/app/src/asset/img/icon-kids-exercise.jpg';
import IconKidsStudy from '../../android/app/src/asset/img/icon-kids-study.jpg';
import IconKidsOutSide from '../../android/app/src/asset/img/icon-kids-outside.jpg';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Input } from 'react-native-elements';
// import ImagePicker from 'react-native-image-crop-picker';
import ImagePicker from 'react-native-image-picker';
import ImageAavatar from '../../android/app/src/asset/img/avatar.jpg';

const ThemDonHo =  ({ navigation }) => {
     const [valueInput , setValueInput] =  useState({
       name:'',
       cmnd:'',
       image:'',
       phone:''
     })

    const [avatarSource , setAvatarSource] =  useState(null)
    const options = {
      title: 'Select Avatar', 
      cameraType: 'front',
      mediaType: 'photo' ,
      storageOptions: {
      skipBackup: true,
      path: 'images',
      },
      };

      
      function chosePickImage(){
          ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = { uri: response.uri };
              setAvatarSource(source);
            }
          });
      }
  return (
    <ScrollView style={styles.container}>
            <View style={{paddingTop:25}}>
                    <Input 
                      onChangeText={text  => {setValueInput({...valueInput,name:text})}}
                      style={{width:'100%',height:50}}      
                      label="Tên người đón hộ"
                      leftIcon={{ type: 'font-awesome', name: 'user' }}
                      />
                      
                      
                      <Input 
                      onChangeText={text  => {setValueInput({...valueInput,cmnd:text})}}
                      style={{width:'100%',height:50}}      
                      label="Số CMND:"
                      leftIcon={{ type: 'font-awesome', name: 'address-card-o' }}

                      />

                      <View style={{flexDirection:'row'}}>
                            <View style={{width:'45%',justifyContent:'center'}}>
                                <TouchableOpacity onPress={chosePickImage} >
                                    <Button title='Chọn ảnh' />
                                </TouchableOpacity>
                            </View>

                            <View style={{width:'55%',alignItems:'center'}}>
                                <Image source={ImageAavatar} style={{width:130,height:100}} />
                            </View>
                      </View>

                      <Input 
                      onChangeText={text  => {setValueInput({...valueInput,phone:text})}}
                      style={{width:'100%',height:50}}      
                      label="Số điện thoại :"
                      leftIcon={{ type: 'font-awesome', name: 'tablet' }}
                      />

                      <View style={{width:150,alignSelf:'flex-end'}}>
                       <Button title='Thêm' color="green" />
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
