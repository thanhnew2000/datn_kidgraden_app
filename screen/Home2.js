import React ,{ useState, useEffect,useLayoutEffect,useRef }from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    Dimensions,
    Image,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
    Button,
    LogBox ,
    Alert
  } from 'react-native';
  import axios from 'axios';
  import CateListItem from './component/CateListItem';
  import IconDon from '../android/app/src/diem_danh.png';
  import IconNews from '../android/app/src/diem_danh.png';
  import IconAlbum from '../android/app/src/album.png';
  import IconImage from '../android/app/src/diem_danh.png';
  import IconMoney from '../android/app/src/diem_danh.png';
  import IconCalender from '../android/app/src/hoat-dong.jpg';
  import IconNatri from '../android/app/src/nutri.jpg';
  import IconChart from '../android/app/src/bieu-do.jpg';
  import IconDiemDanh from '../android/app/src/diem-danh.jpg';
  import IconXinNghi from '../android/app/src/vang.jpg';
  import IconMedicine from '../android/app/src/dan_thuoc.jpg';
  import IconFeedBack from'../android/app/src/danh-gia.jpg';
  import IconDonHo from'../android/app/src/don-ho.jpg';
  import IconNhanXet from'../android/app/src/nhan-xet.jpg';
  


  import AsyncStorage from '@react-native-community/async-storage';
  import ApiHocSinh from '../android/app/src/api/HocSinhApi';
  import ApiNotification from '../android/app/src/api/NotificationApi';
  import apiRequest from '../android/app/src/api/users';
  import Header from './Header';
  import linkWeb from '../android/app/src/api/linkWeb/index';
  import Modal_Loading from './component/reuse/Modal_Loading'
  import { getDataSuccess,setNumberNotification,setArrNotification,setcheckValueCallAgain } from '../src/redux/action/index';
  import { AuthContext } from './context';
  import Entypo from 'react-native-vector-icons/Entypo';


  import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
  // Redux

  import { status } from '../src/redux/action/index';
  import { fetchDataAsyncStorage,fetchTokenAsyncStorage } from '../src/redux/action/index';
  import { useSelector,useDispatch,useStore  } from 'react-redux'


import slide_hs_1 from '../android/app/src/silde_hs_1.jpg';
import slide_hs_2 from '../android/app/src/silde_hs_2.jpg';
import slide_hs_3 from '../android/app/src/silde_hs_3.jpg';
import slide_hs_4 from '../android/app/src/silde_hs_4.jpg';


  
  //  firebase
  
import messaging from '@react-native-firebase/messaging';
import database from '@react-native-firebase/database';
import { set } from 'react-native-reanimated';

LogBox.ignoreAllLogs();

