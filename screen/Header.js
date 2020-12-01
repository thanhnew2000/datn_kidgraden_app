
import React ,{ useState }from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    FlatList,Text,Image, Button
  } from 'react-native';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import { DrawerActions } from '@react-navigation/native';
  import ApiHocSinh from '../android/app/src/api/HocSinhApi';
  import AsyncStorage from '@react-native-community/async-storage';

const Header =  ({navigation}) => {

//   const [userToken, setUserToken] = useState(null);
//   const [all_hs_user, setHsByUser] = useState({});


//   const getHocSinhIdUser = (token,user_id) => {
//       ApiHocSinh.getHocSinhIdUser(token,user_id)
//         .then(function (response) {
//           let data = response.data;
//           console.log('data_hs_user',data);
//           setHsByUser(data);
//         })
//         .catch(function (error) {
//           console.log(error);
//         });
//   };


//   useEffect(() => {
//     async function fetchData() {
//       try{
//         var token = await AsyncStorage.getItem('data_token');
//         var data_user = await AsyncStorage.getItem('data_user');
//         getHocSinhIdUser(token,data_user.id)

//       }catch (e){
//         console.log(e);
//       }
//   }
//   fetchData();
// },[]);

async function getData(){
   var a = await  AsyncStorage.getItem('data_hs');
   let n =  JSON.parse(a);
    console.log(n)

}
  return (
            <View style={styles.container}>
              <View style={{width:'43%'}}>
                  <TouchableOpacity onPress={()=> navigation.openDrawer()} >
                    <AntDesign name="bars" size={30} color="white" />
                  </TouchableOpacity>
              </View>
              <View style={{width:'50%'}}>
              <TouchableOpacity onPress={()=> getData()} >
                <Image style={{width: 50 , height:50 }}  source={require('../android/app/src/logo.png')}/>
               </TouchableOpacity>

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
export default Header;
