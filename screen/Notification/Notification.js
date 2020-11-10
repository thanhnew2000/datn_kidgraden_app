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


  let time = timeCurrent('2020-11-10 5:17:49')
  console.log(time)

  const getNotification= (token,id) => {
    console.log('run 2')
    ApiNotification.getNofiByIdUser(token,id)
    .then(function (response) {
        let data = response.data;
        setDataNotification(data);
        console.log(data)
      })
      .catch(function (error) {
      console.log(error);
      });
  };

 async function fetchData(){
      
      let token  = await AsyncStorage.getItem('data_token');
      let data_HocSinh  = await AsyncStorage.getItem('data_hs');
      let dulieu_hs = JSON.parse(data_HocSinh);
      getNotification(token,dulieu_hs.id);


  }
  useEffect(() => {fetchData()}, []);


      return (
        <View style={styles.containers}>
          <ScrollView>


         <FlatList
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
         /> 



        

         

            <TouchableOpacity style={styles.buttonSeeAll}>
              <Text style={{fontSize:16,color:'#00ace6'}}>Xem tất cả</Text>
            </TouchableOpacity>

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