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
import ApiNhanXet from '../../android/app/src/api/NhanXet';
import AsyncStorage from '@react-native-community/async-storage';
import 'moment/locale/vi';
import moment from 'moment';
import database from '@react-native-firebase/database';


// import messaging from '@react-native-firebase/messaging';

import { useSelector,useDispatch } from 'react-redux'
import { Divider } from 'react-native-elements';

// import AwesomeAlert from 'react-native-awesome-alerts';

const NhanXet = ({navigation,route}) => {
  const data_redux = useSelector(state => state)
  const du_lieu_hs = data_redux.hocsinh.data;
  const data_token = data_redux.token;

//   const { id_don_nghi_hoc } = route.params;
  const [dataNhanXet, setDataNhanXet] = useState([]);
  const [showLoading, setShowLoading] = useState(false);



   function getNhanXet()  {
        setShowLoading(true);
        ApiNhanXet.getNhanXetOfHs(data_token.token,du_lieu_hs.id)
        .then(function (response) {
            let data = response.data;
            setDataNhanXet(data);
            setShowLoading(false);
            console.log('setDataNhanXet_err',data)
            })
            .catch(function (error) {
                setShowLoading(false);
            console.log('setDataNhanXet_data_err',error);
            });
    };

        useEffect(() => {
            getNhanXet()
        }, []);


        function ListItem(item){
        return    <View  style={styles.contain}>
            <TouchableOpacity onPress={()=> navigation.navigate('ChiTietNhanXet', {item : item})}>
                        <View style={{flexDirection: 'row'}}>
                                <Text  style={{fontWeight:'bold'}}>Ngày : </Text>
                                <Text>{moment(item.create_at).format("YYYY-MM-DD") }</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontWeight:'bold'}} >Giáo viên :</Text>
                            <Text> {item.giao_vien == undefined ? '' : item.giao_vien.ten  }</Text>
                        </View>

                        </TouchableOpacity>
                  </View>
        }
      return (
        <View style={styles.containers}>


          <View style={showLoading ? {display:'flex'} : {display:'none'}}>
            <View style={{alignItems:'center'}}>
                <Image style={{width: 50 , height:30 }}  source={require('../../android/app/src/asset/img/loading-waiting.gif')}/>
            </View>
          </View>
    

          <FlatList
                  data={dataNhanXet}
                //   onRefresh={() => functionOnRefresh()}
                //   refreshing={isFetching}
                  renderItem={({item,index}) => <ListItem item = {item} navigation={navigation} />}
                  keyExtractor={(value, index) => index}

               />
        
{/* 
         

            <TouchableOpacity style={styles.buttonSeeAll}>
              <Text style={{fontSize:16,color:'#00ace6'}}>Xem tất cả</Text>
            </TouchableOpacity> */}


        </View>

      )
  }
  const styles = StyleSheet.create({
    containers:{ 
        flex:1,
        backgroundColor:'#fff',
        padding:10
    },
    contain:{
        padding:5,
        marginVertical:10,
        borderRadius:4,
        backgroundColor:'#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        
        elevation: 10,
    },
  });
export default NhanXet