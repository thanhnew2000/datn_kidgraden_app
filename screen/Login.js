
import React ,{ useState, useMemo, useReducer, useContext,useEffect }from 'react';
import axios from 'axios';
import {
    StyleSheet,
    View,
    FlatList,Text,
    Image,
    Button,
    Modal,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Alert
  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from './context';
import WaitLoading from './Wait_Loading';
import ipApi from '../android/app/src/api/ipApi';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';

import Swiper_Login from './Swiper_Login';

import  color_app  from './color_app';

// import userApiRequest from '../android/app/src/api/users';

const Login =  ({ navigation  }) => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [deviceMay, setDeviceMay] = useState(0);
const { signIn } = React.useContext(AuthContext);

const [dataUser,setDataUser] = useState({
  username: '',
  password: '',
});

async function createToken(token,data_hocsinh,data_user,data_all_hs) {
  try{
    
    await AsyncStorage.setItem('data_hs',JSON.stringify(data_hocsinh));
    await AsyncStorage.setItem('data_all_hs',JSON.stringify(data_all_hs));
    await AsyncStorage.setItem('data_token',token);
    await AsyncStorage.setItem('data_user',JSON.stringify(data_user));
  
    signIn();
  }catch (e){
      console.log(e)
  }
}

useEffect(() => {
  // Get the device token
  messaging()
    .getToken()
    .then(token => {
      setDeviceMay(token);
    });

}, []);

function onSubMit(){
  console.log('dataUser.username')
    if(dataUser.username == ''){
      Alert.alert('Hãy nhập tài khoản !')
    }else if(dataUser.password == ''){
      Alert.alert('Hãy nhập mật khẩu !')
    }else{
      setSubmitLoading(true);
      dataUser.device = deviceMay;
      console.log(dataUser);
      axios.post(ipApi+'api/login',dataUser)
      .then(function (response) {
        setSubmitLoading(false);
        console.log(response);
        console.log(response.data.token_user.original.access_token);
        createToken(
          response.data.token_user.original.access_token,
          response.data.data_hocsinh,
          response.data.data_user,
          response.data.data_all_hs,
          );
      })
      .catch(function (error) {
        setSubmitLoading(false);
        Alert.alert('Tài khoản và mật khẩu không đúng!')
        console.log('error roi')
        console.log(error);
      });
    }

}

  return (
            <View style={styles.container}>

             <View style={{flex:2}}>
                <Swiper_Login/> 
             </View>

              <View style={styles.loginform}> 

                <TextInput
                  onChangeText={text  => {setDataUser({...dataUser,username:text})}}
                  style={{borderRadius:20,borderWidth:1,paddingHorizontal:10,borderColor:'#8a8887',marginVertical:10}}
                  placeholder='Tài khoản'
                />

                <TextInput
                  onChangeText={text  => {setDataUser({...dataUser,password:text})}}
                  style={{borderRadius:20,borderWidth:1,paddingHorizontal:10,borderColor:'#8a8887',marginVertical:10}}

                  placeholder='Mật khẩu'
                  secureTextEntry={true}
                />


                <TouchableOpacity 
                  style={{ 
                    backgroundColor:color_app,
                    borderColor:'red',
                    borderRadius:30,
                    paddingVertical:8,
                    justifyContent: 'center', 
                    alignItems:'center',
                    paddingTop:10,
                    marginTop:20
                    }}
                    onPress={() => onSubMit()}>

                  <Text style={{color:'white'}}>Đăng nhập</Text>
                </TouchableOpacity>
                    

                <TouchableOpacity 
                  style={{ 
                    borderColor:'red',
                    borderRadius:30,
                    paddingVertical:8,
                    justifyContent: 'center', 
                    alignItems:'center',
                    marginTop:20

                    }}
                    onPress={()=> navigation.navigate('ForgotPass_Step1')}>


                  <Text style={{color:'black',alignSelf:'flex-end'}}>Quên mật khẩu</Text>
                </TouchableOpacity>

                <Modal
                      animationType="slide"
                      transparent={true}
                      visible={submitLoading}
                      onRequestClose={() => {
                      Alert.alert("Modal has been closed.");
                      }}
                  >
                   <WaitLoading />
                </Modal>

             </View>

            </View>

  
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"white"
    // backgroundColor:"#009387"
  },
  loginform:{
    width:'100%',
    height:'50%',
    backgroundColor:"#fff",
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    paddingVertical:40,
    paddingHorizontal:30,
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
  },
  textFooter:{
    paddingVertical:5,
    color:'#483D8B',
  }

  });
export default Login;
