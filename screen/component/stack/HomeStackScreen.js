import React ,{ useState, useEffect }from 'react';
import {
    View,
    Button,
    StatusBar
  } from 'react-native';
  import axios from "axios";
  import { Input } from 'react-native-elements';
  import { NavigationContainer, useNavigation } from '@react-navigation/native';
  import { createStackNavigator } from '@react-navigation/stack';
  import { createDrawerNavigator } from '@react-navigation/drawer';
  import { useSelector,useDispatch } from 'react-redux'


  
import color_app from '../../color_app'

import News from '../../News/News';
import Detail_new from '../../News/Detail_new';

import Medicine from '../../Medicine/Medicine';
import Detail_medicine from '../../Medicine/Detail_medicine';
import Index_medicine from '../../Medicine/Index_medicine';
import Add_medicine from '../../Medicine/Add_medicine';

import DayOff from '../../DayOff/DayOff';
import Index_XinNghi from'../../DayOff/Index_XinNghi';
import ThemDonNghi from '../../DayOff/ThemDonNghi';

import HoatDong from '../../HoatDong/HoatDong';

import Album from '../../Album/Album';
import Detail_Album from '../../Album/Detail_Album';

import DiemDanh from '../../DiemDanh/DiemDanh';
import DetailDiemDanhVe from '../../DiemDanh/DetailDiemDanhVe';

import DonHo from '../../DonHo/DonHo';
import Index_DonHo from '../../DonHo/Index_DonHo';
import ThemDonHo from '../../DonHo/ThemDonHo';

import BieuDo from '../../BieuDo/BieuDo';

import Account from '../../Account/Account';
import ChangePass from '../../Account/ChangePass';
import CapNhapThongTin from '../../Account/CapNhapThongTin';
import EditInfoParent from '../../Account/EditInfoParent';

import HistoryNotification from '../../Notification/HistoryNotification';

import HocPhi from '../../HocPhi/HocPhi';
import ChiTietHocPhi from '../../HocPhi/ChiTietHocPhi';

import Loading from '../../Loading';
import Feedback from '../../Feedback/Feedback';
import Home from '../../Home2';


const HomeStackScreen = ({route_notifi,id_don_thuoc}) => {

    const HomeStack = createStackNavigator();
  
      return (
    
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
                  //  headerStyle : { backgroundColor: 'rgba(11, 75, 120, 0.82)' },
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
        
                <HomeStack.Screen name="ChangePass" component={ChangePass} options={{ title: ' Đổi mật khẩu' }} />
        
              </HomeStack.Navigator>
            </>
          )
  }
  
export default HomeStackScreen