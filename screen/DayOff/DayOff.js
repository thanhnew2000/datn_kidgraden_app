
import React ,{ useState, useEffect }from 'react';
import axios from 'axios';
import { View, Text, Image, TouchableOpacity, FlatList,StyleSheet, Button,Modal } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import ListItem from './ListItem';
import moment from "moment";
import ipApi from '../../android/app/src/api/ipApi';
import AsyncStorage from '@react-native-community/async-storage';
import ApiXinNghi from '../../android/app/src/api/XinNghiHocApi';
import Modal_Loading from '../component/reuse/Modal_Loading'

const DayOff =  ({ navigation }) => {


  const [showLoading, setShowLoading] = useState(true);
  const [listDonXinNghi, setListDonXinNghi] = useState([]);
  const [userToken, setUserToken] = useState(null);
  const [data_HS, setData_HS] = useState({});

  const getListDonXinNghi = (token,id_hs) => {
      ApiXinNghi.getAllByHs(token,id_hs)
       .then(function (response) {
         let data = response.data;
        //  let create_At = new Date(data[0]['created_at']);
        //  console.log(moment(data[0]['created_at']).format("YYYY-MM-DD"))
        //  console.log(create_At.getMonth())
         console.log(data);
         setListDonXinNghi(data);
         setShowLoading(false);
       })
       .catch(function (error) {
         console.log(error);
       });
   };


   
  async function fetchData(){
    console.log('ad')
    let token  = await AsyncStorage.getItem('data_token');
    let data_HocSinh  = await AsyncStorage.getItem('data_hs');
    let dulieu_hs = JSON.parse(data_HocSinh);
    console.log(dulieu_hs.id);
    // setUserToken(token);
    getListDonXinNghi(token,dulieu_hs.id);
    // setData_HS(dulieu_hs)
  }
  useEffect(() => {fetchData()}, []);




   function reloadAgain(){
    setShowLoading(true);
    getListDonXinNghi(userToken);
   }

  return (
            <View style={styles.containers}>
                <View  style={{width:'100%',marginTop:5}}>
                <TouchableOpacity onPress={()=>{
                        navigation.navigate('Tạo đơn xin nghỉ',{reloadAgain:reloadAgain, userToken: userToken,data_HS:data_HS})
                    }} >
                      <AntDesign name="pluscircleo" size={35} color="green" />
                </TouchableOpacity>
                </View>

                <FlatList
                  data={listDonXinNghi}
                  renderItem={({item,index}) => <ListItem item = {item}/>}
                  keyExtractor={(value, index) => index}
               />



               
                <Modal_Loading showLoading = {showLoading} />

           
            </View>
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

export default DayOff;
