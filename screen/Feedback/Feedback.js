import React ,{ useState, useEffect }from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text,
    TouchableOpacity,
    Alert,
    Picker,
    FlatList,
    Button
  } from 'react-native';
  import axios from "axios";
  import { Input } from 'react-native-elements';
  import ApiGiaoVien from '../../android/app/src/api/GiaoVienApi';
  import AsyncStorage from '@react-native-community/async-storage';
  import ApiDanhGiaGiaoVien from '../../android/app/src/api/DanhGiaGiaoVienApi';
  import Modal_SubmitLoading from '../component/reuse/Modal_SubmitLoading';
  import { useSelector,useDispatch } from 'react-redux'

const Feedback = ({navigation}) => {

  const data_redux = useSelector(state => state)
  const du_lieu_hs = data_redux.hocsinh.data;
  const data_token = data_redux.token;

  const [noiDung , setNoiDung] =  useState('')
  const [dataGiaoVien , setDataGiaoVien] =  useState([])
  const [userToken, setUserToken] = useState(null);
  const [data_HS, setData_HS] = useState({});

  const [submitLoading, setSubmitLoading] = useState(false);

  function submitFeedback(){
    setSubmitLoading(true);
    let dataInsert = {
      'hoc_sinh_id' : du_lieu_hs.id,
      'lop_id' : du_lieu_hs.lop_id,
      'noi_dung' : noiDung
    }
    ApiDanhGiaGiaoVien.insertDanhGiaGiaoVien(data_token.token,dataInsert)
    .then(res => {
        console.log(res.data);
        setSubmitLoading(false);
        Alert.alert(
          "Gửi thành công",
          "Chúng tôi đã nhận lời đánh giá của bạn",
          [
            { text: "OK", onPress: () => navigation.navigate('Home') }
          ],
          { cancelable: false }
        );
    })
    .catch(err => {
        console.log(err);
    });
  }
      return (

       
            <View style={styles.container}>
                {/* <View style={{flexDirection:'row',alignItems:'center',paddingLeft:10}}>
                    <View style={{width:'40%'}}>
                        <Text style={{fontSize:16}}>Chọn giáo viên</Text>
                    </View>
                    <View style={{width:'50%'}}>
                              <Picker
                                style={{ height: 50, width: 150 }}
                                onValueChange={(itemValue, itemIndex) => setValueInput({...valueInput,giao_vien_id:itemValue})}
                                >
                                {serviceItems}
                                </Picker>
                    </View>
                </View> */}
                <View style={{paddingTop:10}}>
                    <Input label="Nội dung đánh giá"
                       multiline
                       onChangeText={text  => {setNoiDung(text)}}
                       numberOfLines={4} />
                </View>
                <View style={{width:'40%',alignSelf:'flex-end'}}>
                    <Button  title="Gửi" onPress={submitFeedback}/>
                </View>
                        

              <Modal_SubmitLoading submitLoading={submitLoading} />

            </View>
      )
  }
  const styles = StyleSheet.create({
    container:{ 
     flex:1,
     backgroundColor:'#fff',
     padding:10
    },
   
  });
export default Feedback