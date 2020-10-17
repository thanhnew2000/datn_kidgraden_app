import React ,{ useState, useEffect }from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    Dimensions,
    Image,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
  } from 'react-native';
  import axios from 'axios';
  import CateListItem from './component/CateListItem';
  import IconDon from '../android/app/src/kids_student.jpg';
  import IconNews from '../android/app/src/asset/img/icon-news.png';
  import IconImage from '../android/app/src/asset/img/icon-img.png';
  import IconMoney from '../android/app/src/asset/img/icon-money.png';
  import IconCalender from '../android/app/src/asset/img/icon-calendar.png';
  import IconNatri from '../android/app/src/asset/img/icon-nutrition.png';
  import IconChart from '../android/app/src/asset/img/icon-chart.png';
  import IconDiemDanh from '../android/app/src/asset/img/icon-diem-danh.jpg';
  import IconXinNghi from '../android/app/src/asset/img/icon-xin-nghi.jpg';
  import IconMedicine from '../android/app/src/asset/img/icon-medicine.jpg';
  import IconFeedBack from '../android/app/src/asset/img/icon-feedback.png';
  import IconDonHo from '../android/app/src/asset/img/icon-don-ho.jpg';
  import AsyncStorage from '@react-native-community/async-storage';
  import ApiHocSinh from '../android/app/src/api/HocSinhApi';
  import apiRequest from '../android/app/src/api/users';

const Home2 = ({ navigation }) => 
{


  const [userToken, setUserToken] = useState(null);
  const [data_hocsinh, setData_hocsinh] = useState({});
  const [data_lop, setData_lop] = useState({});
  const [data_user, setData_user] = useState({});


  const getThisHocSinh = (token,id_hs) => {
    ApiHocSinh.getOne(token,id_hs)
      .then(function (response) {
        let data = response.data;
        console.log('data',data);
        setData_hocsinh(data);
      })
      .catch(function (error) {
        console.log(error);
      });
};

    useEffect(() => {
      async function fetchData() {
        try{
          var v = await AsyncStorage.getItem('data_storge');
          var hs = await AsyncStorage.getItem('data_hs');

          if(v !== null && hs !== null){
            let data =  JSON.parse(v);
            let data_HocSinh =  JSON.parse(hs);
            setData_hocsinh(data_HocSinh)
            setData_lop(data_HocSinh.get_lop)
            setData_user(data.data_user)

            getThisHocSinh(data.token,data_HocSinh.id)

          }

          
          console.log(v)
        }catch (e){
          console.log(e);
        }
    }
    fetchData();
  },[]);

  const [Category,setCategory] = useState([
    {id: 1, name : 'Điểm danh',image :IconDiemDanh , naviga:'Điểm danh'},
    {id: 2, name : 'Xin nghỉ',image :IconXinNghi , naviga:'Xin nghỉ' },
    {id: 3, name : 'Dặn thuốc',image :IconMedicine , naviga:'add_medicine'},
    {id: 8, name : 'Đón hộ',image :IconDonHo ,  naviga:'Đón hộ' },
    {id: 7, name : 'Đánh giá GV',image :IconFeedBack  ,  naviga:'Đánh giá GV'},
    {id: 4, name : 'Bản tin',image :IconNews, naviga:'Bản tin' },
    {id: 5, name : 'Biểu đồ',image :IconChart , naviga:'Biểu đồ' },
    {id: 6, name : 'Hoạt động',image :IconCalender , naviga:'Hoạt động'},
    {id: 9, name : 'Học phí',image :IconMoney , naviga:'Học phí'},
  ])


   
  return (

    
    <View style={styles.container}>
         <ImageBackground style={{width: '100%' , height:250 }}   source={require('../android/app/src/kids_student.jpg')}>
            <View style={styles.infoText}>
                <View style={styles.borderOftext}>
                      <Text style={{fontSize:20, fontWeight:'bold',color:'white'}}>{data_hocsinh.ten}</Text>
                      <Text style={{fontSize:18,color:'white'}}>{data_lop.ten_lop} - năm 2020</Text>
                </View>
            </View>
         </ImageBackground>

          <View>
              <FlatList
                data={Category}
                renderItem={({item})=>
                    <View style={styles.wrapper}>
                          <CateListItem category={item} navigation={navigation} />
                    </View>
                } 
                keyExtractor={(item,index) => `${index}`}
                numColumns={3}
              />
          </View>

    </View>

  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#fff',
        justifyContent:'center',
        paddingVertical:5,
        paddingHorizontal:5
      },
      wrapper:{
        paddingHorizontal:8,
        paddingVertical:2,
      },
      titleTinTuc: {
        backgroundColor:'#de5931',
        borderTopRightRadius:15,
        width: (Dimensions.get('screen').width - 60) / 1.2,
      },
      textTitleTinTuc: {
        paddingHorizontal:10,
        paddingVertical:5,
        color:'white'
      },
      titleXemThem: {
        backgroundColor:'#04B431',
        marginLeft:5
      },
      cotnho:{
        width: (Dimensions.get('screen').width - 60) / 2,
      },
      infoText:{
        flex:1 ,
        flexDirection:'column',
        justifyContent:'flex-end',
        paddingTop:30,
      },
      borderOftext:{
        backgroundColor: 'rgba(255, 137, 93, 0.95)',
        // backgroundColor: 'rgba(11, 75, 120, 0.82)',
        borderTopLeftRadius:60,
        borderTopRightRadius:60,
        height:100,
        alignItems:'center',
        justifyContent:'center',
        position: 'relative',
      },
    
});

export default Home2
