
import React ,{ useState, useEffect,useRef }from 'react';
import axios from 'axios';
import { View, Text, Image, TouchableOpacity, FlatList,StyleSheet,Button } from 'react-native'
import IconNews from '../../android/app/src/asset/img/icon-news.png';
import IconKidsExercise from '../../android/app/src/asset/img/icon-kids-exercise.jpg';
import IconKidsStudy from '../../android/app/src/asset/img/icon-kids-study.jpg';
import IconKidsOutSide from '../../android/app/src/asset/img/icon-kids-outside.jpg';
import { ScrollView } from 'react-native-gesture-handler';

import DateTimePicker from '@react-native-community/datetimepicker';
const ITEM_WIDTH = 30
const HoatDongOld =  ({ navigation }) => {


  function getDaysInMonth(month, year) {
    var date = new Date(year, month, 1);
    var arrDay = [];
    var countDateMonth = new Date(year, month, 0).getDate();
    for (let i = 0; i <= countDateMonth; i++) {
      date.setDate(i);
      arrDay.push(
        {
          id: i,
          day: date.getDate(),
          dayWeek: date.getDay()
        }
      );
    }
    return arrDay;
  }
  
 
    function chooseNgay(ngay){
      flatListRef.current.scrollToIndex({index: ngay})
      setthisngay(ngay)
    }

    const flatListRef = useRef(null);
    
    // const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 })
    const [ngay,setNgay] = useState(getDaysInMonth(8, 2020));
    const [thisngay,setthisngay] = useState(10);

    const allDayWeek= new Array("CN","Th 2",'Th 3','Th 4','Th 5','Th 6','Th 7');
    const today = new Date('2020-09-27');
    const dayWeek = today.getDay();

    const renderItem = (item) => (
      item.id != 0 ?
      <TouchableOpacity onPress={()=>chooseNgay(item.day)}>
      <View style={{flexDirection:'column',alignItems:'center',paddingHorizontal:10,fontSize:15}}>
            <Text style={{color:'black'}}>{allDayWeek[item.dayWeek]}</Text>
            <Text style={thisngay == item.day ? styles.dayChoose :  styles.dayNormal}>{item.day}</Text>
      </View> 
      </TouchableOpacity>
      : null
    );


  return (
    <ScrollView>
            <View style={styles.container}>
                <View style={styles.boxNgang}>
                  <View style={{flexDirection:'column'}}>
                        <View style={{width:'100%',alignItems:'center'}}>
                           <Text style={{color:'black',fontWeight:'bold'}}>Tháng 8</Text>
                        </View>

                        <View style={{width:'100%'}}>
                            <FlatList
                            ref={flatListRef} // add ref
                            getItemLayout={(data, index) => (
                              {length: ITEM_WIDTH, offset: ITEM_WIDTH * index, index}
                            )}
                            data={ngay}
                            horizontal={true}
                            renderItem={({ item }) => (
                              item == 5 ? <Text>data</Text> : renderItem(item)
                            )}
                            keyExtractor={(item,index) => index.toString()}
                            // initialScrollIndex={10}
                          />
                        </View>
                        
                   </View>
                </View>

              <View>
                      <View style={styles.boxNgang}>
                          <View style={{width:'35%'}}>
                          <Image style={styles.imageBox} source={IconNews}/>
                          </View>
                          <View style={{width:'65%'}}>
                                    <Text style={styles.titleBox}>Đón trẻ, trò chuyện buổi sáng</Text>
                                    <Text style={{color:'black'}}> Xem trang somethign jj đsdsfd dsfdsg fsgfsdg fdsgf dgfdsgkf dsgfskd sfd</Text>
                          </View>
                      </View>



                      <View style={styles.boxNgang}>
                          <View style={{width:'65%'}}>
                                    <Text style={styles.titleBox}>Thể dục buổi sáng</Text>
                                    <Text style={{color:'black'}}> Xem trang somethign jj đsdsfd dsfdsg fsgfsdg fdsgf dgfdsgkf dsgfskd sfd</Text>
                          </View>
                          <View style={{width:'35%'}}>
                           <Image style={styles.imageBox} source={IconKidsExercise}/>
                          </View>
                      </View>


                      <View style={styles.boxNgang}>
                          <View style={{width:'35%'}}>
                          <Image style={styles.imageBox} source={IconKidsStudy}/>
                          </View>
                          <View style={{width:'65%'}}>
                                    <Text style={styles.titleBox}>Học tập</Text>
                                    <Text style={{color:'black'}}> Xem trang somethign jj đsdsfd dsfdsg fsgfsdg fdsgf dgfdsgkf dsgfskd sfd</Text>
                          </View>
                      </View>


                      <View style={styles.boxNgang}>
                          <View style={{width:'65%'}}>
                                    <Text style={styles.titleBox}>Hoạt động ngoài trời</Text>
                                    <Text style={{color:'black'}}> Xem trang somethign jj đsdsfd dsfdsg fsgfsdg fdsgf dgfdsgkf dsgfskd sfd</Text>
                          </View>
                          <View style={{width:'35%'}}>
                          <Image style={styles.imageBox} source={IconKidsOutSide}/>
                          </View>
                      </View>                      


              </View>
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
    imageBox:{  
      width:70,
      height:70,
      alignItems:'center',
      marginLeft:10
    },
    titleBox:{
      fontWeight: 'bold', 
      color: "black",
      fontSize:17
    },
    boxNgang:{ 
        marginVertical:10,
        flexDirection:'row',
        padding:10,
        justifyContent: 'center',
        alignItems: 'center',
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
    },

    dayNormal:{
      color:'black'
    },
    dayChoose:{
      color:'black',borderWidth:1,borderRadius:1,paddingHorizontal:5,backgroundColor:'#00cc66',color:'white',borderColor:'#ccffff'
    }
});

export default HoatDong;
