
import React ,{ useState, useEffect }from 'react';
import axios from 'axios';
import { View, Text, Image, TouchableOpacity, FlatList, Modal, Alert,StyleSheet, Button} from 'react-native'
import Loading from '../Loading';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
import ApiHocSinh from '../../android/app/src/api/HocSinhApi';
import AsyncStorage from '@react-native-community/async-storage';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import Collapsible from 'react-native-collapsible';
const CapNhapThongTin =  ({ navigation ,route}) => {



  const [userToken, setUserToken] = useState(null);
  const [du_lieu_hs, setDuLieuHS] = useState([]);
  const [lop_hs, setLopHS] = useState([]);
  
  

    useEffect(() => {
        async function getOneHs(){
            var v = await AsyncStorage.getItem('data_storge');
            var hs = await AsyncStorage.getItem('data_hs');
            let dulieu = JSON.parse(v);
            let dulieu_hs = JSON.parse(hs);
            setUserToken(dulieu.token)
            setDuLieuHS(dulieu_hs);
            setLopHS(dulieu_hs.get_lop);

            // ApiHocSinh.getOne(dulieu.token,dulieu_hs.id)
            //   .then(function (response) {
            //     let data = response.data;
            //     setDuLieuHS(data);
            //     console.log(data);
      
            //   })
            //   .catch(function (error) {
            //     console.log(error);
            //   });
            }
            getOneHs();
    },[]);


  return (
      <ScrollView>
            <View style={styles.container}>
              <View style={styles.sectionAvatar}>
                  <View style={{width:'50%'}}>
                     <Image style={styles.showAvatar}  source={require('../../android/app/src/kids_student.jpg')} />
                  </View>
                  <View style={{width:'50%',alignSelf:'center'}}>
                      <Button title="Thay ảnh"/>
                  </View>
              </View>     
{/* Thông tin bé */}

                <View style={styles.oneBoxSection}>
                        <View style={{flexDirection:'row',paddingTop:10}}>
                                <View style={{width:'80%',alignSelf:'center'}}>
                                        <Text style={{fontSize:17,fontWeight:'bold'}}>Thông tin bé</Text>
                                </View>
                                <View style={{width:'20%',alignSelf:'center'}}>
                                          <Text style={{color:'#51A3F5'}}>Câp nhập</Text>
                                </View>
                        </View>
                        
                <View style={{flexDirection:'row',paddingTop:10}}>
                    <FontAwesome name="child" size={20} color="black" />
                    <Text style={{}}> Tên: {du_lieu_hs.ten}</Text>
                </View>
                
                <View style={{flexDirection:'row',paddingTop:10}}>
                    <AntDesign name="carryout" size={20} color="black" />
                    <Text style={{}}> Mã : {du_lieu_hs.ma_hoc_sinh}</Text>
                </View>
                <View style={{flexDirection:'row',paddingTop:10}}>
                    <AntDesign name="carryout" size={20} color="black" />
                    <Text style={{}}> Tuổi: 4</Text>
                </View>


                <View style={{flexDirection:'row',paddingTop:10}}>
                    <FontAwesome name="venus-mars" size={20} color="black" />
                    <Text style={{}}> Giới tính: {du_lieu_hs.gioi_tinh == 0 ? 'Nam' : 'Nữ'}</Text>
                </View>

                <View style={{flexDirection:'row',paddingTop:10}}>
                    <FontAwesome name="black-tie" size={20} color="black" />
                    <Text style={{}}> Lớp: {lop_hs.ten_lop}</Text>
                </View>
            </View>
                

{/* Thông tin phụ huynh */}
              <View style={styles.oneBoxSection}>
                <View style={{flexDirection:'row',paddingTop:10}}>
                        <View style={{width:'80%',alignSelf:'center'}}>
                                   <Text style={{fontSize:17,fontWeight:'bold'}}>Thông tin phụ huynh</Text>
                        </View>
                        <View style={{width:'20%',alignSelf:'center'}}>
                            <TouchableOpacity onPress={()=> navigation.navigate('edit_info_parent',{userToken:userToken,data_hocsinh:du_lieu_hs})}>
                             <Text style={{color:'#3A9DFF'}}>Câp nhập</Text>
                            </TouchableOpacity>
                        </View>
                </View>
                    {/*  Thông tin cha  */}
                <View style={{flexDirection:'row',paddingTop:10}}>
                    <FontAwesome name="male" size={20} color="green" />
                    <Text style={{fontSize:16,fontWeight:'bold'}}> Ba</Text>
                </View>

                <View style={{flexDirection:'row',paddingTop:10}}>
                    <AntDesign name="user" size={20} color="black" />
                    <Text style={{}}> Nguyễn Ngọc An</Text>
                </View>

                <View style={{flexDirection:'row',paddingTop:10}}>
                    <AntDesign name="phone" size={20} color="black" />
                    <Text style={{}}> 039854976</Text>
                </View>

                <View style={{flexDirection:'row',paddingTop:10}}>
                    <AntDesign name="creditcard" size={20} color="black" />
                    <Text style={{}}> CMND: 9032509434893</Text>
                </View>
            {/*      */}
            {/* Thông tin mẹ */}

            <View style={{flexDirection:'row',paddingTop:10}}>
                    <FontAwesome name="female" size={20} color="green" />
                    <Text style={{fontSize:16,fontWeight:'bold'}}> Mẹ</Text>
                </View>

                <View style={{flexDirection:'row',paddingTop:10}}>
                    <AntDesign name="user" size={20} color="black" />
                    <Text style={{}}> Ngọc Linh</Text>
                </View>

                <View style={{flexDirection:'row',paddingTop:10}}>
                    <AntDesign name="phone" size={20} color="black" />
                    <Text style={{}}> 0365854976</Text>
                </View>

                <View style={{flexDirection:'row',paddingTop:10}}>
                    <AntDesign name="creditcard" size={20} color="black" />
                    <Text style={{}}> CMND: 872509434893</Text>
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
        width:150,
        height:150
    },
    oneBoxSection:{
        borderBottomWidth:1,
        borderColor:'gray',
        paddingVertical:10
    }
  });

export default CapNhapThongTin;
