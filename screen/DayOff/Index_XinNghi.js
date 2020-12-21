
import React ,{ useState, useEffect }from 'react';
import axios from 'axios';
import { View, Text, Image, TouchableOpacity, FlatList,StyleSheet, Button,Modal,Alert ,LogBox} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import ListItem from './ListItem';
import moment from "moment";
import ipApi from '../../android/app/src/api/ipApi';
import AsyncStorage from '@react-native-community/async-storage';
import ApiXinNghi from '../../android/app/src/api/XinNghiHocApi';
import Modal_Loading from '../component/reuse/Modal_Loading'
import { useSelector,useDispatch } from 'react-redux'


import ThemDonNghi from '../DayOff/ThemDonNghi';
import DayOff from '../DayOff/DayOff';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

LogBox.ignoreAllLogs();


const Index_XinNghi =  ({ navigation,route }) => {


const Tab = createMaterialTopTabNavigator();
  return (

        <Tab.Navigator
        tabBarOptions={{
          pressColor :'gray',
        }}
                >
       
                <Tab.Screen name="ThemDonNghi" component={ThemDonNghi} options={{
                       title: "Thêm đơn nghỉ học"
                }} />
                <Tab.Screen name="DayOff" component={DayOff}  options={{
                       title: "Lịch sử"
                }} />
        </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
    containers:{ 
        flex:1 , 
        flexDirection: 'column',
        paddingLeft:5,
        paddingRight:5,
        backgroundColor:'#fff',
    },
    status:{
        width:95    ,
        height:20,
        backgroundColor:'#ddd',
        paddingHorizontal:3,
        marginTop:10,
        marginLeft:-2,
    }
   
  });

export default Index_XinNghi;
