
import React ,{ useState, useEffect }from 'react';
import axios from 'axios';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Alert,Modal,LogBox} from 'react-native'
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
import { useSelector,useDispatch } from 'react-redux'

import color_app from '../color_app'

LogBox.ignoreAllLogs();

const ThemDonHo =  ({ navigation , route}) => {

  const data_redux = useSelector(state => state)
  const du_lieu_hs = data_redux.hocsinh.data;
  const data_token = data_redux.token;
  const lop_hs = data_redux.hocsinh.data.get_lop;

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
         title: 'Ảnh', 
        cameraType: 'front',
        mediaType: 'photo',
        takePhotoButtonTitle: "Chụp ảnh",
        chooseFromLibraryButtonTitle: "Chọn ảnh thư viện",
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



    function Checkvalidation(dateFrom,dateTo,valueInput,avatar){
        // var check_regex_specfi = new RegExp(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/);
        // var patter_regex_null = new RegExp("/^[^\s].*/");
        
         if(dateFrom > dateTo){
           return 'Ngày bắt đầu không lớn hơn ngày kết thúc';
         }else if(valueInput.name == '' || valueInput.cmnd == '' || valueInput.phone == ''){
           return 'Hãy nhập đầy đủ !';
         }else if(valueInput.name == ' ' || valueInput.cmnd == ' ' || valueInput.phone == ' '){
          return 'Hãy nhập đầy đủ !';
         }else if(valueInput.name == '  ' || valueInput.cmnd == '  ' || valueInput.phone == '  '){
          return 'Hãy nhập đầy đủ !';
         }else if(avatar.uri == undefined){
           return 'Hãy nhập ảnh!';
         }else{
           return true
         }
     }

   function submitFrom (){
         if(lop_hs !== null){
            setSubmitLoading(true)
              let checkEd = Checkvalidation(dateFrom,dateTo,valueInput,avatarSource);
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
                      ApiDonHo.insertDonHo(data_token.token,du_lieu_hs.id,formData)
                      .then(res => {
                          console.log(res.data);
                          setSubmitLoading(false)
                          Alert.alert('Đã gửi đơn đón hộ thành công ')
                          navigation.navigate('Home');
                      })
                      .catch(err => {
                          console.log(err);
                          setSubmitLoading(false)
                          Alert.alert('Lỗi không gửi được')

                      });
             }
        }else{
          Alert.alert('Không thể thực hiện thao tác','Do học sinh hiện chưa có lớp lên không thể thực hiện thao tác này!')
        }
    }



  return (
    <ScrollView style={styles.container}>
      <View style={{flexDirection:'row', paddingHorizontal:10}}>
                    <View style={{width:'65%'}}>
                    <Text style={{fontWeight:'bold',fontSize:15,color:'#505354'}}>Bắt đầu ngày :</Text>
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
                                        onChange={onChangeDateFrom}
                                        />
                                   )}
                                   <Entypo  style={{marginLeft:36,marginTop:-10}} name="arrow-bold-right" size={35} color={color_app}  />

                            </View>

                            
                    </View>
                    <View style={{width:'35%'}}>
                    <Text Text style={{fontWeight:'bold',fontSize:15,color:'#505354'}}  >Đến ngày :</Text>
                             <View style={{flexDirection:'row'}}>
                             <Text style={{fontSize:15,marginRight:10}}>{dateTo.getDate()}/{dateTo.getMonth() + 1}/{dateTo.getFullYear()}</Text>
                                   <AntDesign name="calendar" size={30} color={color_app}onPress={showDatepickerTo} />

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
                      style={{width:'100%',height:50,fontSize:15}}      
                      placeholder="Tên người đón hộ"
                      leftIcon={{ type: 'font-awesome', name: 'user',color:'#505354' }}
                      />
                      
                      
                      <Input 
                      onChangeText={text  => {setValueInput({...valueInput,cmnd:text})}}
                      style={{width:'100%',height:50,fontSize:15}}  
                      placeholder="Số CMND"    
                      leftIcon={{ type: 'font-awesome', name: 'address-card-o' ,color:'#505354'}}

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
                      style={{width:'100%',height:50,fontSize:15}}  
                      placeholder="Số điện thoại "
                      leftIcon={{ type: 'font-awesome', name: 'tablet' ,color:'#505354' }}
                      />


                    <Input 
                      onChangeText={text  => {setValueInput({...valueInput,ghi_chu:text})}}
                      style={{width:'100%',height:50,fontSize:15}}      
                      placeholder="Ghi chú"
                      multiline={true}
                      numberOfLines={3}
                      textAlignVertical = "top"
                      blurOnSubmit={true}
                      />


                      {/* <View style={{width:150,alignSelf:'flex-end',paddingBottom:15,}}>
                       <Button title='Thêm' color="green" onPress={submitFrom } />
                      </View> */}
                      <TouchableOpacity onPress={()=>{submitFrom()}} style={{backgroundColor:'#fab20a',borderRadius:50,marginTop:20,marginBottom:50}}>
                        <View style={{paddingHorizontal:10,paddingVertical:15,alignItems:'center'}}> 
                          <Text style={{color:'#ffff',fontSize:17}}>Tạo đơn</Text>
                        </View>
                     </TouchableOpacity>


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
