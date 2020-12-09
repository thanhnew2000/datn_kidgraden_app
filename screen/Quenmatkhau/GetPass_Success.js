
import React ,{ useState }from 'react';
import {
    StyleSheet,
    View,
    FlatList,Text,Image, ImageBackground, 
  } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


import Icon from 'react-native-vector-icons/FontAwesome';
import { Input ,Button} from 'react-native-elements';
import  Entypo from 'react-native-vector-icons/Entypo';

const GetPass_Success =  ({navigation}) => {


  return (
    <View style={{backgroundColor:'#fff',flex:1}}>
              <ImageBackground  style={{width: '100%' , height:'100%'}}  source={require('../../android/app/src/getpass_success.jpg')}>
                  <View style={{justifyContent:'center',flex:1}}>
                      <View style={{alignSelf:'center'}}>
                        <Text style={{color:'#fff',fontSize:17,marginBottom:10}}>Lấy lại mật khẩu</Text>
                        <Image style={{width: 120 , height:120,borderRadius: 100 }}  source={require('../../android/app/src/icon-success-pass.png')}/>
                      </View>
                      <View style={{alignSelf:'center',width:'70%',marginTop:20}}> 
                                <Text style={{color:'#fff',fontSize:14,marginBottom:10,textAlign:'center',marginBottom:100}}>Tài khoản của bạn đã đổi mật khẩu thành công ! ấn về trang đăng nhập để đăng nhập lại</Text>
                                <Button title="Chuyển trang đăng nhập" onPress={()=> navigation.navigate('Login')}/>
                      </View>

                  </View>

              </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({

  });
export default GetPass_Success;
