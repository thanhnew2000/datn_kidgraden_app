// In App.js in a new project

import React, { useState, useEffect } from 'react';
import { Button, View, Text, StyleSheet, Alert, StatusBar } from 'react-native';
import {  useNavigation,NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screen/Home2';
import ListDanhBa from './screen/ListDanhBa';
import DrawerScreen from './screen/DrawerScreen';

import Header from './screen/Header';
import Login from './screen/Login';


// Quên mật khẩu
import ForgotPass_Step1 from './screen/Quenmatkhau/ForgotPass_Step1';
import ForgotPass_Step2 from './screen/Quenmatkhau/ForgotPass_Step2';
import ForgotPass_Step3 from './screen/Quenmatkhau/ForgotPass_Step3';
import GetPass_Success from './screen/Quenmatkhau/GetPass_Success';

import testPassWord from './screen/Quenmatkhau/testPassWord';


// 

import Loading from './screen/Loading';
import { AuthContext } from './screen/context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import ApiHocSinh from './android/app/src/api/HocSinhApi';
import ApiUser from './android/app/src/api/users';
// import { AuthContext } from './screen/context';
import Modal_Start_App from './screen/component/reuse/Modal_Start_App'

import ApiNotification from './android/app/src/api/NotificationApi';


import News from './screen/News/News';
import Detail_new from './screen/News/Detail_new';

import Medicine from './screen/Medicine/Medicine';
import Detail_medicine from './screen/Medicine/Detail_medicine';
import Index_medicine from './screen/Medicine/Index_medicine';
import Add_medicine from './screen/Medicine/Add_medicine';

import DayOff from './screen/DayOff/DayOff';
import Index_XinNghi from './screen/DayOff/Index_XinNghi';
import ChiTietNghiHoc from './screen/DayOff/ChiTietNghiHoc';
import ThemDonNghi from './screen/DayOff/ThemDonNghi';

import HoatDong from './screen/HoatDong/HoatDong';

import Album from './screen/Album/Album';
import Detail_Album from './screen/Album/Detail_Album';

import DiemDanh from './screen/DiemDanh/DiemDanh';
import DetailDiemDanhVe from './screen/DiemDanh/DetailDiemDanhVe';

import DonHo from './screen/DonHo/DonHo';
import Index_DonHo from './screen/DonHo/Index_DonHo';
import ThemDonHo from './screen/DonHo/ThemDonHo';

import BieuDo from './screen/BieuDo/BieuDo';

import Account from './screen/Account/Account';
import ChangePass from './screen/Account/ChangePass';
import CapNhapThongTin from './screen/Account/CapNhapThongTin';
import EditInfoParent from './screen/Account/EditInfoParent';

import Notification from './screen/Notification/Notification';
import HistoryNotification from './screen/Notification/HistoryNotification';
import ShowThongBao from './screen/Notification/ShowThongBao';

import HocPhi from './screen/HocPhi/HocPhi';
import ChiTietHocPhi from './screen/HocPhi/ChiTietHocPhi';
import   DotCuaThang from './screen/HocPhi/DotCuaThang';

import NhanXet from './screen/NhanXet/NhanXet';
import ChiTietNhanXet from './screen/NhanXet/ChiTietNhanXet';


import Feedback from './screen/Feedback/Feedback';

// Redux
import { createStore, applyMiddleware } from 'redux';
import myReducer from './src/redux/reducers/index';
import { Provider, useSelector, useDispatch } from 'react-redux';
import thunk from 'redux-thunk'
// import { useSelector,useDispatch,useStore  } from 'react-redux'

import messaging from '@react-native-firebase/messaging';
import database from '@react-native-firebase/database';


import { setNumberNotification, fetchDataAsyncStorage, fetchTokenAsyncStorage, setcheckValueCallAgain, getDataSuccess,setRouteNotifition } from './src/redux/action/index';

import TabNumberNoti from './screen/TabNumberNoti';

import  color_app  from './screen/color_app';
import { color, floor } from 'react-native-reanimated';



const store = createStore(myReducer, applyMiddleware(thunk));






function App() {
  const [route_notifi, setRouteNotifi] = useState('Home');
  const [id_param_form_notifi, setId_param_form_notifi] = useState({
    id_don_thuoc : null,
    id_hoc_phi : null,
    id_noi_dung_thong_bao : null,
    id_ct_nghi_hoc:null,
    id_diem_danh_ve:null,
    id_chi_tiet_nhan_xet: null
  });
  const [so_thang_hoc_phi, set_so_thang_hoc_phi] = useState(null);

  const [showLoading, setShowLoading] = useState(true);
  const [checkHaveUserToken, setCheckHaveUserToken] = useState(false);


  // const [id_hs_set_home, setId_hs_set_home] = useState(null);


  const Stack = createStackNavigator();
  const HomeStack = createStackNavigator();
  const AccountStack = createStackNavigator();
  const NotificationStack = createStackNavigator();
  const DanhBaStack = createStackNavigator();
  const LoginStack = createStackNavigator();
  const Tabs = createBottomTabNavigator();


  const Drawer = createDrawerNavigator();

  const HomeStackScreen = () => (

      <HomeStack.Navigator initialRouteName={route_notifi}>


        <HomeStack.Screen name="loading" component={Loading} options={{ headerShown: false }} />
        <HomeStack.Screen name="Home" component={Home}
          options={{
            headerStyle: { backgroundColor: color_app },
            headerTitleStyle: {
              textAlign: 'center',
            },
            headerLeft: null
          }}
        />



        <HomeStack.Screen name="Bản tin" component={News} options={{ title: "Tin tức",     headerStyle: { backgroundColor: color_app }, headerTintColor: '#fff' }} />
        <HomeStack.Screen name="detail_new" component={Detail_new} options={{ title: "Tin chi tiết",  headerStyle: { backgroundColor: color_app }, headerTintColor: '#fff' }} />

        <HomeStack.Screen name="Dặn thuốc" component={Medicine} options={{
          //  headerStyle : { backgroundColor: 'rgba(11, 75, 120, 0.82)' },
          headerStyle: { backgroundColor: color_app },
          headerTintColor: '#fff',
          title: "Dặn thuốc"
        }} />
        <HomeStack.Screen name="detail_medicine" component={Detail_medicine}
          initialParams={{ id_: id_param_form_notifi.id_don_thuoc , route_notifi: route_notifi }}
          options={{
            headerStyle: { backgroundColor: color_app },
            headerTintColor: '#fff',
            title: "Chi tiết dặn thuốc"
          }} />
        <HomeStack.Screen name="add_medicine" component={Add_medicine}
          options={{
            headerStyle: { backgroundColor: color_app },
            headerTintColor: '#fff',
            title: "Thêm đơn thuốc",

          }} />

        <HomeStack.Screen name="Index_medicine" component={Index_medicine} 
          initialParams={{ route_notifi: route_notifi }}
          options={{
          headerStyle: { backgroundColor: color_app },
          headerTintColor: '#fff',
          title: "Dặn thuốc"
        }} />
{/* 
        <HomeStack.Screen name="Xin nghỉ" component={DayOff}
          options={{
            //  headerStyle : {backgroundColor: 'rgba(11, 75, 120, 0.82)' },
            headerStyle: { backgroundColor: color_app },
            headerTintColor: '#fff',
            title: "Xin nghỉ học"
          }} /> */}

        <HomeStack.Screen name="tao_don_xin_nghi_hoc" component={Index_XinNghi}
          options={{
            headerStyle: { backgroundColor: color_app },
            headerTintColor: '#fff',
            title: "Đơn nghỉ học",
          }} />

        <HomeStack.Screen name="Hoạt động" component={HoatDong} options={{ title: "Hoạt động" }}
          options={{
            headerStyle: { backgroundColor: color_app },
            headerTintColor: '#fff',
          }} />


        <HomeStack.Screen name="Điểm danh" component={DiemDanh}
          options={{
            //  headerStyle : { backgroundColor: 'rgba(11, 75, 120, 0.82)' },
            headerStyle: { backgroundColor: color_app },
            headerTintColor: '#fff',
            title: "Điểm Danh"
          }} />

        <HomeStack.Screen name="Đón hộ" component={Index_DonHo}
          options={{
            headerStyle: { backgroundColor: color_app },
            headerTintColor: '#fff',
            title: "Đón hộ"
          }} />

   
        <HomeStack.Screen name="Biểu đồ" component={BieuDo}
          options={{
            headerStyle: { backgroundColor: color_app },
            headerTintColor: '#fff',
            title: "Biểu đồ tăng trưởng của bé"
          }} />

        <HomeStack.Screen name="Học phí" component={HocPhi}
          options={{
            headerStyle: { backgroundColor: color_app },
            headerTintColor: '#fff',
            title: "Học phí"
          }} />

        <HomeStack.Screen name="DotCuaThang" component={DotCuaThang}
          initialParams={{ id_thang_thu_tien : id_param_form_notifi.id_hoc_phi , thang_thu: so_thang_hoc_phi }}
          options={{
            headerStyle: { backgroundColor: color_app },
            headerTintColor: '#fff',
            title: "Các đợt của tháng"
          }} />


        <HomeStack.Screen name="ChiTietHocPhi" component={ChiTietHocPhi}
          options={{
            headerStyle: { backgroundColor: color_app },
            headerTintColor: '#fff',
            title: "Chi tiết học phí"
          }} />

        <HomeStack.Screen name="Đánh giá GV" component={Feedback}
          options={{
            headerStyle: { backgroundColor: color_app },
            headerTintColor: '#fff',
            title: "Đánh giá giáo viên"
          }} />

        <HomeStack.Screen name="edit_info_parent" component={EditInfoParent}
          options={{
            headerStyle: { backgroundColor: color_app },
            headerTintColor: '#fff',
            title: "Thông tin phụ huynh"
          }} />

        <HomeStack.Screen name="Album" component={Album}
          options={{
            headerStyle: { backgroundColor: color_app },
            headerTintColor: '#fff',
          }} />

        <HomeStack.Screen name="Detail_Album" component={Detail_Album}
          options={{
            headerStyle: { backgroundColor: color_app },
            headerTintColor: '#fff',
            title: "Ảnh ablum"
          }} />

        <HomeStack.Screen name="detail_diem_danh_ve" component={DetailDiemDanhVe}
          initialParams={{ itemId: 42 }}
          options={{
            headerStyle: { backgroundColor: color_app },
            headerTintColor: '#fff',
            title: "Chi tiết điểm danh về"
          }} />

        <HomeStack.Screen name="ChangePass" component={ChangePass} options={{  
          headerStyle: { backgroundColor: color_app },
            headerTintColor: '#fff',
            title: "Đổi mật khẩu"}} />

        <HomeStack.Screen name="ChiTietNghiHoc" component={ChiTietNghiHoc} 
          initialParams={{ id_ct_nghi_hoc : id_param_form_notifi.id_ct_nghi_hoc  }}
        options={{  
                  headerStyle: { backgroundColor: color_app },
                    headerTintColor: '#fff',
                    title: "Chi tiết nghỉ học"}} />

        <HomeStack.Screen name="NhanXet" component={NhanXet} 
          options={{  
              headerStyle: { backgroundColor: color_app },
                headerTintColor: '#fff',
                title: "Nhận xét về bé" }} />

        <HomeStack.Screen name="ChiTietNhanXet" component={ChiTietNhanXet} 
          initialParams={{ id_chi_tiet_nhan_xet : id_param_form_notifi.id_chi_tiet_nhan_xet  }}
                    options={{  
                          headerStyle: { backgroundColor: color_app },
                            headerTintColor: '#fff',
                            title: "Nhận xét"}} />

        <HomeStack.Screen name="ShowThongBao" component={ShowThongBao}
          initialParams={{ id_noi_dung_tb : id_param_form_notifi.id_noi_dung_thong_bao , route_notifi: route_notifi }}
          options={{  
            headerStyle: { backgroundColor: color_app },
              headerTintColor: '#fff',
              title: "Thông báo"}} />

          <HomeStack.Screen name="HistoryNotification" component={HistoryNotification} options={{ 
                  title: 'Xem thêm thông báo',
                  headerStyle: { backgroundColor: color_app },
                  headerTintColor: '#fff',
                }} />

      </HomeStack.Navigator>
  )

  const AccountScreen = () => (
    <AccountStack.Navigator initialRouteName="CapNhapThongTin">
      <AccountStack.Screen name="Account" component={Account} options={{ headerShown: false }} />
      <AccountStack.Screen name="CapNhapThongTin" component={CapNhapThongTin} options={{
        // headerShown: false
      headerStyle: { backgroundColor: color_app },
        headerTintColor: '#fff',
        title: "Thông tin"
      }} />
    </AccountStack.Navigator>
  )

  const NotificationScreen = () => (

    <NotificationStack.Navigator initialRouteName="Notification">
      <NotificationStack.Screen name="Notification" component={Notification} options={{headerShown: false }} />
      {/* <NotificationStack.Screen name="ShowThongBao" component={ShowThongBao} options={{headerShown: false }} /> */}
    </NotificationStack.Navigator>

  )

  const DanhBaScreen = () => (
    <DanhBaStack.Navigator>
      <DanhBaStack.Screen name="DanhBa" component={ListDanhBa} options={{ title: "Danh Bạ" }} />
    </DanhBaStack.Navigator>
  )

  // const LoginScreen = () => (
  //   <LoginStack.Navigator>
  //      <DanhBaStack.Screen name="Login" component={Login}  options={{title : "Login"}} />
  //   </LoginStack.Navigator>
  // )
  const GuestGreeting = () => (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPass_Step1" component={ForgotPass_Step1} options={{
        headerShown: false,
        header: {
          visible: false,
        },
      }} />
      <Stack.Screen name="ForgotPass_Step2" component={ForgotPass_Step2} options={{
        headerShown: false,
        header: {
          visible: false,
        },
      }} />

      <Stack.Screen name="ForgotPass_Step3" component={ForgotPass_Step3} options={{
        headerShown: false,
        header: {
          visible: false,
        },
      }} />

      <Stack.Screen name="GetPass_Success" component={GetPass_Success} options={{
        headerShown: false,
        header: {
          visible: false,
        },
      }} />
      <Stack.Screen name="testPassWord" component={testPassWord} options={{
        headerShown: false,
        header: {
          visible: false,
        },
      }} />

    </Stack.Navigator>
  )

  async function updateBellNotification() {
    var hs = await AsyncStorage.getItem('data_hs');
    var token = await AsyncStorage.getItem('data_token');
    const data_hs = JSON.parse(hs);
    console.log('data_hs',data_hs);
      ApiNotification.updateBellHs(token,data_hs.id)
        .then(function (response) {
          let data = response.data;
          console.log('update_bell', data)
          store.dispatch(setNumberNotification(0))
        })  
        .catch(function (error) {
          console.log('update_bell_err', error);
        });
  };


  const UserGreeting = () => (
    <>
    <StatusBar backgroundColor={color_app} color="black" />
    <Tabs.Navigator style={styles.tabbutton} initialRouteName="Kids" screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        let iconColor;
        let iconSize;
        if (route.name === 'Kids') {
          iconName = 'home';
          iconColor = focused ? color_app : 'gray';
          iconSize = focused ? 35 : 25;
        } else if (route.name === 'Account') {
          iconName = 'perm-identity';
          iconColor = focused ? color_app : 'gray';
          iconSize = focused ? 35 : 25;

        } else if (route.name === 'Thông báo') {
          iconColor = focused ? color_app : 'gray';
          iconSize = focused ? 35 : 25;
          iconName = 'volume-down';
        }
        else if (route.name === 'DanhBa') {
          iconName = 'camera-front';
        }
        return <MaterialIcons name={iconName} size={iconSize} color={iconColor} />;
      },
    })}
      tabBarOptions={{
        // labelStyle: {
        //   fontSize: 15,
        // },
         showLabel: false,
       
        //  showIcon:true,
      }}
    >
      <Tabs.Screen name="Kids" component={HomeStackScreen} />
      <Tabs.Screen name="Account" component={AccountScreen} />
      
      <Tabs.Screen name="Thông báo" component={NotificationScreen}
        options={{  tabBarBadge: <TabNumberNoti /> }}
        listeners={{
          tabPress: e => {
            updateBellNotification();
          },
        }}
      />

    </Tabs.Navigator>
    </>
  )



  const getHsIdUserCheckTokenUse = (token, id_user,id_hs) => {
    ApiHocSinh.checkHaveHsByIdUser(token, id_user)
      .then(async function (response) {
        if(response.data == 'have'){
          store.dispatch(fetchDataAsyncStorage());
          store.dispatch(fetchTokenAsyncStorage());
          // await selectedHsWithNotification(id_hs)
          setShowLoading(false);
          setCheckHaveUserToken(true);
        }else{
          Alert.alert('Tài khoản này hiện chưa có học sinh')
          // setCheckHaveUserToken(false);
          // setShowLoading(false);
          dangXuat();
        }
      })
      .catch(function (error) {
        console.log(error);
        console.log('token không dùng đc');
        dangXuat();
      });
  };

  async function fetchData() {
        try {
          var token = await AsyncStorage.getItem('data_token');
          var hs_json = await AsyncStorage.getItem('data_hs');
          var data_user = await AsyncStorage.getItem('data_user');
          let user = JSON.parse(data_user);
          let hs = JSON.parse(hs_json);
          console.log('app_hs',hs)
          // check token dùng được hay khonong qua function getHsIdUser
          console.log('app_user',user)
          
          if(user !== null){
            getHsIdUserCheckTokenUse(token,user.id,hs.id);
          }else{
            setCheckHaveUserToken(false);
          }
          setShowLoading(false);
        } catch (e) {
          console.log(e);
         setShowLoading(false);
        }
      }

    

     async function selectedHsWithNotification(id_hs){
        let data_all_hs_json = await AsyncStorage.getItem('data_all_hs');
        let data_all_hs = JSON.parse(data_all_hs_json);

        let arr_all_hs_user_new = [];
        let arr_no_id_chose = [];
        data_all_hs.forEach(
          async (item) => {
            if (item.id == id_hs) {
              console.log('item_selectdddddddddddddđ',item)
              // push hoc sinh chon vào đầu array 
              arr_all_hs_user_new.push(item);
             
            }else{
              arr_no_id_chose.push(item);
            }
          })
          let arr_new = arr_all_hs_user_new.concat(arr_no_id_chose);
          // nối arr có hoc sinh chọn với arr ko  có học đó để cho học sinh chọn lên đầu array
           // await AsyncStorage.removeItem('data_hs');
           await AsyncStorage.setItem('data_hs', JSON.stringify(arr_all_hs_user_new[0]));
           await store.dispatch(fetchDataAsyncStorage());
          // await  AsyncStorage.removeItem('data_all_hs');
          await  AsyncStorage.setItem('data_all_hs',JSON.stringify(arr_new));
          await store.dispatch(setcheckValueCallAgain());

           console.log('đã chuyển học sinh',arr_new );
      }



      function paramRouteNotifition(route_get){
        if(route_get.name_route == 'detail_medicine'){
            setId_param_form_notifi({
              id_don_thuoc : route_get.id,
              id_hoc_phi : null,
              id_noi_dung_thong_bao : null,
              id_ct_nghi_hoc:null,
              id_chi_tiet_nhan_xet: null,
            });
        }else if (route_get.name_route == 'ShowThongBao'){
            setId_param_form_notifi({
              id_don_thuoc : null,
              id_hoc_phi : null,
              id_noi_dung_thong_bao :route_get.id,
              id_ct_nghi_hoc:null,
              id_chi_tiet_nhan_xet: null,
            });
        }else if (route_get.name_route == 'ChiTietNghiHoc'){
            setId_param_form_notifi({
              id_don_thuoc : null,
              id_hoc_phi : null,
              id_noi_dung_thong_bao :null,
              id_ct_nghi_hoc:route_get.id,
              id_chi_tiet_nhan_xet: null,
            });
        }else if (route_get.name_route == 'DotCuaThang'){
              set_so_thang_hoc_phi(route_get.so_thang)
              setId_param_form_notifi({
                id_don_thuoc : null,
                id_hoc_phi : route_get.id,
                id_noi_dung_thong_bao : null,
                id_ct_nghi_hoc:null,
                id_chi_tiet_nhan_xet: null,

              });
         }else if (route_get.name_route == 'ChiTietNhanXet'){
                setId_param_form_notifi({
                  id_don_thuoc : null,
                  id_hoc_phi : null,
                  id_noi_dung_thong_bao : null,
                  id_ct_nghi_hoc:null,
                  id_chi_tiet_nhan_xet: route_get.id,
                });
        }
      }





      // lay thong bao
      const getNumberNotifiNumberHs = async () => {
        var hsinh = await AsyncStorage.getItem('data_hs');
        var data_token = await AsyncStorage.getItem('data_token');
        let data_HocSinh = JSON.parse(hsinh)
        console.log('getNumberNotifiNumberHs đang chạy____________________________',data_HocSinh.id);
        ApiNotification.getNumberNotifiNumberOneHs(data_token.token,data_HocSinh.id)
        .then(function (response) {
            let data = response.data;
            console.log('number',data);
            // dispatch(setcheckValueCallAgain());
            store.dispatch(setNumberNotification(data));
          })
          .catch(function (error) {
          console.log('number_bell_err',error);
          });
      };
      async  function abLister(){
        var data_user = await AsyncStorage.getItem('data_user');
        let dt_user = JSON.parse(data_user);
        if(dt_user.id !== undefined){
              const firebaseRuniing =  database().ref('notification').orderByChild('user_id').equalTo(dt_user.id).limitToLast(1);
              const onListerning = firebaseRuniing.on('child_added', async function(snapshot) { 
                console.log('hs_id______________________________________________')
                var hsinh = await AsyncStorage.getItem('data_hs');
                let dt_hs = JSON.parse(hsinh);
                let value_Get = snapshot.val();
                console.log('hs_id______________________________________________',dt_hs.id)
                if(value_Get.id_hs == dt_hs.id){
                  console.log('call notificaltion')
                  getNumberNotifiNumberHs();
                  store.dispatch(setcheckValueCallAgain());
                }
              });
              
              return () => {
                firebaseRuniing.off('child_added',onListerning);            
              }
       }
    }

      //  end lay thong bao

  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    // Khi còn để app nhưng thoát màn hình
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      // console.log('app_conso',remoteMessage.data.route);
      var route_get = JSON.parse(remoteMessage.data.route);
      console.log('route',route_get);
      // selectedHsWithNotification(route_get.id_hs);
      selectedHsWithNotification(route_get.id_hs);
      store.dispatch(setRouteNotifition(route_get.name_route))
      setRouteNotifi(route_get.name_route);
      paramRouteNotifition(route_get);
     
      });
    // Check whether an initial notification is available

    // Khi đã tắt app 
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log(remoteMessage.data.type)
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          console.log('route',remoteMessage);

          // var route_get = JSON.parse(remoteMessage.data.route);
          var route_get = JSON.parse(remoteMessage.data.route);
          console.log('route',route_get);
          
          // await selectedHsWithNotification(route_get.id_hs);
          await selectedHsWithNotification(route_get.id_hs);
          // setId_hs_set_home(route_get.id_hs);
          setRouteNotifi(route_get.name_route);
          store.dispatch(setRouteNotifition(route_get.name_route))
          paramRouteNotifition(route_get);

          // setInitialRoute(remoteMessage.data.type);
          // e.g. "Settings"
        }
      });
      abLister();
      fetchData();
      setShowLoading(false);

  }, []);

 

  async function dangXuat() {
    var data_user = await AsyncStorage.getItem('data_user');
    let user = JSON.parse(data_user);

    if(user !== null){
      ApiUser.update_device_user(user.id)
        .then(async function (response) {
          console.log(response.data);
          console.log('dangxuat__1')
          await AsyncStorage.clear();
          setCheckHaveUserToken(false);
          // setId_hs_set_home(null);
          setShowLoading(false);

        })
        .catch(   async  function (error) {
          console.log(error);
          console.log('dangxuat__2')
          await AsyncStorage.clear();
          setCheckHaveUserToken(false);
          setShowLoading(false);

        });
    }else{
      console.log('dangxuat__3')
      await AsyncStorage.clear();
      setCheckHaveUserToken(false);
      setShowLoading(false);
      // setId_hs_set_home(null);
    }
  };



  async function getTokenHaveSignIn() {
    try {
      var data_token = await AsyncStorage.getItem('data_token');
      if (data_token.token !== null) {
        setCheckHaveUserToken(true)
        store.dispatch(fetchTokenAsyncStorage());
        store.dispatch(fetchDataAsyncStorage());
        abLister();
      }
    } catch (e) {
      console.log(e);
    }
  }



  const authContext = React.useMemo(() => {
    return {
      signIn: () => {
        getTokenHaveSignIn();
      },
      signOut: () => {
        dangXuat();
      },
      changeRoute: () => {
        setRouteNotifi('Home');
        setId_param_form_notifi({
            id_don_thuoc : null,
            id_hoc_phi : null,
            id_noi_dung_thong_bao : null,
            id_ct_nghi_hoc:null,
            id_diem_danh_ve:null,
            id_chi_tiet_nhan_xet: null
        });
        set_so_thang_hoc_phi(null)
        store.dispatch(setRouteNotifition('Home'))
      }
    }
  })




  return (

    <Provider store={store}>
      <AuthContext.Provider value={authContext}>

    {showLoading ? 
              (   <Modal_Start_App showLoading={showLoading} />  )
     :
        <NavigationContainer>
         {
              checkHaveUserToken == true ? (
                  <Drawer.Navigator drawerContent={props => <DrawerScreen {...props} />} >
                    <Drawer.Screen name="UserGreeting" component={UserGreeting} />
                  </Drawer.Navigator>
              ) : (
                  <GuestGreeting />
              )
          }
        </NavigationContainer>

    }

      </AuthContext.Provider>
    </Provider>

  );
}


const styles = StyleSheet.create({
  tabbutton: {
    backgroundColor: '#f4511e',
  },
});

export default App;