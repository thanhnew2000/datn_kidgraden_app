



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

const DiemDanh =  () => {


    
  const data_redux = useSelector(state => state)
  const du_lieu_hs = data_redux.hocsinh.data;
 
  
  const [SangChieu, setSangChieu] = useState(false);
    
  const [showModal, setShowModal] = useState(false);
  var month = new Date().getMonth() + 1; //To get the Current Month
  var year = new Date().getFullYear()
  const [thangNam, setThangNam] = useState(month+' / '+year);
  const [arrDate, setArrDate] = useState([]);
  const [token, setToken] = useState('');

  const [dataDiemDanhDen, setDataDiemDanhDen] = useState([]);
  const [dataDiemDanhVe, setDataDiemDanhVe] = useState([]);

     async function  getArrDate () {
       var get_token = await AsyncStorage.getItem('data_token');
    //    var hs = await AsyncStorage.getItem('data_hs');
    //    let data_HocSinh = JSON.parse(hs)
        setToken(token);
        ApiDiemDanh.getThangNamOfNamHocHienTai(get_token)
        .then(function (response) {
            let data = response.data;
            let indexEnd = (data.length - 1);
            setArrDate(data);
            // choseDateShow(month+' / '+year,data_HocSinh.id)
            setThangNam(month+' / '+year);
            const formData = new FormData();
            formData.append("date",month+' / '+year);
            formData.append("id_hs",du_lieu_hs.id);
            HamGetDataByThangNam(get_token,formData)

        })
        .catch(function (error) {
        console.log(error);
        });
    };
    useEffect(() => {getArrDate()}, []);


    const ListDiemDanh = ({item}) => (
      <View style={styles.listDiemDanh}>
            <View style={SangChieu ? styles.contentSang :  styles.contentChieu}>
                <Text>{SangChieu ? item.ngay_diem_danh_den : item.ngay_diem_danh_ve }</Text>
            </View>
            <View style={SangChieu ? styles.contentSang :  styles.contentChieu}>
                <Text style={{color:'green'}}>Đi học</Text>
            </View> 
            <View style={{width:'40%',paddingLeft:5,borderColor: SangChieu ? '#2daaed' : '#F7C261',borderWidth:1}}>
                <Text>{item.chu_thich}</Text>
            </View>
     </View>
    );

    function showListSangChieu(value){
        if(value == 2){
            setSangChieu(false);
        }else{
            setSangChieu(true);
        }
    }

    function HamGetDataByThangNam(token,formData){
        ApiDiemDanh.getDataByThangNam(token,formData)
        .then(function (response) {
            let data = response.data;
            setDataDiemDanhDen(data.diem_danh_den);
            setDataDiemDanhVe(data.diem_danh_ve);
            console.log(data.diem_danh_den)
            console.log(data.diem_danh_ve)
        })
        .catch(function (error) {
        console.log(error);
        });
    }


    function choseDateShow(date){
        setThangNam(date);
        const formData = new FormData();
        formData.append("date",date);
        formData.append("id_hs",du_lieu_hs.id);
        HamGetDataByThangNam(token,formData)
        setShowModal(false)
    }

   

  return (
            <View style={styles.container}>

                 <View style={styles.calender}>
                    <ImageBackground  style={{width:'100%' ,height:'100%',flexDirection:'row'}} source={require('../../android/app/src/asset/img/hoa-dao.gif')}>

                        <View style={{width:'70%',alignItems:'flex-end',justifyContent:'flex-end'}}>
                            <Text style={{fontSize:17}}>Tháng {thangNam}</Text>
                        </View>
                        <View style={{width:'25%',alignItems:'flex-end'}}>

                        <AntDesign name="calendar" size={30} color="green" onPress={()=>{ setShowModal(true)} } />

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showModal}
                    onRequestClose={() => {
                      setShowModal(false)
                    }} 
                    >
                            <View style={{backgroundColor:'#dddd',flex:1,justifyContent:'center',alignItems:'center'}}>
                                <View style={styles.boxModel}>
                                    <View style={{flexDirection:'row',width:100,paddingVertical:5}}>
                                        <View style={{width:'80%'}}>
                                             <Text style={{fontSize:17,fontWeight:'bold'}}>Tháng</Text>
                                        </View>
                                        
                                        <View style={{width:'20%'}}>
                                            <TouchableOpacity onPress={()=>{setShowModal(false)}} >
                                                <Text style={{fontSize:17,fontWeight:'bold'}}>X</Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>


                                    
                                        <FlatList
                                            data={arrDate}
                                            renderItem={({item}) =>
                                                <TouchableOpacity onPress={()=>choseDateShow(item)} >
                                                    <View style={{borderBottomWidth:1,padding:5,paddingHorizontal:15}}>
                                                        <Text style={thangNam == item ? styles.choseDate : styles.datePickerNormal}>{item}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            }
                                            keyExtractor={(value, index) => index}

                                    />
                                </View>
                            </View>

                </Modal>
                        </View>

                    </ImageBackground>

                </View>


                <View style={styles.header}>
                    <View style={{width:'45%'}}>
                        <Button title="Điểm danh đến" onPress={()=>showListSangChieu(1)} />
                    </View>
                    <View style={{width:'45%',paddingLeft:10}}>
                      <Button title="Điểm danh về"  color="#F7C261" onPress={()=>showListSangChieu(2)} />
                    </View>
                </View>

                <View style={{borderWidth:1,borderColor: SangChieu ? '#2daaed' : '#F7C261', marginVertical:15,}}>



                    <View style={SangChieu ? styles.titleDiemDanhSang : styles.titleDiemDanhChieu}>
                      <Text style={{color:'#fff',fontSize:16}}>Thông tin điểm danh</Text>
                    </View>

                    <View style={styles.table}>
                        <View style={{flexDirection:'row'}}>
                            <View style={styles.titleTable}>
                                <Text style={SangChieu ? styles.textTitleTableSang : styles.textTitleTableChieu}>Ngày học</Text>
                            </View>
                            <View style={styles.titleTable}>
                                <Text style={SangChieu ? styles.textTitleTableSang : styles.textTitleTableChieu}>Trạng thái </Text>
                            </View> 
                            <View style={styles.titleTable}>
                                <Text style={SangChieu ? styles.textTitleTableSang : styles.textTitleTableChieu}>Ghi chú </Text>
                            </View>
                     </View>



                        
                             <FlatList
                                data={SangChieu ? dataDiemDanhDen : dataDiemDanhVe }
                                renderItem={({item,index}) =>  <ListDiemDanh item={item} /> }
                                keyExtractor={(value, index) => index}
                            />
                         
                        {/* <ListDiemDanh />
                        <ListDiemDanh />
                        <ListDiemDanh />
                        <ListDiemDanh /> */}

                



                    </View>

                </View>
           
           
            </View>
  );
};

