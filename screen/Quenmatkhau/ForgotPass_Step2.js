
import React ,{ useState,useEffect, useRef }from 'react';
import {
    StyleSheet,
    View,
    FlatList,Text,Image, TouchableOpacity,Alert
  } from 'react-native';


import Icon from 'react-native-vector-icons/FontAwesome';
import { Input ,Button} from 'react-native-elements';
import  AntDesign from 'react-native-vector-icons/AntDesign';
import ApiUser from '../../android/app/src/api/users';


import Modal_SubmitLoading from '../component/reuse/Modal_SubmitLoading';


const ForgotPass_Step2 =  ({navigation,route}) => {
  const { username } = route.params;

  const [submitLoading, setSubmitLoading] = useState(false);
  const [textError, setTextError] = useState(null);

  const [timerun, setTimeRun] = useState(null);


  const [valueInput, setValueInput] = useState({
    number1:0,
    number2:0,
    number3:0,
    number4:0,
    number5:0,
  });


  const input_1 = useRef(null);
  const input_2 = useRef(null);
  const input_3 = useRef(null);
  const input_4 = useRef(null);
  const input_5 = useRef(null);


  
  function checkTrongInput(){
    let result = true ;
      if(valueInput.number1 == null || valueInput.number1.length == 0 || valueInput.number1 == ' '){
        result = false;
      }else if(valueInput.number2 == null || valueInput.number2.length == 0 || valueInput.number2 == ' '){
        result = false;
      }else if(valueInput.number3 == null || valueInput.number4.length == 0 || valueInput.number3 == ' '){
        result = false;
      }else if(valueInput.number4 == null || valueInput.number4.length == 0 || valueInput.number4 == ' '){
        result = false;
      }else if(valueInput.number5 == null || valueInput.number5.length == 0 || valueInput.number5 == ' '){
        result = false;
      }
    return result;
  }




  function countTime(){
    if(timerun !== null){
    clearTimeout(timerun);
     } 
    var s = 300;
    setTimeRun( setInterval(function(){ 
            s--;
            if(s == 0 ){
                closeMaOTP();	
                clearTimeout(timerun);
            }
       }, 1000)
     );

     timerun;
  }


  useEffect(() => {
    countTime();
  }, []);



  function closeMaOTP(){
    const formData = new FormData();
    formData.append("username",username);
    ApiUser.removeOTP(formData)
      .then(res => {
          let result = res.data;
          console.log('result_close_ok', result);
          Alert.alert('Mã xác nhận của bạn đã hết thời gian reset mã lại')
      })
      .catch(err => {
          console.log('err_close_ma',err);
      });
  }

  function resetMaOTP(){
    setSubmitLoading(true);
    const formData = new FormData();
    formData.append("username",username);
    ApiUser.sendMaOTP(formData)
        .then(res => {
            console.log(res.data);
            let result = res.data;
            setSubmitLoading(false)
            if(result == 'successfull'){
              console.log('đã reset');
              countTime();
            }else if(result == 'cantSend') {
              setTextError('Lỗi không gửi được tin nhắn');
            }else if(result == 'NoHaveAccount') {
              setTextError('Tài khoản này không còn trong hệ thống');
           }
        })
        .catch(err => {
            console.log(err);
            setSubmitLoading(false)
            Alert.alert('Lỗi error reset ma')
        });
  }



  function guiRequestCheckOTP(formData){
    ApiUser.checkOTP(formData)
      .then(res => {
          let result = res.data;
          setSubmitLoading(false)
          if(result == 'NoCorrect'){
            // Alert.Alert('Mã xác nhận không đúng');
          setTextError('Mã xác nhận không đúng');
          }else{
            navigation.navigate('ForgotPass_Step3',{username : username , token : result.token });
          }
      })
      .catch(err => {
          console.log(err);
          setSubmitLoading(false)
          Alert.Alert('Lỗi serve');
      });
  }


  function submitFrom (){
    setSubmitLoading(true)
    if(checkTrongInput() == false){
      setSubmitLoading(false)
      // Alert.alert('Bạn chưa nhập đúng mã')
      setTextError('Bạn chưa nhập đủ mã')
    }else{
            setTextError(null)
            const ma_otp = valueInput.number1 + valueInput.number2 + valueInput.number3 + valueInput.number4 + valueInput.number5;
            console.log(ma_otp);
            const formData = new FormData();
            formData.append("ma_otp",ma_otp);
            formData.append("username",username);
            guiRequestCheckOTP(formData);
     }

}

  return (
    <View style={{backgroundColor:'#fff',flex:1}}>
        <View style={{alignSelf:'center',marginTop:'10%'}}>
              <Image style={{width: 120 , height:100  }}  source={require('../../android/app/src/forgot_pass2.jpg')}/>
        </View>
        <Text style={{fontSize:21,textAlign:'center'}}>Xác nhận mã</Text>
        <Text style={{fontSize:16,width:270,alignSelf:'center',marginTop:'2%',textAlign:'center'}}>Nhập mã nhận từ tin nhắn </Text>
        <Text style={{fontSize:15,width:270,alignSelf:'center',marginTop:'2%',textAlign:'center'}}>   ( mã có hiệu lực trong 5 phút ) </Text>


        <View style={styles.viewNhapTaiKhoan}>
                  <Text style={{alignSelf:'center',textAlign:'center',fontSize:17}}>Nhập mã xác nhận</Text>

                  <View style={{flexDirection:'row'}}>
                    <View style={{width:'20%'}}>
                       <Input
                          maxLength={1}
                          ref={input_1}
                          onChangeText={text  => {setValueInput({...valueInput,number1:text});
                          text.length == 1 ? input_2.current.focus() : null}}
                        />
                    </View>
                    <View style={{width:'20%'}}>
                       <Input 
                          maxLength={1}
                          ref={input_2}
                          onChangeText={text  => {setValueInput({...valueInput,number2:text}); 
                          text.length == 1 ? input_3.current.focus() : null}}
                         />
                    </View>
                    <View style={{width:'20%'}}>
                       <Input
                          maxLength={1}
                          ref={input_3}
                          onChangeText={text  => {setValueInput({...valueInput,number3:text}); 
                          text.length == 1 ? input_4.current.focus() : null}}
                        />

                    </View>
                    <View style={{width:'20%'}}>
                       <Input
                          maxLength={1}
                          ref={input_4}
                          onChangeText={text  =>{setValueInput({...valueInput,number4:text});  
                          text.length == 1 ? input_5.current.focus() : null}}
                        />

                    </View>
                    <View style={{width:'20%'}}>
                       <Input
                          maxLength={1}
                          ref={input_5}
                          onChangeText={text  => {setValueInput({...valueInput,number5:text})}}
                        />
                    </View>
                  </View>

                  <View style={{flexDirection:'row',alignSelf:'flex-end',paddingRight:10}}>
                      <Text style={{paddingVertical:20,justifyContent:'center',color:'#787878'}}> Lấy mã mới </Text>
                      <TouchableOpacity onPress={()=> { resetMaOTP()}}>
                         <AntDesign name="reload1" size={35} color="#A9A9A9" style={{textAlign:'center',paddingTop:10}} />
                      </TouchableOpacity>

                   </View>
                    <TouchableOpacity  style={{border:1,width:150,height:50,alignSelf:'center',justifyContent:'center',marginTop:10,backgroundColor:'#6a9dfb',borderRadius:100}}
                     onPress={()=> submitFrom()}>
                       <AntDesign name="arrowright" size={35} color="white" style={{textAlign:'center'}} />
                  </TouchableOpacity>

            <View>
              <Text style={{textAlign:'center',color:'red',paddingVertical:20}}>{textError}</Text>
            </View>
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
export default ForgotPass_Step2;
