import React ,{ useState, useEffect }from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    Dimensions,
    Image,
    TouchableOpacity,
    AsyncStorage,
    Button,
  } from 'react-native';

  import { AuthContext } from './context';

const ListDanhBa = ({ navigation }) => 
{
  const [us_token, setToken] = useState('');

  const { signOut } = React.useContext(AuthContext);

  async function save () {
      try{
        await AsyncStorage.setItem('user_token','day la token cua user');
        console.log('ok');
      }catch (e){
          console.log(e)
      }
  }
  
  async function remove () {
    try{
      await AsyncStorage.removeItem('user_token');
      console.log('da remove');
    }catch (e){
        console.log(e)
    }
}
  
  async function get () {
    try{
      var v = await AsyncStorage.getItem('user_token');
      setToken(v)
    }catch (e){
      console.log(e);
    }
}

  // get = async()=>{
  //   try{
  //     var v = await AsyncStorage.getItem('user_token');
  //     setToken(v)
  //   }catch (e){
  //     console.log(e);
  //   }
  // }

  return (
                <View>
                    <Text >Danh ba</Text>
                    <TouchableOpacity onPress={()=>save()}>
                      <Text>SAVE STORAGE</Text>
                    </TouchableOpacity>

                    <TouchableOpacity  onPress={()=>get()}>
                      <Text>GET STORAGE</Text>
                    </TouchableOpacity>


                    <TouchableOpacity  onPress={()=>remove()}>
                      <Text>remove STORAGE</Text>
                    </TouchableOpacity>
                    
                    <Button  onPress={()=>signOut()} 
                      title="Đăng xuất"
                    />


                    <Text>{us_token}</Text>
              </View>
          

  );
};

const styles = StyleSheet.create({
  
});

export default ListDanhBa
