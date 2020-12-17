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
    FlatList
  } from 'react-native';
  import IconKidsStudy from '../../android/app/src/kids_student.jpg';
import { ScrollView } from 'react-native-gesture-handler';
import ApiNotification from '../../android/app/src/api/NotificationApi';
import AsyncStorage from '@react-native-community/async-storage';
import 'moment/locale/vi';
import moment from 'moment';
import database from '@react-native-firebase/database';
// import messaging from '@react-native-firebase/messaging';

import { useSelector,useDispatch } from 'react-redux'
import { Divider } from 'react-native-elements';

// import AwesomeAlert from 'react-native-awesome-alerts';

const Notification = ({navigation}) => {
  const data_redux = useSelector(state => state)
  const du_lieu_hs = data_redux.hocsinh.data;
  const data_token = data_redux.token;

  const [dataNotification, setDataNotification] = useState([]);
  const [isFetching, setisFetching] = useState(false);
  const [showLoadingWait, setshowLoadingWait] = useState(false);

  console.log('du-liei-hs_noti',du_lieu_hs);


  function timeCurrent(time){
    let thoi_gian = 0;
    let change_format = moment(time,'YYYY-MM-DD hh:mm:ss');
    // let change_format = '2020-11-30 19:00:00';
    let day_fromNow= moment().diff(change_format, 'days'); 
    // console.log('current',time);
    if(day_fromNow < 1){
      thoi_gian = moment(change_format).fromNow();
      console.log('day_fromNow',1)
    }else if(day_fromNow >= 1 && day_fromNow <2){
      thoi_gian = moment(change_format).calendar();
      console.log('day_fromNow',2)
    }else{
      thoi_gian =  moment(change_format).format("Do MMM YY, h:mm");
      console.log('day_fromNow',3)
    }
    return thoi_gian;
  }

   function onValueChangeNumberNoti (){ 
        // var hs = await AsyncStorage.getItem('data_hs');
        // let data_HocSinh = JSON.parse(hs);
        database()
        .ref('notification')
        .orderByChild('id_hs').equalTo(du_lieu_hs.id)
          .on('value', async function(snapshot) { 

            var data_thong_bao = snapshot.val();
             var new_data = Object.values(data_thong_bao);
            //  new_data.push(data_thong_bao)
             console.log('data_thong_baosd',new_data);
            //   new_data.sort(function(a, b){
            //     var keyA = new Date(a.created_at),
            //         keyB = new Date(b.created_at);
            //     // Compare the 2 dates
            //     if(keyA > keyB) return -1;
            //     if(keyA < keyB) return 1;
            //     return 0;
            // });

           await new_data.sort((a,b) => b.id - a.id )
          setDataNotification(new_data);


            // getNotification();
              // for (const key in data_thong_bao) {
              //   if (data_thong_bao.hasOwnProperty(key)) {
              //     const element = data_thong_bao[key];

              //     let number_noti = 0;
              //     for(var i = 0 ; i < arr_id.length ; i++){
              //           if(element.user_id == arr_id[i]){
              //                 if (element.bell == 1) {
              //                   number_noti++;
              //                 }
              //               }
              //           }
              //     }
              //     value_arr[element.user_id]=number_noti;
              //   }
              // }
            // getNotification();
        },
      );
   }

   function getNotification()  {
      // setshowLoadingWait(true);
      ApiNotification.getNofiByIdUser(data_token.token,du_lieu_hs.id)
      .then(function (response) {
          let data = response.data;
          // setDataNotification(data);
          // setshowLoadingWait(false);
          console.log('data_noti',data)
        })
        .catch(function (error) {
          console.log('err-data_noti',error);
        });
  };

 useEffect(() => {onValueChangeNumberNoti()}, [du_lieu_hs.id]);

  

 function functionOnRefresh(){
  setisFetching(true);
  ApiNotification.getNofiByIdUser(data_token.token,du_lieu_hs.id)
  .then(function (response) {
      let data = response.data;
      console.log('functionOnRefresh',data)
      setDataNotification(data);
      setisFetching(false);
    })
    .catch(function (error) {
      console.log('err-data_noti',error);
      setisFetching(false);
    });

 }



  const updateTypeOneNoti= (id_notification) => {
    ApiNotification.updateTypeOneNoti(data_token.token,id_notification)
    .then(function (response) {
        let data = response.data;
        console.log('update_Type',data)
      })
      .catch(function (error) {
      console.log('update_Type_err',error);
      });
  };


//  async function fetchData(){
//       let token  = await AsyncStorage.getItem('data_token');
//       updateBellNotification(token,du_lieu_hs.id,1);
//  }
//  useEffect(() => {fetchData()}, []);
function clickNotifi(item){

  // nhà trường 
  // chung
  // hoc phi (route_chi_tiet)

  // giao vien
  // chung 
  // dan thuoc  ( route_chi_tiet )
  // diem danh ve
  // don nghi hoc (xác nhận) ( route_chi_tiet)
  updateTypeOneNoti(item.id);
  let route_get = JSON.parse(item.route);
  if(route_get.name_route == 'DotCuaThang'){
    navigation.navigate('DotCuaThang',{ id_thang_thu_tien : route_get.id , thang_thu : route_get.so_thang });
  }else if(route_get.name_route == 'detail_medicine'){
    navigation.navigate('detail_medicine',{ id_ : route_get.id });
  }else if(route_get.name_route == 'ShowThongBao'){
    navigation.navigate('ShowThongBao',{ id_noi_dung_tb : route_get.id });
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
                  // inverted
                  renderItem={({item,index}) =>
                  {
                  //  let route_this = JSON.parse(item.route);
                  console.log('item_notifi',item)
                   
                  //  return( <TouchableOpacity onPress={()=> clickNotifi(route_this.name_route , route_this.id ,item)}  >
                   return( <TouchableOpacity onPress={()=> clickNotifi(item)}  >
                        <View style={item.type == 1 ? styles.boxNotifiNoRead : styles.boxNotifiRead}>
                            {/* <View style={{width:"30%",alignItems:'center'}}>
                              <Image style={styles.image} source={IconKidsStudy}/>
                            </View> */}
                             <View style={{width:"10%",alignItems:'center'}}>
                            </View>
                            <View style={{width:"85%"}}>
                                  <Text  style={{color:'black'}}>{item.title}</Text>
                                   {/* <Text style={{fontSize:12,color:'#5E5F60'}}>{timeCurrent(item.created_at)}</Text> */}
                                   <Text style={{fontSize:12,color:'#5E5F60'}}>{timeCurrent(item.created_at)}</Text>
                            </View>
        
                        </View>
                    </TouchableOpacity>)
                  }

                  }
                  onRefresh={() => functionOnRefresh()}
                  refreshing={isFetching}
                  keyExtractor={(value, index) => index}
         /> 



        

         

            <TouchableOpacity style={styles.buttonSeeAll} onPress={()=> navigation.navigate('HistoryNotification')}>
              <Text style={{fontSize:16,color:'#00ace6'}}>Xem tất cả</Text>
            </TouchableOpacity>


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