const styles = StyleSheet.create({
    container: {
       flex:1,
       padding:10,
       backgroundColor:'#fff',
       flexDirection:'column'
    },
    header:{
        flexDirection:'row',
        justifyContent:'center',
        paddingTop:15
    },
    calender:{
        alignItems:'center',
        paddingVertical:10,
        flexDirection:'row',
    },
    body:{
        borderWidth:1,
        borderColor:'#2daaed',
        marginVertical:15,
    },


    titleDiemDanhSang:{
        backgroundColor:'#2daaed',
        padding:10,
    },
    table:{
        padding:10,
    },
    titleTable:{
        width: (Dimensions.get('screen').width - 60) / 3,
        alignItems:'center',
        paddingVertical:2,
        
    },
    contentSang:{
        width:'30%',
        alignItems:'center',
        paddingVertical:2,
        // borderRightWidth:1,
        borderWidth:1,
        borderColor:'#2daaed',
        justifyContent:'center'

    },
    listDiemDanh:{
        flexDirection:'row'
    },

    titleDiemDanhChieu:{
        backgroundColor:'#F7C261',
        padding:10,
    },
    contentChieu:{
        width:'30%',
        alignItems:'center',
        paddingVertical:2,
        borderWidth:1,
        borderColor:'#F7C261',
        justifyContent:'center'
    },

    textTitleTableChieu:{
        fontSize:15,color:'#F7C261',fontWeight:'bold'
    },
    textTitleTableSang:{
        fontSize:15,color:'#2daaed',fontWeight:'bold'
    },
    boxModel:{
        alignItems:'center',
        padding:15,
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
        height:200
    },

    datePickerNormal:{
        fontSize:17,
    },
    choseDate:{
        fontSize:17,
        color:'green'
    }
    
  });
export default DiemDanh;
