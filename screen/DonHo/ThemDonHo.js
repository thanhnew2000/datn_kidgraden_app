
import React ,{ useState, useEffect }from 'react';
import axios from 'axios';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Alert,Modal} from 'react-native'
import IconNews from '../../android/app/src/asset/img/icon-news.png';
import IconKidsExercise from '../../android/app/src/asset/img/icon-kids-exercise.jpg';
import IconKidsStudy from '../../android/app/src/asset/img/icon-kids-study.jpg';
import IconKidsOutSide from '../../android/app/src/asset/img/icon-kids-outside.jpg';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Input,Button } from 'react-native-elements';
// import ImagePicker from 'react-native-image-crop-picker';
import ImagePicker from 'react-native-image-picker';
import ImageAavatar from '../../android/app/src/asset/img/avatar.jpg';
import Entypo from 'react-native-vector-icons/Entypo';
import ApiDonHo from '../../android/app/src/api/DonHoApi';
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal_SubmitLoading from '../component/reuse/Modal_SubmitLoading';

const ThemDonHo =  ({ navigation , route}) => {
  const { reloadAgain } = route.params;
  const [userToken, setUserToken] = useState(null);
  const [data_HS, setDataHS] = useState('date');


  useEffect(() => {
    async function fetchData() {
      try{
        var v = await AsyncStorage.getItem('data_storge');
        var hs = await AsyncStorage.getItem('data_hs');
        let data = JSON.parse(v);
        let data_hs = JSON.parse(hs);
        if(v !== null){
          setUserToken(data.token);
          setDataHS(data_hs);
        }
        console.log(v)
      }catch (e){
        console.log(e);
      }
  }
  fetchData();
  },[]);


  const [submitLoading, setSubmitLoading] = useState(false);

     const [valueInput , setValueInput] =  useState({
       name:'',
       cmnd:'',
       image:'',
       phone:'',
       ghi_chu:''
     })

    const [avatarSource , setAvatarSource] =  useState(ImageAavatar)
    const options = {
      title: 'Select Avatar', 
      cameraType: 'front',
      mediaType: 'photo' ,
      storageOptions: {
      skipBackup: true,
      path: 'images',
      },
      };

      
      function chosePickImage(){
          ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = { uri: response.uri };
              setAvatarSource(source);
            }
          });
      }



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



    function Checkvalidation(dateFrom,dateTo,valueInput){
          if(dateFrom > dateTo){
           return 'Ngày bắt đầu không lớn hơn ngày kết thúc';
         }else if(valueInput.name == null || valueInput.cmnd == null || valueInput.phone == null){
           return 'Hãy nhập đầy đủ !';
         }else{
           return true
         }
     }

        function submitFrom (){
         setSubmitLoading(true)
          let checkEd = Checkvalidation(dateFrom,dateTo,valueInput);
          if(checkEd !== true){
            setSubmitLoading(false)
            Alert.alert(checkEd)
          }else{
                  const formData = new FormData();
                    formData.append("ngay_bat_dau",dateFrom.getDate()+ '-' + parseInt(dateFrom.getMonth() + 1) +'-'+ dateFrom.getFullYear());
                    formData.append("ngay_ket_thuc",dateTo.getDate()+ '-' + parseInt(dateTo.getMonth() + 1) +'-'+ dateTo.getFullYear());
                    formData.append("anh_nguoi_don_ho", {type: 'image/jpg', uri:avatarSource.uri, name:'uploaded.jpg'});
                    formData.append("cmtnd",valueInput.cmnd);
                    formData.append("phone_number",valueInput.phone);
                    formData.append("ten_nguoi_don_ho",valueInput.name);
                    formData.append("ghi_chu",valueInput.ghi_chu);
                      ApiDonHo.insertDonHo(userToken,data_HS.id,formData)
                      .then(res => {
                          console.log(res.data);
                          setSubmitLoading(false)
                          reloadAgain();
                          navigation.navigate('Đón hộ');
                      })
                      .catch(err => {
                          console.log(err);
                      });
           }

      }



  return (
    <ScrollView style={styles.container}>
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
                                        onChange={onChangeDateFrom}
                                        />
                                   )}
                                   <Entypo  style={{marginLeft:36,marginTop:-10}} name="arrow-bold-right" size={35} color="green"  />

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
                                        minimumDate={dateFrom}
                                        value={dateTo}
                                        mode={modeDateTo}
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChangeDateTo}
                                        />
                                    )}
                            </View>
                    </View>

                   
              </View>

            <View style={{paddingTop:25}}>
                    <Input 
                      onChangeText={text  => {setValueInput({...valueInput,name:text})}}
                      style={{width:'100%',height:50}}      
                      label="Tên người đón hộ"
                      leftIcon={{ type: 'font-awesome', name: 'user' }}
                      />
                      
                      
                      <Input 
                      onChangeText={text  => {setValueInput({...valueInput,cmnd:text})}}
                      style={{width:'100%',height:50}}      
                      label="Số CMND:"
                      leftIcon={{ type: 'font-awesome', name: 'address-card-o' }}

                      />

                      <View style={{flexDirection:'row'}}>
                            <View style={{width:'45%',justifyContent:'center'}}>
                                <Button title="Chọn ảnh"   type="outline"  onPress={chosePickImage}/> 
                            </View>

                            <View style={{width:'55%',alignItems:'center'}}>
                                <Image source={avatarSource} style={{width:130,height:100}} />
                            </View>
                      </View>

                      <Input 
                      onChangeText={text  => {setValueInput({...valueInput,phone:text})}}
                      style={{width:'100%',height:50}}      
                      label="Số điện thoại :"
                      leftIcon={{ type: 'font-awesome', name: 'tablet' }}
                      />


                    <Input 
                      onChangeText={text  => {setValueInput({...valueInput,ghi_chu:text})}}
                      style={{width:'100%',height:50}}      
                      label="Note :"
                      multiline={true}
                      numberOfLines={3}
                      textAlignVertical = "top"
                      />


                      <View style={{width:150,alignSelf:'flex-end',paddingBottom:15,}}>
                       <Button title='Thêm' color="green" onPress={submitFrom } />
                      </View>



              <Modal_SubmitLoading submitLoading={submitLoading} />


                      
            </View>
     </ScrollView>
  );
};

const styles = StyleSheet.create({
    container:{
      flex:1,
      padding:10,
      backgroundColor:"#fff",
      flexDirection:'column',
    },



    oBox:{
      flexDirection:'column',
      marginVertical:10,
      padding:10,
      borderRadius:4,
      backgroundColor:'#fff',
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 7,
      },
      shadowOpacity: 1.70,
      shadowRadius: 6.27,
      
      elevation: 15,
    },
    chia2thanh:{
      flexDirection:'row',
      paddingVertical:5
    },
    oDuoi:{
      flexDirection:'row',
      borderTopWidth:1,
      paddingVertical:2 
    },
   
});

export default ThemDonHo;
