import React ,{ useState, useEffect }from 'react';

import {
    StyleSheet,
    Image,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    LogBox,
    Button
  } from 'react-native';
  import IconKidsStudy from '../../android/app/src/asset/img/icon-kids-study.jpg';
  import { Input } from 'react-native-elements';
  import ApiUser from '../../android/app/src/api/users';
  import { useSelector,useDispatch } from 'react-redux'
  import AsyncStorage from '@react-native-community/async-storage';

LogBox.ignoreAllLogs();
  

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
              {/* <Text style={{fontSize:17}}>Mật khẩu hiện tại :</Text> */}
               <TextInput 
               onChangeText={text  => {setvalueChange({...valueChange,current_password:text})}}
               placeholder="Mật khẩu hiện tại"
               style={{borderRadius:20,borderWidth:1,paddingHorizontal:10,borderColor:'#8a8887',marginVertical:10}}
               secureTextEntry={true} 
               />

              {/* <Text style={{fontSize:17}}>Mật khẩu mới :</Text> */}
               <TextInput 
               onChangeText={text  => {setvalueChange({...valueChange,new_password:text})}}
               placeholder="Mật khẩu mới "
               style={{borderRadius:20,borderWidth:1,paddingHorizontal:10,borderColor:'#8a8887',marginVertical:10}}
               secureTextEntry={true} 
               />
              {/* <Text style={{fontSize:17}}>Nhập lại mật khẩu mới :</Text> */}
               
               <TextInput 
               onChangeText={text  => {setvalueChange({...valueChange,againPassword:text})}}
               placeholder="Nhập lại mật khẩu mới "
               style={{borderRadius:20,borderWidth:1,paddingHorizontal:10,borderColor:'#8a8887',marginVertical:10}}
               secureTextEntry={true} 
               />
               {/* <View style={{width:'30%',alignSelf:'flex-end',padding:10}}>
                  <Button title="Lưu" onPress={()=>{editSubmit()}} />
               </View> */}
          <TouchableOpacity onPress={()=>{editSubmit()}} style={{backgroundColor:'#ffba30',borderRadius:50,marginTop:20}}>
            <View style={{paddingHorizontal:10,paddingVertical:17,alignItems:'center'}}> 
              <Text style={{color:'#ffff'}}>Cập nhập</Text>
            </View>
          </TouchableOpacity>
               
            </View>
      )
  }
  const styles = StyleSheet.create({
    containers:{ 
        flex:1,
        backgroundColor:'#fff',
        paddingHorizontal:15
    }
  });
export default ChangePass