
import React ,{ useState, useEffect }from 'react';
import axios from 'axios';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet,Button,Modal } from 'react-native'
import IconNews from '../../android/app/src/asset/img/icon-news.png';
import IconKidsExercise from '../../android/app/src/asset/img/icon-kids-exercise.jpg';
import IconKidsStudy from '../../android/app/src/asset/img/icon-kids-study.jpg';
import IconKidsOutSide from '../../android/app/src/asset/img/icon-kids-outside.jpg';
import { ScrollView } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const DonHo =  ({ navigation }) => {

  const [viewModel, setViewModel] = useState(false);
  


  function modelDetailShow(value){
    setViewModel(value)
  }


  
  const ListDonHo = () => (
    <View style={styles.oBox}>
    <View style={styles.chia2thanh}>
      <View style={{width:'20%'}}>
         <Image style={{width:50,height:50}} source={IconKidsStudy}/>
      </View>
      <View style={{width:'50%'}}>
          <Text style={{fontWeight:'bold',fontSize:17}}>Lê Ngọc Tân</Text>
          <Text style={{color:'black'}}>Bé : Phạm Trung Hiếu</Text>
      </View>
      
      <View style={{width:'30%',alignItems:'center'}}>
        <Text style={{color:'green',fontWeight:'bold',paddingBottom:5}}>14/7/2019</Text>
        <TouchableOpacity onPress={()=>{
              navigation.navigate('detail_medicine')
          }} >
            <Button title="Chi Tiết" onPress={()=>modelDetailShow(true)} />
        </TouchableOpacity>
      </View>
    </View>
    <View style={styles.chia2thanh}>
        <Text>Nay bố mẹ cháu bận, nhờ a Tân đón cháu hộ, mong cô để ý a</Text>
    </View>
</View>
  );


  return (
    <ScrollView style={styles.container}>
            <View >
                  <View  style={{width:'100%',marginTop:5}}>
                        <TouchableOpacity onPress={()=>{
                                navigation.navigate('add_donho')
                            }} >
                              <FontAwesome5 name="user-plus" size={35} color="green" />
                        </TouchableOpacity>
                   </View>
               
                    <ListDonHo />
                    <ListDonHo />


                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={viewModel}
                      onRequestClose={() => {
                      Alert.alert("Modal has been closed.");
                      }}
                     >
                    <View style={{backgroundColor:'#000000aa',flex:1,justifyContent:'center'}}>
                        <View style={{backgroundColor:'#ffffff',margin:20,padding:10,borderRadius:10}}>
                        <View style={{flexDirection:'row',padding:10,borderBottomWidth:1}}>
                          <View style={{width:'80%'}}>
                             <Text style={{fontWeight:'bold',fontSize:16}}>Thông tin người đón hộ : </Text>
                          </View>
                          <View style={{width:'20%',paddingLeft:10}}>
                            <TouchableOpacity onPress={()=>modelDetailShow(false)}>
                                <FontAwesome name="window-close" size={35} color="#dddd" />
                            </TouchableOpacity>
                          </View>

                        </View>

                        <View style={{alignItems:'center',paddingTop:10}}>
                          <Image source={IconKidsStudy} style={{width:150,height:140}} />
                        </View>
                        <View style={{flexDirection:'row',padding:10}}>
                          <View style={{width:'50%'}}>
                              <Text style={{fontWeight:'bold',fontSize:15}}>Tên : </Text>
                              <Text>Lê Ngọc Tân</Text>
                          </View>
                          <View style={{width:'50%'}}>
                              <Text  style={{fontWeight:'bold',fontSize:15}}>Số CMND :</Text>
                              <Text>54893649836</Text>
                          </View>
                        </View>
                        <View style={{flexDirection:'row',padding:10}}>
                          <View style={{width:'50%'}}>
                                <Text style={{fontWeight:'bold',fontSize:15}}>Số điện thoại : </Text>
                                <Text>03924838675</Text>
                          </View>

                          <View style={{width:'50%'}}>
                                <Text style={{fontWeight:'bold',fontSize:15}}>Đón bé : </Text>
                                <Text>Phạm Trung Hiếu</Text>
                          </View>
                         </View>

                         <View style={{width:'50%',padding:10,flexDirection:'row'}}>
                                <Text style={{fontWeight:'bold',fontSize:15}}>Ngày đón: </Text>
                                <Text> 10/7/2019</Text>
                          </View>

                        </View>
                    </View>
                </Modal>




            </View>
     </ScrollView>
  );
};

const styles = StyleSheet.create({
    container:{
      flex:1,
      padding:10,
      backgroundColor:"#fff",
      flexDirection:'column',
    },
    oBox:{
      flexDirection:'column',
      marginVertical:10,
      padding:10,
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
    chia2thanh:{
      flexDirection:'row',
      paddingVertical:5
    },
    oDuoi:{
      flexDirection:'row',
      borderTopWidth:1,
      paddingVertical:2 
    },
   
});

export default DonHo;
