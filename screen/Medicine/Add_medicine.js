
import React ,{ useState,useEffect }from 'react';
import { View, Text, Image,
    TouchableOpacity, ScrollView,StyleSheet,TextInput,  Modal,FlatList, Alert,Animated
 } from 'react-native'
 import HTMLView from 'react-native-htmlview';
 import DateTimePicker from '@react-native-community/datetimepicker';
 import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import IconKidsStudy from '../../android/app/src/asset/img/icon-kids-study.jpg';
import ImagePicker from 'react-native-image-picker';
import ipApi from '../../android/app/src/api/ipApi';
import ApiDonThuoc from '../../android/app/src/api/DonThuocApi';
import AsyncStorage from '@react-native-community/async-storage';
import { Input ,Button } from 'react-native-elements';
import axios from "axios";
import Modal_SubmitLoading from '../component/reuse/Modal_SubmitLoading';
import { useSelector,useDispatch } from 'react-redux'
import HeaderNotifiWhenClick from '../HeaderNotifiWhenClick';

import color_app from '../color_app'

const Add_medicine =  ({ navigation , route }) => {
  // const { reloadAgain } = route.params;
    // const { route_notifi } = route.params;
    //   useEffect(() => {
    //     if(route_notifi == 'add_medicine'){
    //       navigation.setOptions({
    //         headerTitle: () => <HeaderNotifiWhenClick navigation={navigation}/>,
    //       })
    //     }
    //  }, []);



  const data_redux = useSelector(state => state)
  const du_lieu_hs = data_redux.hocsinh.data;
  const data_token = data_redux.token;
  const lop_hs = data_redux.hocsinh.data.get_lop;

    //  console.log('du_lieu_hs.id_lop',du_lieu_hs.lop_id)
   const [submitLoading, setSubmitLoading] = useState(false);


    const [viewModel, setViewModel] = useState(false);

    const [loiNhan, setLoiNhan] = useState(null)

    const [oneMedicineAdd, setOneMedicineAdd] = useState({
          name: '',
          lieu: '',
          donvi:'',
          note: '',
          image:''
   });

  //  const [listAddMedicine, setListAddMedicine] = useState([]);



   const [scaleModelAddAnim, setscaleModelAddAnim] = useState(new Animated.Value(0));

    const [listAddMedicine, setListAddMedicine] = useState([
        {
            name:'Sino',
            lieu:'300',
            donvi:'ml',
            note:'Uống sau bữa ăn',
            image:''
        },
        {
          name:'Sino',
          lieu:'300',
          donvi:'ml',
          note:'Uống sau bữa ăn',
          image:''
      },
      {
        name:'Sino',
        lieu:'300',
        donvi:'ml',
        note:'Uống sau bữa ăn',
        image:''
    },
    {
      name:'Sino',
      lieu:'300',
      donvi:'ml',
      note:'Uống sau bữa ăn',
      image:''
  },
      
    ]);


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


      function modelShow(value){
        setViewModel(value)
      }

      
      function modelShowAnimated(){
        setViewModel(true);
        Animated.spring(
          scaleModelAddAnim,
          {
              toValue:1,
              bounciness:15,
              speed:5,
              useNativeDriver:true
          }
        ).start();
      }

      function removeMedicineAdd(indexR){
          var newData = listAddMedicine.filter((data,index) => index !== indexR);
          setListAddMedicine(newData);
        console.log(indexR)
      }


    //   NÚT THÊM THUỐC VÀO ĐƠN
      function addMedicinetoList(){
        var patter_regex = new RegExp("\[[^\s]*\s");

        if(patter_regex.test(oneMedicineAdd.name) == false){
          Alert.alert('Hãy nhập tên thuốc')
        }else if(patter_regex.test(oneMedicineAdd.lieu) == false){
          Alert.alert('Hãy nhập liều thuốc')
        }else if(patter_regex.test(oneMedicineAdd.donvi) == false){
          Alert.alert('Hãy nhập đơn vị thuốc')
        }else{
            setListAddMedicine([...listAddMedicine,oneMedicineAdd])
            setImageThuoc(null);
            modelShow(false);
            setOneMedicineAdd({ name: '',lieu: '',   donvi:'',note: '', image:'' })
        }
      }


    const BoxThuoc = ({item,index}) => (
        <View style={styles.listMedicine}>
            <View style={{flexDirection:'row'}}> 
                    <View style={{width:'60%'}}>
                        <Text style={{fontWeight:'bold',fontSize:15}}> {item.name} </Text>
                        <Text style={{fontSize:15}}> Liều : ({item.lieu} {item.donvi})</Text>
                    </View>
                    <View style={{width:'25%'}}>
                        <Image style={{width:50,height:50}} source={item.image} />
                    </View>

                    <View style={{width:'20%'}}>
                        <AntDesign name="closecircle" size={30} color="red" onPress={() => removeMedicineAdd(index)} />
                    </View>
            </View>
            
            <View style={{flexDirection:'row'}}> 
                    <View>
                        <Text style={{fontWeight:'bold'}}> Ghi chú</Text>
                    </View>
                    <View style={{width:'70%'}}>
                        <Text>: {item.note}</Text>
                    </View>
            </View>
        </View>
  );

// Chọn ảnh

    const [imageThuoc , setImageThuoc] =  useState(null)

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
        const source = { uri: response.uri , data : response.data };
        // const  uploadPictureVar = 'data:image/jpeg;base64,' + response.data;
        // window.picture = uploadPictureVar;
        setOneMedicineAdd({...oneMedicineAdd,image:response})
        setImageThuoc(response);
      }
    });
}

