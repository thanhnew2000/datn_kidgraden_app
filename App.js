// In App.js in a new project

import React, { useState, useEffect } from 'react';
import { Button, View, Text, StyleSheet, Alert, StatusBar } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
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

import Feedback from './screen/Feedback/Feedback';

// Redux
import { createStore, applyMiddleware } from 'redux';
import myReducer from './src/redux/reducers/index';
import { Provider, useSelector, useDispatch } from 'react-redux';
import thunk from 'redux-thunk'
// import { useSelector,useDispatch,useStore  } from 'react-redux'

import messaging from '@react-native-firebase/messaging';
import database from '@react-native-firebase/database';


import { setNumberNotification, fetchDataAsyncStorage, fetchTokenAsyncStorage, getDataSuccess } from './src/redux/action/index';

import TabNumberNoti from './screen/TabNumberNoti';

import  color_app  from './screen/color_app';
import { color } from 'react-native-reanimated';



const store = createStore(myReducer, applyMiddleware(thunk));






function App() {
  const [route_notifi, setRouteNotifi] = useState('Home');
  const [id_don_thuoc, setIdDonThuoc] = useState(undefined);

  const [showLoading, setShowLoading] = useState(true);
  const [checkHaveUserToken, setCheckHaveUserToken] = useState(false);


  const [id_hs_set_home, setId_hs_set_home] = useState(null);



  // useEffect(() => {
  // start lấy thông báo của học sinh
  // async function onValueChangeNumberNoti () { 
  //   var hs = await AsyncStorage.getItem('data_hs');
  //   let data_HocSinh = JSON.parse(hs)
  //   database()
  //   .ref('notification')
  //    .orderByChild('user_id').equalTo(data_HocSinh.id)
  //     .on('value', function(snapshot) { 
  //       var so_luong_thong_bao = 0
  //       var data_thong_bao = snapshot.val();
  //       console.log(data_thong_bao);
  //       for (const key in data_thong_bao) {
  //         if (data_thong_bao.hasOwnProperty(key)) {
  //           const element = data_thong_bao[key];
  //           if(element.role == 2){
  //               if (element.bell == 1) {
  //                 so_luong_thong_bao++;
  //               }
  //           }
  //         }
  //       }
  //       store.dispatch(setNumberNotification(415,so_luong_thong_bao));
  //   },
  //  );
  // }


  const Stack = createStackNavigator();
  const HomeStack = createStackNavigator();
  const AccountStack = createStackNavigator();
  const NotificationStack = createStackNavigator();
  const DanhBaStack = createStackNavigator();
  const LoginStack = createStackNavigator();
  const Tabs = createBottomTabNavigator();


  const Drawer = createDrawerNavigator();

  const HomeStackScreen = () => (
    <>
      <StatusBar backgroundColor={color_app} color="black" />
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
          initialParams={{ id_don_thuoc: id_don_thuoc, route_notifi: route_notifi }}
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

      </HomeStack.Navigator>
    </>
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
      <NotificationStack.Screen name="ShowThongBao" component={ShowThongBao} options={{headerShown: false }} />

      <NotificationStack.Screen name="HistoryNotification" component={HistoryNotification} options={{ 
        title: 'Tất cả thông báo',
        headerStyle: { backgroundColor: color_app }
      }} />
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
    if (store.getState().notification !== 0) {
      ApiNotification.updateBellHs(token, data_hs.id)
        .then(function (response) {
          let data = response.data;
          console.log('update_bell', data)
        })
        .catch(function (error) {
          console.log('update_bell_err', error);
        });
    }
  };


  // let number_Noti_Show = 0;
  // store.subscribe(function () {
  //   return number_Noti_Show = store.getState().notification;
  // });

  const UserGreeting = () => (
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
        labelStyle: {
          fontSize: 13,
        },
         showLabel: false,
        //  showIcon:true,
      }}
    >
      <Tabs.Screen name="Kids" component={HomeStackScreen}
  
       />
      <Tabs.Screen name="Account" component={AccountScreen} />
      {/* <Tabs.Screen name="DanhBa" component={DanhBaScreen}   options={{title : "Danh bạ"}} /> */}
      <Tabs.Screen name="Thông báo" component={NotificationScreen}
        options={{  tabBarBadge: <TabNumberNoti /> }}
        listeners={{
          tabPress: e => {
            updateBellNotification();
            // console.log('noti_app',store.getState.notification)
            // console.log(TabNumberNoti());
          },
        }}
      />


    </Tabs.Navigator>
  )

  useEffect(() => {

    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      // console.log('app_conso',remoteMessage.data.route);
    });
    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(remoteMessage.data.type)
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          // var route_get = JSON.parse(remoteMessage.data.route);
          // console.log('route',route_get.name_route);
          // if(route_get.name_route == 'detail_medicine'){
          //   setIdDonThuoc(route_get.id)
          // }
          // setRouteNotifi(route_get.name_route);
          setRouteNotifi('detail_medicine');
          setIdDonThuoc(135)

          // setInitialRoute(remoteMessage.data.type);
          // e.g. "Settings"
        }
      });
  }, []);

 

  async function dangXuat() {
    var token = await AsyncStorage.getItem('data_token');
    var data_user = await AsyncStorage.getItem('data_user');
    let user = JSON.parse(data_user);


    ApiUser.update_device_user(user.id)
      .then(async function (response) {
        console.log(response.data)
        await AsyncStorage.removeItem('data_user');
        await AsyncStorage.removeItem('data_hs');
        await AsyncStorage.removeItem('data_token');
        setCheckHaveUserToken(false);
        setId_hs_set_home(null);

      })
      .catch(function (error) {
        console.log(error);
      });
  };




  const getHsIdUser = (token, id_hs) => {
    ApiHocSinh.getHocSinhIdUser(token, id_hs)
      .then(function (response) {
        console.log('token su dung');
        if (id_hs_set_home == null) {
          store.dispatch(fetchDataAsyncStorage());
        } else {
          data_all_hs.forEach(
            async (item) => {
              if (item.id == id_hs_set_home) {
                await AsyncStorage.setItem('data_hs', JSON.stringify(item));
                store.dispatch(fetchDataAsyncStorage());
              }
            })
        }
        store.dispatch(fetchTokenAsyncStorage());
        setShowLoading(false);
        setCheckHaveUserToken(true);
      })
      .catch(function (error) {
        console.log(error);
        console.log('token không dùng đc');
        dangXuat();
      });
  };

  // useEffect(() => {
  //   // Get the device token
  //   messaging()
  //     .getToken()
  //     .then(token => {
  //       console.log('device',token)
  //       Alert.alert(token)
  //       // return saveTokenToDatabase(token);
  //     });

  //   // If using other push notification providers (ie Amazon SNS, etc)
  //   // you may need to get the APNs token instead for iOS:
  //   // if(Platform.OS == 'ios') { messaging().getAPNSToken().then(token => { return saveTokenToDatabase(token); }); }

  //   // Listen to whether the token changes
  //   // return messaging().onTokenRefresh(token => {
  //   //   saveTokenToDatabase(token);
  //   // });
  // }, []);




  useEffect(() => {
    async function fetchData() {
      try {
        var token = await AsyncStorage.getItem('data_token');
        var data_user = await AsyncStorage.getItem('data_user');
        var json_all_hs = await AsyncStorage.getItem('data_all_hs');
        let user = JSON.parse(data_user);
        let data_all_hs = JSON.parse(json_all_hs);
        // check token dùng được hay khonong qua function getHsIdUser
        getHsIdUser(token, user.id);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);


  async function getTokenHaveSignIn() {
    try {
      var data_token = await AsyncStorage.getItem('data_token');
      if (data_token.token !== null) {
        setCheckHaveUserToken(true)
        store.dispatch(fetchTokenAsyncStorage());
        store.dispatch(fetchDataAsyncStorage());
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
      }
    }
  })




  return (

    <Provider store={store}>
      <AuthContext.Provider value={authContext}>

    {showLoading  == true ? 
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