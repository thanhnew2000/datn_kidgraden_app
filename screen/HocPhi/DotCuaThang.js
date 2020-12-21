
import React ,{ useState, useEffect }from 'react';
import axios from 'axios';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Button ,LogBox } from 'react-native'
import IconNews from '../../android/app/src/asset/img/icon-news.png';
import IconKidsExercise from '../../android/app/src/asset/img/icon-kids-exercise.jpg';
import IconKidsStudy from '../../android/app/src/asset/img/icon-kids-study.jpg';
import IconKidsOutSide from '../../android/app/src/asset/img/icon-kids-outside.jpg';
import { ScrollView } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { useSelector,useDispatch } from 'react-redux'

import ApiHocPhi from '../../android/app/src/api/HocPhiApi';
import HeaderNotifiWhenClick from '../HeaderNotifiWhenClick'
LogBox.ignoreAllLogs();

const DotCuaThang =  ({ navigation,route }) => {

  
    const { id_thang_thu_tien } = route.params;
    const { thang_thu } = route.params;

    const data_redux = useSelector(state => state)
    const du_lieu_hs = data_redux.hocsinh.data;
    const route_notifi = data_redux.route_notifi;
    const data_token = data_redux.token;

    // const [data_hp, setDataHp] = useState([]);
    // const [arr_nam, setArrNam] =  useState([]);
    console.log('id_thang_thu_tien',id_thang_thu_tien)

    const [listData, setlistData] =  useState([]);
    const [showLoading, setshowLoading] =  useState(false);


    const getDot = () => {
      setshowLoading(true);
        ApiHocPhi.getAllDanhSachThuTienFromIdThangThuHs(data_token.token,id_thang_thu_tien,du_lieu_hs.id)
        .then(function (response) {
          let data = response.data;
          setlistData(data);
          console.log('datas',data);
          setshowLoading(false);

   
        })
        .catch(function (error) {
          setshowLoading(false);
          console.log(error);
        });
    };
    useEffect(() => {
      const { thong_bao } = route.params;
      if(thong_bao == true || route_notifi == 'DotCuaThang'){
          navigation.setOptions({
            headerTitle: () => <HeaderNotifiWhenClick navigation={navigation} name_header_tab="Đợt của tháng"/>,
            headerLeft: null
          })
       }

      getDot();
    }, []);


    // function onClick2(nam){
    //     Object.keys(data_hp).forEach(function(key) {
    //             if(nam == key){
    //                 setlistDataThang(data_hp[key])
    //                 }
    //       });
    //  }

    //  function colorCss(item){
    //   return  item.item.trang_thai == 2 ? {color:'green'} : item.item.trang_thai ==  1 ? {color:'#fcb321'}   : {color:'#fa3228'}
    //  }

    function formatNumberMoney(number){
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)
   }

  return (
    <ScrollView style={styles.container}>
            <View>
                <View  style={{alignItems:'center',padding:10}}>
                        <Text style={{fontSize:17,fontWeight:'bold'}}>Tháng {thang_thu}</Text>
                   </View>

                <FlatList  
                       data={listData}
                        renderItem={(item)=>{
                            let chi_tiet_dt = item.item.chi_tiet_dot_thu;
                            return   <TouchableOpacity onPress={() => navigation.navigate('ChiTietHocPhi',{id_chi_tiet_dot_thu:item.item.id_chi_tiet_dot_thu , thang_thu : thang_thu ,ten_dot_thu :chi_tiet_dt.ten_dot_thu})}>
                                        <View style={styles.boxList}>
                                                <View style={{width:'20%'}}>
                                                {item.item.trang_thai == 2 ? <AntDesign name="checkcircle" size={35}color='green' />
                                                 : item.item.trang_thai ==  1 ? <AntDesign name="checkcircle" size={35}color='#fcb321' />
                                                :  <AntDesign name="closecircle" size={35}color='#eb1d13' /> }


                                                </View>
                                                <View style={{width:'50%'}}>
                                                    <Text style={{fontWeight:'bold',paddingTop:5}}>Đợt : {chi_tiet_dt.ten_dot_thu}</Text>
                                                   
                                                </View>
                                                <View style={{width:'30%'}}>
                                                    <Text> {formatNumberMoney(item.item.so_tien_phai_dong)} </Text>
                                                </View>
                                        </View>
                                 </TouchableOpacity>
                        }}
                        keyExtractor={(item,index) => index.toString()}
                    />
                     
                    
                  {/* loading */}
                  <View style={showLoading ? {display:'flex'} : {display:'none'}}>
                           <Image style={{width: 50 , height:50,alignSelf:'center'}}   source={require('../../android/app/src/tenor.gif')}/>
                  </View>
                    {/*  */}

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

export default DotCuaThang;
