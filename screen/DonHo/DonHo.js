
import React ,{ useState, useEffect }from 'react';
import axios from 'axios';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet,Button } from 'react-native'
import IconNews from '../../android/app/src/asset/img/icon-news.png';
import IconKidsExercise from '../../android/app/src/asset/img/icon-kids-exercise.jpg';
import IconKidsStudy from '../../android/app/src/asset/img/icon-kids-study.jpg';
import IconKidsOutSide from '../../android/app/src/asset/img/icon-kids-outside.jpg';
import { ScrollView } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';

const DonHo =  ({ navigation }) => {

  
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
            <Button title="Chi Tiết" />
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
                              <AntDesign name="pluscircleo" size={35} color="green" />
                        </TouchableOpacity>
                   </View>
               
                    <ListDonHo />
                    <ListDonHo />


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
