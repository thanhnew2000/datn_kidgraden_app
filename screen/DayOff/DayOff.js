
import React ,{ useState, useEffect }from 'react';
import axios from 'axios';
import { View, Text, Image, TouchableOpacity, FlatList,StyleSheet, Button,Modal,Alert,LogBox } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import ListItem from './ListItem';
import moment from "moment";
import ipApi from '../../android/app/src/api/ipApi';
import AsyncStorage from '@react-native-community/async-storage';
import ApiXinNghi from '../../android/app/src/api/XinNghiHocApi';
import Modal_Loading from '../component/reuse/Modal_Loading'
import { useSelector,useDispatch } from 'react-redux'

import color_app from '../color_app'

LogBox.ignoreAllLogs();

const DayOff =  ({ navigation,route }) => {
  const [showLoading, setShowLoading] = useState(true);
  const [listDonXinNghi, setListDonXinNghi] = useState([]);
  const [isFetching, setisFetching] = useState(false);

  
  const data_redux = useSelector(state => state)
  const du_lieu_hs = data_redux.hocsinh.data;

  const data_token = data_redux.token;

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
          setShowLoading(false);
         Alert.alert('Lỗi không lấy được dữ liệu ')

       });
   };


  useEffect(() => {getListDonXinNghi(data_token.token)}, []);


  function functionOnRefresh(){
    setisFetching(true);
    ApiXinNghi.getAllByHs(data_token.token,du_lieu_hs.id)
       .then(function (response) {
         let data = response.data;
         console.log(data);
         setListDonXinNghi(data);
         setisFetching(false);
       })
       .catch(function (error) {
         console.log(error);
         setisFetching(false);
         Alert.alert('Lỗi không lấy được dữ liệu ')

       });
   }


  //  function reloadAgain(){
  //   setShowLoading(true);
  //   getListDonXinNghi(userToken);
  //  }

  return (
            <View style={styles.containers}>
               <View style={showLoading ? {display:'flex'} : {display:'none'}}>
                  <Image style={{width: 100 , height:100,alignSelf:'center'}}   source={require('../../android/app/src/tenor.gif')}/>
                </View>

                <FlatList
                  data={listDonXinNghi}
                  onRefresh={() => functionOnRefresh()}
                  refreshing={isFetching}
                  renderItem={({item,index}) => <ListItem item = {item} navigation={navigation} />}
                  
                  keyExtractor={(value, index) => index}

               />



               
                {/* <Modal_Loading showLoading = {showLoading} /> */}

           
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
