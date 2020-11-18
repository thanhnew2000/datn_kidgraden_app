
import React ,{ useState, useEffect,useRef }from 'react';
import axios from 'axios';
import { View, Text, Image, TouchableOpacity, FlatList,StyleSheet,Button,Modal ,Linking} from 'react-native'
import IconNews from '../../android/app/src/asset/img/icon-news.png';
import IconKidsExercise from '../../android/app/src/asset/img/icon-kids-exercise.jpg';
import IconKidsStudy from '../../android/app/src/asset/img/icon-kids-study.jpg';
import IconKidsOutSide from '../../android/app/src/asset/img/icon-kids-outside.jpg';
import { ScrollView } from 'react-native-gesture-handler';

import ApiHoatDong from '../../android/app/src/api/HoatDongApi';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector,useDispatch } from 'react-redux'

const HoatDong =  ({ navigation }) => {

    const [data_hd, setDataHd] = useState([])
    const [value_Tuan, setValueTuan] = useState({})
    const [showModel, setShowModel] = useState(false)

    const data_redux = useSelector(state => state)
    const du_lieu_hs = data_redux.hocsinh.data;
    const data_token = data_redux.token;

   
    const getHoatDong = () => {
        ApiHoatDong.getHoatDongByLop(data_token.token,du_lieu_hs.lop_id)
        .then(function (response) {
          let data = response.data;
          console.log(data);
          setDataHd(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    useEffect(() => {getHoatDong()}, []);


    function clickShowModels(){
            setShowModel(!showModel);
    }

    // const renderItem = (item) => (
    //   item.id != 0 ?
    //   <TouchableOpacity onPress={()=>chooseNgay(item.day)}>
    //   <View style={{flexDirection:'column',alignItems:'center',paddingHorizontal:10,fontSize:15}}>
    //         <Text style={{color:'black'}}>{allDayWeek[item.dayWeek]}</Text>
    //         <Text style={thisngay == item.day ? styles.dayChoose :  styles.dayNormal}>{item.day}</Text>
    //   </View> 
    //   </TouchableOpacity>
    //   : null
    // );


  return (
    <ScrollView>
            <View style={styles.container}>

                {/* <View style={styles.boxNgangFirst}>
                        <Text style={{fontSize:16,padding:5,fontWeight:'bold'}}>Năm</Text>

                        <View style={{flexDirection:'row'}}>
                                <TouchableOpacity   style={{borderWidth:1,borderColor:'pink',marginLeft:5,padding:7}}>
                                    <Text>2020</Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity  style={{borderWidth:1,borderColor:'pink',marginLeft:5,padding:7}}>
                                    <Text>2020</Text>
                                </TouchableOpacity>
                         
                        </View>
                </View> */}

              <View>
                <View style={styles.boxNgang}>
                    <FlatList
                    data={data_hd}
                    renderItem={({item})=>
                    <TouchableOpacity onPress={() => Linking.openURL('http://google.com')}> 
                          <View style={{backgroundColor:'#6699ff',marginLeft:8,marginTop:5}}>
                              <Text style={{padding:10,color:'#fff'}}>Tuần {item.tuan}</Text>
                          </View>
                    </TouchableOpacity>
                    } 
                    keyExtractor={(item,index) => `${index}`}
                    numColumns={4}
                />
        


              <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showModel}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    }} >
                    <View style={{backgroundColor:'#dddd',flex:1,justifyContent:'center',alignItems:'center'}}>
                        <View style={styles.boxModel}>
                                <Text style={{fontSize:16,fontWeight:'bold'}}>Thời gian</Text>
                                <Text style={{fontSize:16}}>20-20-2020 - 20-10-2021</Text>
                        </View>
                    </View>

                </Modal>


                </View>

              </View>
            </View>
     </ScrollView>
  );
};

const styles = StyleSheet.create({
    container:{
      flex:1,
      padding:10,
      backgroundColor:"#fff",
    },
    imageBox:{  
      width:70,
      height:70,
      alignItems:'center',
      marginLeft:10
    },
    titleBox:{
      fontWeight: 'bold', 
      color: "black",
      fontSize:17
    },
    boxModel:{
        alignItems:'center',
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
    boxNgangFirst:{ 
        marginVertical:10,
        padding:10,
        justifyContent: 'center',
        alignItems: 'center',
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

    boxNgang:{ 
        marginVertical:10,
        flexDirection:'row',
        padding:10,
        justifyContent: 'center',
        alignItems: 'center',
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

    dayNormal:{
      color:'black'
    },
    dayChoose:{
      color:'black',borderWidth:1,borderRadius:1,paddingHorizontal:5,backgroundColor:'#00cc66',color:'white',borderColor:'#ccffff'
    }
});

export default HoatDong;
