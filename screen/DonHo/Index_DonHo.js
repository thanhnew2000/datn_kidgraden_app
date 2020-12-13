
import React ,{ useState, useEffect }from 'react';
import { View, Text, Image, TouchableOpacity, FlatList,StyleSheet, Button,Modal,Alert } from 'react-native'



import DonHo from '../DonHo/DonHo';
import ThemDonHo from '../DonHo/ThemDonHo';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Index_DonHo =  ({ navigation,route }) => {

const Tab = createMaterialTopTabNavigator();
  return (
        <Tab.Navigator
                    tabBarOptions={{
                    pressColor :'gray',
                    }}>
                        
                <Tab.Screen name="ThemDonHo" component={ThemDonHo}  options={{
                       title: "Thêm đón hộ"
                }} />
                <Tab.Screen name="DonHo" component={DonHo} options={{
                       title: "Lịch sử"
                }} />
             
        </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
   
  });

export default Index_DonHo;
