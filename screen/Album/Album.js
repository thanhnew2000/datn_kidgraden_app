
import React ,{ useState,useEffect }from 'react';
import { View, Text, Image,
    TouchableOpacity, ScrollView,StyleSheet, Button,FlatList
 } from 'react-native'

 import ApiAlbum from '../../android/app/src/api/album';
 import IconXinNghi from '../../android/app/src/asset/img/icon-xin-nghi.jpg';
 import AntDesign from 'react-native-vector-icons/AntDesign';
 import moment from 'moment';
 import linkGiaoVien from '../../android/app/src/api/linkWeb/linkGiaoVien';
 import AsyncStorage from '@react-native-community/async-storage';
 import { useSelector,useDispatch } from 'react-redux'

const Album =  ({ navigation }) => {


  
  const data_redux = useSelector(state => state)
  const du_lieu_hs = data_redux.hocsinh.data;
 

  const [data_chieu_cao, setDataChieuCao] = useState([]); 
  const [listAlbum, setListAlbum] = useState([]); 
  const [loadingHeader, setloadingHeader] = useState(false); 
  
  
  const getListAlbum = (token,id_lop) => {
    setloadingHeader(true);
    ApiAlbum.getAlbumByLop(token,id_lop)
      .then(function (response) {
        let data = response.data;
        setListAlbum(data);
        setloadingHeader(false);
      })
      .catch(function (error) {
        setloadingHeader(false);
        console.log(error);
      });
  };


  async function fetchData() {
    try{
      var token = await AsyncStorage.getItem('data_token');
        getListAlbum(token,du_lieu_hs.lop_id)
    }catch (e){
      console.log(e);
    }
}
  useEffect(() => {fetchData()}, []);

  
  const RenderListAlbum= ({item}) => (
        <TouchableOpacity onPress={( )=> navigation.navigate('Detail_Album', {data_album : item} ) }>
            <View  style={{paddingBottom:5}}>
                <View style={styles.box}>
                    <View style={{width:'25%'}}>
                            <Image style={{width: '100%' , height:'100%',borderRadius:10 }}  source={{ uri : linkGiaoVien + item.first_image}}/>
                    </View>
                    <View style={{width:'70%',marginLeft:10}}>
                            <Text style={{fontWeight:'bold',fontSize:16,paddingBottom:5}}>{item.title} </Text>
                            <Text style={{}}>{moment(item.created_at).calendar()} </Text>
                    </View>
                    <View  style={{width:'5%',justifyContent:'center'}}>
                            <AntDesign name="right" size={17} color="#ddd" />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
  )
  
  return (
            <View style={styles.container}>

            <View style={loadingHeader ? {display :'flex'} : {display:'none'}}>
                <View style={{alignItems:'center'}}>
                      <Image style={{width: 50 , height:30 }}  source={require('../../android/app/src/asset/img/loading-waiting.gif')}/>
                  </View>
              </View>
                <FlatList
                  data={listAlbum}
                  renderItem={({item,index}) => 
                  <RenderListAlbum item = {item}/>
                }
                  keyExtractor={(value, index) => index}
               />



{/* 
            <TouchableOpacity onPress={( )=> navigation.navigate('Detail_Album') }>
                <View  style={{paddingBottom:5}}>
                    <View style={styles.box}>
                        <View style={{width:'25%'}}>
                                <Image style={{width: '100%' , height:'100%',borderRadius:10 }}  source={IconXinNghi}/>
                        </View>
                        <View style={{width:'70%',marginLeft:10}}>
                                <Text style={{fontWeight:'bold',fontSize:16,paddingBottom:5}}>Đi thăm lăng bác </Text>
                                <Text style={{}}>17/2/2020 </Text>
                        </View>
                        <View  style={{width:'5%',justifyContent:'center'}}>
                                <AntDesign name="right" size={17} color="#ddd" />
                        </View>
                    </View>
                </View>
                </TouchableOpacity> */}

            </View> 
  
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:10,
    backgroundColor:"#fff",
  },
  box:{
    flexDirection:'row',height:60,borderBottomWidth:1,paddingBottom:5,borderColor:'#91908e'
  }
 
});

export default Album;
