
import React ,{ useState, useEffect,useRef  }from 'react';
import axios from 'axios';
import { View, Text, Image, TouchableOpacity, FlatList, Modal, Alert,StyleSheet, Button,ImageBackground} from 'react-native'
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

const CapNhapThongTin =  ({ navigation ,route}) => {
    // const scrollViewRef = useRef();
    
    const student = useSelector(state => state)
    const lop_hs = student.hocsinh.data.get_lop;
    const du_lieu_hs = student.hocsinh.data;

    const [user, setUser] = useState({});


    useEffect(() => {
     async function fetchData() {
        var json_user = await AsyncStorage.getItem('data_user');
        let data_user = JSON.parse(json_user);
        setUser(data_user);
      }
      fetchData();
      },[]);

//   const [userToken, setUserToken] = useState(null);
//   const [du_lieu_hs, setDuLieuHS] = useState([]);
//   const [lop_hs, setLopHS] = useState([]);
  
  return (
      <ScrollView 
    //   ref={scrollViewRef}
    //   onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >
          
            <View style={styles.container}>

            {/* <ImageBackground style={{width: '100%' }}   source={require('../../android/app/src/info-avatar.png')}> */}
            <View style={{backgroundColor:'#fff',borderRadius:10,shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 7,
                },
                shadowOpacity: 1.70,
                shadowRadius: 6.27,
                
                elevation: 15,
                }}>
              <View style={styles.sectionAvatar}>
                  <View style={{height:120,justifyContent:'center',paddingLeft:10}}>
                     <Image style={styles.showAvatar}  source={require('../../android/app/src/asset/img/home_image_slide.jpg')} />
                  </View>
                  <View style={{width:'50%',alignSelf:'center',marginLeft:15}}>
                     <Text style={{fontSize:18,color:'black'}}>{du_lieu_hs.ten}</Text>
                  </View>
              </View>     
              </View>
              {/* </ImageBackground> */}


{/* Thông tin bé */}

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
                    <Text style={{}}> Tên: {du_lieu_hs.ten}</Text>
                </View>
                
                <View style={{flexDirection:'row',paddingTop:10}}>
                    <AntDesign name="carryout" size={20} color="#ffcc00" />
                    <Text style={{}}> Mã : {du_lieu_hs.ma_hoc_sinh}</Text>
                </View>
                <View style={{flexDirection:'row',paddingTop:10}}>
                    <FontAwesome name="signal" size={20} color="#66ccff" />
                    <Text style={{}}> Tuổi: 4</Text>
                </View>


                <View style={{flexDirection:'row',paddingTop:10}}>
                    <FontAwesome name="venus-mars" size={20} color={du_lieu_hs.gioi_tinh == 0 ? '#006699' : "#ff6699" } />
                    <Text style={{}}> Giới tính: {du_lieu_hs.gioi_tinh == 0 ? 'Nam' : 'Nữ'}</Text>
                </View>

                <View style={{flexDirection:'row',paddingTop:10}}>
                    <FontAwesome name="black-tie" size={20} color="#0066ff" />
                    <Text style={{}}> Lớp: {lop_hs == undefined ? ' ' : lop_hs.ten_lop}</Text>
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
                    <Text style={{}}> {du_lieu_hs.ten_cha}</Text>
                </View>

                <View style={{flexDirection:'row',paddingTop:10}}>
                    <AntDesign name="phone" size={20} color="#00cc00" />
                    <Text style={{}}> {du_lieu_hs.dien_thoai_cha}</Text>
                </View>

                <View style={{flexDirection:'row',paddingTop:10}}>
                    <AntDesign name="creditcard" size={20} color="#339933" />
                    <Text style={{}}> CMND: {du_lieu_hs.cmtnd_cha}</Text>
                </View>
            {/*      */}
            {/* Thông tin mẹ */}

            <View style={{flexDirection:'row',paddingTop:10}}>
                    <FontAwesome name="female" size={20} color="green" />
                    <Text style={{fontSize:16,fontWeight:'bold'}}> Mẹ</Text>
                </View>

                <View style={{flexDirection:'row',paddingTop:10}}>
                    <AntDesign name="user" size={20} color="#ff3399" />
                    <Text style={{}}> {du_lieu_hs.ten_me}</Text>
                </View>

                <View style={{flexDirection:'row',paddingTop:10}}>
                    <AntDesign name="phone" size={20} color="#00cc00" />
                    <Text style={{}}> {du_lieu_hs.dien_thoai_me}</Text>
                </View>

                <View style={{flexDirection:'row',paddingTop:10}}>
                    <AntDesign name="creditcard" size={20} color="#339933" />
                    <Text style={{}}> CMND: {du_lieu_hs.cmtnd_me}</Text>
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
    sectionAvatar:{
        flexDirection:'row'
    },
    showAvatar:{
        width:100,
        height:100,borderRadius:100
    },
    oneBoxSection:{
        borderBottomWidth:1,
        borderColor:'gray',
        paddingVertical:10
    }
  });

export default CapNhapThongTin;
