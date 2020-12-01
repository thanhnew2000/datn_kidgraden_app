import React ,{ useState, useEffect,useLayoutEffect }from 'react';
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
    Button
  } from 'react-native';
  import axios from 'axios';
  import CateListItem from './component/CateListItem';
  import IconDon from '../android/app/src/kids_student.jpg';
  import IconNews from '../android/app/src/asset/img/icon-news.png';
  import IconImage from '../android/app/src/asset/img/icon-img.png';
  import IconMoney from '../android/app/src/asset/img/icon-money.png';
  import IconCalender from '../android/app/src/asset/img/icon-calendar.png';
  import IconNatri from '../android/app/src/asset/img/icon-nutrition.png';
  import IconChart from '../android/app/src/asset/img/icon-chart.png';
  import IconDiemDanh from '../android/app/src/asset/img/icon-diem-danh.jpg';
  import IconXinNghi from '../android/app/src/asset/img/icon-xin-nghi.jpg';
  import IconMedicine from '../android/app/src/asset/img/icon-medicine.jpg';
  import IconFeedBack from '../android/app/src/asset/img/icon-feedback.png';
  import IconDonHo from '../android/app/src/asset/img/icon-don-ho.jpg';
  import AsyncStorage from '@react-native-community/async-storage';
  import ApiHocSinh from '../android/app/src/api/HocSinhApi';
  import apiRequest from '../android/app/src/api/users';
  import Header from './Header';
  import linkWeb from '../android/app/src/api/linkWeb/index';
  import Modal_Loading from './component/reuse/Modal_Loading'
  import { getDataSuccess,setNumberNotification } from '../src/redux/action/index';
  import { AuthContext } from './context';
  import AntDesign from 'react-native-vector-icons/AntDesign';


  import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
  // Redux

  import { status } from '../src/redux/action/index';
  import { fetchDataAsyncStorage,fetchTokenAsyncStorage } from '../src/redux/action/index';
  import { useSelector,useDispatch,useStore  } from 'react-redux'

  //  firebase
  
