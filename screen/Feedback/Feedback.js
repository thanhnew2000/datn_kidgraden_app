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

const Feedback = ({navigation}) => {

  const [valueInput , setValueInput] =  useState({
    giao_vien_id:'',
    phu_huynh_id:'',
    noi_dung:'',
  })
  const [dataGiaoVien , setDataGiaoVien] =  useState([])
  const [userToken, setUserToken] = useState(null);
  const [data_HS, setData_HS] = useState({});

  const [submitLoading, setSubmitLoading] = useState(false);

 
  useEffect(() => {
    async function fetchData() {
      try{
        var token = await AsyncStorage.getItem('data_token');
        var hs = await AsyncStorage.getItem('data_hs');
        let data_hs = JSON.parse(hs);
        if(token !== null){
          setUserToken(token);
          setData_HS(data_hs);
          getListGiaoVien(token,data_hs.lop_id);
        }
      }catch (e){
        console.log(e);
      }
  }
  fetchData();
},[]);



function getListGiaoVien(token,lop_id){
  ApiGiaoVien.getGVbyIdLop(token,lop_id)
    .then(function (response) {
      let data = response.data;
      setDataGiaoVien(data);
      console.log(data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }



  let serviceItems = dataGiaoVien.map((item, index) => {
    return      <Picker.Item label={item.ten} value={item.id} key={index} />
  });
  
  function submitFeedback(){
    setSubmitLoading(true);
    setValueInput({...valueInput,phu_huynh_id:data_HS.id})

    let dataInsert = {
      'giao_vien_id' : valueInput.giao_vien_id,
      'phu_huynh_id' : data_HS.id,
      'noi_dung' : valueInput.noi_dung,
    }


    ApiDanhGiaGiaoVien.insertDanhGiaGiaoVien(userToken,dataInsert)
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
        // setSubmitLoading(false)
        // reloadAgain();
        // navigation.navigate('Đón hộ');
    })
    .catch(err => {
        console.log(err);
    });
  }
      return (

       
            <View style={styles.container}>
                <View style={{flexDirection:'row',alignItems:'center',paddingLeft:10}}>
                    <View style={{width:'40%'}}>
                        <Text style={{fontSize:16}}>Chọn giáo viên</Text>
                    </View>
                    <View style={{width:'50%'}}>
                              <Picker
                                // selectedValue={selectedValue}
                                style={{ height: 50, width: 150 }}
                                onValueChange={(itemValue, itemIndex) => setValueInput({...valueInput,giao_vien_id:itemValue})}
                                >
                                {serviceItems}
                                </Picker>
                    </View>
                </View>

                <View style={{paddingTop:10}}>
                    <Input label="Nội dung đánh giá"
                       multiline
                       onChangeText={text  => {setValueInput({...valueInput,noi_dung:text})}}
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