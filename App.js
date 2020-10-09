// In App.js in a new project

import React ,{ useState, useEffect }from 'react';
import {Button, View, Text, StyleSheet , AsyncStorage,Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screen/Home2';
import ListDanhBa from './screen/ListDanhBa';
import Header from './screen/Header';
import Login from './screen/Login';
import Loading from './screen/Loading';
import { AuthContext } from './screen/context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


import News from './screen/News/News';
import Detail_new from './screen/News/Detail_new';

import Medicine from './screen/Medicine/Medicine';
import Detail_medicine from './screen/Medicine/Detail_medicine';
import Add_medicine from './screen/Medicine/Add_medicine';

import DayOff from './screen/DayOff/DayOff';
import ThemDonNghi from './screen/DayOff/ThemDonNghi';

import HoatDong from './screen/HoatDong/HoatDong';

import DiemDanh from './screen/DiemDanh/DiemDanh';

import DonHo from './screen/DonHo/DonHo';
import ThemDonHo from './screen/DonHo/ThemDonHo';

import BieuDo from './screen/BieuDo/BieuDo';

import Account from './screen/Account/Account';
import ChangePass from './screen/Account/ChangePass';
import CapNhapThongTin from './screen/Account/CapNhapThongTin';

import Notification from './screen/Notification/Notification';

import HocPhi from './screen/HocPhi/HocPhi';
import ChiTietHocPhi from './screen/HocPhi/ChiTietHocPhi';


import Feedback from './screen/Feedback/Feedback';


const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
const AccountStack = createStackNavigator();
const NotificationStack = createStackNavigator();
const DanhBaStack = createStackNavigator();
const LoginStack = createStackNavigator();
const Tabs = createBottomTabNavigator();


const HomeStackScreen = () => (
  <HomeStack.Navigator initialRouteName="Home">

      <HomeStack.Screen name="loading" component={Loading}  options={{ headerShown: false }} />


      <HomeStack.Screen name="Home" component={Home}  
      options={{
        headerStyle : {
        // backgroundColor: 'rgb(98, 248, 160)'
        backgroundColor: '#78bbe6'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          textAlign: 'center',
       },
       headerTitle: () =><Header/>

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
      <HomeStack.Screen name="detail_medicine" component={Detail_medicine}  options={{
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

    <HomeStack.Screen name="Tạo đơn xin nghỉ" component={ThemDonNghi}  
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

  </HomeStack.Navigator>
)

const AccountScreen = () => (
  <AccountStack.Navigator initialRouteName="Account">
     <AccountStack.Screen name="Account" component={Account}  options={{ headerShown: false}} />
     <AccountStack.Screen name="ChangePass" component={ChangePass}  options={{ title:' Đổi mật khẩu'}} />
     <AccountStack.Screen name="CapNhapThongTin" component={CapNhapThongTin}  options={{ title:'Cập nhập thông tin'}} />
  </AccountStack.Navigator>
)

const NotificationScreen = () => (
  <NotificationStack.Navigator initialRouteName="Notification">
     <NotificationStack.Screen name="Notification" component={Notification}  options={{ title:'Thông báo'}} />
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
      <Tabs.Screen name="Account" component={AccountScreen}  />
      <Tabs.Screen name="DanhBa" component={DanhBaScreen}   options={{title : "Danh bạ"}} />
      <Tabs.Screen name="Thông báo" component={NotificationScreen}   options={{title : "Thông báo" , tabBarBadge:'3'}}   />
</Tabs.Navigator>
)

function App() {
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try{
        var v = await AsyncStorage.getItem('user_token');
        if(v !== null){
          setUserToken(v)
        }
      }catch (e){
        console.log(e);
      }
   }
   fetchData();
},[]);


  async function getTokenHaveSignIn() {
    try{
      var v = await AsyncStorage.getItem('user_token');
      if(v !== null){
        setUserToken(v)
      }
    }catch (e){
      console.log(e);
    }
 }




  const authContext = React.useMemo(()=>{
    return {
      signIn: () => {
        getTokenHaveSignIn();
      },
      signOut: () => {
        AsyncStorage.removeItem('user_token');
        setUserToken(null);
      }
    }
  })

 function Routers() {
    if (userToken) {
      return <UserGreeting />;
    }
    return <GuestGreeting />;
  }


  // useEffect(() => {
  //       async function fetchData() {
  //         try{
  //           var v = await AsyncStorage.getItem('user_token');
  //           if(v !== null){
  //             setloginis(true)
  //           }
  //         }catch (e){
  //           console.log(e);
  //         }
  //      }
  //      fetchData();
  // },[]);

 
  return (

    <AuthContext.Provider value ={authContext}>
        <NavigationContainer>
          {userToken ? (
            <UserGreeting />
          ) : (
            <GuestGreeting />
          )}

          {/* <Greeting isLoggedIn={true} /> */}
       </NavigationContainer>
    </AuthContext.Provider>

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