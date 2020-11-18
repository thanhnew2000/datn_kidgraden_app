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
    NativeModules 
  } from 'react-native';
  import axios from 'axios';
  import Collapsible from 'react-native-collapsible';
  import ApiHocSinh from '../android/app/src/api/HocSinhApi';
  import AsyncStorage from '@react-native-community/async-storage';
  import Modal_Loading from './component/reuse/Modal_Loading'
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import { AuthContext } from './context';
  import linkWeb from '../android/app/src/api/linkWeb/index';
  
  // redux
  import { getDataSuccess,setNumberNotification } from '../src/redux/action/index';
  import { useSelector,useDispatch,useStore  } from 'react-redux'
const DrawerScreen =  ({props,navigation}) => {

    const { signOut } = React.useContext(AuthContext);

    const dispatch = useDispatch();
    const counter = useSelector(state => state)
    const hs = counter.hocsinh.data;
    const numberNotification = counter.notification;

  const [isChuyenHocSinh, setIsChuyenHocSinh] = useState(true);


  const [showLoading, setShowLoading] = useState(false);

  const [userToken, setUserToken] = useState(null);
  const [all_hs_user, setHsByUser] = useState({});

  const getHocSinhIdUser = (token,user_id) => {
      ApiHocSinh.getHocSinhIdUser(token,user_id)
        .then(function (response) {
          let data = response.data;
          console.log('data_hs_user',data);
          setHsByUser(data);
        })
        .catch(function (error) {
          console.log(error);
        });
  };


  useEffect(() => {
    async function fetchData() {
      try{
        var token = await AsyncStorage.getItem('data_token');
        var data_user = await AsyncStorage.getItem('data_user');
        // console.log(token);
        let user =  JSON.parse(data_user);
        console.log(user.id);
        setUserToken(token)
        getHocSinhIdUser(token,user.id)
        setShowLoading(false);
      }catch (e){
        console.log(e);
      }
  }
  fetchData();
},[]);

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

 function showModalChangeHs (){
  setIsChuyenHocSinh(!isChuyenHocSinh)
 }

 function clickTest(number){
  dispatch(setNumberNotification(5));
 }

  return (
  <View>
     {/* <FlatList
        data={all_hs_user}
        renderItem={({item,index}) => 
        <TouchableOpacity onPress={()=> changeDataHs(item.id)}>
        <View style={styles.container}>
              <View style={styles.box}>
                <View style={{width:'30%'}}>
                  <Image style={{width:55,height:55,borderRadius:50}} source={require('../android/app/src/kids_student.jpg')} />
                </View>
                <View style={{width:'70%',justifyContent:'center'}}>
                  <Text style={{fontSize:16,fontWeight:'bold'}}>{item.ten}</Text>
                  <Text style={{fontSize:14}}>{item.get_lop.ten_lop}</Text>
                </View>
              </View>
        </View>
        </TouchableOpacity>

        
        }
        keyExtractor={(value, index) => index}
    /> */}

    {/*  <Modal_Loading showLoading = {showLoading} /> */}
    <ImageBackground style={{width:'100%'}}  source={require('../android/app/src/asset/img/nen-navbar.jpg')}>
      <View style={styles.boxTren}>
            {/* <Image style={{width:65,height:65,borderRadius:100,alignSelf:'center',marginLeft:10}}  source={{uri: linkWeb + hs.avatar}} /> */}
          <View style={{alignSelf:'center'}}>
            {/* <Text style={{marginLeft:'10%',fontWeight:'bold',fontSize:16}}> {hs.ten}</Text> */}
            <Text></Text>
            <Text></Text>
            <Text style={{marginLeft:'10%',fontWeight:'bold',fontSize:16,color:'white'}}>TK: tuyettnph0281392</Text>
          </View>
      </View>
      </ImageBackground>


      <View style={styles.oButton}>
          <View style={{alignItems:'center',justifyContent:'center',width:'20%'}}>
            <FontAwesome name="unlock-alt" size={20} color="black" />
          </View>
       <TouchableOpacity onPress={()=> navigation.navigate('ChangePass') }>
            <View style={{justifyContent:'center',width:'40%'}}>
              <Text >Đổi mật khẩu</Text>
            </View>
          </TouchableOpacity>

          <View style={{justifyContent:'center',width:'40%'}}>
             <Text >{numberNotification}</Text>
            <TouchableOpacity onPress={()=>clickTest(1)}>
              <Text>Click test</Text>
            </TouchableOpacity>

          </View>

      </View>


      <TouchableOpacity onPress={()=> showModalChangeHs() }>
      <View style={styles.oButton}>
          <View style={{alignItems:'center',justifyContent:'center',width:'20%'}}>
            <FontAwesome name="exchange" size={20} color="black" />
          </View>
          <View style={{justifyContent:'center',width:'40%'}}>
            <Text >Chuyển học sinh</Text>
          </View>
          <View style={{justifyContent:'center',width:'35%',alignItems:'flex-end'}}>
           <FontAwesome name={isChuyenHocSinh ? 'angle-down' : 'angle-up'} size={20} color="black" />
          </View>
      </View>
      </TouchableOpacity>



        <Collapsible collapsed={isChuyenHocSinh}>
          <View style={{marginHorizontal:'5%',borderLeftWidth:1,borderRightWidth:1,borderBottomWidth:1}}>
            <FlatList
                    data={all_hs_user}
                    renderItem={({item,index}) => 
                    <TouchableOpacity onPress={()=> changeDataHs(item.id)}>
                       <View style={{flexDirection:'row',alignItems:'center',marginVertical:10}}>
                        <View style={{width:'35%'}}>
                        <Image style={{width:45,height:45,borderRadius:100,marginLeft:10}}  source={{uri: linkWeb + item.avatar}} />
                        </View>
                            <Text>{item.ten}</Text>
                      </View>
                    </TouchableOpacity>
                    }
                    keyExtractor={(value, index) => index}
                />

          </View>
        </Collapsible>

        <TouchableOpacity onPress={()=>signOut()} >
          <View style={styles.oButton}>
              <View style={{alignItems:'center',justifyContent:'center',width:'20%'}}>
                <AntDesign name="logout" size={20} color="black" />
              </View>
              <View style={{justifyContent:'center',width:'40%'}}>
                <Text >Đăng xuất</Text>
              </View>
          </View>
      </TouchableOpacity>


        <Modal_Loading showLoading = {showLoading} /> 
    </View>

      );
    };
    const styles = StyleSheet.create({
      container:{
        flex:1,
        padding:5,
        backgroundColor:"#fff",
      },
      oButton:{
          flexDirection:'row',
          height:50,
      },
      boxTren:{
        height:120,
        flexDirection:'row',
      },
      box:{
        padding:5,
        flexDirection:'row',
        borderRadius:10,
        borderColor:'gray',
        borderBottomWidth:1
      },
      
    });

export default DrawerScreen;
