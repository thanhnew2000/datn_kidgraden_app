
import React ,{ useState,useRef,useEffect }from 'react';
import { View, Text, Image, StyleSheet, 
    TextInput,
    TouchableOpacity, ScrollView,Button,FlatList,Alert
 } from 'react-native'
 import HTMLView from 'react-native-htmlview';
import IconKidsStudy from '../../android/app/src/asset/img/icon-kids-study.jpg';
import { Input } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ipApi from '../../android/app/src/api/ipApi';
import ApiPhanHoi from '../../android/app/src/api/PhanHoiDonThuocApi';
import ApiDonThuoc from '../../android/app/src/api/DonThuocApi';
import AsyncStorage from '@react-native-community/async-storage';
import Modal_SubmitLoading from '../component/reuse/Modal_SubmitLoading';
import { useSelector,useDispatch } from 'react-redux'
import moment from 'moment';
import 'moment/locale/vi';

import HeaderNotifiWhenClick from '../HeaderNotifiWhenClick';
import HeaderClickFromThongBao from '../HeaderClickFromThongBao';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

//quang add database firebase
import database from '@react-native-firebase/database';

const Detail_medicine =  ({ route,navigation }) => {

    //quang add get database firebase start

    //quang add get database firebase end
    const data_redux = useSelector(state => state)
    const du_lieu_hs = data_redux.hocsinh.data;
    const data_token = data_redux.token;
  console.log('token_data',data_token.token)
    const [chitietdon, setChiTietDon] = useState({});
    const [donthuoc, setDonThuoc] = useState({});

   

    const scrollViewRef = useRef();


      const { dl_donthuoc } = route.params;

      const { id_ } = route.params;
      const { route_notifi } = route.params;

      const id_don_thuoc = id_;
      // console.log('dt',donthuoc)
      // // const { data_HS } = route.params;
      // const chitietdon = donthuoc.chi_tiet_don_dan_thuoc;


    const [binhLuan,setBinhLuan] = useState([]);
    // const [data_HS, setData_HS] = useState({});
    const [Hscomment, setComment] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [chatLoad, setChatLoad] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    const [chooseShowTest,setchooseShowTest] = useState(false);

    const [idShowTime, setIdShowTime] = useState(0);



    //   useEffect(() => {
    //         if(route_notifi == 'detail_medicine'){
    //           navigation.setOptions({
    //             headerTitle: () => <HeaderNotifiWhenClick navigation={navigation} name_header_tab="Chi tiết dặn thuốc"/>,
    //           })
    //         }
    //  }, []);

     
   async function HamGetBinhLuanDonThuoc (id_don_thuoc) {
      console.log('runinggggggggggggggggggggggggggggggggggggggggg ----------------------------------------------');
      setShowLoading(true);
      var data_token = await AsyncStorage.getItem('data_token');
      console.log('data_token',data_token)
        ApiPhanHoi.getBinhLuanOfDonThuoc(data_token,id_don_thuoc)
          .then(function (response) {
            let data_get = response.data;
            if(typeof data_get == 'object'){
              setBinhLuan(data_get);
            }
            setShowLoading(false);
            console.log('binh_luan',typeof data_get)
          })
          .catch(function (error) {
            setShowLoading(false);
            console.log(error);
          });
      };



      async function getDonThuocById (id) {
        var data_token = await AsyncStorage.getItem('data_token');
        ApiDonThuoc.getDonThuocById(data_token,id)
          .then(function (response) {
            let data = response.data;
            console.log('hihi',data)
            setDonThuoc(data);
            setChiTietDon(data.chi_tiet_don_dan_thuoc);
          })
          .catch(function (error) {
            console.log(error);
          });
      };
  
  
      useEffect(() => {
         async function fetchData() {
             var token = await AsyncStorage.getItem('data_token');
             var data_all_js_json = await AsyncStorage.getItem('data_all_hs');
             let  data_all = JSON.parse(data_all_js_json);
             
              if(dl_donthuoc == undefined){
                getDonThuocById(id_don_thuoc)
              }else{
                setDonThuoc(dl_donthuoc);
                setChiTietDon(dl_donthuoc.chi_tiet_don_dan_thuoc);
              }

              // check neu tat ap an click thong bao nen thi lay header khac
              const { route_notifi } = route.params;
              if(route_notifi == 'detail_medicine'){
                  navigation.setOptions({
                    headerTitle: () => <HeaderNotifiWhenClick navigation={navigation} name_header_tab="Chi tiết đơn thuốc"/>,
                  })
               }
               else{
                const { thong_bao } = route.params;
                if(thong_bao == true ){
                 navigation.setOptions({
                  //  headerTitle: () => <HeaderClickFromThongBao navigation={navigation} name_header_tab="Chi tiết đơn thuốc"/>,
                    headerLeft: null
                 })
                 }
               }
           



              const firebaseRuniing =  database().ref('phan_hoi_don_thuoc').orderByChild('don_dan_thuoc_id').equalTo(id_don_thuoc).limitToLast(1);
              const onListerning = firebaseRuniing.on('child_added', function(snapshot) { 
                console.log('arrun_detail_don______________________________________________',id_don_thuoc)
                HamGetBinhLuanDonThuoc(id_don_thuoc);
              });
              return () => {
                firebaseRuniing.off('child_added',onListerning);            
              }
          }
          fetchData();

        },[]);
    
// function clickTest(){
// database()
//   .ref('phan_hoi_don_thuoc')
//   .orderByChild('don_dan_thuoc_id').equalTo(id_don_thuoc).limitToLast(1)
//   .on('child_added', snapshot => {
//     var arr = [];
//      var data_firebase = snapshot.val();
//       arr.push(data_firebase)
//       console.log('arr_data_firebase',data_firebase)
//   });

// }
   

 
 
  // console.log('set____________________')
  //     database()
  //     .ref('phan_hoi_don_thuoc')
  //     .orderByChild('don_dan_thuoc_id').equalTo(id_don_thuoc)
  //     .once('value', snapshot => {
  //       setchooseShowTest(true);
  //     });

    // HamGetBinhLuanDonThuoc(data_token.token,id_don_thuoc)
    // if(dl_donthuoc == undefined){
    //   getDonThuocById(id_don_thuoc)
    // }else{
    //   setDonThuoc(dl_donthuoc);
    //   setChiTietDon(dl_donthuoc.chi_tiet_don_dan_thuoc);
    // }



   
    
            
       

    

const DetailMedicine = ({item}) => {

return    <View style={styles.listMedicine}>
            <View style={{flexDirection:'row'}}> 
                    <View style={{width:'70%'}}>
                        <Text style={{fontWeight:'bold',fontSize:15}}> {item.ten_thuoc} </Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold',fontSize:15}}> Liều : </Text>
                            <Text>{item.lieu_luong}  ({item.don_vi})</Text>
                        </View>
                        <Text style={{fontWeight:'bold',fontSize:15}}> Ghi chú : </Text>
                        <Text>{item.ghi_chu}</Text>
                    </View>
                    <View style={{width:'30%',alignItems:'center',alignSelf:'center'}}>
                    {/* <Image style={{width:60,height:60}} source={IconKidsStudy}/> */}
                    <Image  style={{width:60,height:60}} source={{uri : item.anh}}/>
                   </View>
            </View>
        </View>

}

const BinhLuanCuaGiaoVien = ({item}) => (
<View style={{flexDirection:'row',paddingVertical:5}}>
        <View style={{flexDirection:'column-reverse'}}>
        <Image style={{width:40,height:40,borderRadius:50}} source={IconKidsStudy}/>
        </View>

        <View style={{width:'50%'}}>
        <Text style={{color:'gray'}}> GV: {item.user == undefined ? ' ' : item.user.giao_vien.ten} </Text>
           <TouchableOpacity onPress={()=> {setIdShowTime(item.id)}}>
              <View style={{paddingLeft:10,backgroundColor:'#e6e5e3',paddingRight:10,borderBottomRightRadius:10,borderTopRightRadius:10,paddingVertical:5}}>
                <Text style={{}}>{item.noi_dung}</Text>
              </View>
            </TouchableOpacity>

          <View style={idShowTime == item.id ? styles.displayShow : styles.displayHide}>
              <Text style={{color:'black',fontSize:12}}>{moment(item.created_at).format('MMMM Do YYYY, h:mm')} </Text>
          </View>

        </View>
    </View>
)

const BinhLuanCuaHocSinh= ({item}) =>(
    <View style={{flexDirection:'row',justifyContent:'flex-end',paddingVertical:5}}>
      <View style={{flexDirection:'column'}}>
        <TouchableOpacity onPress={()=> {setIdShowTime(item.id)}}>
            <View style={{paddingLeft:10,backgroundColor:'#5a95fa',paddingRight:10,paddingVertical:5,borderBottomLeftRadius:10,borderTopLeftRadius:10}}>
              <Text style={{fontSize:15,color:'#0a0a0a'}}>{item.noi_dung} </Text>
            </View>
        </TouchableOpacity>
        <View style={idShowTime == item.id ? styles.displayShow : styles.displayHide}>
          <Text style={{alignSelf:'flex-end',color:'black',fontSize:12}}> {moment(item.created_at).format('MMMM Do YYYY, h:mm')}</Text>
        </View>

      </View>
    </View>
)


const submitBinhLuan = () => {
    // setSubmitLoading(true);
    setChatLoad(true);
            const formData = new FormData();
            formData.append("don_dan_thuoc_id",id_don_thuoc);
            formData.append("nguoi_phan_hoi_id",du_lieu_hs.id);
            formData.append("noi_dung",Hscomment);
    

            ApiPhanHoi.insertPhanHoi(data_token.token,formData)
            .then(res => {
                console.log(res.data);
                setBinhLuan([...binhLuan,{
                    type : 1,
                    noi_dung : Hscomment
                }])
                setComment(null);
                setChatLoad(false);

            })
            .catch(err => {
                setSubmitLoading(false);
                Alert.alert('Có lỗi')
                console.log(err);
            });

}


function scrolltoendBinhLuan(){
  scrollViewRef.current.scrollToEnd({animated: true})
}

function checkValueLenght(){
  // let regSpace= new RegExp(/\s/);
  if(Hscomment == null){
    return false;
  }else if(Hscomment == ' '){
    return false;
  }else if(Hscomment == ''){
    return false;
  }else{return true}
}

  return (
            <View style={styles.container}>
               <ScrollView  ref={scrollViewRef}
                //  onContentSizeChange={(contentWidth, contentHeight)=>{
                //   set_scrollToBottomY(contentHeight)
                //   }}
                  >
                        {/* <View style={{flexDirection:'row'}}>
                            <View>
                            <Image style={{width:70,height:70}} source={{uri : ipApi+'storage/'+data_HS.avatar}}/>

                            </View>
                            <View style={{paddingLeft:10,paddingTop:10}}>
                                <Text style={{fontSize:19,fontWeight:'bold'}}>{data_HS.ten}</Text>
                                <Text style={{}}>17/9/2020</Text>
                            </View>
                        </View> */}
                 <TouchableOpacity onPress={()=> clickTest()}>
                        <View style={{paddingVertical:5}}>
                            <Text style={{fontWeight:'bold',backgroundColor:'green',width:'20%',color:'white',textAlign:'center'}}>Lời nhắn</Text>
                                <Text>"{donthuoc.noi_dung}"</Text>
                        </View>
                        </TouchableOpacity>
                      {/* <View style={styles.listMedicine}>
                            <View style={{flexDirection:'row'}}> 
                                    <View style={{width:'70%'}}>
                                        <Text style={{fontWeight:'bold',fontSize:15}}> Sino </Text>
                                        <View style={{flexDirection:'row'}}>
                                               <Text style={{fontWeight:'bold',fontSize:15}}> Liều : </Text>
                                               <Text>(300ml)</Text>
                                        </View>
                                        <Text style={{fontWeight:'bold',fontSize:15}}> Ghi chú : </Text>
                                        <Text> Uống sau bữa ăn trưa  ăn trưa ăn trưa ăn trưa ăn trưa ăn trưa ăn trưa ăn trưa</Text>
                                    </View>
                                    <View style={{width:'30%',alignItems:'center',alignSelf:'center'}}>
                                       <Image style={{width:60,height:60}} source={IconKidsStudy}/>
                                    </View>
                            </View>
                        </View>  */}
                        
                       <FlatList
                            data={chitietdon}
                            renderItem={({item,index})=>
                            <DetailMedicine  item={item} index={index} />
                            } 
                            keyExtractor={(item,index) => index.toString()} 
                        />

                        <View style={{paddingVertical:5,flexDirection:'row'}}>
                            <AntDesign name="check" size={20} color="green" />
                            <Text  style={{color:'green',fontSize:16}}>Đã cho con uống</Text>
                        </View>

                          {/* <Button title="check" onPress={()=> clickCheck()}/> */}

                  <View>

                  <View style={showLoading ? {display:'flex'} : {display:'none'}}>
                     <Image style={{width: 50 , height:50,alignSelf:'center'}}   source={require('../../android/app/src/tenor.gif')}/>
                  </View>
                      <FlatList
                          data={binhLuan}
                          onContentSizeChange={()=>  scrolltoendBinhLuan() } 
                          renderItem={ ({item})=>  (
                            // <Text> ahihi </Text>
                      
                           item.type == 1 ? <BinhLuanCuaHocSinh item={item} /> : <BinhLuanCuaGiaoVien item={item}/> 
                           )
                            } 
                            keyExtractor={(item,index) => index.toString()} 
                            
                        /> 
                  </View>


                            {/* <View style={{flexDirection:'row',paddingVertical:5}}>
                                <View style={{flexDirection:'column-reverse'}}>
                                   <Image style={{width:40,height:40,borderRadius:50}} source={IconKidsStudy}/>
                                </View>

                                <View style={{width:'50%'}}>
                                  <Text style={{color:'gray'}}>  Võ kiều vân </Text>
                                    <View style={{paddingLeft:10,backgroundColor:'#e6e5e3',paddingRight:10,borderBottomRightRadius:10,borderTopRightRadius:10,paddingVertical:5}}>
                                       <Text style={{}}>jhgfdssd fdsfdsfds jfkdsgkhfdskjg hjfkdshg fdshgkj</Text>
                                    </View>
                                </View>
                            </View>

                      
                            <View style={{flexDirection:'row',justifyContent:'flex-end',paddingVertical:5}}>
                                <View style={{paddingLeft:10,backgroundColor:'#5a95fa',paddingRight:10,paddingVertical:5,borderBottomLeftRadius:10,borderTopLeftRadius:10}}>
                                  <Text style={{fontSize:15,color:'#0a0a0a'}}>TREWQEY </Text>
                                </View>
                            </View> */}

                    

                        <View style={{flexDirection:'row'}}>
                            <View style={{height:50,width:'100%',backgroundColor:'white'}}>

                            </View>
                        </View>

                </ScrollView>

                <View style={{flexDirection:'row',position: 'absolute', left: 0, right: 0, bottom: 0,flex:0.1,paddingBottom:10,alignItems:'center',alignContent:'center'}}>
                           <TextInput   style={{ 
                              width:'80%',height: 35,marginLeft:'8%',
                              borderColor: 'gray',
                               borderWidth: 1,
                               borderRadius :50,
                               paddingHorizontal:10,
                               backgroundColor:'white',alignItems:'center' }} 
                                  placeholder="Phản hồi cho giáo viên"
                                  value={Hscomment}
                                  onChangeText={text  => {setComment(text)}}
                                  />


                          <View style={chatLoad ? {display:'none'} : {display:'flex',width:'10%',marginLeft:'2%'} }>
                              <TouchableOpacity style={checkValueLenght() ? {display:'flex'} : {display:'none'}}  onPress={()=>submitBinhLuan()}>
                                {/* <Button title="Gui"  onPress={submitBinhLuan}/> */}
                                <MaterialIcons name="send" size={30} color="#4dabf7"  />
                            </TouchableOpacity>
                          </View>

                          <View style={chatLoad? {display:'flex',width:'10%',marginLeft:'2%'} : {display:'none'}}>
                             <Image style={{width: 25 , height:25,borderRadius:100 }}      source={require('../../android/app/src/kOnzy.gif')}/>
                          </View>
                </View>


              <Modal_SubmitLoading submitLoading={submitLoading} />

            </View> 
  );
};
const styles = StyleSheet.create({
    container:{
      flex:1,
      padding:10,
      backgroundColor:"#fff",
      flexDirection:'column',
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    boxlistMedicine:{
        flexDirection:'row',
        marginTop:10,
        borderRadius:4,
        paddingVertical:5,
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
    listMedicine:{
        marginTop:1,
        paddingHorizontal:5,
        borderRadius:4,
        paddingVertical:5,
        backgroundColor:'#fff',
        borderWidth:0.5
    },
    checkbox: {
        alignSelf: "center",
    },
    displayShow:{
      display:'flex'
    },
    displayHide:{
      display:'none'
    },
});

export default Detail_medicine;
