
import React ,{ useState }from 'react';
import {
    StyleSheet,
    View,
    FlatList,Text,Image, ImageBackground, Alert
  } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


import Icon from 'react-native-vector-icons/FontAwesome';
import { Input ,Button} from 'react-native-elements';
import  AntDesign from 'react-native-vector-icons/AntDesign';
import Modal_SubmitLoading from '../component/reuse/Modal_SubmitLoading';
import ApiUser from '../../android/app/src/api/users';

const ForgotPass_Step3 =  ({navigation,route}) => {

  const { username } = route.params;
  const { token } = route.params;

  const [textError, setTextError] = useState(null);

  const [valueInput, setValueInput] = useState({
    new_password:'',
    password_again:'',
  });
  
  const [submitLoading, setSubmitLoading] = useState(false);

  function submitFrom (){
    setSubmitLoading(true)
    if(valueInput.new_password.length < 5){
      setSubmitLoading(false)
      setTextError('Mật khẩu ít nhất 5 ký tự');
    }else if(valueInput.new_password == '' || valueInput.new_password == null){
      setSubmitLoading(false)
      // Alert.alert('Hãy nhập mật khẩu');
      setTextError('Hãy nhập mật khẩu')
    }else if(valueInput.password_again == '' || valueInput.password_again == null){
      setSubmitLoading(false)
      // Alert.alert('Hãy nhập mật khẩu lần 2');
      setTextError('Hãy nhập lại mật khẩu ')

    }else if(valueInput.new_password !== valueInput.password_again){
      setSubmitLoading(false)
      // Alert.alert('Mật khẩu nhập lại không trùng khớp')
      setTextError('Mật khẩu nhập lại không trùng khớp')

    }else{
          setTextError(null)
            const formData = new FormData();
            formData.append("username",username);
            formData.append("new_password",valueInput.new_password);
            formData.append("password_again",valueInput.password_again);
            formData.append("token",token);
            ApiUser.changePassWhenForgotPass(formData)
                .then(res => {
                    console.log(res.data);
                    setSubmitLoading(false);
                    navigation.navigate('GetPass_Success');
                })
                .catch(err => {
                    console.log(err);
                    setSubmitLoading(false);
                    Alert.alert('Lỗi trên server')
                });
     }

}
  return (
    <View style={{backgroundColor:'#fff',flex:1}}>
        <View style={{alignSelf:'center',marginTop:'10%'}}>
              <Image style={{width: 120 , height:120  }}  source={require('../../android/app/src/forgot_pass3.png')}/>
        </View>
        <Text style={{fontSize:21,textAlign:'center'}}>Nhập mật khẩu mới</Text>
        <Text style={{fontSize:15,width:270,alignSelf:'center',marginTop:'2%',textAlign:'center'}}>Nhập mật khẩu mới của bạn</Text>


        <View style={styles.viewNhapTaiKhoan}>

                    
                        <Input
                            label="Mật khẩu mới"
                            onChangeText={text  => {setValueInput({...valueInput,new_password:text})}}
                            secureTextEntry={true}
                        />
                         <Input
                             label="Nhập lại khẩu mới"
                             onChangeText={text  => {setValueInput({...valueInput,password_again:text})}}
                             secureTextEntry={true}
                        />

                <TouchableOpacity onPress={()=>submitFrom()} 
                style={{border:1,width:120,height:50,alignSelf:'center',justifyContent:'center',marginTop:10,backgroundColor:'#6a9dfb',borderRadius:100}}>
                        <Text style={{textAlign:'center',fontSize:15,color:'#fff'}}>Cập nhập </Text>
                </TouchableOpacity>
             
        </View>

           <View>
              <Text style={{textAlign:'center',color:'red',paddingVertical:10}}>{textError}</Text>
            </View>
        <Modal_SubmitLoading submitLoading={submitLoading} />

    </View>
  );
};

const styles = StyleSheet.create({
    viewNhapTaiKhoan:{
        display:'flex',
        marginTop:'10%',
      

    }
  });
export default ForgotPass_Step3;
