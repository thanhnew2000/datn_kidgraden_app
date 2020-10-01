
import React ,{ useState, useMemo, useReducer, useContext }from 'react';
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

// import userApiRequest from '../android/app/src/api/users';

const Login =  ({ navigation  }) => {
  const [submitLoading, setSubmitLoading] = useState(false);
const { signIn } = React.useContext(AuthContext);

const [dataUser,setDataUser] = useState({
  username: '',
  password: '',
});

async function createToken(token) {
  try{
    await AsyncStorage.setItem('user_token',token);
    console.log('đã tạo token');
    signIn();
  }catch (e){
      console.log(e)
  }
}


function onSubMit(){
  // console.log(dataUser.username)
    if(dataUser.username == ''){
      Alert.alert('Hãy nhập tài khoản !')
    }else if(dataUser.password == ''){
      Alert.alert('Hãy nhập mật khẩu !')
    }else{
      setSubmitLoading(true);
      axios.post('http://34.122.241.19:8080/api/login',dataUser)
      .then(function (response) {
        setSubmitLoading(false);
        console.log(response);
        createToken(response.data.access_token)
        console.log(response.data.access_token)
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

                <Button
                title="Đăng nhập"
                 onPress={() => onSubMit()}
                // onPress={() =>
                //     navigation.navigate('Home2')
                // }
                />




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
