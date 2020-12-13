import React ,{ useState, useEffect }from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    Dimensions,
    Image,
    TouchableOpacity,
    ImageBackground,
    NativeModules 
  } from 'react-native';
  import axios from 'axios';
  import Collapsible from 'react-native-collapsible';
  import ApiHocSinh from '../android/app/src/api/HocSinhApi';
  import AsyncStorage from '@react-native-community/async-storage';
  import Modal_Loading from './component/reuse/Modal_Loading'
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import { AuthContext } from './context';
  import linkWeb from '../android/app/src/api/linkWeb/index';
  
  import lamp from '../android/app/src/lamp.png';
  import color_app from './color_app'
  // redux
  import { getDataSuccess,setNumberNotification } from '../src/redux/action/index';
  import { useSelector,useDispatch,useStore  } from 'react-redux'
const DrawerScreen =  ({props,navigation}) => {

    const { signOut } = React.useContext(AuthContext);

    const dispatch = useDispatch();
    const counter = useSelector(state => state)
    const numberNotification = counter.notification;

  const [isThongTinTaiKhoan, setIsThongTinTaiKhoan] = useState(false);


  const [showLoading, setShowLoading] = useState(false);

  const [userToken, setUserToken] = useState(null);
  const [all_hs_user, setHsByUser] = useState({});

  const [user_tk, setUserTk] = useState({});

  // const getHocSinhIdUser = (token,user_id) => {
  //     ApiHocSinh.getHocSinhIdUser(token,user_id)
  //       .then(function (response) {
  //         let data = response.data;
  //         console.log('data_hs_user',data);
  //         setHsByUser(data);
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  // };


  useEffect(() => {
    async function fetchData() {
      try{
        var token = await AsyncStorage.getItem('data_token');
        var data_user = await AsyncStorage.getItem('data_user');
        let user =  JSON.parse(data_user);
        console.log(user.id);
        setUserToken(token)
        setUserTk(user)
        // getHocSinhIdUser(token,user.id)
        setShowLoading(false);
      }catch (e){
        console.log(e);
      }
  }
  fetchData();
},[]);

//  function changeDataHs(id){
//   setShowLoading(true);
//     ApiHocSinh.getOne(userToken,id)
//       .then(function (response) {
//         let data = response.data;
//         console.log('data',data);
//          AsyncStorage.removeItem('data_hs');
//          AsyncStorage.setItem('data_hs',JSON.stringify(data));
//         // NativeModules.DevSettings.reload();
//         dispatch(getDataSuccess(data));
//        setShowLoading(false);
//        navigation.closeDrawer();
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
// }

 function changeStateThongTin (){
  setIsThongTinTaiKhoan(!isThongTinTaiKhoan)
 }

//  function clickTest(number){
//   dispatch(setNumberNotification(5));
//  }

  return (
  <View style={styles.container}> 
    
    {/* <ImageBackground style={{width:'100%'}}  source={require('../android/app/src/asset/img/nen-navbar.jpg')}> */}
      <View style={styles.boxTren}>
        {/* <Image style={{width:65,height:65,borderRadius:100,alignSelf:'center',marginLeft:10}}  source={{uri: linkWeb + hs.avatar}} /> */}
          {/* <View style={{alignSelf:'center'}}>
            <Text></Text>
            <Text></Text>
            <Text style={{marginLeft:'10%',fontWeight:'bold',fontSize:16,color:'white'}}>TK: {user_tk.username}</Text>
          </View> */}
          <View style={{width:'80%', alignSelf:'center'}}>
               <Text style={{marginLeft:'10%',fontWeight:'bold',fontSize:16,color:'#fff'}}>TK: {user_tk.username}</Text>
          </View>
          <View style={{width:'20%', alignSelf:'center',alignItems:'flex-end'}}>
              
            <Image style={{width:65,height:100}}  source={require('../android/app/src/lamp.png')} />
              
          </View>

      </View>
      {/* </ImageBackground> */}


      <View style={styles.oButton}>
          <View style={{alignItems:'center',justifyContent:'center',width:'20%'}}>
            <FontAwesome name="unlock-alt" size={20} color="#878583" />
          </View>
            <View style={{justifyContent:'center',width:'40%'}}>
              <TouchableOpacity onPress={()=> navigation.navigate('ChangePass') }>
                  <Text style={styles.textDraw}>Đổi mật khẩu</Text>
              </TouchableOpacity>
            </View>

          {/* <View style={{justifyContent:'center',width:'40%'}}>
             <Text >{numberNotification}</Text>
            <TouchableOpacity onPress={()=>clickTest(1)}>
              <Text>Click test</Text>
            </TouchableOpacity>
          </View> */}

      </View>

{/* chuyeenr hoc sinh */}

      <TouchableOpacity onPress={()=> changeStateThongTin() }>
            <View style={styles.oButtonShowThongTin}>
                <View style={{alignItems:'center',justifyContent:'center',width:'20%'}}>
                  <FontAwesome name="address-card-o" size={20} color="#878583" />
                </View>
                <View style={{justifyContent:'center',width:'60%'}}>
                  <Text style={styles.textDraw} >Thông tin tài khoản</Text>
                </View>
                <View style={{justifyContent:'center',width:'15%',alignItems:'flex-end'}}>
                   <FontAwesome name={isThongTinTaiKhoan ?  'angle-up' : 'angle-down' } size={20} color="#878583" />
                </View>
            </View>
      </TouchableOpacity> 
{/* end chuyen hoc sinh */}

        <View style={isThongTinTaiKhoan ? {display:'flex'} : {display:'none'}}>
              <View style={{marginHorizontal:'5%',borderLeftWidth:1,
              borderRightWidth:1,borderBottomWidth:1,borderBottomLeftRadius:10,
              borderBottomRightRadius:10,borderColor:'#aeb0b0'}}>
                    <View style={{flexDirection:'row',alignItems:'center',marginVertical:10,paddingLeft:10}}>
                        <View style={{width:'10%'}}>
                          <FontAwesome name='envelope-o' size={15} color="#878583" />
                        </View>
                        <View style={{width:'90%'}}>
                            <Text  style={{color:'#2b2b2b'}}> {user_tk.email}</Text>
                        </View>
                    </View>

                    <View style={{flexDirection:'row',alignItems:'center',marginVertical:10,paddingLeft:10}}>
                        <View style={{width:'10%'}}>
                          <FontAwesome name='phone' size={15} color="#878583" />
                        </View>
                        <View style={{width:'90%'}}>
                            <Text style={{color:'#2b2b2b'}}> {user_tk.phone_number}</Text>
                        </View>
                    </View>
              </View>
          </View>

        <TouchableOpacity onPress={()=>signOut()} style={{flex:1,justifyContent:'flex-end'}} >
          <View style={styles.oButtonDangXuat}>
              <View style={{alignItems:'center',justifyContent:'center',width:'20%'}}>
                <AntDesign name="logout" size={25} color="#f7f8fa" />
              </View>
              <View style={{justifyContent:'center',width:'40%'}}>
                <Text style={{fontSize:16,color:'#f7f8fa'}}>Đăng xuất</Text>
              </View>
          </View>
      </TouchableOpacity>


        <Modal_Loading showLoading = {showLoading} /> 
    </View>

      );
    };
    const styles = StyleSheet.create({
      container:{
        flex:1,
        backgroundColor:"#fff",
        
      },
      oButton:{
          flexDirection:'row',
          height:50,
      },
      oButtonDangXuat:{
        flexDirection:'row',
        height:70,
        width:'80%',
        backgroundColor:'#878787',
        borderTopRightRadius:50,
        borderBottomRightRadius:50,
        marginBottom:10
      },
      textDraw:{
          fontSize:16
      },
      oButtonShowThongTin:{
        flexDirection:'row',
        height:30,
    },
      boxTren:{
        height:120,
        flexDirection:'row',
        backgroundColor:color_app
      },
      box:{
        padding:5,
        flexDirection:'row',
        borderRadius:10,
        borderColor:'gray',
        borderBottomWidth:1
      },
      
    });

export default DrawerScreen;
