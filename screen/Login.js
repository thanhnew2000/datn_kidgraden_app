
import React ,{ useState }from 'react';
import {
    StyleSheet,
    View,
    FlatList,Text,Image, Button,
    ImageBackground,
    Dimensions
  } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
const Login =  ({ navigation }) => {

  return (
            <View style={styles.container}>
             <View style={{alignItems:'center', paddingVertical:20}}>
          {/* <ImageBackground  style={{width: '100%' , height:'100%'}}  source={require('../android/app/src/funny.png')}> */}

                <Image style={{width: 120 , height:100  }}  source={require('../android/app/src/logo.png')}/>

               </View>

              <View style={styles.loginform}> 

                <Input
                  label="Tai khoan :"
                  placeholder='Nhap tai khoan'
                />

                <Input
                  label="Mat khau :"
                  placeholder='Nhap mat khau'
                  secureTextEntry={true}
                />

                <Button
                title="Đăng nhập"
                onPress={() =>
                    navigation.navigate('Home2')
                }
                />
             {/* </ImageBackground> */}
             <Text style={styles.textFooter}>Quen mat khau</Text>
             </View>

            </View>

  
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#009387"
  },
  loginform:{
    flex:1,
    backgroundColor:"#fff",
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    paddingVertical:50,
    paddingHorizontal:30
  },
  textFooter:{
    paddingVertical:5,
    color:'#483D8B',
  }

  });
export default Login;
