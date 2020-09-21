
import React ,{ useState }from 'react';
import {
    StyleSheet,
    View,
    FlatList,Text,Image, Button,
    ImageBackground
  } from 'react-native';

const Login =  ({ navigation }) => {

  return (
            <View >
          <ImageBackground  style={{width: '100%' , height:'100%'}}  source={require('../android/app/src/funny.png')}>

                <Text>Hehe</Text>
                <Button
                title="Đăng nhập"
                onPress={() =>
                    navigation.navigate('Home2')
                }
                />
             </ImageBackground>

            </View>

  
  );
};

const styles = StyleSheet.create({
  });
export default Login;
