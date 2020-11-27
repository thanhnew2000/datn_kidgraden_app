import React ,{ useState, useEffect }from 'react';

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
  import ApiUser from '../../android/app/src/api/users';
  import { useSelector,useDispatch } from 'react-redux'
  import AsyncStorage from '@react-native-community/async-storage';

  

const ChangePass = ({navigation}) => {

  const data_redux = useSelector(state => state)
  const data_token = data_redux.token;
 


  const [valueChange, setvalueChange] = useState({
    new_password:'',
    againPassword:'',
    current_password:'',
  });

  const [du_lieu_user, setDuLieuUser] = useState({
    user_id:''
  });


  
async function setDataUser () {
  var d_User = await AsyncStorage.getItem('data_user');
  let data_user = JSON.parse(d_User)
  console.log('us',data_user)
  setDuLieuUser(data_user);
};

useEffect(() => {setDataUser()}, []);

  
  function editSubmit(){
    if( 
      (valueChange.new_password.length.toString()  == 0) || 
      (valueChange.current_password.length.toString()  == 0) ||
      (valueChange.againPassword.length.toString()  == 0)){
      Alert.alert('Không để trống ô')
    }
    else if(valueChange.new_password !== valueChange.againPassword){
      Alert.alert('Mật khẩu nhập không trùng khớp')
    }else if(valueChange.new_password.length.toString() < 5){
      Alert.alert('Mật khẩu mới ít nhất 5 ký tự')
    }else{
    ApiUser.edit(data_token.token,du_lieu_user.id,valueChange)
      .then(res => {
          console.log('log change pass',res.data);
          if(res.data == 'NoCorrectPass'){
              Alert.alert('Mật khẩu cũ không đúng')
          }else if(res.data == 'CoincidNewPassWithOldPass'){
              Alert.alert('Mật khẩu cũ và mật khẩu mới trùng nhau')
          }else{
            Alert.alert(
              "Cập nhập thành công",
              "",
              [
                { text: "OK", onPress: () => navigation.navigate('Home') }
              ],
              { cancelable: false }
            );
          }
      })
      .catch(err => {
         Alert.alert('Gặp vấn đề lỗi !')
          console.log(err);
      });
    }
  }

  
      return (
            <View style={styles.containers}>
               <Input 
               label="Mật khẩu cũ"
               onChangeText={text  => {setvalueChange({...valueChange,current_password:text})}}
               secureTextEntry={true} 
               />
               <Input 
               label="Mật khẩu mới"
               onChangeText={text  => {setvalueChange({...valueChange,new_password:text})}}
               secureTextEntry={true} 
               />
               <Input 
               label="Nhập lại mật khẩu mới"
               onChangeText={text  => {setvalueChange({...valueChange,againPassword:text})}}
               secureTextEntry={true} 
               />
               <View style={{width:'30%',alignSelf:'flex-end',padding:10}}>
                <Button title="Lưu" onPress={()=>{editSubmit()}} />
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