const Home2 = ({ navigation }) => 
{

  const { signOut } = React.useContext(AuthContext);


  const [all_hs_user, setHsByUser] = useState({});
  const [showLoading, setShowLoading] = useState(false);
  const [user_tk, setuser_tk] = useState({});
  const [arr_id_hs_user, setArr_id_hs_user] = useState([]);


  const dispatch = useDispatch();
  const counter = useSelector(state => state)
  const lop_hs = counter.hocsinh.data.get_lop;
  const hs = counter.hocsinh.data;
  const notifi = counter.notification;
  const data_token = counter.token;
  const check_value_call_again = counter.check_value_call_again;

  const arr_notifi_hs = counter.arr_notification;

  console.log('hs_first',hs);
  console.log('array_notifi',notifi);
  console.log('check_value_call_again',check_value_call_again);

   const getNumberNotifiNumberHs = async () => {
    var hsinh = await AsyncStorage.getItem('data_hs');
    let data_HocSinh = JSON.parse(hsinh)
    console.log('getNumberNotifiNumberHs đang chạy____________________________',data_HocSinh.id);
    ApiNotification.getNumberNotifiNumberOneHs(data_token.token,data_HocSinh.id)
    .then(function (response) {
        let data = response.data;
        console.log('number',data);
        dispatch(setNumberNotification(data));
      })
      .catch(function (error) {
      console.log('number_bell_err',error);
      });
  };

  useEffect(  () => {
    getNumberNotifiNumberHs();
  }, [hs]);


  useEffect(  () => {
    console.log('hihihih_______________________________________');
   }, []);

  useEffect(() => {
    function runStart(){
         navigation.setOptions({
          headerTitle: () => <Header navigation={navigation}/>,
        })
        getHocSinhIdUser(data_token.token)
        // dispatch(fetchDataAsyncStorage())
        dispatch(fetchTokenAsyncStorage());
        // onValueChangeNumberNoti();
      }
      runStart();
      //  onValueChangeNumberNoti();
   }, []);


   const scrollViewRef = useRef();
  
  async function changeDataHs(id){
    setShowLoading(true);
        ApiHocSinh.getHocSinhIdUser(data_token.token,user_tk.id)
        .then(
         async function (response) {

           scrollViewRef.current.scrollToIndex({ index: 0,animated: true})

          let data = response.data;
          let arr_all_hs_user_new = [];
          let arr_no_id_chose = [];
          // console.log('data',data);
           data.forEach(element => {
                if(element.id == id){
                  arr_all_hs_user_new.push(element);
                }else{
                  arr_no_id_chose.push(element);
                }
           });
            let arr_new = arr_all_hs_user_new.concat(arr_no_id_chose);
            setHsByUser(arr_new);
          //  await AsyncStorage.removeItem('data_hs');
             await AsyncStorage.setItem('data_hs',JSON.stringify(arr_all_hs_user_new[0]));
          //  await AsyncStorage.removeItem('data_all_hs');
             await AsyncStorage.setItem('data_all_hs',JSON.stringify(arr_new));
            dispatch(fetchDataAsyncStorage());
            // onValueChangeNumberNoti();
            dispatch(setcheckValueCallAgain());
            setShowLoading(false);
            // navigation.closeDrawer();
          })
          .catch(function (error) {
            console.log(error);
            Alert.alert('Học sinh hiện tại chưa thể chuyển ');
            setShowLoading(false);

          });
  }




  const [Category,setCategory] = useState([
      {id: 1, name : 'Điểm danh',image :IconDiemDanh , naviga:'Điểm danh'},
      {id: 2, name : 'Xin nghỉ',image :IconXinNghi , naviga:'tao_don_xin_nghi_hoc' },
      {id: 3, name : 'Dặn thuốc',image :IconMedicine , naviga:'Index_medicine'},
      {id: 8, name : 'Đón hộ',image :IconDonHo ,  naviga:'Đón hộ' },
      {id: 7, name : 'Đánh giá GV',image :IconFeedBack  ,  naviga:'Đánh giá GV'},
      {id: 4, name : 'Album',image :IconAlbum, naviga:'Album' },
      {id: 5, name : 'Biểu đồ',image :IconChart , naviga:'Biểu đồ' },
      {id: 6, name : 'Hoạt động',image :IconCalender , naviga:'Hoạt động'},
      {id: 9, name : 'Học phí',image :IconMoney , naviga:'Học phí'},
      {id: 10, name : 'Nhận xét',image :IconNhanXet , naviga:'NhanXet'},
  ])

  
  // async function onValueChangeNumberNoti () { 
  //   var hs = await AsyncStorage.getItem('data_hs');
  //   let data_HocSinh = JSON.parse(hs)
  //   database()
  //   .ref('notification')
  //    .orderByChild('user_id').equalTo(data_HocSinh.id)
  //     .on('value', function(snapshot) { 
  //       var data_thong_bao = snapshot.val();
  //       var arr_id=[1,2,3];
  //       var value_arr = [];
  //       for (const key in data_thong_bao) {
  //         if (data_thong_bao.hasOwnProperty(key)) {
  //           const element = data_thong_bao[key];

  //           let number_noti = 0;
  //           for(var i = 0 ; i < arr_id.length ; i++){
  //                 if(element.user_id == arr_id[i]){
  //                     if(element.role == 2){
  //                       if (element.bell == 1) {
  //                         number_noti++;
  //                       }
  //                     }
  //                 }
  //           }
  //           value_arr[element.user_id]=number_noti;
  //         }
  //       }
  //        var array_to_push = []
  //         for (const key in value_arr) {
  //           array_to_push.push({id_hs:key,number:value_arr})
  //         }
  //     //  dispatch(setNumberNotification(so_luong_thong_bao));
  //   },
  //  );
  // }


  async function  getHocSinhIdUser (token) {  
    var data_user = await AsyncStorage.getItem('data_user');
    let user =  JSON.parse(data_user);
    setuser_tk(user)
    var json_data_all_hs = await AsyncStorage.getItem('data_all_hs');
    let data_all_hs =  JSON.parse(json_data_all_hs);
    let new_arr_id = [];
    data_all_hs.forEach(element => {
      new_arr_id.push(element.id);
    });

    setHsByUser(data_all_hs);
    setArr_id_hs_user(new_arr_id);
  };

  
function checkScroll(){
  scrollViewRef.current.scrollToIndex({ index: 0,animated: true})
}
 
   function showNumberArrNotifi(id_hs){
        const result = arr_notifi_hs.find(arr =>  arr.id_hs == id_hs );
          if(result !== undefined){
              if(result.number == 0){
                return null
              }else{
                  return  <Badge status="error" value={ result.number  }
                  containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                />
              }
          }
   }

   function generateRandomNumber (max,min) { 
    const random = (Math.floor(Math.random() * (max - min + 1)) + min);
    return random
   }

   function optionRanImage(number_randam){
      if(number_randam == 1){
        return require('../android/app/src/silde_hs_1.jpg')
      }else if (number_randam == 2){
        return require('../android/app/src/silde_hs_2.jpg')
      } else if (number_randam == 3){
        return require('../android/app/src/silde_hs_3.jpg')
      }else if (number_randam == 4){
        return require('../android/app/src/silde_hs_4.jpg')
      }else {
        return require('../android/app/src/silde_hs_5.jpg')
      }
   }


   
  // const getArrNotifiNumberHs = () => {
  //   ApiNotification.getArrNotifiNumberHs(data_token.token,{arr_id_hs : arr_id_hs_user})
  //   .then(function (response) {
  //       let data = response.data;
  //       dispatch(setArrNotification(data));
  //     })
  //     .catch(function (error) {
  //     console.log('update_bell_err',error);
  //     });
  // };

  return (
<View>
<ScrollView>
    <View style={{height:'100%',backgroundColor:'#fff'}}>
   
      <View style={{flexDirection:'row-reverse'}}>
      <ImageBackground style={{width: '100%',height:'100%' }}    source={require('../android/app/src/blue-sky.png')}>

          <FlatList
                    ref={scrollViewRef}
                    style={styles.flexDirectionRowReverse}
                    data={all_hs_user}
                    horizontal={true}
                    renderItem={({ item,index }) => {
                   return   <View style={{paddingTop:10,marginRight:25,paddingBottom:10}}>
                      {/* <TouchableOpacity onPress={()=> changeDataHs(item.id)}> */}
                            <View style={{width:240,height:150,marginLeft:10,borderRadius:15}}>
                              <ImageBackground style={{width: '100%',height:'100%',borderRadius: 25 }}   imageStyle={{ borderRadius: 25 }}  source={optionRanImage(generateRandomNumber(5,1))}>
                        
                                        <View style={{height:10,alignItems:'flex-end',marginRight:10,marginTop:10}}>

                                          <TouchableOpacity onPress={()=> changeDataHs(item.id)} >
                                                          <View style={{backgroundColor:'#fff',borderRadius:10,paddingHorizontal:5}}>
                                                            <Entypo name="swap" size={30} color="#fca31c" />
                                                          </View>
                                            </TouchableOpacity>

                                        </View>

                                <View style={{flexDirection:'row',paddingTop:40}}>
                                  <View style={{width:'65%'}}>
                                      <View style={{justifyContent:'center',paddingLeft:10}}>
                                        <Text style={{fontSize:18,fontWeight:'bold'}}>{item.ten}</Text>
                                        <Text>Lớp : {item.get_lop == null ? '' : item.get_lop.ten_lop} </Text>
                                      </View>
                                  </View>

                                    <View style={{width:'30%'}}>
                                      {/* <Image style={{width: 70 , height:70,borderRadius:100,marginRight:10 }}   source={require('../android/app/src/asset/img/home_image_slide.jpg')}/> */}
                                      <Image style={{width: 70 , height:70,borderRadius:100,marginRight:10 }}  
                                       source={{
                                          uri: item.avatar,
                                        }}/>
                                    </View>
                                  </View>
                              </ImageBackground>
                            </View>
                            {/* </TouchableOpacity> */}


                       </View>
                    }}
                    keyExtractor={(item,index) => index.toString()}
                  />
              
    </ImageBackground>

            </View>

                  
          {/* <ImageBackground style={{width: '100%' }}   source={require('../android/app/src/asset/img/home_image_slide.jpg')}>

              <View style={{backgroundColor:'rgba(221, 221, 222, 0.39)',paddingVertical:5}}>

                <View style={{flexDirection:'row-reverse',marginLeft:5}}>
                  <Text> </Text>
                  <FlatList
                    style={ all_hs_user.length >= 7 ?  null : styles.flexDirectionRowReverse}
                    data={all_hs_user}
                    horizontal={true}
                    renderItem={({ item }) => (
                      <TouchableOpacity onPress={()=> changeDataHs(item.id)}>
          
                        <View style={{marginTop:10}}>
                              <Avatar
                                style={{width: 37 , height:37,borderRadius:100,marginLeft:10}} 
                                rounded
                                source={require('../android/app/src/kids_student.jpg')}
                              />


                          { showNumberArrNotifi(item.id)  }
                          

                            </View>
                      </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id}
                  />
                </View>

                <View style={{flexDirection:'row'}}>
                    <View style={{width:'20%',justifyContent:'center',marginLeft:'5%'}}>
                        <Image style={{width: 70 , height:70,borderRadius:100 }}  source={{uri: hs.avatar}}/>
                    </View>
                    <View style={{width:'80%',marginLeft:'5%',justifyContent:'center'}}>
                      <Text style={{fontSize:16,fontWeight:'bold'}}>{hs.ten}</Text>
                    <Text style={{fontSize:15}}>Lớp: {lop_hs == undefined ? null : lop_hs.ten_lop}</Text>
                    </View>
                </View>
            

            </View>
        </ImageBackground> */}
         {/* <TouchableOpacity onPress={()=> onlicktest()} style={{backgroundColor:'green',width:100,height:100}}>
              <Text>Click test</Text>
            </TouchableOpacity> */}

    <View style={styles.containerList}>
          <View>
          
              <FlatList
                data={Category}
                renderItem={({item})=>
                          <CateListItem category={item} navigation={navigation} />
                } 
                numColumns={2}
                keyExtractor={(item,index) => index.toString()}
              />
          </View>


          {/* <TouchableOpacity onPress={()=> navigation.navigate('Album')}>
            <View style={{flexDirection:'row',height:100,paddingTop:10}}>
                <View style={{flexDirection:'row',width:'80%',borderWidth:2,borderColor:'#8fadff',borderTopLeftRadius:10}}>
                      <View style={{width:'37%',borderWidth:2,borderColor:'#8fadff'}}>
                        <View style={{padding:2}}>
                          <Image style={{height:'100%',width:'100%'}} source={IconDiemDanh}/>
                        </View>
                      </View>
                      <View style={{width:'31%',padding:2,borderWidth:2,borderColor:'#8fadff'}}>
                       <Image style={{height:'100%',width:'100%'}} source={IconXinNghi}/>
                      </View>
                      <View style={{width:'31%',padding:2,borderWidth:2,borderColor:'#8fadff'}}>
                        <Image style={{height:'100%',width:'100%'}} source={IconXinNghi}/>
                      </View>
                </View>

                    <View style={{width:'20%',backgroundColor:'#f37cfc',justifyContent:'center',alignItems:'center',borderBottomRightRadius:15}}>
                      <AntDesign name="picture" size={29} color="#fcfdff" />
                       <Text style={{color:'#ffff'}}>Album</Text>
                   </View>

               
            </View>
          </TouchableOpacity> */}

    </View>
    <Modal_Loading showLoading = {showLoading} /> 


    </View>
    </ScrollView>
    </View>

  );
};

