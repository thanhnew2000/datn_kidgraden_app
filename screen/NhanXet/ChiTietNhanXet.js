
import React ,{ useState, useEffect }from 'react';
import axios from 'axios';
import { View, Text, Image, TouchableOpacity, FlatList,StyleSheet, Button,Modal,Alert } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import ApiNhanXet from '../../android/app/src/api/NhanXet';
import { useSelector,useDispatch } from 'react-redux'
import moment from "moment";
import AsyncStorage from '@react-native-community/async-storage';


import HeaderClickFromThongBao from '../HeaderClickFromThongBao';
import HeaderNotifiWhenClick from '../HeaderNotifiWhenClick';


const ChiTietNhanXet =  ({navigation, route }) => {

  const data_redux = useSelector(state => state)
  const data_token = data_redux.token;
  const route_notifi = data_redux.route_notifi;

  const [data, setData] =  useState({});
  const [showLoading, setShowLoading] = useState(false);


   const getOneChiTiet = async (id_don) => {
    var token = await AsyncStorage.getItem('data_token');
      setShowLoading(true);
      ApiNhanXet.getOne(token,id_don)
      .then(function (response) {
          let data = response.data;
          setData(data);
          setShowLoading(false);
      }).catch(function (error) {
          Alert.alert('Không lấy được dữ liệu','Đơn xin nghỉ không lấy đc dữ liệu hãy chọn lại');
          setShowLoading(false);
          console.log('',error);
        });
    };

    useEffect(() => {
      const { thong_bao } = route.params;
      if(thong_bao == true || route_notifi == 'ChiTietNhanXet'){
          navigation.setOptions({
            headerTitle: () => <HeaderNotifiWhenClick navigation={navigation} name_header_tab="Chi tiết nhận xét"/>,
            headerLeft: null
          })
       }

      const { item } = route.params;
        if(item == null){
          const { id_chi_tiet_nhan_xet } = route.params;
          console.log('ct_nx_1',id_chi_tiet_nhan_xet);

          getOneChiTiet(id_chi_tiet_nhan_xet);
        }else{
          console.log('ct_nx_2');
          setData(item.item);
          console.log('item',item.item.bua_an)
        }
    }, []);

  return (

  <View style={styles.containers}>
      <View style={{flexDirection:"row"}}>

      <View style={showLoading ? {display:'flex'} : {display:'none'}}>
            <Image style={{width: 70 , height:70,alignSelf:'center'}}   source={require('../../android/app/src/tenor.gif')}/>
          </View>


        <View style={{flexDirection:"row",width:'60%'}}>
            <Text style={styles.title}>Ngày gửi:</Text>
            <Text style={styles.textNormal}> {moment(data.created_at).format("YYYY-MM-DD") }</Text>
        </View>
      </View>
      <View style={{flexDirection:"row",paddingVertical:15}}>
        <Text style={styles.title}>Giáo viên:</Text>
        <Text style={styles.textNormal}> {data.giao_vien == null ? '' : data.giao_vien.ten  }</Text>
      </View>

        <View>
            <Text style={styles.title}>Ăn:</Text>
            <Text style={styles.textNormal}> {data.bua_an}</Text>
        </View>
        <View>
            <Text style={styles.title}>Ngủ:</Text>
            <Text style={styles.textNormal}> {data.ngu}</Text>
        </View>
        <View>
            <Text style={styles.title}>Vệ sinh :</Text>
            <Text style={styles.textNormal}> {data.ve_sinh}</Text>
        </View>
  </View>

  );
};

const styles = StyleSheet.create({
    containers:{ 
        flex:1 , 
        padding:10,
        backgroundColor:'#fff',
    },
    title:{
        fontSize:17,fontWeight:'bold'
    },
    textNormal:{
        fontSize:16
    },
    

  });

export default ChiTietNhanXet;
