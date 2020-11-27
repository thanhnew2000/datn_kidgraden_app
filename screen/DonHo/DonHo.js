
import React ,{ useState, useEffect }from 'react';
import axios from 'axios';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet,Button,Modal } from 'react-native'
import IconNews from '../../android/app/src/asset/img/icon-news.png';
import IconKidsExercise from '../../android/app/src/asset/img/icon-kids-exercise.jpg';
import IconKidsStudy from '../../android/app/src/asset/img/icon-kids-study.jpg';
import IconKidsOutSide from '../../android/app/src/asset/img/icon-kids-outside.jpg';
import { ScrollView } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from "moment";
import ipApi from '../../android/app/src/api/ipApi';
import ApiDonHo from '../../android/app/src/api/DonHoApi';
import AsyncStorage from '@react-native-community/async-storage';
import Modal_Loading from '../component/reuse/Modal_Loading'
import { useSelector,useDispatch } from 'react-redux'

const DonHo =  ({ navigation }) => {


  const data_redux = useSelector(state => state)
  const du_lieu_hs = data_redux.hocsinh.data;
 

  const [viewModel, setViewModel] = useState(false);
  const [userToken, setUserToken] = useState('');

  
    const [showLoading, setShowLoading] = useState(false);

    const getListDonHo = (token) => {
        ApiDonHo.getNguoiDonHoByHs(token,du_lieu_hs.id)
        .then(function (response) {
          let data = response.data;
          console.log(data);
          setDanhSachDonHo(data);
          setShowLoading(false);

        })
        .catch(function (error) {
          console.log(error);
        });
    };

    
    useEffect(() => {
      async function fetchData() {
        try{
          var token = await AsyncStorage.getItem('data_token');
          if(token !== null){
            setUserToken(token);
            getListDonHo(token);
          }
        }catch (e){
          console.log(e);
        }
    }
    fetchData();
    },[]);





  const [detailNguoiDon, setDetailNguoiDon] = useState({
    ten_nguoi_don_ho:'',
    date_end:'',
    date_start:'',
    cmtnd:''
  })



  const [danhSachDonHo, setDanhSachDonHo] = useState([])

   function reloadAgain(){
    setShowLoading(true);
    getListDonHo(userToken);
   }

  function modelDetailShow(value){
    setViewModel(value)
  }


  function showDetailNguoiDonHo(itemDonHo){
    setDetailNguoiDon({
      ten_nguoi_don_ho:itemDonHo.ten_nguoi_don_ho,
      date_end:itemDonHo.date_end,
      date_start:itemDonHo.date_start,
      cmtnd:itemDonHo.cmtnd,
      phone_number:itemDonHo.phone_number,
      anh_nguoi_don_ho:itemDonHo.anh_nguoi_don_ho,
    })
    setViewModel(true)
  }
  

  
  

  const ListDonHoNew = ({itemDonHo}) => (
     <TouchableOpacity onPress={()=>showDetailNguoiDonHo(itemDonHo)} >
        <View style={styles.oBox}>
              <View style={{flexDirection:'row',borderBottomWidth:1,paddingVertical:5}}>
                <Text style={{fontWeight:'bold'}}>Ngày : </Text>
                <Text style={{fontSize:15,fontWeight:'bold',color:'green'}}> {itemDonHo.date_start} -- {itemDonHo.date_end}</Text>
              </View>
              {/* <Text style={{fontSize:15,color:'blue',paddingVertical:2}}>Người đón</Text> */}
              <View style={styles.chia2thanh}>

                  <View style={{width:'25%'}}>
                    <Image style={{width:50,height:50}} source={{uri : ipApi +'storage/'+itemDonHo.anh_nguoi_don_ho}}/>
                  </View>
                  <View style={{width:'70%'}}>
                      <Text style={{fontWeight:'bold',fontSize:15}}>{itemDonHo.ten_nguoi_don_ho} </Text>
                      <Text style={{color:'black'}}>SĐT :  {itemDonHo.phone_number} </Text>
                  </View>
            
              </View>
      </View>
    </TouchableOpacity>

  );



  const ListModel = () => (
           <Modal
                      animationType="slide"
                      transparent={true}
                      visible={viewModel}
                      onRequestClose={() => {
                      Alert.alert("Modal has been closed.");
                      }}
                     >
                    <View style={{backgroundColor:'#000000aa',flex:1,justifyContent:'center'}}>
                        <View style={{backgroundColor:'#ffffff',margin:20,padding:10,borderRadius:10}}>
                        <View style={{flexDirection:'row',padding:10,borderBottomWidth:1}}>
                          <View style={{width:'80%'}}>
                             <Text style={{fontWeight:'bold',fontSize:16}}>Thông tin người đón hộ : </Text>
                          </View>
                          <View style={{width:'20%',paddingLeft:10}}>
                            <TouchableOpacity onPress={()=>modelDetailShow(false)}>
                                <FontAwesome name="window-close" size={35} color="#dddd" />
                            </TouchableOpacity>
                          </View>

                        </View>

                        <View style={{alignItems:'center',paddingTop:10}}>
                          {/* <Image source={IconKidsStudy} style={{width:150,height:140}} /> */}
                          <Image source={{uri : ipApi +'storage/'+detailNguoiDon.anh_nguoi_don_ho}} style={{width:150,height:140}} />

                        </View>
                        <View style={{flexDirection:'row',padding:10}}>
                          <View style={{width:'50%'}}>
                              <Text style={{fontWeight:'bold',fontSize:15}}>Tên : </Text>
                         <Text>{detailNguoiDon.ten_nguoi_don_ho}</Text>
                          </View>
                          <View style={{width:'50%'}}>
                              <Text  style={{fontWeight:'bold',fontSize:15}}>Số CMND :</Text>
                              <Text>{detailNguoiDon.cmtnd}</Text>
                          </View>
                        </View>
                        <View style={{flexDirection:'row',padding:10}}>
                          <View style={{width:'50%'}}>
                                <Text style={{fontWeight:'bold',fontSize:15}}>Số điện thoại : </Text>
                                <Text>{detailNguoiDon.phone_number}</Text>
                          </View>

                          <View style={{width:'50%'}}>
                                <Text style={{fontWeight:'bold',fontSize:15}}>Đón bé : </Text>
                                <Text>Phạm Trung Hiếu</Text>
                          </View>
                         </View>

                         <View style={{width:'50%',padding:10,flexDirection:'row'}}>
                                <Text style={{fontWeight:'bold',fontSize:15}}>Ngày đón: </Text>
                                <Text> {detailNguoiDon.date_start} - {detailNguoiDon.date_end}</Text>
                          </View>

                        </View>
                    </View>
                </Modal>
  );

  return (
            <View style={styles.container}>
                  <View  style={{width:'100%',marginTop:5}}>
                        <TouchableOpacity onPress={()=>{
                                navigation.navigate('add_donho',{reloadAgain:reloadAgain,userToken : userToken})
                            }} >
                              <FontAwesome5 name="user-plus" size={35} color="green" />
                        </TouchableOpacity>
                   </View>
                                 
                   <FlatList
                      data={danhSachDonHo}
                      renderItem={({item}) =>
                         <ListDonHoNew itemDonHo={item} />
                      }
                    />


                      <ListModel />
                    {/* <Modal
                      animationType="slide"
                      transparent={true}
                      visible={viewModel}
                      onRequestClose={() => {
                      Alert.alert("Modal has been closed.");
                      }}
                     >
                    <View style={{backgroundColor:'#000000aa',flex:1,justifyContent:'center'}}>
                        <View style={{backgroundColor:'#ffffff',margin:20,padding:10,borderRadius:10}}>
                        <View style={{flexDirection:'row',padding:10,borderBottomWidth:1}}>
                          <View style={{width:'80%'}}>
                             <Text style={{fontWeight:'bold',fontSize:16}}>Thông tin người đón hộ : </Text>
                          </View>
                          <View style={{width:'20%',paddingLeft:10}}>
                            <TouchableOpacity onPress={()=>modelDetailShow(false)}>
                                <FontAwesome name="window-close" size={35} color="#dddd" />
                            </TouchableOpacity>
                          </View>

                        </View>

                        <View style={{alignItems:'center',paddingTop:10}}>
                          <Image source={IconKidsStudy} style={{width:150,height:140}} />
                        </View>
                        <View style={{flexDirection:'row',padding:10}}>
                          <View style={{width:'50%'}}>
                              <Text style={{fontWeight:'bold',fontSize:15}}>Tên : </Text>
                              <Text>Lê Ngọc Tân</Text>
                          </View>
                          <View style={{width:'50%'}}>
                              <Text  style={{fontWeight:'bold',fontSize:15}}>Số CMND :</Text>
                              <Text>54893649836</Text>
                          </View>
                        </View>
                        <View style={{flexDirection:'row',padding:10}}>
                          <View style={{width:'50%'}}>
                                <Text style={{fontWeight:'bold',fontSize:15}}>Số điện thoại : </Text>
                                <Text>03924838675</Text>
                          </View>

                          <View style={{width:'50%'}}>
                                <Text style={{fontWeight:'bold',fontSize:15}}>Đón bé : </Text>
                                <Text>Phạm Trung Hiếu</Text>
                          </View>
                         </View>

                         <View style={{width:'50%',padding:10,flexDirection:'row'}}>
                                <Text style={{fontWeight:'bold',fontSize:15}}>Ngày đón: </Text>
                                <Text> 10/7/2019</Text>
                          </View>

                        </View>
                    </View>
                </Modal> */}



    

                <Modal_Loading showLoading = {showLoading} />


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
    oBox:{
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
      paddingTop:3
    },
    oDuoi:{
      flexDirection:'row',
      borderTopWidth:1,
      paddingVertical:2 
    },
   
});

export default DonHo;
