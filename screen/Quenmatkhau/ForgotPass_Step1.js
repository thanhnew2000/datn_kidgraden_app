
import React ,{ useState,useEffect }from 'react';
import {
    StyleSheet,
    View,
    FlatList,Text,Image, Alert,LogBox
  } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


import Icon from 'react-native-vector-icons/FontAwesome';
import { Input ,Button} from 'react-native-elements';
import  AntDesign from 'react-native-vector-icons/AntDesign';
import Modal_SubmitLoading from '../component/reuse/Modal_SubmitLoading';
import ApiUser from '../../android/app/src/api/users';

LogBox.ignoreAllLogs();

const ForgotPass_Step1 =  ({navigation}) => {

  const [viewMaXacNhan, setviewMaXacNhan] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [taiKhoanNguoiNhap, settaiKhoanNguoiNhap] = useState('');

  const [textError, setTextError] = useState(null);


  function submitFrom (){
     setSubmitLoading(true)
     if(taiKhoanNguoiNhap == '' || taiKhoanNguoiNhap == null){
       setSubmitLoading(false)
      //  Alert.alert('Hãy nhập tài khoản của bạn')
      setTextError('Không được để trống')
     }else{
        setTextError(null);
             const formData = new FormData();
             formData.append("username",taiKhoanNguoiNhap);
             ApiUser.sendMaOTP(formData)
                 .then(res => {
                     console.log(res.data);
                     let result = res.data;
                     setSubmitLoading(false)
                     if(result == 'successfull'){
                      navigation.navigate('ForgotPass_Step2',{username : taiKhoanNguoiNhap });
                     }else if(result == 'cantSend') {
                      //  Alert.alert('Lỗi không gửi được tin nhắn')
                       setTextError('Lỗi không gửi được tin nhắn')
                     }else if(result == 'NoHaveAccount') {
                      //  Alert.alert('Tài khoản này không có trong hệ thống')
                       setTextError('Tài khoản này không có trong hệ thống')
                    }
                 })
                 .catch(err => {
                     console.log(err);
                     setSubmitLoading(false)
                     Alert.alert('Lỗi error')
                 });
      }

 }

  return (
    <View style={{backgroundColor:'#fff',flex:1}}>
       <TouchableOpacity style={{paddingVertical:5}} onPress={()=>    navigation.navigate('Login')}>
           <AntDesign name="left" size={30} color="#b8b6b6"  />
        </TouchableOpacity>
        <View style={{alignSelf:'center',marginTop:'10%'}}>
              <Image style={{width: 130 , height:120  }}  source={require('../../android/app/src/forgot_past1.png')}/>
              <Text style={{fontSize:21}}>Quên mật khẩu</Text>
        </View>
        <Text style={{fontSize:15,width:270,alignSelf:'center',marginTop:'2%',textAlign:'center'}}>Nhập tài khoản của bạn dưới hệ thống sẽ gửi mã đến số điện thoại của bạn</Text>

        <View style={viewMaXacNhan ? {display:'none'} : styles.viewNhapTaiKhoan}>
                <Input
                  label="Tài khoản"
                  onChangeText={text  => {settaiKhoanNguoiNhap(text)}}
                  leftIcon={
                    <Icon
                      name='user'
                      size={24}
                      color='black'
                    />
                  }
                />
                
                <TouchableOpacity  style={{border:1,width:150,height:50,alignSelf:'center',justifyContent:'center',marginTop:10,backgroundColor:'#6a9dfb',borderRadius:100}}
                 onPress={()=>submitFrom ()}>
                      <AntDesign name="arrowright" size={35} color="white" style={{textAlign:'center'}} />
                </TouchableOpacity>
                <Text style={{color:'red',alignSelf:'center',paddingTop:'10%'}}>{textError}</Text>
     




        </View>
       
        <Modal_SubmitLoading submitLoading={submitLoading} />

{/* 
          <View style={clickLayTaiKhoan ? {alignItems:'center',justifyContent:'center',flex:1,display:'flex'} : {display:'none'}}>
            <Text>Lấy lại mật khẩu bằng</Text>
              <View style={{flexDirection:'row'}}>
                <TouchableOpacity>
                    <View style={{border:1,borderRadius:10,width:100,height:30,backgroundColor:'green',alignItems:'center',justifyContent:'center',marginHorizontal:10}}>
                        <Text >Email</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <View style={{border:1,borderRadius:10,width:100,height:30,backgroundColor:'green',alignItems:'center',justifyContent:'center'}}>
                        <Text >Số điện thoại</Text>
                    </View>
                  </TouchableOpacity>
              </View>
              <Button title="Back" onPress={()=> setclickLayTaiKhoan(false)}/>

              </View> */}


    </View>
  );
};

const styles = StyleSheet.create({
    viewNhapTaiKhoan:{
        display:'flex',
        marginTop:'10%',
    }
  });
export default ForgotPass_Step1;
