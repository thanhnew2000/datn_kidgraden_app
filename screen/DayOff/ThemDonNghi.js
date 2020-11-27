
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

const ThemDonNghi =  ({ navigation , route}) => {
  // const { reloadAgain } = route.params;
  // const { userToken } = route.params;
  // const { data_HS } = route.params;
  
  
  const data_redux = useSelector(state => state)
  const du_lieu_hs = data_redux.hocsinh.data;
  const data_token = data_redux.token;

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

                    ApiXinNghi.insertXinNghiHoc(data_token.token,du_lieu_hs.id,formData)
                    .then(res => {
                        console.log(res.data);
                        setSubmitLoading(false);
                        // reloadAgain();
                        navigation.navigate('Xin nghỉ',{ token : data_token.token , du_lieu_hs : du_lieu_hs});
                    })
                    .catch(err => {
                        console.log(err);
                    });

                  }

      }
  return (
            <View style={styles.containers}>

                     <View  style={{width:'40%',marginVertical:5,backgroundColor:'green',alignSelf:'flex-end'}}>
                       <Button title="Xem các đơn" onPress={()=>{
                                navigation.navigate('Xin nghỉ',{ token : data_token.token , du_lieu_hs : du_lieu_hs});
                            }} />
                    </View> 

              <View style={{flexDirection:'row'}}>
                    <View style={{width:'65%'}}>
                    <Text style={{fontWeight:'bold',fontSize:15}}>Bắt đầu ngày :</Text>
                             <View style={{flexDirection:'row'}}>
                                   <Text style={{fontSize:15,marginRight:10}}>{dateFrom.getDate()}/{dateFrom.getMonth() + 1}/{dateFrom.getFullYear()}</Text>
                                   <AntDesign name="calendar" size={30} color="green" onPress={showDatepickerFrom} />

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
                                   <Entypo  style={{marginLeft:50,marginTop:-10}} name="arrow-bold-right" size={35} color="green"  />

                            </View> 

                            
                    </View>
                    <View style={{width:'35%'}}>
                    <Text Text style={{fontWeight:'bold',fontSize:15}}  >Đến ngày :</Text>
                             <View style={{flexDirection:'row'}}>
                             <Text style={{fontSize:15,marginRight:10}}>{dateTo.getDate()}/{dateTo.getMonth() + 1}/{dateTo.getFullYear()}</Text>
                                   <AntDesign name="calendar" size={30} color="green" onPress={showDatepickerTo} />

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
              <View style={{flexDirection:'row'}}>
                         <Text style={{fontSize:15,marginRight:10,fontWeight:'bold'}}>Lý do viêt đơn nghỉ :</Text> 
              </View>
              <View style={{flexDirection:'row'}}>

                       <TextInput 
                            onChangeText={text  => {setLyDoXinNghi(text)}}
                            placeholder="Lời nhắn tới giáo viên"
                            multiline={true}
                            numberOfLines={7}
                            textAlignVertical = "top"
                            style={{ width:'100%', borderColor: 'gray', backgroundColor:'white',
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 7,
                            },
                            shadowOpacity: 1.70,
                            shadowRadius: 6.27,
                            
                            elevation: 19,}}
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
        paddingLeft:5,
        paddingRight:5,
        backgroundColor:'#fff',
        padding:10
    },
  
  });

export default ThemDonNghi;
