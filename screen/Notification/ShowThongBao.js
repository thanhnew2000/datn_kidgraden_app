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
import ApiNoiDungThongBao from '../../android/app/src/api/NoiDungThongBao';
import { useSelector,useDispatch } from 'react-redux'
import HTMLView from 'react-native-htmlview';

const ShowThongBao = ({navigation,route}) => {
   const { id_noi_dung_tb } = route.params;
    // const id_noi_dung_tb = 18;
    console.log('id_noi_dung_tb',id_noi_dung_tb)

    const data_redux = useSelector(state => state)
    const du_lieu_hs = data_redux.hocsinh.data;
    const id_param_thong_bao = data_redux.id_param_thong_bao;
    const route_notifi = data_redux.route_notifi;
    console.log('id_thong_bao___',id_param_thong_bao)
    console.log('route_notifi___',route_notifi)
    const data_token = data_redux.token;

    const [thongBao, setThongBao] = useState({});

    const [showLoading, setShowLoading] = useState(true);

  const getNoiDung = () => {
    setShowLoading(true);
    ApiNoiDungThongBao.getNoiDungThongBaoId(data_token.token,id_noi_dung_tb)
        .then(function (response) {
          let data = response.data;
          setThongBao(data);
           console.log('thong-bao',data)
          setShowLoading(false);

        })
        .catch(function (error) {
          setShowLoading(false);
          console.log(error);
        });
    };
    useEffect(() => getNoiDung(),[id_noi_dung_tb])
    
      return (
        <View style={styles.containers}>

          <View style={showLoading ? {display:'flex'} : {display:'none'}}>
                  <Image style={{width: 50 , height:50,alignSelf:'center'}}   source={require('../../android/app/src/tenor.gif')}/>
                </View>

          <View style={showLoading ? {display:'none'} : {display:'flex'}}>
                          <View style={{padding:10}}>
                            <Text style={{fontSize:18}}>{thongBao.title}</Text>
                          </View>

                          <View style={{padding:10}}>
                                  <HTMLView
                                        value={thongBao.content}
                                />
                          </View>
           </View>

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