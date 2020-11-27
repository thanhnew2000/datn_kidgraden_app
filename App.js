// In App.js in a new project

import React ,{ useState, useEffect }from 'react';
import {Button, View, Text, StyleSheet , Alert } from 'react-native';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screen/Home2';
import ListDanhBa from './screen/ListDanhBa';
import DrawerScreen from './screen/DrawerScreen';

import Header from './screen/Header';
import Login from './screen/Login';
import Loading from './screen/Loading';
import { AuthContext } from './screen/context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import ApiHocSinh from './android/app/src/api/HocSinhApi';
import ApiUser from './android/app/src/api/users';
// import { AuthContext } from './screen/context';
import Modal_Start_App from './screen/component/reuse/Modal_Start_App'


import News from './screen/News/News';
import Detail_new from './screen/News/Detail_new';

import Medicine from './screen/Medicine/Medicine';
import Detail_medicine from './screen/Medicine/Detail_medicine';
import Add_medicine from './screen/Medicine/Add_medicine';

import DayOff from './screen/DayOff/DayOff';
import ThemDonNghi from './screen/DayOff/ThemDonNghi';

import HoatDong from './screen/HoatDong/HoatDong';

import Album from './screen/Album/Album';
import Detail_Album from './screen/Album/Detail_Album';

import DiemDanh from './screen/DiemDanh/DiemDanh';
import DetailDiemDanhVe from './screen/DiemDanh/DetailDiemDanhVe';

import DonHo from './screen/DonHo/DonHo';
import ThemDonHo from './screen/DonHo/ThemDonHo';

import BieuDo from './screen/BieuDo/BieuDo';

import Account from './screen/Account/Account';
import ChangePass from './screen/Account/ChangePass';
import CapNhapThongTin from './screen/Account/CapNhapThongTin';
import EditInfoParent from './screen/Account/EditInfoParent';

import Notification from './screen/Notification/Notification';
import HistoryNotification from './screen/Notification/HistoryNotification';

import HocPhi from './screen/HocPhi/HocPhi';
import ChiTietHocPhi from './screen/HocPhi/ChiTietHocPhi';


import Feedback from './screen/Feedback/Feedback';

// Redux
import { createStore,applyMiddleware} from 'redux';
import myReducer from './src/redux/reducers/index';
import {Provider,useSelector,useDispatch} from 'react-redux';
import thunk from 'redux-thunk'

import messaging from '@react-native-firebase/messaging';


import database from '@react-native-firebase/database';


import { setNumberNotification } from './src/redux/action/index';

import TabNumberNoti from './screen/TabNumberNoti';




const store = createStore(myReducer,applyMiddleware(thunk));






