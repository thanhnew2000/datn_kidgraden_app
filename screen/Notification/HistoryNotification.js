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
import moment from 'moment';
import 'moment/locale/vi';
const Notification = ({navigation}) => {

  
  const [dataNotification, setDataNotification] = useState([]);
  const [allNotification, setAllNotification] = useState([]);
  const [viewToShow, setViewToShow] = useState([]);

  function timeCurrent(time){
    let thoi_gian = 0
    let day_fromNow= moment().diff(time, 'days');
    if(day_fromNow < 1){
      thoi_gian = moment(time).fromNow();
      console.log(1)
    }else if(day_fromNow >= 1 && day_fromNow <2){
      thoi_gian = moment(time).calendar();
      console.log(2)
    }else{
      thoi_gian =  moment(time).format("Do MMM YY, h:mm");
      console.log(3)
    }
    return thoi_gian;
  }


function changeDataToView(datas){
  var viewShow = [];
    Object.keys(datas).forEach(function(key) {
      viewShow.push(
         <Text style={{fontWeight:'bold',padding:5,fontSize:17}}>{key}</Text>
      )
        for(var i = 0 ; i < datas[key].length ; i++){
          viewShow.push(
          <TouchableOpacity  >
                        <View style={styles.boxNotifi}>
                            <View style={{width:"30%",alignItems:'center'}}>
                              <Image style={styles.image} source={IconKidsStudy}/>
                            </View>
                            <View style={{width:"65%"}}>
                                  <Text>{datas[key][i].title}</Text>
                              <Text style={{fontSize:12,color:'#5E5F60'}}>{timeCurrent(datas[key][i].created_at)}</Text>
                            </View>
                        </View>
           </TouchableOpacity>
          ) 
        }
    });
    setViewToShow(viewShow)
  }



  const getallNotification= (token,id) => {
    ApiNotification.allNofiByIdUser(token,id)
    .then(function (response) {
        setAllNotification(response.data);
        console.log('datassss',response.data)
        changeDataToView(response.data);
      })
      .catch(function (error) {
      console.log(error);
      });
  };


 async function fetchData(){
      
      let token  = await AsyncStorage.getItem('data_token');
      let data_HocSinh  = await AsyncStorage.getItem('data_hs');
      let dulieu_hs = JSON.parse(data_HocSinh);
      getallNotification(token,dulieu_hs.id)

  }
  useEffect(() => {fetchData()}, []);


      return (
        <View style={styles.containers}>
          <ScrollView>

          <View>
            {viewToShow}
          </View>
   

         {/* <FlatList
                  data={dataNotification}
                  renderItem={({item,index}) =>
                    <TouchableOpacity  >
                        <View style={styles.boxNotifiNoRead}>
                            <View style={{width:"30%",alignItems:'center'}}>
                              <Image style={styles.image} source={IconKidsStudy}/>
                            </View>
                            <View style={{width:"65%"}}>
                                  <Text>{item.title}</Text>
                              <Text style={{fontSize:12,color:'#5E5F60'}}>{timeCurrent(item.created_at)}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                  }
                  keyExtractor={(value, index) => index}
         />  */}

                            {/* <View>
                            <Text style={{fontSize:17,fontWeight:'bold',marginLeft:5,padding:5}}> 11-2020</Text>
                            <View style={styles.boxNotifi}>
                                <View style={{width:"30%",alignItems:'center'}}>
                                <Image style={styles.image} source={IconKidsStudy}/>
                                </View>
                                <View style={{width:"65%",borderBottomWidth:1}}>
                                    <Text>Thong boa</Text>
                                <Text style={{fontSize:12,color:'#5E5F60'}}>{timeCurrent(item.created_at)}</Text>
                                </View>
                            </View>

                            </View> */}
{/* 
            <TouchableOpacity style={styles.buttonSeeAll} onPress={()=> showData()}>
              <Text style={{fontSize:16,color:'#00ace6'}}>Xem tất cả</Text>
            </TouchableOpacity> */}

          </ScrollView>

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
    boxNotifi:{
        flexDirection:'row',
        paddingVertical:10,
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