
import React ,{ useState, useEffect }from 'react';
import axios from 'axios';
import { View, Text, Image,TextInput, TouchableOpacity, FlatList,StyleSheet, Button,Modal,Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import ipApi from '../../android/app/src/api/ipApi';
import ApiXinNghi from '../../android/app/src/api/XinNghiHocApi';
import AsyncStorage from '@react-native-community/async-storage';
import Modal_SubmitLoading from '../component/reuse/Modal_SubmitLoading';
import { useSelector,useDispatch } from 'react-redux'


import  color_app  from '../color_app';


const ThemDonNghi =  ({ navigation , route}) => {
  
  const data_redux = useSelector(state => state)
  const du_lieu_hs = data_redux.hocsinh.data;
  const data_token = data_redux.token;
  const lop_hs = data_redux.hocsinh.data.get_lop;

    const [submitLoading, setSubmitLoading] = useState(false);
    const [lyDoXinNghi, setLyDoXinNghi] = useState(null);

    const [dateFrom, setDateFrom] = useState(new Date());
    const [modeDateFrom, setModeDateFrom] = useState('date');
    const [showDateFrom, setShowDateFrom] = useState(false);

    const [dateTo, setDateTo] = useState(new Date());
    const [modeDateTo, setModeDateTo] = useState('date');
    const [showDateTo, setShowDateTo] = useState(false);

    const onChangeDateFrom = (event, selectedDate) => {
        const currentDate = selectedDate || dateFrom;
        setShowDateFrom(Platform.OS === 'ios');
        setDateFrom(currentDate);
     };

     const onChangeDateTo = (event, selectedDate) => {
        const currentDate = selectedDate || dateTo;
        setShowDateTo(Platform.OS === 'ios');
        setDateTo(currentDate);
     };

      const showModeFrom = (currentMode) => {
        setShowDateFrom(true);
        setModeDateFrom(currentMode);
      };
    
      const showModeTo = (currentMode) => {
        setShowDateTo(true);
        setModeDateTo(currentMode);
      };

      const showDatepickerFrom = () => {
        showModeFrom('date');
      };
    
      const showDatepickerTo = () => {
        showModeTo('date');
      };


      function Checkvalidation(dateFrom,dateTo,lyDoXinNghi){
           if(dateFrom > dateTo){
            return 'Ngày bắt đầu không lớn hơn ngày kết thúc';
          }else if(lyDoXinNghi == null){
            return 'Hãy viết lý do xin nghỉ';
          }else{
            return true
          }
      }


      function submitFrom (){
        if(lop_hs !== null){
          setSubmitLoading(true)
          let checkValidate = Checkvalidation(dateFrom,dateTo,lyDoXinNghi);

           if(checkValidate !== true){
              setSubmitLoading(false)
              Alert.alert(checkValidate)
            }else{
                  const formData = new FormData();
                    formData.append("ngay_bat_dau",dateFrom.getDate()+ '-' + parseInt(dateFrom.getMonth() + 1) +'-'+ dateFrom.getFullYear());
                    formData.append("ngay_ket_thuc",dateTo.getDate()+ '-' + parseInt(dateTo.getMonth() + 1) +'-'+ dateTo.getFullYear());
                    formData.append("noi_dung",lyDoXinNghi);
                    formData.append("lop_id",du_lieu_hs.lop_id);

                    ApiXinNghi.insertXinNghiHoc(data_token.token,du_lieu_hs.id,formData)
                    .then(res => {
                        console.log(res.data);
                        setLyDoXinNghi(null)
                        setSubmitLoading(false);
                        // reloadAgain();
                        Alert.alert('Đã gửi đơn lên giáo viên');
                    })
                    .catch(err => {
                        console.log(err);
                    });

                  }

        }else{
          Alert.alert('Không thể thực hiện thao tác','Do học sinh hiện chưa có lớp lên không thể thực hiện thao tác này!')
        }


      }
  return (
            <View style={styles.containers}>

                     {/* <View  style={{width:'40%',marginVertical:5,backgroundColor:'green',alignSelf:'flex-end'}}>
                       <Button title="Xem các đơn" onPress={()=>{
                                navigation.navigate('Xin nghỉ',{ token : data_token.token , du_lieu_hs : du_lieu_hs});
                            }} />
                    </View>  */}

              <View style={{flexDirection:'row'}}>
                    <View style={{width:'65%'}}>
                    <Text style={{fontWeight:'bold',fontSize:15}}>Bắt đầu ngày :</Text>
                             <View style={{flexDirection:'row'}}>
                                   <Text style={{fontSize:15,marginRight:10}}>{dateFrom.getDate()}/{dateFrom.getMonth() + 1}/{dateFrom.getFullYear()}</Text>
                                   <AntDesign name="calendar" size={30} color={color_app} onPress={showDatepickerFrom} />

                                   {showDateFrom && (
                                        <DateTimePicker
                                        testID="dateTimePicker"
                                        minimumDate={dateFrom}
                                        value={dateFrom}
                                        mode={modeDateFrom}
                                        is24Hour={true}
                                        display="default"
                                        dateFormat="dayofweek day month"
                                        onChange={onChangeDateFrom}
                                        />
                                   )}
                                   <Entypo  style={{marginLeft:50,marginTop:-10}} name="arrow-bold-right" size={35} color={color_app}  />

                            </View> 

                            
                    </View>
                    <View style={{width:'35%'}}>
                    <Text Text style={{fontWeight:'bold',fontSize:15}}  >Đến ngày :</Text>
                             <View style={{flexDirection:'row'}}>
                             <Text style={{fontSize:15,marginRight:10}}>{dateTo.getDate()}/{dateTo.getMonth() + 1}/{dateTo.getFullYear()}</Text>
                                   <AntDesign name="calendar" size={30} color={color_app} onPress={showDatepickerTo} />

                                   {showDateTo && (
                                        <DateTimePicker
                                        testID="dateTimePicker"
                                        value={dateTo}
                                        minimumDate={dateFrom} 
                                        mode={modeDateTo}
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChangeDateTo}
                                        />
                                    )}
                            </View>
                    </View>

                   
              </View>
        
              <View style={{flexDirection:'row',marginTop:30}}>
                       <TextInput 
                            onChangeText={text  => {setLyDoXinNghi(text)}}
                            placeholder="Lời nhắn tới giáo viên"
                            multiline={true}
                            numberOfLines={7}
                            textAlignVertical = "top"
                            style={{ width:'100%', borderColor: 'gray', backgroundColor:'white',borderRadius:10,
                                    paddingHorizontal:10,paddingVertical:10,borderWidth:1
                            }}
                        />

                      
              </View>
              <View style={{flexDirection:'row'}}>
                  <View style={{width:'70%'}}>
                  </View>
                  <View style={{width:'30%',flexDirection:'row',marginTop:17}}>
                      <View style={{marginLeft:10}}>
                        <Button title="Gửi đơn" onPress={submitFrom}/>
                      </View>
                      
                  </View>


              </View>




              <Modal_SubmitLoading submitLoading={submitLoading} />

            </View>
  );
};



                           {/* <View>
                                <Button onPress={showDatepickerFrom} title="Show date picker!" />
                            </View>
                            <View>
                                <Button onPress={showDatepickerTo} title="Show date picker 2!" />
                            </View> */}

                            {/* {showDateFrom && (
                                <DateTimePicker
                                testID="dateTimePicker"
                                value={dateFrom}
                                mode={modeDateFrom}
                                is24Hour={true}
                                display="default"
                                onChange={onChangeDateFrom}
                                />
                            )}

                            {showDateTo && (
                                <DateTimePicker
                                testID="dateTimePicker"
                                value={dateTo}
                                mode={modeDateTo}
                                is24Hour={true}
                                display="default"
                                onChange={onChangeDateTo}
                                />
                            )} */}



const styles = StyleSheet.create({
    containers:{ 
        flex:1 , 
        flexDirection: 'column',
        paddingVertical:20,
        paddingHorizontal:10,
        backgroundColor:'#fff',
        padding:10
    },
  
  });

export default ThemDonNghi;