function App() {
  const [route_notifi, setRouteNotifi] = useState('Home');
  const [id_don_thuoc, setIdDonThuoc] = useState(undefined);


  

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
      <HomeStack.Screen name="loading" component={Loading}  options={{ headerShown: false }} />
      <HomeStack.Screen name="Home" component={Home}  
      options={{
        headerStyle : {
          backgroundColor: '#78bbe6'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          textAlign: 'center',
        },
     
    }}
    />


        
      <HomeStack.Screen name="Bản tin" component={News}  options={{title : "Tin tức", headerStyle : { backgroundColor: '#78bbe6'}, headerTintColor: '#fff' }} />
      <HomeStack.Screen name="detail_new" component={Detail_new}  options={{title : "Tin chi tiết", headerStyle : { backgroundColor: '#78bbe6'}, headerTintColor: '#fff' }} />

      <HomeStack.Screen name="Dặn thuốc" component={Medicine}    options={{
        //  headerStyle : { backgroundColor: 'rgba(11, 75, 120, 0.82)' },
         headerStyle : { backgroundColor: '#78bbe6' },
         headerTintColor: '#fff',
         title : "Dặn thuốc"
       }} />
      <HomeStack.Screen name="detail_medicine" component={Detail_medicine} 
       initialParams={{ id_don_thuoc: id_don_thuoc }}
       options={{
         headerStyle : { backgroundColor: '#78bbe6' },
         headerTintColor: '#fff',
         title : "Chi tiết dặn thuốc"
       }} />
      <HomeStack.Screen name="add_medicine" component={Add_medicine}  
      options={{
         headerStyle : { backgroundColor: '#78bbe6' },
         headerTintColor: '#fff',
         title : "Thêm đơn thuốc"
       }} />

      <HomeStack.Screen name="Xin nghỉ" component={DayOff} 
       options={{
        //  headerStyle : {backgroundColor: 'rgba(11, 75, 120, 0.82)' },
         headerStyle : { backgroundColor: '#78bbe6' },
         headerTintColor: '#fff',
         title : "Xin nghỉ học"
       }} />

    <HomeStack.Screen name="tao_don_xin_nghi_hoc" component={ThemDonNghi}  
       options={{
        headerStyle : { backgroundColor: '#78bbe6' },
         headerTintColor: '#fff',
         title : "Tạo đơn nghỉ"
       }} />

    <HomeStack.Screen name="Hoạt động" component={HoatDong}  options={{title : "Hoạt động"}}   
       options={{
        headerStyle : { backgroundColor: '#78bbe6' },
         headerTintColor: '#fff',
       }} />


     <HomeStack.Screen name="Điểm danh" component={DiemDanh}  
       options={{
        //  headerStyle : { backgroundColor: 'rgba(11, 75, 120, 0.82)' },
         headerStyle : { backgroundColor: '#78bbe6' },

         headerTintColor: '#fff',
         title : "Điểm Danh"
       }} />

    <HomeStack.Screen name="Đón hộ" component={DonHo}  
       options={{
         headerStyle : { backgroundColor: '#78bbe6' },
         headerTintColor: '#fff',
         title : "Đón hộ"
     }} />

    <HomeStack.Screen name="add_donho" component={ThemDonHo}  
          options={{
            headerStyle : { backgroundColor: '#78bbe6' },
            headerTintColor: '#fff',
            title : "Thêm đón họ"
        }} />

      <HomeStack.Screen name="Biểu đồ" component={BieuDo}  
                options={{
                  headerStyle : { backgroundColor: '#78bbe6' },
                  headerTintColor: '#fff',
                  title : "Biểu đồ tăng trưởng của bé"
              }} />

      <HomeStack.Screen name="Học phí" component={HocPhi}  
                options={{
                  headerStyle : { backgroundColor: '#78bbe6' },
                  headerTintColor: '#fff',
                  title : "Học phí"
              }} />

      <HomeStack.Screen name="ChiTietHocPhi" component={ChiTietHocPhi}  
                options={{
                  headerStyle : { backgroundColor: '#78bbe6' },
                  headerTintColor: '#fff',
                  title : "Chi tiết học phí"
              }} />     

      <HomeStack.Screen name="Đánh giá GV" component={Feedback}  
          options={{
            headerStyle : { backgroundColor: '#78bbe6' },
            headerTintColor: '#fff',
            title : "Đánh giá giáo viên"
        }} />     

          <HomeStack.Screen name="edit_info_parent" component={EditInfoParent}  
          options={{
            headerStyle : { backgroundColor: '#78bbe6' },
            headerTintColor: '#fff',
            title : "Thông tin phụ huynh"
        }} />          

       <HomeStack.Screen name="Album" component={Album}  
          options={{
            headerStyle : { backgroundColor: '#78bbe6' },
            headerTintColor: '#fff',
        }} />         

        <HomeStack.Screen name="Detail_Album" component={Detail_Album}  
          options={{
            headerStyle : { backgroundColor: '#78bbe6' },
            headerTintColor: '#fff',
        }} />  


        
        <HomeStack.Screen name="detail_diem_danh_ve" component={DetailDiemDanhVe}  
              initialParams={{ itemId: 42 }}
              options={{
                headerStyle : { backgroundColor: '#78bbe6' },
                headerTintColor: '#fff',
                 title : "Chi tiết điểm danh về"
            }} />  

     <HomeStack.Screen name="ChangePass" component={ChangePass}  options={{ title:' Đổi mật khẩu'}} />

  </HomeStack.Navigator>
)

const AccountScreen = () => (
  <AccountStack.Navigator initialRouteName="CapNhapThongTin">
     <AccountStack.Screen name="Account" component={Account}  options={{ headerShown: false}} />
     <AccountStack.Screen name="CapNhapThongTin"   component={CapNhapThongTin}      options={{
            headerStyle : { backgroundColor: '#78bbe6' },
            headerTintColor: '#fff',
            title : "Thông tin"
        }} />
  </AccountStack.Navigator>
)

const NotificationScreen = () => (
  <NotificationStack.Navigator initialRouteName="Notification">
     <NotificationStack.Screen name="Notification" component={Notification}  options={{ title:'Thông báo'}} />
     <NotificationStack.Screen name="HistoryNotification" component={HistoryNotification}  options={{ title:'Tất cả thông báo'}} />
  </NotificationStack.Navigator>
)

const DanhBaScreen = () => (
  <DanhBaStack.Navigator>
     <DanhBaStack.Screen name="DanhBa" component={ListDanhBa}  options={{title : "Danh Bạ"}} />
  </DanhBaStack.Navigator>
)

