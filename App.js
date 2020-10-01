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



const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
const AccountStack = createStackNavigator();
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
        backgroundColor: 'rgba(11, 75, 120, 0.82)'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          textAlign: 'center',
       },
       headerTitle: () =><Header/>

    }}
    />


      <HomeStack.Screen name="Bản tin" component={News}  options={{title : "Tin tức"}} />
      <HomeStack.Screen name="detail_new" component={Detail_new}  options={{title : "Tin chi tiết"}} />

      <HomeStack.Screen name="Dặn thuốc" component={Medicine}    options={{
         headerStyle : { backgroundColor: 'rgba(11, 75, 120, 0.82)' },
         headerTintColor: '#fff',
         title : "Dặn thuốc"
       }} />
      <HomeStack.Screen name="detail_medicine" component={Detail_medicine}  options={{title : "Chi tiết dặn thuốc"}}  />
      <HomeStack.Screen name="add_medicine" component={Add_medicine}  
      options={{
         headerStyle : { backgroundColor: 'rgba(11, 75, 120, 0.82)' },
         headerTintColor: '#fff',
         title : "Thêm đơn thuốc"
       }} />

      <HomeStack.Screen name="Xin nghỉ" component={DayOff} 
       options={{
         headerStyle : {backgroundColor: 'rgba(11, 75, 120, 0.82)' },
         headerTintColor: '#fff',
         title : "Xin nghỉ học"
       }} />

    <HomeStack.Screen name="Tạo đơn xin nghỉ" component={ThemDonNghi}  
       options={{
         headerStyle : { backgroundColor: 'rgba(11, 75, 120, 0.82)' },
         headerTintColor: '#fff',
         title : "Tạo đơn nghỉ"
       }} />

    <HomeStack.Screen name="Hoạt động" component={HoatDong}  options={{title : "Hoạt động"}}   
       options={{
         headerStyle : {
            backgroundColor: 'rgba(11, 75, 120, 0.82)'
         },
         headerTintColor: '#fff',
       }} />


     <HomeStack.Screen name="Điểm danh" component={DiemDanh}  
       options={{
         headerStyle : { backgroundColor: 'rgba(11, 75, 120, 0.82)' },
         headerTintColor: '#fff',
         title : "Điểm Danh"
       }} />

    <HomeStack.Screen name="Đón hộ" component={DonHo}  
       options={{
         headerStyle : { backgroundColor: 'rgba(11, 75, 120, 0.82)' },
         headerTintColor: '#fff',
         title : "Đón hộ"
     }} />

    <HomeStack.Screen name="add_donho" component={ThemDonHo}  
          options={{
            headerStyle : { backgroundColor: 'rgba(11, 75, 120, 0.82)' },
            headerTintColor: '#fff',
            title : "Thêm đón họ"
        }} />



  </HomeStack.Navigator>
)

const AccountScreen = () => (
  <AccountStack.Navigator initialRouteName="ListCrud">
     <AccountStack.Screen name="ListCrud" component={ListDanhBa}  options={{title : "Crud danh ba"}} />
  </AccountStack.Navigator>
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
            } else if (route.name === 'Crud') {
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
            backgroundColor: 'rgba(11, 75, 120, 0.82)',
          },
          labelStyle: {
            fontSize: 13,
          },
        }}
      >
      <Tabs.Screen name="Kids" component={HomeStackScreen}   options={{title : "Home" }}   />
      <Tabs.Screen name="Crud" component={AccountScreen}  />
      <Tabs.Screen name="DanhBa" component={DanhBaScreen}   options={{title : "Danh bạ"}} />
      <Tabs.Screen name="Thông báo" component={HomeStackScreen}   options={{title : "Thông báo"}}  options={{ tabBarBadge: 3 }}  />
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
                    } else if (route.name === 'Crud') {
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
            <Tabs.Screen name="Crud" component={AccountScreen}  />
            <Tabs.Screen name="DanhBa" component={DanhBaScreen}   options={{title : "Danh bạ"}} />
            <Tabs.Screen name="Thông báo" component={HomeStackScreen}   options={{title : "Thông báo"}}  options={{ tabBarBadge: 3 }}  />
        </Tabs.Navigator> */}
 

const styles = StyleSheet.create({
  tabbutton: {
     backgroundColor:'#f4511e',
  },
});

export default App;