import React from 'react'
import {
    StyleSheet,
    Image,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    Button
  } from 'react-native';
  import IconKidsStudy from '../../android/app/src/kids_student.jpg';
import { ScrollView } from 'react-native-gesture-handler';

const Notification = ({navigation}) => {
      return (
        <View style={styles.containers}>
          <ScrollView>

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

            <TouchableOpacity style={styles.buttonSeeAll}>
              <Text style={{fontSize:16,color:'#00ace6'}}>Xem tất cả</Text>
            </TouchableOpacity>

          </ScrollView>

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
    },
    buttonSeeAll:{
      padding:10,
      justifyContent:'center',
      alignItems:'center',

    }
   
  });
export default Notification