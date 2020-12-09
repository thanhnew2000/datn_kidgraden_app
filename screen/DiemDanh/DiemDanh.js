
import React ,{ useState,useEffect }from 'react';
import {
    StyleSheet,
    View,
    FlatList,Text,Image,Button,Dimensions, ImageBackground,Modal,TouchableOpacity, Alert
    
  } from 'react-native';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import DateTimePicker from '@react-native-community/datetimepicker';
  import ApiDiemDanh from '../../android/app/src/api/DiemDanhApi';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { useSelector,useDispatch } from 'react-redux'
import WaitLoading from '../Wait_Loading';


const DiemDanh =  ({navigation}) => {
    
  const data_redux = useSelector(state => state)
  const du_lieu_hs = data_redux.hocsinh.data;
 
  const [submitLoading, setsubmitLoading] = useState(true);
  
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
        setToken(get_token);
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
            if(data == 'NoHaveData'){
                Alert.alert('Tháng ngày hiện không có dữ liệu')
            }else{
            setDataDiemDanhDen(data.diem_danh_den);
            setDataDiemDanhVe(data.diem_danh_ve);
            }
            setsubmitLoading(false);
        })
        .catch(function (error) {
            console.log(error);
            setsubmitLoading(false);
        });
    }


    function choseDateShow(date){
        setThangNam(date);
        setsubmitLoading(true);
        console.log('date',date)
        const formData = new FormData();
        formData.append("date",date);
        formData.append("id_hs",du_lieu_hs.id);
        HamGetDataByThangNam(token,formData)
        setShowModal(false)
    }

    function showStatusDiemDanh(status){
        // console.log(status);  
        if(status == 1){
            return 'Đã đón'
        }else if( status == 2 ){
            return  'Đón hộ'
        }else if(status == 3 ) {
            return 'Nghỉ học'
        }else{
            return null
        }
    }
   function textColorTrangThai(status){
    if(status == 1){
        return styles.colorGreen
    }else if( status == 2 ){
        return  styles.colorGreen
    }else if(status == 3 ) {
        return styles.colorRed
    }else{
        return null
    }
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
                                                <TouchableOpacity onPress={()=> choseDateShow(item)} >
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

                <View style={{borderWidth:1,borderColor: SangChieu ? '#2daaed' : '#F7C261', marginVertical:15,height:'75%'}}>



                    <View style={SangChieu ? styles.titleDiemDanhSang : styles.titleDiemDanhChieu}>
                      <Text style={{color:'#fff',fontSize:16}}>Thông tin điểm danh</Text>
                    </View>

                        {/* sáng */}
                        <View style={SangChieu ? styles.displayFlex : styles.displayNone}>

                            <View style={styles.table}>
                                    <View style={{flexDirection:'row'}}>
                                        <View style={styles.titleTable}>
                                            <Text style={styles.textTitleTableSang}>Ngày</Text>
                                        </View>
                                        <View style={styles.titleTable}>
                                            <Text style={styles.textTitleTableSang }>Sáng</Text>
                                        </View> 
                                        <View style={styles.titleTable}>
                                            <Text style={styles.textTitleTableSang}>Chiều </Text>
                                        </View>
                                        <View style={styles.titleTable}>
                                            <Text style={styles.textTitleTableSang}>Ăn trưa </Text>
                                        </View>
                                </View>
                                </View>
                        
                             <FlatList
                                data={SangChieu ? dataDiemDanhDen : dataDiemDanhVe }
                                renderItem={({item,index}) =>  
                                        <View style={styles.listDiemDanh}>
                                                <View style={{width:'25%',paddingLeft:5,borderColor:'#2daaed',borderWidth:1}}>
                                                    <Text>{item.ngay}</Text>
                                                </View>
                                                <View style={{width:'25%',paddingLeft:5,borderColor:'#2daaed',borderWidth:1}}>
                                                    <Text style={item.sang  == 1 ? {color:'green'} : {color:'red'}}
                                                    >{item.sang  == 1 ? 'Có' :  item.chieu == 2 ? 'Vắng' : null }</Text>
                                                </View> 
                                                <View style={{width:'25%',paddingLeft:5,borderColor:'#2daaed',borderWidth:1}}>
                                                    <Text  style={item.sang  == 1 ? {color:'green'} : {color:'red'}}>{item.chieu  == 1 ? 'Có' :  item.chieu ==  2 ? 'Vắng'  : null }</Text>
                                                </View>
                                                <View style={{width:'25%',paddingLeft:5,borderColor:'#2daaed' ,borderWidth:1}}>
                                                    <Text >{item.an == 1 ? 'Ăn' :   item.an ==  2 ? 'Không ăn'  : null}</Text>
                                                </View>
                                        </View> }
                                keyExtractor={(value, index) => index}
                                /> 
                                </View>

                        {/* sáng */}

                            {/* Chiều */}
                            <View style={SangChieu ? styles.displayNone : styles.displayFlex}>
                                <View style={styles.table}>
                                    <View style={{flexDirection:'row'}}>
                                        <View style={{ width:'25%',alignItems:'center', paddingVertical:2}}>
                                            <Text style={styles.textTitleTableChieu}>Ngày</Text>
                                        </View>
                                        <View style={{ width:'25%',alignItems:'center', paddingVertical:2}}>
                                            <Text style={styles.textTitleTableChieu}>Tình trạng</Text>
                                        </View> 
                                        <View style={{ width:'50%',alignItems:'center', paddingVertical:2}}>
                                            <Text style={styles.textTitleTableChieu}>Ghi chú </Text>
                                        </View>
                                    </View>
                                <View style={{height:'85%'}}>
                                    <FlatList
                                            data={dataDiemDanhVe}
                                            renderItem={({item,index}) =>  
                                                  <TouchableOpacity onPress={()=>{ item.data !== 0 ? navigation.navigate('detail_diem_danh_ve' , {item :item}) : null }}>
                                                    <View style={styles.listDiemDanh}>
                                                            <View style={styles.contentChieu}>
                                                                <Text>{item.ngay}</Text>
                                                            </View>
                                                            <View style={styles.contentChieu}>
                                                                <Text style={textColorTrangThai(item.data.trang_thai)}>{item.data  == 0 ? '' : showStatusDiemDanh(item.data.trang_thai)}</Text>
                                                            </View> 
                                                            <View style={{width:'45%',paddingLeft:5,borderColor: '#F7C261',borderWidth:1}}>
                                                                <Text>{item.chu_thich}</Text>
                                                            </View>
                                                    
                                                    </View>
                                             </TouchableOpacity>
                                        }
                                            keyExtractor={(value, index) => index}
                                    /> 

                                </View>
                            </View>
                            
                            {/* Chiều */}


                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={submitLoading}
                                onRequestClose={() => {
                                Alert.alert("Modal has been closed.");
                                }}
                            >
                            <WaitLoading />
                            </Modal>


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
       flexDirection:'column',
    },
    header:{
        flexDirection:'row',
        justifyContent:'center',
        paddingTop:15
    },
    colorGreen:{
        color:'green'
    },
    colorRed:{
        color:'red'
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

    displayNone:{
        display:'none'
    },
    displayFlex:{
        display:'flex'
    },
    // titleTable:{
    //     width: (Dimensions.get('screen').width - 60) / 3,
    //     alignItems:'center',
    //     paddingVertical:2,
    // },
    titleTable:{
        width: (Dimensions.get('screen').width - 60) / 4,
        alignItems:'center',
        paddingVertical:2,
    },

    titleTableChieu:{
        width: (Dimensions.get('screen').width - 60) / 3,
        alignItems:'center',
        paddingVertical:2,
    },
    // contentSang:{
    //     width:'30%',
    //     alignItems:'center',
    //     paddingVertical:2,
    //     // borderRightWidth:1,
    //     borderWidth:1,
    //     borderColor:'#2daaed',
    //     justifyContent:'center'

    // },
    listDiemDanh:{
        flexDirection:'row',
    },

    titleDiemDanhChieu:{
        backgroundColor:'#F7C261',
        padding:10,
    },
    // contentChieu:{
    //     width:'30%',
    //     alignItems:'center',
    //     paddingVertical:2,
    //     borderWidth:1,
    //     borderColor:'#F7C261',
    //     justifyContent:'center'
    // },


    contentSang:{
        width:'25%',
        alignItems:'center',
        paddingVertical:2,
        // borderRightWidth:1,
        borderWidth:1,
        borderColor:'#2daaed',
        justifyContent:'center'

    },

    contentChieu:{
        width:'25%',
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