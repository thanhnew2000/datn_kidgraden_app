// In App.js in a new project

import * as React from 'react';
import {Button, View, Text, StyleSheet,} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screen/Home2';
import ListDanhBa from './screen/ListDanhBa';
import Header from './screen/Header';
import Login from './screen/Login';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
const AccountStack = createStackNavigator();
const DanhBaStack = createStackNavigator();
const LoginStack = createStackNavigator();
const Tabs = createBottomTabNavigator();


const HomeStackScreen = () => (
  <HomeStack.Navigator initialRouteName="Homes">
      <HomeStack.Screen name="Homes" component={Home}  
      options={{
        headerStyle : {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          textAlign: 'center',
       },
       headerLeft: null,
       gesturesEnabled: false,
       header: {
        visible: false,
      },
       headerTitle: () =><Header/>
    }}
    />
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

const Index = () => (
  <Tabs.Navigator  style={styles.tabbutton}  initialRouteName="Kids"  screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;
      let iconColor;
      if (route.name === 'Kids') {
        iconName = 'home';
        iconColor = focused ? 'blue' : 'gray';
      } else if (route.name === 'Crud') {
        iconName ='perm-contact-calendar';
        iconColor = focused ? 'blue' : 'gray';
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
      backgroundColor: '#04B431'
    }
  }}
>
      <Tabs.Screen name="Kids" component={HomeStackScreen}   options={{title : "Home"}}  />
      <Tabs.Screen name="Crud" component={AccountScreen}  />
      <Tabs.Screen name="DanhBa" component={DanhBaScreen}   options={{title : "Danh bạ"}} />
      <Tabs.Screen name="Thông báo" component={HomeStackScreen}   options={{title : "Thông báo"}}  options={{ tabBarBadge: 3 }}  />

</Tabs.Navigator> 
)

function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home2" component={Index}  />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabbutton: {
     backgroundColor:'#f4511e',
  },
});

export default App;