import messaging from '@react-native-firebase/messaging';
import database from '@react-native-firebase/database';
const Home2 = ({ navigation }) => 
{

  const { signOut } = React.useContext(AuthContext);

  const dispatch = useDispatch();
  // const lop_hs = '';
  const counter = useSelector(state => state)
  const lop_hs = counter.hocsinh.data.get_lop;
  const hs = counter.hocsinh.data;
  const notifi = counter.notification;
  const data_token = counter.token;
  console.log('notifi', notifi);


  async function  getHocSinhIdUser (token) {  
    var data_user = await AsyncStorage.getItem('data_user');
    let user =  JSON.parse(data_user);
    var json_data_all_hs = await AsyncStorage.getItem('data_all_hs');
    let all_hs =  JSON.parse(json_data_all_hs);
    console.log('all_hs',all_hs)
    setHsByUser(all_hs);
    
      // ApiHocSinh.getHocSinhIdUser(token,user.id)
      //   .then(function (response) {
      //     let data = response.data;
      //     console.log('data_hs_user',data);
      //     setHsByUser(data);
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
  };



  useEffect(() => {
    function runStart(){
         navigation.setOptions({
          headerTitle: () => <Header navigation={navigation}/>,
        })

        // getThisHocSinh(data_token.token,hs.id)
        getHocSinhIdUser(data_token.token)
        dispatch(fetchDataAsyncStorage())
        dispatch(fetchTokenAsyncStorage());
      }
      runStart();

   }, []);



  
  const [all_hs_user, setHsByUser] = useState({});
  const [showLoading, setShowLoading] = useState(false);



  // const getThisHocSinh = (token,id_hs) => {
  //   ApiHocSinh.getOne(token,id_hs)
  //     .then(function (response) {
  //       let data = response.data;
  //       console.log('data',data);
  //       console.log('token',token);
  //       setData_hocsinh(data);
  //       AsyncStorage.setItem('data_hs',JSON.stringify(data));
        
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  //   useEffect(() => {
  //     async function fetchData() {
  //       try{
  //         // var v = await AsyncStorage.getItem('data_storge');
  //         var token = await AsyncStorage.getItem('data_token');
  //         var hs = await AsyncStorage.getItem('data_hs');
  //         var data_user = await AsyncStorage.getItem('data_user');
  //         let user =  JSON.parse(data_user);

  //         if(token !== null && hs !== null){
  //           let data_HocSinh =  JSON.parse(hs);
  //           setData_hocsinh(data_HocSinh)
  //           // setData_lop(data_HocSinh.get_lop)
  //           setData_user(data_user)
  //           getHocSinhIdUser(token,user.id)
  //           setUserToken(token)
  //           getThisHocSinh(token,data_HocSinh.id)
  //         }
  //         dispatch(fetchDataAsyncStorage())
  //         dispatch(fetchTokenAsyncStorage())

  //       }catch (e){
  //         console.log(e);
  //       }
  //   }
  //   fetchData();
  // },[]);





  const [Category,setCategory] = useState([
    {id: 1, name : 'Điểm danh',image :IconDiemDanh , naviga:'Điểm danh'},
    {id: 2, name : 'Xin nghỉ',image :IconXinNghi , naviga:'tao_don_xin_nghi_hoc' },
    {id: 3, name : 'Dặn thuốc',image :IconMedicine , naviga:'add_medicine'},
    {id: 8, name : 'Đón hộ',image :IconDonHo ,  naviga:'Đón hộ' },
    {id: 7, name : 'Đánh giá GV',image :IconFeedBack  ,  naviga:'Đánh giá GV'},
    {id: 4, name : 'Album',image :IconNews, naviga:'Album' },
    {id: 5, name : 'Biểu đồ',image :IconChart , naviga:'Biểu đồ' },
    {id: 6, name : 'Hoạt động',image :IconCalender , naviga:'Hoạt động'},
    {id: 9, name : 'Học phí',image :IconMoney , naviga:'Học phí'},

  ])


  useEffect(() => {
  function fetchData() {
   console.log('hihihaha')
   
  }
  fetchData();
 
},[hs]);
  async function onValueChangeNumberNoti () { 
    var hs = await AsyncStorage.getItem('data_hs');
    let data_HocSinh = JSON.parse(hs)
    database()
    .ref('notification')
     .orderByChild('user_id').equalTo(data_HocSinh.id)
      .on('value', function(snapshot) { 
        var so_luong_thong_bao = 0;
        var data_thong_bao = snapshot.val();
        console.log(data_thong_bao);
        for (const key in data_thong_bao) {
          if (data_thong_bao.hasOwnProperty(key)) {
            const element = data_thong_bao[key];
            if(element.role == 3){
                if (element.bell == 1) {
                  so_luong_thong_bao++;
                }
            }
          }
        }
       dispatch(setNumberNotification(so_luong_thong_bao));
    },
   );
  }
  
  function changeDataHs(id){
    setShowLoading(true);
      ApiHocSinh.getOne(data_token.token,id)
        .then(function (response) {
          let data = response.data;
          console.log('data',data);
           AsyncStorage.removeItem('data_hs');
           AsyncStorage.setItem('data_hs',JSON.stringify(data));
          dispatch(getDataSuccess(data));
          onValueChangeNumberNoti()
          setShowLoading(false);
          navigation.closeDrawer();
          })
          .catch(function (error) {
            console.log(error);
          });
  }

  
   
  return (
<View>

    <View style={{height:'100%',backgroundColor:'#fff'}}>
          <ImageBackground style={{width: '100%' }}   source={require('../android/app/src/asset/img/home_image_slide.jpg')}>

              <View style={{backgroundColor:'rgba(221, 221, 222, 0.39)',paddingVertical:5}}>

                <View style={{flexDirection:'row-reverse',marginLeft:5}}>
                  <Text> </Text>
                  <FlatList
                    style={ all_hs_user.length >= 7 ?  null : styles.flexDirectionRowReverse}
                    data={all_hs_user}
                    horizontal={true}
                    renderItem={({ item }) => (
                      <TouchableOpacity onPress={()=> changeDataHs(item.id)}>
                        {/* <Image style={{width: 37 , height:37,borderRadius:100,marginTop:5,marginLeft:10}}  source={{uri: linkWeb + item.avatar}}/> */}
                     
                        {/* <Image  source={require('../android/app/src/asset/img/home_image_slide.jpg')}/> */}
                        <View style={{marginTop:10}}>
                              <Avatar
                                style={{width: 37 , height:37,borderRadius:100,marginLeft:10}} 
                                rounded
                                source={require('../android/app/src/asset/img/home_image_slide.jpg')}
                                // size="large"
                              />

                              <Badge
                                status="error"
                                value={1}
                                containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                              />
                            </View>
                      </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id}
                  />
                </View>

                <View style={{flexDirection:'row'}}>
                    <View style={{width:'20%',justifyContent:'center',marginLeft:'5%'}}>
                        <Image style={{width: 70 , height:70,borderRadius:100 }}  source={{uri: 'http://34.122.241.19/upload/91a6a53632b7048e97e1e994d6662afb74.jpg'}}/>
                    </View>
                    <View style={{width:'80%',marginLeft:'5%',justifyContent:'center'}}>
                      <Text style={{fontSize:16,fontWeight:'bold'}}>{hs.ten}</Text>
                    <Text style={{fontSize:15}}>Lớp: {lop_hs == undefined ? null : lop_hs.ten_lop}</Text>
                    </View>
                </View>
            

            </View>
        </ImageBackground>


    <View style={styles.container}>
          <View>
              <FlatList
                data={Category}
                renderItem={({item})=>
                    <View style={styles.wrapper}>
                          <CateListItem category={item} navigation={navigation} />
                    </View>
                } 
                keyExtractor={(item,index) => `${index}`}
                numColumns={3}
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
    </View>

  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#fff',
        justifyContent:'center',
        paddingVertical:5,
        paddingHorizontal:5
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
        flexDirection:'row-reverse'
      }
    
});

export default Home2
