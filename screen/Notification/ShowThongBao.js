import React ,{ useState,useEffect }from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    Button,
    FlatList
  } from 'react-native';
  import IconKidsStudy from '../../android/app/src/kids_student.jpg';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import 'moment/locale/vi';
const ShowThongBao = ({navigation,route}) => {
  const { id_noi_dung_tb } = route.params;
  console.log('id_noi_dung_tb',id_noi_dung_tb)
      return (
        <View style={styles.containers}>
              <Text>1</Text>
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
    boxNotifi:{
        flexDirection:'row',
        paddingVertical:10,
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
export default ShowThongBao