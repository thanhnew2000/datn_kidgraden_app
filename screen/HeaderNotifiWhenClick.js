
import React ,{ useState }from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    FlatList,Text,Image, Button
  } from 'react-native';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import { AuthContext } from './context';

const HeaderNotifiWhenClick =  ({navigation}) => {
    const { changeRoute } = React.useContext(AuthContext);

  return (
            <View style={styles.container}>
              <View style={{flexDirection:'row'}}>
                 <TouchableOpacity onPress={()=> changeRoute()}>
                       <AntDesign name="arrowleft" size={25} color="green" />
                 </TouchableOpacity>      

                 <Text style={{fontSize:17,fontWeight:'bold'}}> Them moi hihih</Text>

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
export default HeaderNotifiWhenClick;
