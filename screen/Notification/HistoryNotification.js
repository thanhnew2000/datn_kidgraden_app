import React ,{ useState,useEffect }from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    Button,
    LogBox,
    FlatList
  } from 'react-native';
  import IconKidsStudy from '../../android/app/src/kids_student.jpg';
import { ScrollView } from 'react-native-gesture-handler';
import ApiNotification from '../../android/app/src/api/NotificationApi';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import 'moment/locale/vi';
import { useSelector,useDispatch } from 'react-redux'

LogBox.ignoreAllLogs();

const Notification = ({navigation}) => {

  const data_redux = useSelector(state => state)
  const data_token = data_redux.token;
  
  const [dataNotification, setDataNotification] = useState([]);
  const [showLoadingWait, setshowLoadingWait] = useState(false);

  function timeCurrent(time){
    let thoi_gian = 0;
    let change_format = moment(time,'YYYY-MM-DD hh:mm:ss');
    let day_fromNow= moment().diff(change_format, 'days'); 
    if(day_fromNow < 1){
      thoi_gian = moment(change_format).fromNow();
    }else if(day_fromNow >= 1 && day_fromNow <2){
      thoi_gian = moment(change_format).calendar();
    }else{
      thoi_gian =  moment(change_format).format("Do MMM YY, h:mm");
    }
    return thoi_gian;
  }


  const getNotification = (token,id) => {
    ApiNotification.getMoreThongBao(token,id)
    .then(function (response) {
      setDataNotification(response.data);
        console.log('datassss',response.data)
      })
      .catch(function (error) {
      console.log(error);
      });
  };

 async function fetchData(){
      let token  = await AsyncStorage.getItem('data_token');
      let data_HocSinh  = await AsyncStorage.getItem('data_hs');
      let dulieu_hs = JSON.parse(data_HocSinh);
      getNotification(token,dulieu_hs.id)

  }
  useEffect(() => {fetchData()}, []);

  const updateTypeOneNoti = (id_notification) => {
    ApiNotification.updateTypeOneNoti(data_token.token,id_notification)
    .then(function (response) {
        let data = response.data;
        console.log('update_Type',data);
      getNotification(token,dulieu_hs.id)

      })
      .catch(function (error) {
      console.log('update_Type_err',error);
      });
  };


  function clickNotifi(item){
    updateTypeOneNoti(item.id);
    let route_get = JSON.parse(item.route);
    console.log('route_get',route_get);
    if(route_get.name_route == 'DotCuaThang'){
      navigation.navigate('DotCuaThang',{ id_thang_thu_tien : route_get.id , thang_thu : route_get.so_thang });
    }else if(route_get.name_route == 'detail_medicine'){
      navigation.navigate('detail_medicine',{ id_ : route_get.id });
    }else if(route_get.name_route == 'ShowThongBao'){
      navigation.navigate('ShowThongBao',{ id_noi_dung_tb : route_get.id });
    }else if(route_get.name_route == 'ChiTietNghiHoc'){
      navigation.navigate('ChiTietNghiHoc',{ id_ct_nghi_hoc : route_get.id });
    }else if(route_get.name_route == 'ChiTietNhanXet'){
      navigation.navigate('ChiTietNhanXet',{ id_chi_tiet_nhan_xet : route_get.id });
    }
  }


      return (
        <View style={styles.containers}>
        <View style={showLoadingWait ? {display:'flex'} : {display:'none'}}>
          <View style={{alignItems:'center'}}>
              <Image style={{width: 50 , height:30 }}  source={require('../../android/app/src/asset/img/loading-waiting.gif')}/>
          </View>
       </View>
  
       <FlatList
                data={dataNotification}
                renderItem={({item,index}) =>
                {
                 return( <TouchableOpacity onPress={()=> clickNotifi(item)}  >
                      <View style={item.type == 1 ? styles.boxNotifiNoRead : styles.boxNotifiRead}>
                           <View style={{width:"10%",alignItems:'center'}}>
                      </View>
                          <View style={{width:"85%"}}>
                                <Text  style={{color:'black'}}>{item.title}</Text>
                                 <Text style={{fontSize:12,color:'#5E5F60'}}>{timeCurrent(item.created_at)}</Text>
                          </View>
                      </View>
                  </TouchableOpacity>)
                }

                }
                            keyExtractor={(item,index) => index.toString()}

       /> 

      </View>

      )
  }
  const styles = StyleSheet.create({
    image: {
      width:60, height:60,borderRadius:100
  },
  containers:{ 
      flex:1,
      backgroundColor:'#fff'
  },
  boxNotifiNoRead:{
      flexDirection:'row',
      paddingVertical:10,
      backgroundColor:'#CDE4FA',
      borderBottomWidth:0.5,
      borderColor:'#b8b8b8'
  },
  boxNotifiRead:{
      flexDirection:'row',
      paddingVertical:10,
      borderBottomWidth:1,
      borderColor:'#b8b8b8'


  },
  buttonSeeAll:{
    padding:10,
    justifyContent:'center',
    alignItems:'center',

  }
   
  });
export default Notification