// const LoginScreen = () => (
//   <LoginStack.Navigator>
//      <DanhBaStack.Screen name="Login" component={Login}  options={{title : "Login"}} />
//   </LoginStack.Navigator>
// )
const GuestGreeting  = () => (
  <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
   </Stack.Navigator> 
)


let  number_Noti_Show = 0;
 store.subscribe( function(){
  return number_Noti_Show = store.getState().notification;
}); 
const UserGreeting = () => (
  <Tabs.Navigator  style={styles.tabbutton}  initialRouteName="Kids"  screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            // let iconColor;
            if (route.name === 'Kids') {
              iconName = 'home';
              // iconColor = focused ? 'blue' : 'gray';
            } else if (route.name === 'Account') {
              iconName ='perm-contact-calendar';
              // iconColor = focused ? 'blue' : 'gray';
            }else if (route.name === 'Thông báo') {
              iconName ='volume-down';
            }
            else if (route.name === 'DanhBa') {
              iconName ='camera-front';
            }
            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'white',
          style:{
            backgroundColor: '#78bbe6',
            // backgroundColor: 'rgba(11, 75, 120, 0.82)',
          },
          labelStyle: {
            fontSize: 13,
          },
        }}
      >
      <Tabs.Screen name="Kids" component={HomeStackScreen}   options={{title : "Home" }}   />
      <Tabs.Screen name="Account" component={AccountScreen}  options={{title : "Thông tin" }}  />
      {/* <Tabs.Screen name="DanhBa" component={DanhBaScreen}   options={{title : "Danh bạ"}} /> */}
      <Tabs.Screen name="Thông báo" component={NotificationScreen}   options={{title : "Thông báo" , tabBarBadge: <TabNumberNoti/>}}   />



