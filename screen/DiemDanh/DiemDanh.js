
import React ,{ useState }from 'react';
import {
    StyleSheet,
    View,
    FlatList,Text,Image,Button,Dimensions, ImageBackground
    
  } from 'react-native';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import DateTimePicker from '@react-native-community/datetimepicker';

const DiemDanh =  () => {

  const [SangChieu, setSangChieu] = useState(false);
    

  const [date, setDate] = useState(new Date(1598051730000));
  const [modeDate, setModeDate] = useState('date');
  const [showDate, setShowDate] = useState(false);


  const onChangeDate= (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === 'ios');
    setDate(currentDate);
 };

  const showMode = (currentMode) => {
    setShowDate(true);
    setModeDate(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };



    const ListDiemDanh = () => (
      <View style={styles.listDiemDanh}>
            <View style={SangChieu ? styles.contentSang :  styles.contentChieu}>
                <Text>18/5/2020</Text>
            </View>
            <View style={SangChieu ? styles.contentSang :  styles.contentChieu}>
                <Text style={{color:'green'}}>Đi học</Text>
            </View> 
            <View style={{width:'40%',paddingLeft:5,borderColor: SangChieu ? '#2daaed' : '#F7C261',borderWidth:1}}>
                <Text>Đi học muộn lắm abc</Text>
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
  return (
            <View style={styles.container}>

                 <View style={styles.calender}>
                    <ImageBackground  style={{width:'100%' ,height:'100%',flexDirection:'row'}} source={require('../../android/app/src/asset/img/hoa-dao.gif')}>

                        <View style={{width:'65%',alignItems:'flex-end',justifyContent:'center'}}>
                            <Text style={{fontSize:17}}>Tháng 5 / 2019</Text>
                        </View>
                        <View style={{width:'25%',alignItems:'flex-end'}}>

                        <AntDesign name="calendar" size={30} color="green" onPress={showDatepicker} />
                                {showDate && (
                                        <DateTimePicker
                                        testID="dateTimePicker"
                                        value={date}
                                        mode={modeDate}
                                        is24Hour={true}
                                        display="spinner"
                                        onChange={onChangeDate}
                                        />
                                )}
                        </View>

                    </ImageBackground>

                </View>


                <View style={styles.header}>
                    <View style={{width:'45%'}}>
                        <Button title="Sáng" onPress={()=>showListSangChieu(1)} />
                    </View>
                    <View style={{width:'45%',paddingLeft:10}}>
                      <Button title="Chiều"  color="#F7C261" onPress={()=>showListSangChieu(2)} />
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


                        <ListDiemDanh />
                        <ListDiemDanh />
                        <ListDiemDanh />
                        <ListDiemDanh />
                        <ListDiemDanh />

                



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
   
    
  });
export default DiemDanh;
