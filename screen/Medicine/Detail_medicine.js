
import React ,{ useState }from 'react';
import { View, Text, Image, StyleSheet, 
    TextInput,
    TouchableOpacity, ScrollView,Button,FlatList
 } from 'react-native'
 import HTMLView from 'react-native-htmlview';
import IconKidsStudy from '../../android/app/src/asset/img/icon-kids-study.jpg';
import { Input } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ipApi from '../../android/app/src/api/ipApi';

const Detail_medicine =  ({ route,navigation }) => {
    const { donthuoc } = route.params;
    // const { data_HS } = route.params;
    const chitietdon = donthuoc.chi_tiet_don_dan_thuoc;


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
                    <Image  style={{width:60,height:60}} source={{uri : ipApi + 'storage/'+item.anh}}/>
                   </View>
            </View>
        </View>

}
  return (
            <View style={styles.container}>
               <ScrollView>
                        {/* <View style={{flexDirection:'row'}}>
                            <View>
                            <Image style={{width:70,height:70}} source={{uri : ipApi+'storage/'+data_HS.avatar}}/>

                            </View>
                            <View style={{paddingLeft:10,paddingTop:10}}>
                                <Text style={{fontSize:19,fontWeight:'bold'}}>{data_HS.ten}</Text>
                                <Text style={{}}>17/9/2020</Text>
                            </View>
                        </View> */}

                        <View style={{paddingVertical:5}}>
                            <Text style={{fontWeight:'bold',backgroundColor:'green',width:'20%',color:'white',textAlign:'center'}}>Lời nhắn</Text>
                                <Text>"{donthuoc.noi_dung}"</Text>
                        </View>

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
                        </View> */}
                        
                        <FlatList
                            data={chitietdon}
                            renderItem={({item,index})=>
                            <DetailMedicine  item={item} index={index} />
                            } 
                            keyExtractor={(item,index) => `${index}`} 
                             />

                        <View style={{paddingVertical:5,flexDirection:'row'}}>
                            {/* <Text  style={{color:'green',fontSize:16}}>Đã cho con uống</Text> */}
                            <AntDesign name="check" size={20} color="green" />
                            <Text  style={{color:'green',fontSize:16}}>Đã cho con uống</Text>
                        </View>


                        <View style={{flexDirection:'row',paddingVertical:5}}>
                            <View>
                            <Image style={{width:40,height:40}} source={IconKidsStudy}/>
                            </View>
                            <View style={{paddingLeft:10}}>
                                <Text style={{fontSize:15,fontWeight:'bold'}}>GV: Hhihi</Text>
                                <Text style={{}}>Cháu uống thuốc như uống rượu nhé </Text>
                            </View>
                        </View>

                    

                        <View style={{flexDirection:'row'}}>
                            <View style={{height:50,width:'100%',backgroundColor:'white'}}>

                            </View>
                        </View>

                </ScrollView>

                <View style={{flexDirection:'row',position: 'absolute', left: 0, right: 0, bottom: 0,flex:0.1,paddingBottom:10}}>
                           <TextInput   style={{ width:'80%',height: 35, borderColor: 'gray', borderWidth: 1,backgroundColor:'white' }} 
                           placeholder="Phản hồi cho giáo viên"
                           />
                          <View style={{width:'20%'}}>
                             <Button title="Gui"  />
                          </View>
                </View>
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
});

export default Detail_medicine;
