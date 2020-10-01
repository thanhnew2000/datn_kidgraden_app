
import React ,{ useState, useEffect }from 'react';
import axios from 'axios';
import { View, Text, Image,TextInput, TouchableOpacity, FlatList,StyleSheet, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

const ThemDonNghi =  ({ navigation }) => {
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

  return (
            <View style={styles.containers}>
              <View style={{flexDirection:'row'}}>
                    <View style={{width:'65%'}}>
                    <Text style={{fontWeight:'bold',fontSize:15}}>Bắt đầu ngày :</Text>
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
                                   <Entypo  style={{marginLeft:50,marginTop:-10}} name="arrow-bold-right" size={35} color="green"  />

                            </View>

                            
                    </View>
                    <View style={{width:'35%'}}>
                    <Text Text style={{fontWeight:'bold',fontSize:15}}  >Đến ngày :</Text>
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
              <View style={{flexDirection:'row'}}>
                         <Text style={{fontSize:15,marginRight:10,fontWeight:'bold'}}>Lý do viêt đơn nghỉ :</Text> 
              </View>
              <View style={{flexDirection:'row'}}>
                         <TextInput
                            multiline={true}
                            numberOfLines={10}
                            style={{ height:200, borderRadius:4,width: 300, marginTop:10,
                                backgroundColor:'#fff',
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 7,
                                },
                                shadowOpacity: 1.70,
                                shadowRadius: 6.27,
                                
                                elevation: 19,}}
                       />
              </View>
              <View style={{flexDirection:'row'}}>
                  <View style={{width:'70%'}}>
                  </View>
                  <View style={{width:'30%',flexDirection:'row',marginTop:17}}>
                      <View style={{marginLeft:10}}>
                        <Button title="Gửi đơn"/>
                      </View>
                      
                  </View>


              </View>
            </View>
  );
};



                           {/* <View>
                                <Button onPress={showDatepickerFrom} title="Show date picker!" />
                            </View>
                            <View>
                                <Button onPress={showDatepickerTo} title="Show date picker 2!" />
                            </View> */}

                            {/* {showDateFrom && (
                                <DateTimePicker
                                testID="dateTimePicker"
                                value={dateFrom}
                                mode={modeDateFrom}
                                is24Hour={true}
                                display="default"
                                onChange={onChangeDateFrom}
                                />
                            )}

                            {showDateTo && (
                                <DateTimePicker
                                testID="dateTimePicker"
                                value={dateTo}
                                mode={modeDateTo}
                                is24Hour={true}
                                display="default"
                                onChange={onChangeDateTo}
                                />
                            )} */}



const styles = StyleSheet.create({
    containers:{ 
        flex:1 , 
        flexDirection: 'column',
        paddingLeft:5,
        paddingRight:5,
        backgroundColor:'#fff',
        padding:10
    },
  
  });

export default ThemDonNghi;
