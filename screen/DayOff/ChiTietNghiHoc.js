
import React ,{ useState, useEffect }from 'react';
import axios from 'axios';
import { View, Text, Image, TouchableOpacity, FlatList,StyleSheet, Button,Modal,Alert } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import ListItem from './ListItem';
import ApiXinNghi from '../../android/app/src/api/XinNghiHocApi';
import { useSelector,useDispatch } from 'react-redux'
import moment from "moment";




const ChiTietNghiHoc =  ({ navigation, route }) => {
    
  const data_redux = useSelector(state => state)
  const data_token = data_redux.token;

  const [data, setData] =  useState({});
  const [showLoading, setShowLoading] = useState(false);

    const { item } = route.params;


    const getOneChiTiet = (id_don) => {
      setShowLoading(true);
      ApiXinNghi.getOne(data_token.token,id_don)
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
        if(item == null){
          const { id_ct_nghi_hoc } = route.params;
          getOneChiTiet(id_ct_nghi_hoc);
        }else{
          setData(item);
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
            <Text style={styles.textNormal}> {moment(data['created_at']).format("YYYY-MM-DD") }</Text>
        </View>

        <View style={{}}>
                               <Text style={data['trang_thai'] == 0 ? {color:'',fontSize:16} :{color:'green',fontSize:16}}> 
                                            {data['trang_thai'] == 0 ? 'Chưa xác nhận' : 'Đã xác nhận'}
                                </Text>
        </View>
      </View>
      <View style={{flexDirection:"row",paddingVertical:15}}>
        <Text style={styles.title}>Thời gian nghỉ:</Text>
        <Text style={styles.textNormal}> {data['ngay_bat_dau']} - {data['ngay_ket_thuc']}</Text> 

      </View>
      <View style={{flexDirection:"row"}}>
        <Text style={styles.title}>Lý do:</Text>
        <Text style={styles.textNormal}> {data['noi_dung']}</Text>
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

export default ChiTietNghiHoc;
