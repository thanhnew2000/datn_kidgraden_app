
import React ,{ useState }from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    FlatList,Text,Image, Button
  } from 'react-native';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import { AuthContext } from './context';
  import { useNavigation } from '@react-navigation/native';
const HeaderClickFromThongBao =  ({navigation,name_header_tab}) => {
  return (
            <View style={styles.container}>
              <View style={{flexDirection:'row'}}>
                 <TouchableOpacity onPress={()=> navigation.navigate('Notification')}>
                       <AntDesign name="left" size={27} color="#ffff" />
                 </TouchableOpacity>      
                 <Text style={{fontSize:18,color:'#ffff',paddingLeft:10}}> {name_header_tab}</Text>
              </View>
            </View>
  );
};

const styles = StyleSheet.create({
    container: {
      alignItems:'center',
      flexDirection:'row'
   },

    
  });
export default HeaderClickFromThongBao;
