
import React ,{ useState,useEffect }from 'react';
import {
    StyleSheet,
    View,
    FlatList,Text,Image,Button,Dimensions, ImageBackground,Modal,TouchableOpacity
    
  } from 'react-native';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import DateTimePicker from '@react-native-community/datetimepicker';
  import ApiDiemDanh from '../../android/app/src/api/DiemDanhApi';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { useSelector,useDispatch } from 'react-redux'
import IconChart from '../../android/app/src/asset/img/icon-chart.png';

const DetailDiemDanhVe =  ({navigation, route}) => {
    const { item } = route.params ;
  
    
  return (
            <View style={styles.container}>
                <View style={{flexDirection:'row'}}>
                    <Text style={{fontWeight:'bold'}}>Ngày : </Text>
                    <Text> {item.data.ngay_diem_danh_ve}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{fontWeight:'bold'}}>Trạng thái  : </Text>
                    <Text> Đã được đón</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{fontWeight:'bold'}}>Ghi chú  : </Text>
                    <Text style={{width:'70%'}}>{item.data.chu_thich}</Text>
                </View>

                { item.data.nguoi_don_ho !== null ? 
                <View style={{paddingVertical:10}}>
                 <View style={{borderTopWidth:1,paddingVertical:10}}>
                    <Text style={{fontWeight:'bold'}}>Người đón hộ:</Text>
                </View>
                <View style={{flexDirection:'row'}} >
                    <View>
                       <Image style={{width: 150 , height:150  }}  source={IconChart}/>
                    </View>
                    <View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Tên  : </Text>
                            <Text style={{width:'50%'}}>hihihihi</Text>
                       </View>
                       <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>CMTND : </Text>
                            <Text style={{width:'50%'}}> 987654326</Text>
                       </View>
                       <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Sđt : </Text>
                            <Text style={{width:'50%'}}> 0894382479</Text>
                       </View>
                       <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Ghi chú : </Text>
                            <Text style={{width:'50%'}}> say something my friend</Text>
                       </View>
                    </View>
                </View>
                </View>
                 : null }
               
                {/* <View style={{flexDirection:'row',padding:10}}>
                        <View style={{width:'50%'}}>
                            <Text style={{fontWeight:'bold',fontSize:15}}>Tên : </Text>
                        <Text>fdsfds</Text>
                        </View>
                        <View style={{width:'50%'}}>
                            <Text  style={{fontWeight:'bold',fontSize:15}}>Số CMND :</Text>
                            <Text>fdsa</Text>
                        </View>
                        <View style={{flexDirection:'row',padding:10}}>
                                <View style={{width:'50%'}}>
                                        <Text style={{fontWeight:'bold',fontSize:15}}>Số điện thoại : </Text>
                                        <Text>fgsd</Text>
                                </View> 
                        </View> 
                </View> */}


            </View>
  );
};

const styles = StyleSheet.create({
    container: {
       flex:1,
       padding:10,
       backgroundColor:'#fff',
       flexDirection:'column',
    },
    
    
  });
export default DetailDiemDanhVe;