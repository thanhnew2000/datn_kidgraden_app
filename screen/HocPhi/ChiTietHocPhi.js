
import React ,{ useState, useEffect }from 'react';
import axios from 'axios';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Button,ScrollView ,LogBox} from 'react-native'
import IconNews from '../../android/app/src/asset/img/icon-news.png';
import IconKidsExercise from '../../android/app/src/asset/img/icon-kids-exercise.jpg';
import IconKidsStudy from '../../android/app/src/asset/img/icon-kids-study.jpg';
import IconKidsOutSide from '../../android/app/src/asset/img/icon-kids-outside.jpg';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ApiHocPhi from '../../android/app/src/api/HocPhiApi';
import { useSelector,useDispatch } from 'react-redux'


LogBox.ignoreAllLogs();


const ChiTietHocPhi =  ({ navigation ,route}) => {



    const { id_chi_tiet_dot_thu } = route.params;
    const { ten_dot_thu } = route.params;
    const { thang_thu } = route.params;

    const data_redux = useSelector(state => state)
    const du_lieu_hs = data_redux.hocsinh.data;
    const data_token = data_redux.token;

    console.log('id_chi_tiet_dot_thu',id_chi_tiet_dot_thu)
    
    
    const [listData, setlistData] =  useState([]);
    const [showLoading, setshowLoading] =  useState(false);
    const [list_chi_tiet_dong_tien_hoc_sinh, setlist_chi_tiet_dong_tien_hoc_sinh] =  useState([]);

    const [show_mien_giam, setshow_mien_giam] =  useState(false);
    const [danh_sach_giam_hphi, setdanh_sach_giam_hphi] =  useState([]);


    const getDot = () => {
        setshowLoading(true);
        ApiHocPhi.getChiTietDot(data_token.token,id_chi_tiet_dot_thu,du_lieu_hs.id)
        .then(function (response) {
          let data = response.data;
          setlistData(data);
          console.log('data_chitiethp',data.chi_tiet_dong_tien_hoc_sinh)
          setlist_chi_tiet_dong_tien_hoc_sinh(data.chi_tiet_dong_tien_hoc_sinh);
          setdanh_sach_giam_hphi(data.arr_mien_giam);
          
          if(data.arr_mien_giam.length > 0){
            setshow_mien_giam(true)
          }
          setshowLoading(false)
   
        })
        .catch(function (error) {
          setshowLoading(false)
          console.log(error);
        });
    };
    useEffect(() => {getDot()}, []);

    function formatNumberMoney(number){
       return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)
    }
  return (
<ScrollView>

            <View style={styles.container}>
                         {/*  chọn năm hiện */}
                    <View  style={{alignItems:'center',padding:10}}>
                        <Text style={{fontSize:17,fontWeight:'bold'}}>Tháng {thang_thu} Đợt - {ten_dot_thu}</Text>
                   </View>



                 <View  style={show_mien_giam ? {display:'flex',padding:10,borderBottomWidth:1} :{display:'none'} }>
                      <Text style={{fontSize:15,fontWeight:'bold'}}> Tiền được được miễn giảm</Text>


                      <View style={{flexDirection:'row',padding:10,borderBottomWidth:1,borderColor:'#D9D9DA'}}>
                                        <Text style={{width:'50%',fontWeight:'bold'}}>Khoản thu</Text>
                                        <Text style={{width:'33%',fontWeight:'bold'}}>Tiền ban đầu</Text>
                                        <Text  style={{width:'17%',fontWeight:'bold'}}>% Giảm</Text>
                       </View>

                      <FlatList  
                       data={danh_sach_giam_hphi}
                        renderItem={(item)=>{
                            console.log('ds_giam',item.item)
                            let khoanThu = item.item.khoan_thu
                           return  <View style={{flexDirection:'row',padding:10,borderBottomWidth:1,borderColor:'#D9D9DA'}}>
                                        <Text style={{width:'60%'}}>{khoanThu.ten_khoan_thu}:</Text>
                                        <Text style={{width:'30%'}}>{formatNumberMoney(item.item.so_tien_thu_ban_dau)}</Text>
                                        <Text  style={{width:'10%'}}>{item.item.phan_tram_mien_giam} %</Text>
                              </View>

                        }}
                        keyExtractor={(item,index) => index.toString()}

                    />

                        <View style={showLoading ? {display:'flex'} : {display:'none'}}>
                                <Image style={{width: 50 , height:50,alignSelf:'center'}}   source={require('../../android/app/src/tenor.gif')}/>
                        </View>
                   </View>



                   <View  style={{padding:10}}>
                      <Text style={{fontSize:15,fontWeight:'bold'}}> Tiền phải nộp</Text>
                      <View style={{flexDirection:'row',padding:10,borderBottomWidth:1,borderColor:'#D9D9DA'}}>
                                        <Text style={{width:'70%',fontWeight:'bold'}}>Khoản thu</Text>
                                        <Text style={{width:'30%',fontWeight:'bold'}}>Tiền phải nộp ( đã giảm )</Text>
                       </View>
                      <FlatList  
                       data={list_chi_tiet_dong_tien_hoc_sinh}
                        renderItem={(item)=>{
                        //  let khoanThu = item.item.khoan_thu
                         let khoanThu = item.item.khoan_thu
                         
                           return  <View style={{flexDirection:'row',padding:10,borderBottomWidth:1,borderColor:'#D9D9DA'}}>
                                <Text style={{width:'70%'}}>{khoanThu.ten_khoan_thu}:</Text>
                                <Text  style={{width:'30%'}}>{formatNumberMoney(item.item.so_tien)}  </Text>
                            </View>

                        }}
                        keyExtractor={(item,index) => index.toString()}

                    />
                   
                  {/* loading */}
                   <View style={showLoading ? {display:'flex'} : {display:'none'}}>
                           <Image style={{width: 50 , height:50,alignSelf:'center'}}   source={require('../../android/app/src/tenor.gif')}/>
                  </View>
                    {/*  */}

                   </View>


              



                    <View style={{flexDirection:'row',paddingVertical:10,paddingRight:15}}>
                        <View style={{width:'70%',alignItems:'flex-end'}}>
                         <Text style={{fontSize:15,fontWeight:'bold'}}>Tổng tiền : </Text>
                        </View>
                        <View style={showLoading ? {display:'none'} : {display:'flex',width:'50%'}}>
                           <Text  style={{fontWeight:'bold',fontSize:16}}>{formatNumberMoney(listData.so_tien_phai_dong)} </Text>
                        </View>
                    </View>

                    <View style={{flexDirection:'row',padding:10}}>
                       <View style={{width:'70%',alignItems:'flex-end'}}>
                         <Text style={{fontSize:15,fontWeight:'bold'}}>Số tiền đã đóng : </Text>
                        </View>
                        <View style={showLoading ? {display:'none'} : {display:'flex',width:'50%'}}>
                           <Text  style={{fontSize:16,color:'black'}}>{formatNumberMoney(listData.so_tien_da_dong)} </Text>
                        </View>
                    </View>
{/* 

                    <View style={{flexDirection:'row',padding:10}}>
                       <View style={{width:'70%',alignItems:'flex-end'}}>
                         <Text style={{fontSize:15,fontWeight:'bold'}}>Trạng thái : </Text>
                        </View>
                        <View style={{width:'50%'}}>
                           <Text  style={{fontSize:16,color:'green'}}>Đã thanh toán</Text>
                        </View>
                    </View> */}
                   
                {/*  list danh sách học phí */}
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
    boxList:{
        flexDirection:'row',padding:10,borderWidth:1,marginVertical:10,borderRadius:5,borderColor:'#D9D9DA'
    }
   
   
});

export default ChiTietHocPhi;
