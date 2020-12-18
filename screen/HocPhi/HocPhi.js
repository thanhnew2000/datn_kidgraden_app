
import React ,{ useState, useEffect }from 'react';
import axios from 'axios';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Button } from 'react-native'
import IconNews from '../../android/app/src/asset/img/icon-news.png';
import IconKidsExercise from '../../android/app/src/asset/img/icon-kids-exercise.jpg';
import IconKidsStudy from '../../android/app/src/asset/img/icon-kids-study.jpg';
import IconKidsOutSide from '../../android/app/src/asset/img/icon-kids-outside.jpg';
import { ScrollView } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';


import ApiHocPhi from '../../android/app/src/api/HocPhiApi';
import { useSelector,useDispatch } from 'react-redux'

const HocPhi =  ({ navigation }) => {

    const data_redux = useSelector(state => state)
    const du_lieu_hs = data_redux.hocsinh.data;

    const [data_hp, setDataHp] = useState([]);
    const [arr_nam, setArrNam] =  useState([]);

    const [listDataThang, setlistDataThang] =  useState([]);

    const [namClick, setnamClick] =  useState('');


    const getHoatDong = () => {
        ApiHocPhi.getNamThangOfHocPhiHs('data_token',du_lieu_hs.id)
        .then(function (response) {
          let data = response.data;
          setDataHp(data);
          Object.keys(data).forEach(function(key) {
            setArrNam([{...arr_nam,key}])
                console.log('data_hoat_dong',data);
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    useEffect(() => {getHoatDong()}, []);

    // function clickTest(){
    //       set
    // }

    function onClick2(nam){
        setnamClick(nam);
        Object.keys(data_hp).forEach(function(key) {
                if(nam == key){
                    setlistDataThang(data_hp[key])
                }
          });
     }

     function colorCss(item){
      return  item.item.trang_thai == 2 ? {color:'green'} : item.item.trang_thai ==  1 ? {color:'#fcb321'}   : {color:'#fa3228'}
     }
  return (
    <ScrollView style={styles.container}>
            <View>
                {/*  chọn năm hiện */}
                  <View  style={{width:'100%',marginTop:5,flexDirection:'row'}}>
                      <FlatList  
                       data={arr_nam}
                        renderItem={(item)=>{
                            return   <TouchableOpacity onPress={() => onClick2(item.item.key)}>
                                      <View style={namClick == item.item.key ? styles.bottomNamClick : styles.bottomNam}>
                                            <Text style={namClick == item.item.key ? {color:'#f2f6fc'} : {color:'#0a0a0a'}}>{item.item.key}</Text>
                                       </View>
                                    </TouchableOpacity>
                        }}
                        keyExtractor={(item,index) => index.toString()}
                    />
                
                   </View>
                {/*  list danh sách học phí */}
     
                        
                {/* <TouchableOpacity  onPress={()=>{ navigation.navigate('ChiTietHocPhi',{ hocphi: 'something', }) }}> */}
                <FlatList  
                       data={listDataThang}
                        renderItem={(item)=>{

                            return   <TouchableOpacity  onPress={()=> navigation.navigate('DotCuaThang',{id_thang_thu_tien: item.item.id , thang_thu : item.item.thang_thu})}>
                                        <View style={styles.boxList}>
                                                <View style={{width:'20%'}}>
                                                {item.item.trang_thai == 2 ? <AntDesign name="checkcircle" size={35}color='green' />
                                                 : item.item.trang_thai ==  1 ? <AntDesign name="checkcircle" size={35}color='#fcb321' />
                                                  :  <AntDesign name="closecircle" size={35}color='#eb1d13' /> }


                                                </View>
                                                <View style={{width:'50%'}}>
                                                    <Text style={{fontSize:15}}>Tháng {item.item.thang_thu}</Text>
                                                        <Text style={colorCss(item)}>
                                                            {item.item.trang_thai == 2 ? 'Đã hoàn thành' : item.item.trang_thai ==  1 ? 'Đang hoàn thành'  : 'Chưa đóng'}
                                                         </Text>
                                                </View>
                                                <View style={{width:'30%'}}>
                                                    <Text style={colorCss(item)}>{item.item.tong_tien_phai_dong} vnđ</Text>
                                                </View>
                                        </View>
                                 </TouchableOpacity>
                        }}
                        keyExtractor={(item,index) => index}
                    />
                     
                

                {/* <View style={styles.boxList}>
                      <View style={{width:'20%'}}>
                          <AntDesign name="closecircle" size={35} color='#ee5d40' />
                      </View>
                      <View style={{width:'50%'}}>
                            <Text style={{fontWeight:'bold'}}>Tháng 6</Text>
                            <Text style={{color:'#ee5d40'}}>Chưa hoàn thành</Text>
                      </View>
                      <View style={{width:'30%'}}>
                          <Text style={{color:'red'}}>5,400,000 vnđ</Text>
                      </View>
                </View> */}

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
    },
    bottomNam:{
        width:'30%',marginHorizontal:5,marginVertical:5,paddingHorizontal:5
        ,paddingVertical:5,borderColor:'#ffc233',borderWidth:1,borderRadius:5,alignItems:'center'
    },
    bottomNamClick:{
        width:'30%',marginHorizontal:5,marginVertical:5,paddingHorizontal:5,
        backgroundColor:'#ffc233',
        paddingVertical:5,borderColor:'#ffc233',borderWidth:1,borderRadius:5,alignItems:'center',
    }
   
   
});

export default HocPhi;
