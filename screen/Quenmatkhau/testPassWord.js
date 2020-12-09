
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


const testPassWord =  ({navigation,route}) => {

  const [submitLoading, setSubmitLoading] = useState(false);
  const [textError, setTextError] = useState(null);

  const [timerun, setTimeRun] = useState(null);
  const input_1 = useRef(null);
  const input_2 = useRef(null);
  const input_3 = useRef(null);
  const input_4 = useRef(null);
  const input_5 = useRef(null);

  const [valueInput, setValueInput] = useState({
    number1:0,
    number2:0,
    number3:0,
    number4:0,
    number5:0,
  });


//   function changeFocusInput(number,text){
//     text.length == 1 ? input_{number}.current.focus() : 0
//   }

function showValue(){
    console.log(valueInput);
}
  return (
    <View style={{backgroundColor:'#fff',flex:1}}>

        <View style={styles.viewNhapTaiKhoan}>
                  <Text style={{alignSelf:'center',textAlign:'center',fontSize:17}}>Nhập mã xác nhận</Text>

                  <View style={{flexDirection:'row'}}>
                    <View style={{width:'20%'}}>
                       <Input
                          maxLength={1}
                          ref={input_1}
                          onChangeText={text  => {setValueInput({...valueInput,number1:text}) ;
                          text.length == 1 ? input_2.current.focus() : null}}
                        />
                    </View>
                    <View style={{width:'20%'}}>
                       <Input 
                          maxLength={1}
                          ref={input_2}
                          onChangeText={text  => {setValueInput({...valueInput,number2:text}) ; 
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

               
                    <TouchableOpacity  style={{border:1,width:150,height:50,alignSelf:'center',justifyContent:'center',marginTop:10,backgroundColor:'#6a9dfb',borderRadius:100}}
                     onPress={()=>showValue()}>
                       <AntDesign name="arrowright" size={35} color="white" style={{textAlign:'center'}} />
                  </TouchableOpacity>

       
        </View>

    </View>
  );
};

const styles = StyleSheet.create({
    viewNhapTaiKhoan:{
        display:'flex',
        marginTop:'10%',
      

    }
  });
export default testPassWord;
