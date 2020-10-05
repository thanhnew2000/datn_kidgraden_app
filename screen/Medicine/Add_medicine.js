
import React ,{ useState }from 'react';
import { View, Text, Image,
    TouchableOpacity, ScrollView,StyleSheet,TextInput,  Modal, Button,FlatList, Alert
 } from 'react-native'
 import HTMLView from 'react-native-htmlview';
 import DateTimePicker from '@react-native-community/datetimepicker';
 import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
const Add_medicine =  ({ navigation }) => {

    const [viewModel, setViewModel] = useState(false);

    const [oneMedicineAdd, setOneMedicineAdd] = useState({
        name: '',
        lieu: '',
        donvi:'',
        note: '',
  });

    const [listAddMedicine, setListAddMedicine] = useState([
        {
            name:'Sino',
            lieu:'300',
            donvi:'ml',
            note:'Uống sau bữa ăn'
        },
        {
            name:'Sino 1',
            lieu:'300',
            donvi:'ml',
            note:'Uống sau bữa ăn'
        },
        {
            name:'Sino 2',
            lieu:'300',
            donvi:'ml',
            note:'Uống sau bữa ăn'
        },
    ]);


    const [dateFrom, setDateFrom] = useState(new Date(1598051730000));
    const [modeDateFrom, setModeDateFrom] = useState('date');
    const [showDateFrom, setShowDateFrom] = useState(false);

    const [dateTo, setDateTo] = useState(new Date(1598051730000));
    const [modeDateTo, setModeDateTo] = useState('date');
    const [showDateTo, setShowDateTo] = useState(false);

    const onChangeDateFrom = (event, selectedDate) => {
        const currentDate = selectedDate || dateFrom;
        setShowDateFrom(Platform.OS === 'ios');
        setDateFrom(currentDate);
     };

     const onChangeDateTo = (event, selectedDate) => {
        const currentDate = selectedDate || dateTo;
        setShowDateTo(Platform.OS === 'ios');
        setDateTo(currentDate);
     };

      const showModeFrom = (currentMode) => {
        setShowDateFrom(true);
        setModeDateFrom(currentMode);
      };
    
      const showModeTo = (currentMode) => {
        setShowDateTo(true);
        setModeDateTo(currentMode);
      };

      const showDatepickerFrom = () => {
        showModeFrom('date');
      };
    
      const showDatepickerTo = () => {
        showModeTo('date');
      };


      function modelShow(value){
        setViewModel(value)
      }

      function removeMedicineAdd(indexR){
          var newData = listAddMedicine.filter((data,index) => index !== indexR);
          setListAddMedicine(newData);
        console.log(indexR)
      }

      function addMedicinetoList(){
          if(oneMedicineAdd.name == '' || oneMedicineAdd.donvi == '' || oneMedicineAdd.lieu == '' ){
              Alert.alert('Hay nhập đủ tên , liều, đơn vị')
          }else{
                 setListAddMedicine([...listAddMedicine,oneMedicineAdd])
                 setViewModel(false);
                 setOneMedicineAdd({ name: '', lieu: '', donvi:'',note: '' })
          }
      }


      const UserGreeting = ({item,index}) => (
            <View style={styles.listMedicine}>
            <View style={{flexDirection:'row'}}> 
                    <View style={{width:'60%'}}>
                        <Text style={{fontWeight:'bold',fontSize:15}}> {item.name} </Text>
                    </View>
                    <View style={{width:'25%'}}>
                        <Text>Liều : ({item.lieu} {item.donvi})</Text>
                    </View>

                    <View style={{width:'20%'}}>
                        <AntDesign name="closecircle" size={30} color="red" onPress={() => removeMedicineAdd(index)} />
                    </View>
            </View>
            <View style={{flexDirection:'row'}}> 
                    <View>
                        <Text style={{fontWeight:'bold'}}> Ghi chú</Text>
                    </View>
                    <View style={{width:'70%'}}>
                        <Text>: {item.note}</Text>
                    </View>
            </View>
        </View>
      );
  return (
            <View style={styles.containers}>
                <View>
                   <Text style={{fontSize:16,fontWeight:'bold',paddingVertical:7}}>NỘI DUNG DẶN THUỐC :</Text>
                </View>


                <View style={styles.formUp}>
                            <View style={{flexDirection:'row'}}>
                                <View style={{width:'65%'}}>
                                <Text style={styles.fontTitleHeader}>Bắt đầu ngày :</Text>
                                        <View style={{flexDirection:'row'}}>
                                            <Text style={{fontSize:15,marginRight:10}}>{dateFrom.getDate()}/{dateFrom.getMonth() + 1}/{dateFrom.getFullYear()}</Text>
                                            <AntDesign name="calendar" size={30} color="green" onPress={showDatepickerFrom} />

                                            {showDateFrom && (
                                                    <DateTimePicker
                                                    testID="dateTimePicker"
                                                    value={dateFrom}
                                                    mode={modeDateFrom}
                                                    is24Hour={true}
                                                    display="default"
                                                    onChange={onChangeDateFrom}
                                                    />
                                            )}
                                            <Entypo  style={{marginLeft:40,marginTop:-10}} name="arrow-bold-right" size={35} color="green"  />

                                        </View>

                                        
                                </View>
                                <View style={{width:'35%'}}>
                                <Text Text style={styles.fontTitleHeader}  >Đến ngày :</Text>
                                        <View style={{flexDirection:'row'}}>
                                        <Text style={{fontSize:15,marginRight:10}}>{dateTo.getDate()}/{dateTo.getMonth() + 1}/{dateTo.getFullYear()}</Text>
                                            <AntDesign name="calendar" size={30} color="green" onPress={showDatepickerTo} />

                                            {showDateTo && (
                                                    <DateTimePicker
                                                    testID="dateTimePicker"
                                                    value={dateTo}
                                                    mode={modeDateTo}
                                                    is24Hour={true}
                                                    display="default"
                                                    onChange={onChangeDateTo}
                                                    />
                                                )}
                                        </View>
                                </View>

                        </View>   

                  
                                     <Text style={styles.fontTitleHeader}>Lời nhắn : </Text>
                                     <TextInput   style={{ width:'100%', borderColor: 'gray', borderWidth: 1,backgroundColor:'white' }} 
                                        placeholder="Lời nhắn tới giáo viên"
                                        multiline={true}
                                        numberOfLines={4}
                                        textAlignVertical = "top"
                                        />
                </View>


                <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:17,fontWeight:'bold',paddingVertical:15,width:'80%'}}>Danh sách thuốc</Text>
                    <TouchableOpacity onPress={() =>modelShow(true)} >
                    <AntDesign name="pluscircleo" size={30} color="green" style={{paddingTop:12}} />
                    </TouchableOpacity>
                </View>
                



                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={viewModel}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={{backgroundColor:'#000000aa',flex:1}}>
                        <View style={{backgroundColor:'#ffffff',margin:20,padding:10,borderRadius:10}}>

                        <View style={styles.headerModel}>
                            <View style={{width:'90%'}}>
                                 <Text style={{fontWeight:'bold',fontSize:17}}>Thêm thuốc</Text>
                            </View>
                            <View style={{width:'10%'}}>
                                <TouchableOpacity onPress={() =>modelShow(false)} >
                                     <AntDesign name="closesquareo" size={30}  style={{paddingTop:5}} />
                                </TouchableOpacity>
                                
                            </View>
                        </View>

                          <View style={{paddingVertical:5}}>
                              <Text style={styles.nameTitleModel}>Tên thuốc:</Text>

                              <TextInput 
                                onChangeText={text  => {setOneMedicineAdd({...oneMedicineAdd,name:text})}}
                                style={styles.inputModel}   />
                          </View>

                        <View style={{flexDirection:'row'}}>
                            <View style={{width:'45%'}}>
                                <Text style={styles.nameTitleModel}>Liều dùng:</Text>

                                <TextInput  style={styles.inputModel} 
                                 onChangeText={text  => {setOneMedicineAdd({...oneMedicineAdd,lieu:text})}}
                                />
                            </View>
                            <View style={{width:'10%'}}></View>
                            <View style={{width:'45%'}}>
                                <Text style={styles.nameTitleModel}>Đơn vị tính:</Text>
                                <TextInput   style={styles.inputModel}
                                 onChangeText={text  => {setOneMedicineAdd({...oneMedicineAdd,donvi:text})}}
                                   />
                            </View>
                       
                        </View>

                            <View>
                                <Text style={styles.nameTitleModel}>Chỉ dẫn:</Text>
                                <TextInput  style={styles.inputModel}  
                                 onChangeText={text  => {setOneMedicineAdd({...oneMedicineAdd,note:text})}}
                                 />

                            </View>

                        <View style={{width:'30%',paddingTop:10,marginLeft:'60%'}}>
                        <Button title="Thêm" onPress={()=> addMedicinetoList() }/>
                        </View>

                        </View>
                    </View>
                </Modal>


                <FlatList
                    data={listAddMedicine}
                    renderItem={({item,index})=>
                    <UserGreeting item={item} index={index} />
                    } 
                    keyExtractor={(item,index) => `${index}`}
                />


          
                 </View>
  
  );
};
const styles = StyleSheet.create({
    containers:{ 
        flex:1 , 
        flexDirection: 'column',
        paddingLeft:5,
        paddingRight:5,
        backgroundColor:'#fff',
    },
    containersModel:{ 
        flex:1 , 
        flexDirection: 'column',
        paddingLeft:5,
        paddingRight:5,
        backgroundColor:'#ddd',
    },
    formUp:{
        padding:10,
        marginTop:10,
        width:'100%',
        borderWidth:1,
    },
    listMedicine:{
        marginVertical:5,
        paddingHorizontal:5,
        borderRadius:4,
        paddingVertical:5,
        backgroundColor:'#fff',
        borderWidth:0.5
        
    },
    nameTitleModel:{
        paddingVertical:7,
        fontSize:16
    },
    inputModel:{
        width:'100%',height: 35, borderColor: 'gray', borderWidth: 1,backgroundColor:'white',borderRadius:3
    },
    headerModel:{
        flexDirection:'row',
        paddingBottom:5,
        borderBottomWidth:1
    },
    fontTitleHeader:{
        fontWeight:'bold',fontSize:15,paddingVertical:5
    }
   
  });

export default Add_medicine;
