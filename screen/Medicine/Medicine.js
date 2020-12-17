
import React ,{ useState, useEffect }from 'react';
import axios from 'axios';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet,Alert,Modal } from 'react-native'
import IconNews from '../../android/app/src/asset/img/icon-news.png';
import IconKidsExercise from '../../android/app/src/asset/img/icon-kids-exercise.jpg';
import IconKidsStudy from '../../android/app/src/asset/img/icon-kids-study.jpg';
import IconKidsOutSide from '../../android/app/src/asset/img/icon-kids-outside.jpg';
import { ScrollView } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Loading from '../Loading';
import ipApi from '../../android/app/src/api/ipApi';
import ApiDonThuoc from '../../android/app/src/api/DonThuocApi';
import AsyncStorage from '@react-native-community/async-storage';
import Modal_Loading from '../component/reuse/Modal_Loading';

import { useSelector,useDispatch } from 'react-redux'

const Medicine =  ({ navigation }) => {


  const [danhSachThuoc, setDanhSachThuoc] = useState([])
  const [showLoading, setShowLoading] = useState(true);
  const [data_HS, setData_HS] = useState({});
  const [isFetching, setisFetching] = useState(false);
  const [userToken, setUserToken] = useState(null);


  const data_redux = useSelector(state => state)
  const du_lieu_hs = data_redux.hocsinh.data;
  const data_token = data_redux.token;



  const getListThuoc = (token,id_hs) => {
    setShowLoading(true);
       ApiDonThuoc.getAllByHs(token,id_hs)
       .then(function (response) {
         let data = response.data;
         console.log(data);
         setDanhSachThuoc(data);
         setShowLoading(false);
       })
       .catch(function (error) {
         setShowLoading(false);
         Alert.alert('Khong lay duoc du lieu')
         console.log(error);
       });
   };

      useEffect(() => { getListThuoc(data_token.token,du_lieu_hs.id)},[]);

  //  function reloadAgain(){
  //   setShowLoading(true);
  //   getListThuoc(userToken);
  //  }
   function functionOnRefresh(){
    setisFetching(true);
    ApiDonThuoc.getAllByHs(data_token.token,du_lieu_hs.id)
       .then(function (response) {
         let data = response.data;
         console.log(data);
         setDanhSachThuoc(data);
         setisFetching(false);
       })
       .catch(function (error) {
         setisFetching(false);
         console.log(error);
       });
   }


  const ListMedicineNew = ({itemDon,index}) => (
    
    <View style={styles.oDonThuc}>
          <TouchableOpacity onPress={()=>{
              navigation.navigate('detail_medicine',{dl_donthuoc : itemDon , id_: itemDon.id ,data_HS: data_HS, userToken:userToken })
              }} >
                <View style={{paddingVertical:10,flexDirection:'row'}}>
                  <Text style={{fontSize:16,fontWeight:'bold'}}>Ngày : </Text>
                  <Text style={{fontSize:16,fontWeight:'bold',color:'green'}}> {itemDon.ngay_bat_dau} - {itemDon.ngay_ket_thuc} </Text>
                </View>

                <FlatList
                          data={ itemDon.chi_tiet_don_dan_thuoc }
                          renderItem={({item,index}) => 
                          index < 1 ? 
                          <View style={styles.oDuoi}>
                            <Text style={{width:'20%',fontWeight:'bold'}}>{item.ten_thuoc}</Text>
                            <Text style={{width:'20%'}}>({item.lieu_luong} {item.don_vi})</Text>
                            
                            <Text style={{width:'50%'}}  numberOfLines={1}>{
                                 item.ghi_chu != null ?
                                  item.ghi_chu.length < 25 ? item.ghi_chu : item.ghi_chu.substring(0, 25)+'...'
                                  : null 
                            }</Text>
    
                            <Text style={{width:'10%'}}>{ itemDon.chi_tiet_don_dan_thuoc.length  > 1 ? '...' : null }</Text>
                          </View> : null
                      }
                        keyExtractor={(value, index) => index}
                 />
      </TouchableOpacity>
    </View>
)
  return (
    <View style={styles.container}>
                  {/* <View  style={{width:'100%',marginTop:5}}>
                        <TouchableOpacity onPress={()=>{
                         navigation.navigate('add_medicine',{reloadAgain : reloadAgain, userToken:userToken,route_notifi:0  })
                            }} >
                              <AntDesign name="medicinebox" size={35} color="green" />
                        </TouchableOpacity>
                   </View> */}
              <View style={showLoading ? {display:'flex'} : {display:'none'}}>
                  <Image style={{width: 50 , height:50,alignSelf:'center'}}   source={require('../../android/app/src/tenor.gif')}/>
                </View>

                
                   <FlatList
                      data={danhSachThuoc}
                      renderItem={({item}) =>
                         <ListMedicineNew itemDon={item}  />
                      }
                      onRefresh={() => functionOnRefresh()}
                      refreshing={isFetching}
                    />
                
            {/* <Modal_Loading showLoading = {showLoading} /> */}

     </View>
  );
};

const styles = StyleSheet.create({
    container:{
      flex:1,
      padding:10,
      backgroundColor:"#fff",
      flexDirection:'column',
    },
    oDonThuc:{
      flexDirection:'column',
      marginVertical:10,
      padding:10,
      borderRadius:4,
      backgroundColor:'#fff',
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 1,
      },
      shadowOpacity: 5,
      shadowRadius: 3.27,
      
      elevation: 7,
    },
    chia2thanh:{
      flexDirection:'row',
      paddingVertical:5
    },
    oDuoi:{
      flexDirection:'row',
      borderTopWidth:1,
      paddingVertical:2 
    },
   
});

export default Medicine;
