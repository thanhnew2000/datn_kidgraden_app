
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
import { useSelector,useDispatch } from 'react-redux'

const DayOff =  ({ navigation,route }) => {
  const { token } = route.params;
  const { du_lieu_hs } = route.params;

  const [showLoading, setShowLoading] = useState(true);
  const [listDonXinNghi, setListDonXinNghi] = useState([]);

  // const [data_HS, setData_HS] = useState({});
  
  // const data_redux = useSelector(state => state)
  // const du_lieu_hs = data_redux.hocsinh.data;

  const getListDonXinNghi = (token) => {
      ApiXinNghi.getAllByHs(token,du_lieu_hs.id)
       .then(function (response) {
         let data = response.data;
         console.log(data);
         setListDonXinNghi(data);
         setShowLoading(false);
       })
       .catch(function (error) {
         console.log(error);
       });
   };


   
  // async function fetchData(){
  //   let token  = await AsyncStorage.getItem('data_token');
  //   // let data_HocSinh  = await AsyncStorage.getItem('data_hs');
  //   // let dulieu_hs = JSON.parse(data_HocSinh);
  //   // console.log(dulieu_hs.id);
  //   setUserToken(token);
  //   getListDonXinNghi(token);
  //   // setData_HS(dulieu_hs)
  // }
  useEffect(() => {getListDonXinNghi(token)}, []);




  //  function reloadAgain(){
  //   setShowLoading(true);
  //   getListDonXinNghi(userToken);
  //  }

  return (
            <View style={styles.containers}>
       
       

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
