import React ,{ useState, useEffect,useLayoutEffect }from 'react';
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
    Button
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
  import Header from './Header';
  import linkWeb from '../android/app/src/api/linkWeb/index';
  import Modal_Loading from './component/reuse/Modal_Loading'
  import { getDataSuccess } from '../src/redux/action/index';
  import { AuthContext } from './context';

  // Redux

  import { status } from '../src/redux/action/index';
  import { fetchDataAsyncStorage } from '../src/redux/action/index';
  import { useSelector,useDispatch,useStore  } from 'react-redux'
const Home2 = ({ navigation }) => 
{

  const { signOut } = React.useContext(AuthContext);

  const dispatch = useDispatch();
  // const lop_hs = '';
  const counter = useSelector(state => state)
  const lop_hs = counter.hocsinh.data.get_lop;
  const hs = counter.hocsinh.data;
  const notifi = counter.notification;
  console.log('notifi', notifi);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Header navigation={navigation}/>,
    })
   }, []);



  const [userToken, setUserToken] = useState(null);
  const [data_hocsinh, setData_hocsinh] = useState({});
  const [data_lop, setData_lop] = useState({
    ten_lop: 'Lớp'
  });
  const [data_user, setData_user] = useState({});
  const [all_hs_user, setHsByUser] = useState({});
  const [showLoading, setShowLoading] = useState(false);


  const getHocSinhIdUser = (token,user_id) => {
    ApiHocSinh.getHocSinhIdUser(token,user_id)
      .then(function (response) {
        let data = response.data;
        console.log('data_hs_user',data);
        setHsByUser(data);
      })
      .catch(function (error) {
        // signOut();
        console.log(error);
      });
  };


  const getThisHocSinh = (token,id_hs) => {
    ApiHocSinh.getOne(token,id_hs)
      .then(function (response) {
        let data = response.data;
        console.log('data',data);
        console.log('token',token);
        setData_hocsinh(data);
        AsyncStorage.setItem('data_hs',JSON.stringify(data));
        
      })
      .catch(function (error) {
        console.log(error);
      });
  };

    useEffect(() => {
      async function fetchData() {
        try{
          // var v = await AsyncStorage.getItem('data_storge');
          var token = await AsyncStorage.getItem('data_token');
          var hs = await AsyncStorage.getItem('data_hs');
          var data_user = await AsyncStorage.getItem('data_user');
          let user =  JSON.parse(data_user);

          if(token !== null && hs !== null){
            let data_HocSinh =  JSON.parse(hs);
            setData_hocsinh(data_HocSinh)
            // setData_lop(data_HocSinh.get_lop)
            setData_user(data_user)
            getHocSinhIdUser(token,user.id)
            setUserToken(token)
            getThisHocSinh(token,data_HocSinh.id)
          }
          dispatch(fetchDataAsyncStorage())

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

    // {id: 11, name : 'Biểu đồ',image :IconChart , naviga:'Biểu đồ' },
    // {id: 12, name : 'Hoạt động',image :IconCalender , naviga:'Hoạt động'},
    // {id: 13, name : 'Học phí',image :IconMoney , naviga:'Học phí'},
  ])

  function changeDataHs(id){
    setShowLoading(true);
      ApiHocSinh.getOne(userToken,id)
        .then(function (response) {
          let data = response.data;
          console.log('data',data);
           AsyncStorage.removeItem('data_hs');
           AsyncStorage.setItem('data_hs',JSON.stringify(data));
          // NativeModules.DevSettings.reload();
          dispatch(getDataSuccess(data));
         setShowLoading(false);
         navigation.closeDrawer();
        })
        .catch(function (error) {
          console.log(error);
        });
  }

   
  return (
<ScrollView>

    <View style={{height:'100%',backgroundColor:'#fff'}}>
          <ImageBackground style={{width: '100%' }}   source={require('../android/app/src/asset/img/home_image_slide.jpg')}>

          <View style={{backgroundColor:'rgba(221, 221, 222, 0.39)',paddingVertical:5}}>

            <View style={{flexDirection:'row-reverse'}}>
              <Text> </Text>
              <FlatList
                style={ all_hs_user.length >= 7 ?  null : styles.flexDirectionRowReverse}
                data={all_hs_user}
                horizontal={true}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={()=> changeDataHs(item.id)}>
                    <Image style={{width: 37 , height:37,borderRadius:100,marginTop:5,marginLeft:10}}  source={{uri: linkWeb + item.avatar}}/>
                  </TouchableOpacity>
                  
                )}
                keyExtractor={item => item.id}
              />
            </View>

            <View style={{flexDirection:'row'}}>
                <View style={{width:'20%',justifyContent:'center',marginLeft:'5%'}}>
                    <Image style={{width: 70 , height:70,borderRadius:100 }}  source={{uri: linkWeb + hs.avatar}}/>
                </View>
                <View style={{width:'80%',marginLeft:'5%',justifyContent:'center'}}>
                  {/* <View style={{flexDirection:'row',marginLeft:'18%'}}>
                    <View>
                      <Image style={{width: 37 , height:37,borderRadius:100,marginTop:5,marginLeft:10}}  source={require('../android/app/src/kids_student.jpg')}/>
                    </View>
                  </View> */}

                   <Text style={{fontSize:16,fontWeight:'bold'}}>{hs.ten}</Text>
                <Text style={{fontSize:15}}>Lớp: {lop_hs == undefined ? null : lop_hs.ten_lop}</Text>
                </View>
             </View>
         

        </View>
        </ImageBackground>


    <View style={styles.container}>
         {/* <ImageBackground style={{width: '100%' , height:120 }}   source={require('../android/app/src/asset/img/home_image_slide.jpg')}> */}

    
        {/* </ImageBackground> */}

         {/* <ImageBackground style={{width: '100%' , height:100 }}   source={require('../android/app/src/kids_student.jpg')}> */}
            {/* <View style={styles.infoText}> */}
                {/* <View style={styles.borderOftext}>
                      <Text style={{fontSize:20, fontWeight:'bold',color:'white'}}>{hs.ten}</Text>
                      <Text style={{fontSize:18,color:'white'}}>{lop_hs == undefined ? ' ' : lop_hs.ten_lop } - năm 2020</Text>
                </View> */}

            {/* </View> */}
         {/* </ImageBackground> */}

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
    <Modal_Loading showLoading = {showLoading} /> 


    </View>
    </ScrollView>

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
      flexDirectionRowReverse:{
        flexDirection:'row-reverse'
      }
    
});

export default Home2
