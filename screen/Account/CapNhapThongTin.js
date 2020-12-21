
import React ,{ useState, useEffect,useRef  }from 'react';
import axios from 'axios';
import { View, Text, Image, TouchableOpacity, FlatList, Modal, Alert,StyleSheet, Button,ImageBackground,Animated,LogBox} from 'react-native'
import Loading from '../Loading';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
import ApiHocSinh from '../../android/app/src/api/HocSinhApi';
import AsyncStorage from '@react-native-community/async-storage';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import Collapsible from 'react-native-collapsible';


import { fetchDataAsyncStorage } from '../../src/redux/action/index';
import { useSelector,useDispatch,useStore  } from 'react-redux'
import linkWeb from '../../android/app/src/api/linkWeb/index';
import { Easing } from 'react-native-reanimated';

LogBox.ignoreAllLogs();


const CapNhapThongTin =  ({ navigation ,route}) => {
    // const scrollViewRef = useRef();
    
    const student = useSelector(state => state)
    const lop_hs = student.hocsinh.data.get_lop;
    const du_lieu_hs = student.hocsinh.data;

    const [user, setUser] = useState({});

    const [scaleAnim, setScaleAnim] = useState(new Animated.Value(0));
    const [marginLeftNameAnim, setmarginLeftNameAnim] = useState(new Animated.Value(120));

    useEffect(() => {
     async function fetchData() {
        var json_user = await AsyncStorage.getItem('data_user');
        let data_user = JSON.parse(json_user);
        setUser(data_user);

        Animated.timing(
            scaleAnim,
            {
                duration:2000,
                toValue:1,
                useNativeDriver:true
            }
          ).start();

        //   Animated.timing(
        //     marginLeftNameAnim,
        //     {
        //         duration:2000,
        //         toValue:15,
        //     }
        //   ).start();

      }
      fetchData();
      },[]);

      
    //   function clicktest(){
       
    //     }

  return (
      <ScrollView>
          
        <View style={{flex:1}}>
            <ImageBackground style={{width: '100%' }}   source={require('../../android/app/src/nen.png')}>
                <View >
                <View style={styles.sectionAvatar}>
                    <View style={{height:130,justifyContent:'center',paddingLeft:10}}>
                        <Animated.Image style={{
                                borderRadius:100,
                                width:100,
                                height:100,
                                transform: [{scale:scaleAnim}]
                        }}  
                        // source={require('../../android/app/src/asset/img/home_image_slide.jpg')} />
                        source={{uri : du_lieu_hs.avatar}} />
                    </View>
                    {/* <View style={{width:'50%',alignSelf:'center',marginLeft:15,paddingTop:20}}> */}
                    <View style={{width:'50%',alignSelf:'center',marginLeft:15,paddingTop:20}}>
                        <Text style={{fontSize:18,color:'#fcfafa',fontWeight:"bold"}}>{du_lieu_hs.ten}</Text>
                    </View>
                </View>     
                </View>
              </ImageBackground>
         </View>


{/* Thông tin bé */}
            <View   style={styles.container} >
                
                <View style={styles.oneBoxSection}>
                        <View style={{flexDirection:'row',paddingTop:10}}>
                                <View style={{width:'80%',alignSelf:'center'}}>
                                        <Text style={{fontSize:17,fontWeight:'bold'}}>Thông tin bé</Text>
                                </View>
                                {/* <View style={{width:'20%',alignSelf:'center'}}>
                                          <Text style={{color:'#51A3F5'}}>Câp nhập</Text>
                                </View> */}
                        </View>
                        
                <View style={{flexDirection:'row',paddingTop:10}}>
                    <FontAwesome name="child" size={20} color={du_lieu_hs.gioi_tinh == 0 ? '#006699' : "#ff6699" }/>
                    {/* <TouchableOpacity onPress={()=> clicktest()}> */}
                      <Text style={{paddingLeft:15}}> Tên: {du_lieu_hs.ten}</Text>
                    {/* </TouchableOpacity> */}
                </View>
                
                <View style={{flexDirection:'row',paddingTop:10}}>
                    <AntDesign name="carryout" size={20} color="#ffcc00" />
                    <Text style={{paddingLeft:10}}> Mã : {du_lieu_hs.ma_hoc_sinh}</Text>
                </View>
                <View style={{flexDirection:'row',paddingTop:10}}>
                    <FontAwesome name="signal" size={20} color="#66ccff" />
                    <Text style={{paddingLeft:10}}> Tuổi: 4</Text>
                </View>


                <View style={{flexDirection:'row',paddingTop:10}}>
                    <FontAwesome name="venus-mars" size={20} color={du_lieu_hs.gioi_tinh == 0 ? '#006699' : "#ff6699" } />
                    <Text style={{paddingLeft:8}}> Giới tính: {du_lieu_hs.gioi_tinh == 0 ? 'Nam' : 'Nữ'}</Text>
                </View>

                <View style={{flexDirection:'row',paddingTop:10}}>
                    <FontAwesome name="black-tie" size={20} color="#0066ff" />
                    <Text style={{paddingLeft:15}}> Lớp: {lop_hs == undefined ? ' ' : lop_hs.ten_lop}</Text>
                </View>
            </View>
                

{/* Thông tin phụ huynh */}
              <View style={styles.oneBoxSection}>
                <View style={{flexDirection:'row',paddingTop:10}}>
                        <View style={{width:'80%',alignSelf:'center'}}>
                                   <Text style={{fontSize:17,fontWeight:'bold'}}>Thông tin phụ huynh</Text>
                        </View>
                        {/* <View style={{width:'20%',alignSelf:'center'}}> */}
                            {/* <TouchableOpacity onPress={()=> navigation.navigate('edit_info_parent',{userToken:userToken,data_hocsinh:du_lieu_hs})}> */}
                             {/* <Text style={{color:'#3A9DFF'}}>Câp nhập</Text> */}
                            {/* </TouchableOpacity> */}
                        {/* </View> */}
                </View>
                    {/*  Thông tin cha  */}
                <View style={{flexDirection:'row',paddingTop:10}}>
                    <FontAwesome name="male" size={20} color="green" />
                    <Text style={{fontSize:16,fontWeight:'bold'}}> Ba</Text>
                </View>

                <View style={{flexDirection:'row',paddingTop:10}}>
                    <AntDesign name="user" size={20} color="#0066cc" />
                    <Text style={{paddingLeft:15}}> {du_lieu_hs.ten_cha}</Text>
                </View>

                <View style={{flexDirection:'row',paddingTop:10}}>
                    <AntDesign name="phone" size={20} color="#00cc00" />
                    <Text style={{paddingLeft:15}}> {du_lieu_hs.dien_thoai_cha}</Text>
                </View>

                <View style={{flexDirection:'row',paddingTop:10}}>
                    <AntDesign name="creditcard" size={20} color="#339933" />
                    <Text style={{paddingLeft:15}}> CMND: {du_lieu_hs.cmtnd_cha}</Text>
                </View>
            {/*      */}
            {/* Thông tin mẹ */}

                 <View style={{flexDirection:'row',paddingTop:10}}>
                    <FontAwesome name="female" size={20} color="green" />
                    <Text style={{fontSize:16,fontWeight:'bold'}}> Mẹ</Text>
                </View>

                <View style={{flexDirection:'row',paddingTop:10}}>
                    <AntDesign name="user" size={20} color="#ff3399" />
                    <Text style={{paddingLeft:15}}> {du_lieu_hs.ten_me}</Text>
                </View>

                <View style={{flexDirection:'row',paddingTop:10}}>
                    <AntDesign name="phone" size={20} color="#00cc00" />
                    <Text style={{paddingLeft:15}}> {du_lieu_hs.dien_thoai_me}</Text>
                </View>

                <View style={{flexDirection:'row',paddingTop:10}}>
                    <AntDesign name="creditcard" size={20} color="#339933" />
                    <Text style={{paddingLeft:15}}> CMND: {du_lieu_hs.cmtnd_me}</Text>
                </View>



                {/*  Thông tin cha  */}
                <View style={du_lieu_hs.ten_nguoi_giam_ho ==  '' ? {display:'none'} : {display:'flex'}}>
                        <View style={{flexDirection:'row',paddingTop:10}}>
                            <FontAwesome name="male" size={20} color="green" />
                            <Text style={{fontSize:16,fontWeight:'bold'}}> Người giám hộ</Text>
                        </View>

                        <View style={{flexDirection:'row',paddingTop:10}}>
                            <AntDesign name="user" size={20} color="#0066cc" />
                            <Text style={{paddingLeft:15}}> {du_lieu_hs.ten_nguoi_giam_ho}</Text>
                        </View>

                        <View style={{flexDirection:'row',paddingTop:10}}>
                            <AntDesign name="phone" size={20} color="#00cc00" />
                            <Text style={{paddingLeft:15}}> {du_lieu_hs.dien_thoai_nguoi_giam_ho}</Text>
                        </View>

                        <View style={{flexDirection:'row',paddingTop:10}}>
                            <AntDesign name="creditcard" size={20} color="#339933" />
                            <Text style={{paddingLeft:15}}> CMND: {du_lieu_hs.cmtnd_nguoi_giam_ho}</Text>
                        </View>
                </View>

            {/*      */}

              </View>    
            </View>



        
        </ScrollView>
  );
};


const styles = StyleSheet.create({
    container:{
      flex:1,
      paddingHorizontal:10,
      backgroundColor:"#fff",
    },
    sectionAvatar:{
        flexDirection:'row'
    },
    showAvatar:{
        width:100,
        height:100,borderRadius:100
    },
    oneBoxSection:{
        borderBottomWidth:1,
        borderColor:'#bfbebd',
        paddingVertical:10
    }
  });

export default CapNhapThongTin;
