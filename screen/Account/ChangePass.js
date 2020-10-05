import React from 'react'
import {
    StyleSheet,
    Image,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    Button
  } from 'react-native';
  import IconKidsStudy from '../../android/app/src/asset/img/icon-kids-study.jpg';
  import { Input } from 'react-native-elements';

const ChangePass = ({navigation}) => {
      return (
            <View style={styles.containers}>
               <Input 
               placeholder="Mật khẩu cũ"
               secureTextEntry={true} 
               />
               <Input 
               placeholder="Mật khẩu mới"
               secureTextEntry={true} 
               />
               <Input 
               placeholder="Nhập lại mật khẩu mới"
               secureTextEntry={true} 
               />
               <View style={{width:'30%',alignSelf:'flex-end',padding:10}}>
                <Button title="Lưu" />
               </View>
            </View>
      )
  }
  const styles = StyleSheet.create({
    containers:{ 
        flex:1,
        backgroundColor:'#fff'
    }
  });
export default ChangePass