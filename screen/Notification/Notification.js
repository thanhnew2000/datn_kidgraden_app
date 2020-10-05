import React from 'react'
import {
    StyleSheet,
    Image,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert
  } from 'react-native';
  import IconKidsStudy from '../../android/app/src/kids_student.jpg';

const Notification = ({navigation}) => {
      return (
        <View style={styles.containers}>
            <TouchableOpacity >
                <View style={styles.boxNotifiNoRead}>
                    <View style={{width:"30%",alignItems:'center'}}>
                      <Image style={styles.image} source={IconKidsStudy}/>
                    </View>
                    <View style={{width:"65%"}}>
                          <Text>Nhà trường thông báo đến hạn nộp học phí ngày 12/10/2019 mong các phụ huynh chú ý xem học phí và đóng học đúng hạn</Text>
                          <Text style={{fontSize:12,color:'#5E5F60'}}>Th 7 lúc 8:10</Text>
                    </View>

                </View>
            </TouchableOpacity>

            <TouchableOpacity >
                <View style={styles.boxNotifiRead}>
                    <View style={{width:"30%",alignItems:'center'}}>
                      <Image style={styles.image} source={IconKidsStudy}/>
                    </View>
                    <View style={{width:"65%"}}>
                          <Text>Cô giáo đã chấp nhận đơn xin nghỉ học của bé</Text>
                          <Text style={{fontSize:12,color:'#5E5F60'}}>Th 6 lúc 8:10</Text>
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity >
                <View style={styles.boxNotifiNoRead}>
                    <View style={{width:"30%",alignItems:'center'}}>
                      <Image style={styles.image} source={IconKidsStudy}/>
                    </View>
                    <View style={{width:"65%"}}>
                          <Text>Cô giáo đã xác nhận đơn dặn thuốc của bé</Text>
                          <Text style={{fontSize:12,color:'#5E5F60'}}>Th 7 lúc 8:10</Text>
                    </View>

                </View>
            </TouchableOpacity>
        </View>

      )
  }
  const styles = StyleSheet.create({
    image: {
        width:60, height:60,borderRadius:100
    },
    containers:{ 
        flex:1,
        backgroundColor:'#fff'
    },
    boxNotifiNoRead:{
        flexDirection:'row',
        paddingVertical:10,
        backgroundColor:'#CDE4FA'
    },
    boxNotifiRead:{
        flexDirection:'row',
        paddingVertical:10,
    }
   
  });
export default Notification