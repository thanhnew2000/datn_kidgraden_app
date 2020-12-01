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

const Notification = ({navigation}) => {
  const data_redux = useSelector(state => state)
  const du_lieu_hs = data_redux.hocsinh.data;
  const data_token = data_redux.data_token;

  const [dataNotification, setDataNotification] = useState([]);

  const [showLoadingWait, setshowLoadingWait] = useState(false);




  function timeCurrent(time){
    let thoi_gian = 0;
    // // let change_format = moment(time,'YYYY-MM-DD hh:mm:ss');
    let change_format = '2020-11-30 19:00:00';
    console.log(moment().hour())
    let day_fromNow= moment().diff(change_format, 'days');
    ;

    console.log('current',time);
    if(day_fromNow < 1){
      thoi_gian = moment(change_format).fromNow();
      console.log(1)
    }else if(day_fromNow >= 1 && day_fromNow <2){
      thoi_gian = moment(change_format).calendar();
      console.log(2)
    }else{
      thoi_gian =  moment(change_format).format("Do MMM YY, h:mm");
      console.log(3)
    }
    return thoi_gian;
  }

async function onValueChangeNumberNoti (){ 
    var hs = await AsyncStorage.getItem('data_hs');
    let data_HocSinh = JSON.parse(hs);
    database()
    .ref('notification')
     .orderByChild('user_id').equalTo(data_HocSinh.id)
      .on('value', function(snapshot) { 
        getNotification();
    },
   );
  }

  async function getNotification()  {
    setshowLoadingWait(true);
    var hs = await AsyncStorage.getItem('data_hs');
    var token = await AsyncStorage.getItem('data_token');
    let data_HocSinh = JSON.parse(hs);
    console.log(data_HocSinh.id)
    ApiNotification.getNofiByIdUser(token,data_HocSinh.id)
    .then(function (response) {
        let data = response.data;
        setDataNotification(data);
        setshowLoadingWait(false);
        console.log('data_noti',data)
      })
      .catch(function (error) {
         console.log('err-data_noti',error);
      });
  };

 useEffect(() => {onValueChangeNumberNoti()}, []);

  

//   const updateBellNotification= (token,id_hs,status) => {
//     ApiNotification.updateTypeOrBellHs(token,id_hs,status)
//     .then(function (response) {
//         let data = response.data;
//         console.log('update_bell',data)
//       })
//       .catch(function (error) {
//       console.log('update_bell_err',error);
//       });
//   };


//  async function fetchData(){
//       let token  = await AsyncStorage.getItem('data_token');
//       updateBellNotification(token,du_lieu_hs.id,1);
//  }
//  useEffect(() => {fetchData()}, []);


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
                    <TouchableOpacity  >
                        <View style={item.type == 1 ? styles.boxNotifiNoRead : styles.boxNotifiRead}>
                            <View style={{width:"30%",alignItems:'center'}}>
                              <Image style={styles.image} source={IconKidsStudy}/>
                            </View>
                            <View style={{width:"65%"}}>
                                  <Text>{item.title}</Text>
                                   {/* <Text style={{fontSize:12,color:'#5E5F60'}}>{timeCurrent(item.created_at)}</Text> */}
                                   <Text style={{fontSize:12,color:'#5E5F60'}}>{timeCurrent(item.created_at)}</Text>
                            </View>
        
                        </View>
                    </TouchableOpacity>
                  }
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
        backgroundColor:'#CDE4FA'
    },
    boxNotifiRead:{
        flexDirection:'row',
        paddingVertical:10,
    },
    buttonSeeAll:{
      padding:10,
      justifyContent:'center',
      alignItems:'center',

    }
   
  });
export default Notification