</Tabs.Navigator>
)
  // const [notification_number, setNotification_Number] = useState(0);
  // store.subscribe(() => {setNotification_Number(store.getState().notification)})
 

  const [showLoading, setShowLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
    const [data_HS, setDataHS] = useState(null);
    useEffect(() => {
        async function fetchData() {
          try{
            var token = await AsyncStorage.getItem('data_token');
            var hs = await AsyncStorage.getItem('data_hs');
            if(token !== null && hs !== null){
              let data_HocSinh = JSON.parse(hs)
              setUserToken(token) 
              setDataHS(data_HocSinh) 

              // onValueChangeNumberNoti(data_HocSinh.id)
            }
          }catch (e){
            console.log(e);
          }
      }
      fetchData();
     
    },[]);
    // useEffect(() => {


    // start lấy thông báo của học sinh
      const onValueChangeNumberNoti = (id_hs)=>{ 
        // database()
        // .ref('notification')
        //  .orderByChild('user_id').equalTo(id_hs)
        //   .on('value', function(snapshot) { 
        //     var so_luong_thong_bao = 0
        //     var data_thong_bao = snapshot.val();
        //     for (const key in data_thong_bao) {
        //       if (data_thong_bao.hasOwnProperty(key)) {
        //         const element = data_thong_bao[key];
        //         if (element.type == 1) {
        //           so_luong_thong_bao++;
                 var so_luong_thong_bao = 1
                  store.dispatch(setNumberNotification(so_luong_thong_bao));
      //         }
      //         }
      //       }
      //   },
      //  );
      }


      // Stop listening for updates when no longer required
      // return () =>
      //   database()
      //     .ref('phan_hoi_don_thuoc')
      //     .off('value', onValueChange);
    // }, []);
    // end lấy thông báo của học sinh
  // const navigation = useNavigation();
  // const [loading, setLoading] = useState(true);
  // const [initialRoute, setInitialRoute] = useState('DanhBa');

  //  useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, []);
  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, []);

  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      // console.log('app_conso',remoteMessage.data.route);
      // setRouteNotifi(remoteMessage.data.route)
      // navigation.navigate(remoteMessage.data.type);

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
          console.log('app_conso',remoteMessage.data.route);
          // if(remoteMessage.data.route == 'detail_medicine'){
          //   setIdDonThuoc()
          // }
          setRouteNotifi(remoteMessage.data.route);
          
          // setInitialRoute(remoteMessage.data.type);
           // e.g. "Settings"
        }
        setLoading(false);
      });
  }, []);

  // if (loading) {
  //   return null;
  // }
  const getHsIdUser = (token,id_hs) => {
    ApiHocSinh.getHocSinhIdUser(token,id_hs)
      .then(function (response) {
        console.log('token su dung')
      })
      .catch(function (error) {
        console.log(error);
        AsyncStorage.removeItem('data_user');
        AsyncStorage.removeItem('data_hs');
        AsyncStorage.removeItem('data_token');
        setUserToken(null);
      });
  };

  useEffect(() => {
    // Get the device token
    messaging()
      .getToken()
      .then(token => {
        console.log('device',token)
        Alert.alert(token)
        // return saveTokenToDatabase(token);
      });
      
    // If using other push notification providers (ie Amazon SNS, etc)
    // you may need to get the APNs token instead for iOS:
    // if(Platform.OS == 'ios') { messaging().getAPNSToken().then(token => { return saveTokenToDatabase(token); }); }

    // Listen to whether the token changes
    // return messaging().onTokenRefresh(token => {
    //   saveTokenToDatabase(token);
    // });
  }, []);


  useEffect(() => {
    async function fetchData() {
      try{
        var token = await AsyncStorage.getItem('data_token');
        var data_user = await AsyncStorage.getItem('data_user');
        let user =  JSON.parse(data_user);
        if(token !== null){
          await getHsIdUser(token,user.id);
          setUserToken(token)
          setShowLoading(false)
        }else{
          setShowLoading(false)
        }
      }catch (e){
        console.log(e);
      }
   }
   fetchData();
},[]);


  async function getTokenHaveSignIn() {
    try{
        var token = await AsyncStorage.getItem('data_token');
          if(token !== null){
            setUserToken(token)
          }
    }catch (e){
      console.log(e);
    }
 }



 async function  dangXuat () {
  var token = await AsyncStorage.getItem('data_token');
  var data_user =  await AsyncStorage.getItem('data_user');
  let user =  JSON.parse(data_user);
  let data = {
    device : ' '
  }
  // AsyncStorage.removeItem('data_user');
  // AsyncStorage.removeItem('data_hs');
  // AsyncStorage.removeItem('data_token');
  // setUserToken(null);
  ApiUser.edit(token,user.id,data)
    .then( async function (response) {
      console.log(response.data)
      await AsyncStorage.removeItem('data_user');
      await AsyncStorage.removeItem('data_hs');
      await AsyncStorage.removeItem('data_token');
        setUserToken(null);
    })
    .catch(function (error) {
      console.log(error);
    });
};


  const authContext = React.useMemo(()=>{
    return {
      signIn: () => {
        getTokenHaveSignIn();
      },
      signOut: () => {
        dangXuat();
      }
    }
  })

 


  return (

    <Provider store={store}>
      <AuthContext.Provider value ={authContext}>
          <NavigationContainer>
            {/* {userToken ? (
              <UserGreeting />
            ) : (
              <GuestGreeting />
            )} */}

            {/* <Greeting isLoggedIn={true} /> */}
          {
                userToken ? (
                  <Drawer.Navigator drawerContent={props => <DrawerScreen {...props} />} >
                      {/* <Drawer.Screen name="Home"  component={() => UserGreeting(soLuongThongBao)}    /> */}
                      <Drawer.Screen name="Home"  component={ UserGreeting }    />
                    </Drawer.Navigator>
                    ) : (
                    <GuestGreeting />
                  ) 
          
          }


        <Modal_Start_App showLoading = {showLoading} /> 
        

        </NavigationContainer>
      </AuthContext.Provider>
    </Provider>

       );
      }
            {/* <Tabs.Navigator  style={styles.tabbutton}  initialRouteName="Kids"  screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    // let iconColor;
                    if (route.name === 'Kids') {
                      iconName = 'home';
                      // iconColor = focused ? 'blue' : 'gray';
                    } else if (route.name === 'Account') {
                      iconName ='perm-contact-calendar';
                      // iconColor = focused ? 'blue' : 'gray';
                    }else if (route.name === 'Thông báo') {
                      iconName ='volume-down';
                    }
                    else if (route.name === 'DanhBa') {
                      iconName ='camera-front';
                    }
                    return <MaterialIcons name={iconName} size={size} color={color} />;
                  },
                })}
                tabBarOptions={{
                  activeTintColor: 'tomato',
                  inactiveTintColor: 'white',
                  style:{
                    // backgroundColor: '#04B431'
                    backgroundColor: 'rgba(11, 75, 120, 0.82)'
                    
                  }
                }}
              >

            <Tabs.Screen name="Kids" component={HomeStackScreen}   options={{title : "Home" }}   />
            <Tabs.Screen name="Account" component={AccountScreen}  />
            <Tabs.Screen name="DanhBa" component={DanhBaScreen}   options={{title : "Danh bạ"}} />
            <Tabs.Screen name="Thông báo" component={HomeStackScreen}   options={{title : "Thông báo"}}  options={{ tabBarBadge: 3 }}  />
        </Tabs.Navigator> */}
 

const styles = StyleSheet.create({
  tabbutton: {
     backgroundColor:'#f4511e',
  },
});

export default App;