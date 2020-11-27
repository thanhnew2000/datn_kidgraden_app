
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
    AsyncStorage,
    TouchableOpacity,
    Dimensions,
    Alert
  } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from './context';
import WaitLoading from './Wait_Loading';
import ipApi from '../android/app/src/api/ipApi';
import messaging from '@react-native-firebase/messaging';

// import userApiRequest from '../android/app/src/api/users';

const Login =  ({ navigation  }) => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [deviceMay, setDeviceMay] = useState(0);
const { signIn } = React.useContext(AuthContext);

const [dataUser,setDataUser] = useState({
  username: '',
  password: '',
});

async function createToken(token,data_hocsinh,data_user) {
  try{
    // await AsyncStorage.setItem('user_token',token);
    let array = { token: token, data_hocsinh: data_hocsinh,data_user : data_user}
    
    // await AsyncStorage.setItem('data_storge',JSON.stringify(array));
    await AsyncStorage.setItem('data_hs',JSON.stringify(data_hocsinh));
    await AsyncStorage.setItem('data_token',token);
    await AsyncStorage.setItem('data_user',JSON.stringify(data_user));
    // console.log('đã tạo token');
    // let v =  AsyncStorage.getItem('data_hocsinh');
    // something()
    signIn();
  }catch (e){
      console.log(e)
  }
}

// async function something() {
//   try{
//     // await AsyncStorage.setItem('user_token',token);
//    let a = await AsyncStorage.getItem('data_storge');
//    let c =  JSON.parse(a);
//     console.log(c.token);
//     // signIn();
//   }catch (e){
//       console.log(e)
//   }
// }
useEffect(() => {
  // Get the device token
  messaging()
    .getToken()
    .then(token => {
      setDeviceMay(token);
      // return saveTokenToDatabase(token);
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
        // $data = response.data;
        createToken(
          response.data.token_user.original.access_token,
          response.data.data_hocsinh,
          response.data.data_user,
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
              <ImageBackground  style={{width: '100%' , height:'100%'}}  source={require('../android/app/src/asset/img/hinh-nen-co-login.jpg')}>

             <View style={{alignItems:'center'}}>

                {/* <Image style={{width: 120 , height:100  }}  source={require('../android/app/src/logo.png')}/> */}
                <Image style={{width: '100%' , height:280  }}  source={require('../android/app/src/asset/img/anh-bia-login.jpg')}/>

             </View>

              <View style={styles.loginform}> 

                <Input
                  label="Tai khoan :"
                  onChangeText={text  => {setDataUser({...dataUser,username:text})}}
                  placeholder='Nhap tai khoan'
                />

                <Input
                  label="Mat khau :"
                  onChangeText={text  => {setDataUser({...dataUser,password:text})}}
                  placeholder='Nhap mat khau'
                  secureTextEntry={true}
                />


        <TouchableOpacity 
           style={{ 
            backgroundColor:'#0099ff',
            borderColor:'red',
            borderRadius:30,
            paddingVertical:8,
            justifyContent: 'center', 
            alignItems:'center',
            }}
            onPress={() => onSubMit()}>

          <Text style={{color:'white'}}>Đăng nhập</Text>
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




               <Text style={styles.textFooter}>Quen mat khau</Text>

             </View>
             </ImageBackground>

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
    marginTop:-20,
    backgroundColor:"#fff",
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    paddingVertical:50,
    paddingHorizontal:30,
    height:'50%',
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
  },
  textFooter:{
    paddingVertical:5,
    color:'#483D8B',
  }

  });
export default Login;
