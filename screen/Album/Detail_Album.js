
import React ,{ useState,useEffect }from 'react';
import { View, Text, Image,
    TouchableOpacity, ScrollView,StyleSheet, Button,FlatList,Modal,
    Dimensions
 } from 'react-native'

 import ApiBieuDoSucKhoe from '../../android/app/src/api/BieuDoSucKhoeApi';
 import IconXinNghi from '../../android/app/src/asset/img/icon-xin-nghi.jpg';
 import AntDesign from 'react-native-vector-icons/AntDesign';
 import linkGiaoVien from '../../android/app/src/api/linkWeb/linkGiaoVien';
 import moment from 'moment';
 const { width } = Dimensions.get('window');
 const { height } = Dimensions.get('window');

const Album =  ({ navigation,route }) => {
    
    const { data_album } = route.params;
    console.log('ablum',data_album)

    const image_album =  JSON.parse(data_album.item_images);
    const [showModal, setShowModal] = useState(false); 
    const [imageModal, setImageModal] = useState(''); 
    
    function  visitionModal(){
        setShowModal(!showModal)
    }
    function setValueModal(item){
        setImageModal(item)
        visitionModal();
    }
    
  
  return (
            <View style={styles.container}>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:17}}>Album : {data_album.title}</Text>
                    <Text>Ngày đăng : {moment(data_album.created_at).calendar()}</Text>
                </View>


                    <FlatList
                        data={image_album}
                        renderItem={({item,index}) => 
                        //  <Text>{linkGiaoVien + item}</Text>
                        <View style={{width:'45%',height:100,margin:'3%'}}>
                            {/* <Text>{linkGiaoVien + item}</Text> */}
                            <TouchableOpacity onPress={()=>{setValueModal(item)}}>
                                <Image style={{width: '100%',height:'100%',borderRadius:10 }}  source={{ uri: linkGiaoVien + item}}/>
                            </TouchableOpacity>
                        </View>
                    }
                    keyExtractor={(value, index) => index}
                    numColumns={3}

                     />
                        
                        {/* <View style={{width:'45%',height:'50%',margin:'3%'}}>
                            <TouchableOpacity onPress={()=>{setValueModal(1)}}>
                                <Image style={{width: '100%' , height:'100%',borderRadius:10 }}  source={IconXinNghi}/>
                            </TouchableOpacity>
                        </View> */}



                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showModal}
                  >
                      <View style={{backgroundColor:'rgba(0,0,0,0.9023984593837535)',flex:1,alignItems:'center',justifyContent:'center'}}>
                          <View style={{width:'90%',height:'90%'}}>
                            <TouchableOpacity style={{alignSelf:'flex-end'}} onPress={()=>visitionModal()} >
                                <AntDesign name="closesquareo" size={30} color="#ddd" />
                            </TouchableOpacity>

                           <Image style={styles.image}  source={{ uri: linkGiaoVien + imageModal}}/>

                          </View>
                
                      </View>

                </Modal>

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
    flexDirection:'row',height:60,borderBottomWidth:1,paddingBottom:5
  },
  image: {
    flex: 1,
    maxWidth: width,
    maxHeight:height,
    resizeMode: 'contain',
},
 
});

export default Album;
