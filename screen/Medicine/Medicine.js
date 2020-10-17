
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
import Modal_Loading from '../component/reuse/Modal_Loading'
const Medicine =  ({ navigation }) => {


  const [danhSachThuoc, setDanhSachThuoc] = useState([])
  const [showLoading, setShowLoading] = useState(true);
  const [data_HS, setData_HS] = useState({});

  const getListThuoc = (v) => {
       ApiDonThuoc.getAll(v)
       .then(function (response) {
         let data = response.data;
         console.log(data);
         setDanhSachThuoc(data);
         setShowLoading(false);
       })
       .catch(function (error) {
         console.log(error);
       });
   };

  //  useEffect(getListThuoc, []);
   const [userToken, setUserToken] = useState(null);
      useEffect(() => {
        async function fetchData() {
          try{
            var v = await AsyncStorage.getItem('data_storge');
            var hs = await AsyncStorage.getItem('data_hs');
            let data = JSON.parse(v)
            let data_HocSinh = JSON.parse(hs)
            if(v !== null){
              setUserToken(data.token) 
              getListThuoc(data.token)
              setData_HS(data_HocSinh)
            }
            console.log(data.token)
          }catch (e){
            console.log(e);
          }
      }
      fetchData();
    },[]);

   function reloadAgain(){
    setShowLoading(true);
    getListThuoc(userToken);
   }


  // const ListMedicine = ({itemDon,index}) => (
  //   <View style={styles.oDonThuc}>

  //         <View style={styles.chia2thanh}>
  //           <View style={{width:'20%'}}>
  //             {/* <Image style={{width:50,height:50}} source={IconKidsStudy}/> */}
  //             <Image style={{width:50,height:50}} source={{uri : ipApi+'storage/'+data_HS.avatar}}/>
  //           </View>
  //           <View style={{width:'60%'}}>
  //               <Text style={{fontWeight:'bold',fontSize:17}}>{data_HS.ten}</Text>
  //              <Text>{itemDon.ngay_bat_dau} - {itemDon.ngay_ket_thuc} </Text>
  //           </View>
  //           <View style={{width:'20%',alignItems:'center'}}>
  //           <TouchableOpacity onPress={()=>{
  //               navigation.navigate('detail_medicine',{donthuoc : itemDon , data_HS: data_HS})
  //           }} >
  //               <Text>Chi Tiết</Text>
  //         </TouchableOpacity>

  //           </View>
  //         </View>


  //         <View style={styles.chia2thanh}>
  //             <Text>{itemDon.noi_dung}</Text>
  //         </View>

      
  //             <FlatList
  //                 data={ itemDon.chi_tiet_don_dan_thuoc }
  //                 renderItem={({item,index}) => 
  //                 index < 1 ? 
  //                 <View style={styles.oDuoi}>
  //                   <Text style={{width:'20%',fontWeight:'bold'}}>{item.ten_thuoc}</Text>
  //                   <Text style={{width:'20%'}}>({item.lieu_luong} {item.don_vi})</Text>
                  
  //                   <Text style={{width:'50%'}}  numberOfLines={1}>{
  //                   item.ghi_chu != null ?
  //                     item.ghi_chu.length < 25 ? item.ghi_chu : item.ghi_chu.substring(0, 25)+'...'
  //                     : null 
  //                   }</Text>
                   
  //                   <Text style={{width:'10%'}}>{ itemDon.chi_tiet_don_dan_thuoc.length  > 1 ? '...' : null }</Text>
  //                 </View> : null
  //             }
  //                keyExtractor={(value, index) => index}
  //             />

         
         
  //         {/* <View style={styles.oDuoi}>
  //             <Text style={{width:'20%',fontWeight:'bold'}}>Siro</Text>
  //             <Text style={{width:'20%'}}>(300ml)</Text>
  //             <Text style={{width:'50%'}}>Uống sau giờ trưa</Text>
  //             <Text style={{width:'10%'}}>(..5)</Text>
  //         </View> */}

  //   </View>


  // )

  const ListMedicineNew = ({itemDon,index}) => (
    
    <View style={styles.oDonThuc}>
          <TouchableOpacity onPress={()=>{
              navigation.navigate('detail_medicine',{donthuoc : itemDon , data_HS: data_HS})
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
    <ScrollView style={styles.container}>
            <View >
                  <View  style={{width:'100%',marginTop:5}}>
                        <TouchableOpacity onPress={()=>{
                                navigation.navigate('add_medicine',{reloadAgain : reloadAgain,userToken:userToken})
                            }} >
                              <AntDesign name="medicinebox" size={35} color="green" />
                        </TouchableOpacity>
                   </View>

                   <FlatList
                      data={danhSachThuoc}
                      renderItem={({item}) =>
                         <ListMedicineNew itemDon={item}  />
                      }
                    />

                   
            </View>

                
            <Modal_Loading showLoading = {showLoading} />

     </ScrollView>
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
          height: 7,
      },
      shadowOpacity: 1.70,
      shadowRadius: 6.27,
      
      elevation: 15,
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