const styles = StyleSheet.create({
    containerList: {
        backgroundColor:'#fff',
        justifyContent:'center',
        paddingHorizontal:5,
        marginBottom:15,
        marginTop:10,
      },
      wrapper:{
        paddingHorizontal:8,
        paddingVertical:2,
      },
      titleTinTuc: {
        backgroundColor:'#de5931',
        borderTopRightRadius:15,
        width: (Dimensions.get('screen').width - 60) / 1.2,
      },
      textTitleTinTuc: {
        paddingHorizontal:10,
        paddingVertical:5,
        color:'white'
      },
      titleXemThem: {
        backgroundColor:'#04B431',
        marginLeft:5
      },
      cotnho:{
        width: (Dimensions.get('screen').width - 60) / 2,
      },
      infoText:{
        flex:1 ,
        flexDirection:'column',
        justifyContent:'flex-end',
        paddingTop:30,
      },
      borderOftext:{
        backgroundColor: 'rgba(255, 137, 93, 0.95)',
        // backgroundColor: 'rgba(11, 75, 120, 0.82)',
        borderTopLeftRadius:60,
        borderTopRightRadius:60,
        height:100,
        alignItems:'center',
        justifyContent:'center',
        position: 'relative',
      },
      flexDirectionRowReverse:{
      }
    
});

export default Home2