function submitAdd(){
  if(lop_hs !== null){
      if(listAddMedicine.length <= 0 ){
        Alert.alert('Bạn chưa nhập thuốc')
      }else{
        setSubmitLoading(true)
            const formData = new FormData();
            
              formData.append("dateFrom",dateFrom.getDate()+ '-' + parseInt(dateFrom.getMonth() + 1) +'-'+ dateFrom.getFullYear());
              formData.append("dateTo",dateTo.getDate()+ '-' + parseInt(dateTo.getMonth() + 1) +'-'+ dateTo.getFullYear());
              formData.append("loinhan",loiNhan);
              formData.append("lop_id",du_lieu_hs.lop_id);
              for (var i = 0; i < listAddMedicine.length; i++) {
                  if(listAddMedicine[i].image.uri){
                      formData.append("donthuoc["+i+"][anhImage]", {type: 'image/jpg', uri:listAddMedicine[i].image.uri, name:'uploaded.jpg'});
                  }
                      formData.append("donthuoc["+i+"][name]",listAddMedicine[i].name);
                      formData.append("donthuoc["+i+"][lieu]",listAddMedicine[i].lieu);
                      formData.append("donthuoc["+i+"][donvi]",listAddMedicine[i].donvi);
                      formData.append("donthuoc["+i+"][note]",listAddMedicine[i].note);
              }
              // console.log(formData);
              // console.log(du_lieu_hs.lop_id);
        
              
            ApiDonThuoc.insertDonThuoc(data_token.token,du_lieu_hs.id,formData)
            .then(res => {
                console.log('returen',res.data);
                setSubmitLoading(false)
                if(res.data == 'NoGiaoVien'){
                  Alert.alert(
                    "Lớp hiện chưa có giáo viên chưa thể gửi đơn được",
                    "",
                    [
                      { text: "OK", onPress: () => navigation.navigate('Home') }
                    ],
                    { cancelable: false }
                  ); 
                }else{
                  Alert.alert(
                    "Đã gửi đơn thuốc thành công",
                    "",
                    [
                      { text: "OK", onPress: () => navigation.navigate('Home') }
                    ],
                    { cancelable: false }
                  );
                }
                // reloadAgain();
                // navigation.navigate('Dặn thuốc');
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
    <ScrollView>
            <View style={styles.containers}>
                {/* <View style={{flexDirection:'row'}}>
                  <View style={{width:'70%'}}>
                   <Text style={{fontSize:16,fontWeight:'bold',color:'#706f6e',paddingVertical:7}}>NỘI DUNG DẶN THUỐC :</Text>
                  </View>
                  <View style={{width:'30%'}}>
                   <Button title="Xem lịch sử"  type="outline" onPress={()=> navigation.navigate('Dặn thuốc')} />
                  </View>
                </View> */}


                <View style={styles.formUp}>
                            <View style={{flexDirection:'row'}}>
                                <View style={{width:'65%'}}>
                                <Text style={styles.fontTitleHeader}>Bắt đầu ngày :</Text>
                                        <View style={{flexDirection:'row'}}>
                                            <Text style={{fontSize:15,marginRight:10}}>{dateFrom.getDate()}/{dateFrom.getMonth() + 1}/{dateFrom.getFullYear()}</Text>
                                            <AntDesign name="calendar" size={30} color={color_app} onPress={showDatepickerFrom} />

                                            {showDateFrom && (
                                                    <DateTimePicker
                                                    testID="dateTimePicker"
                                                    value={dateFrom}
                                                    minimumDate={dateFrom}
                                                    mode={modeDateFrom}
                                                    is24Hour={true}
                                                    display="default"
                                                    onChange={onChangeDateFrom}
                                             />
                                            )}
                                            <Entypo  style={{marginLeft:40,marginTop:-10}} name="arrow-bold-right" size={35} color={color_app}  />

                                        </View>

                                        
                                </View>
                                <View style={{width:'35%'}}>
                                <Text Text style={styles.fontTitleHeader}  >Đến ngày :</Text>
                                        <View style={{flexDirection:'row'}}>
                                        <Text style={{fontSize:15,marginRight:10}}>{dateTo.getDate()}/{dateTo.getMonth() + 1}/{dateTo.getFullYear()}</Text>
                                            <AntDesign name="calendar" size={30} color={color_app} onPress={showDatepickerTo} />

                                            {showDateTo && (
                                                    <DateTimePicker
                                                    testID="dateTimePicker"
                                                    value={dateTo}
                                                    mode={modeDateTo}
                                                    minimumDate={dateFrom}
                                                    is24Hour={true}
                                                    display="default"
                                                    onChange={onChangeDateTo}
                                                    />
                                                )}
                                        </View>
                                </View>

                        </View>  


                        <Text style={styles.fontTitleHeader}>Lời nhắn : </Text>
                        <TextInput   style={{ width:'100%', borderColor: 'gray', backgroundColor:'white' }} 
                            onChangeText={text  => {setLoiNhan(text)}}
                            placeholder="Lời nhắn tới giáo viên"
                            multiline={true}
                            blurOnSubmit={true}
                            numberOfLines={4}
                            textAlignVertical = "top"
                        />

                </View>


                <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:17,fontWeight:'bold',paddingVertical:15,width:'80%',color:'#706f6e'}}>Danh sách thuốc</Text>
                    <TouchableOpacity onPress={() => modelShowAnimated()} >
                    <AntDesign name="pluscircleo" size={30} color={color_app} style={{paddingTop:12}} />
                    </TouchableOpacity>
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={viewModel}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    }} >

                    <View style={{backgroundColor:'#000000aa',flex:1,justifyContent:'center',alignContent:'center'}}>
                        <Animated.View style={{backgroundColor:'#ffffff',margin:20,padding:10,
                        transform:[{scale:scaleModelAddAnim}],borderRadius:10}}>

                        <View style={styles.headerModel}>
                            <View style={{width:'90%',alignSelf:'center',padding:5}}>
                                 <Text style={{fontWeight:'bold',fontSize:17,color:'#0a9ff5'}}>THÊM THUỐC</Text>
                            </View>
                            <View style={{width:'10%'}}>
                                <TouchableOpacity onPress={() =>modelShow(false)} >
                                     <AntDesign name="closesquare" size={30}  style={{paddingTop:5,color:'#727475'}} />
                                </TouchableOpacity>
                                
                            </View>
                        </View>

                          <View style={{paddingVertical:5}}>
                              {/* <Text style={styles.nameTitleModel}>Tên thuốc :</Text> */}
                              <Input 
                                placeholder="Tên thuốc"
                                onChangeText={text  => {setOneMedicineAdd({...oneMedicineAdd,name:text})}}
                                style={styles.inputModel}   />
                          </View>

                        <View style={{flexDirection:'row'}}>
                            <View style={{width:'45%'}}>
                                {/* <Text style={styles.nameTitleModel}>Liều dùng:</Text> */}

                                <Input  style={styles.inputModel} 
                                placeholder="Liều dùng "
                                 onChangeText={text  => {setOneMedicineAdd({...oneMedicineAdd,lieu:text})}}
                                />
                            </View>
                            <View style={{width:'10%'}}></View>
                            <View style={{width:'45%'}}>
                                {/* <Text style={styles.nameTitleModel}>Đơn vị tính:</Text> */}
                                <Input
                                placeholder="Đơn vị tính"
                                style={styles.inputModel}
                                 onChangeText={text  => {setOneMedicineAdd({...oneMedicineAdd,donvi:text})}}
                                   />
                            </View>
                       
                        </View>

                            <View>
                                {/* <Text style={styles.nameTitleModel}>Chỉ dẫn:</Text> */}
                                <Input  style={styles.inputModel}  
                                placeholder="Chỉ dẫn "
                                 onChangeText={text  => {setOneMedicineAdd({...oneMedicineAdd,note:text})}}
                                 />

                            </View>


                            <View style={{flexDirection:'row',paddingVertical:10}}>
                                <View style={{width:'50%',alignItems:'center'}}>
                                    <Button title="Chọn ảnh thuốc" type="outline" onPress={chosePickImage}  />
                                </View>
                                <View style={{width:'50%',alignItems:'center'}}>
                                    <Image style={{width: 100 , height:100  }}  source={imageThuoc}/>
                                </View>
                            </View>

                        <View style={{width:'30%',paddingTop:10,marginLeft:'60%'}}>
                           <Button title="Thêm" onPress={()=> addMedicinetoList() }/>
                        </View>


                      </Animated.View>
                    </View>

                </Modal>


            <FlatList
                data={listAddMedicine}
                renderItem={({item,index})=>
                <BoxThuoc item={item} index={index} />
                } 
                keyExtractor={(item,index) => index.toString()} 
            />


              {/* <View style={{width:'100%',alignItems:'flex-end'}}>
                    <Button title="Tạo đơn" onPress={submitAdd}/>
              </View> */}

              <TouchableOpacity onPress={()=>{submitAdd()}} style={{backgroundColor:'#fab20a',borderRadius:50,marginTop:20}}>
                  <View style={{paddingHorizontal:10,paddingVertical:15,alignItems:'center'}}> 
                    <Text style={{color:'#ffff',fontSize:17}}>Tạo đơn</Text>
                  </View>
              </TouchableOpacity>

                {/* <Modal
                    animationType="slide"
                    transparent={true}
                    visible={submitLoading}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    }}
                >
                  <WaitLoading />
              </Modal> */}

              <Modal_SubmitLoading submitLoading={submitLoading} />

     </View>
     </ScrollView>  
  
  );
};
const styles = StyleSheet.create({
    containers:{ 
        flex:1 , 
        flexDirection: 'column',
        paddingLeft:5,
        paddingRight:5,
        paddingVertical:10,
        backgroundColor:'#fff',
    },
    containersModel:{ 
        flex:1 , 
        flexDirection: 'column',
        paddingLeft:5,
        paddingRight:5,
        backgroundColor:'#ddd',
    },
    formUp:{
        padding:10,
        marginTop:10,
        width:'100%',
        borderWidth:1,
        borderColor:'#A6A8AA',
        borderRadius:5
    },
    listMedicine:{
        marginVertical:5,
        paddingHorizontal:5,
        borderRadius:4,
        paddingVertical:5,
        backgroundColor:'#fff',
        borderWidth:0.5
    },
    nameTitleModel:{
        paddingVertical:7,
        fontSize:16
    },
    inputModel:{
     fontSize:16
    },
    headerModel:{
        flexDirection:'row',
        paddingBottom:10,
    },
    fontTitleHeader:{
        fontWeight:'bold',fontSize:15,paddingVertical:5,color:'#706f6e'
    }
   
  });

export default Add_medicine;
