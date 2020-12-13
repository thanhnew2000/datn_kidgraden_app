
import React ,{ useState, useEffect }from 'react';
import { View, Text, Image, TouchableOpacity, FlatList,StyleSheet, Button,Modal,Alert } from 'react-native'


import Add_medicine from './Add_medicine';
import Medicine from './Medicine';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Index_medicine =  ({ navigation,route }) => {

const Tab = createMaterialTopTabNavigator();
  return (
        <Tab.Navigator
                    tabBarOptions={{
                    pressColor :'gray',
                    }}>
                        
                <Tab.Screen name="Add_medicine" component={Add_medicine}  options={{
                       title: "Thêm đơn dặn thuốc"
                }} />
                <Tab.Screen name="Medicine" component={Medicine} options={{
                       title: "Lịch sử"
                }} />
             
        </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
   
  });

export default Index_medicine;
