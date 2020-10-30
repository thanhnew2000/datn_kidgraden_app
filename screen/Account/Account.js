import React ,{ useState, useEffect }from 'react';

import {
    StyleSheet,
    Image,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert
  } from 'react-native';
  import IconKidsStudy from '../../android/app/src/asset/img/icon-kids-study.jpg';
  import { ListItem } from 'react-native-elements';
  import { AuthContext } from '../context';
  import AsyncStorage from '@react-native-community/async-storage';

  import { useSelector,useDispatch,useStore  } from 'react-redux'
  
const Account = ({navigation}) => {

    const dispatch = useDispatch();
    const student = useSelector(state => state)
    const lop_hs = student.hocsinh.data.get_lop;
    const hs = student.hocsinh.data;


    const { signOut } = React.useContext(AuthContext);

    const [du_lieu_hs, setDuLieuHS] = useState({});
    // const [lop_hs, setLopHs] = useState({});

    // useEffect(() => {
    //       async function fetchData() {
    //         try{
    //           var hs = await AsyncStorage.getItem('data_hs');
    //           let data_HS = JSON.parse(hs);
    //           console.log(data_HS);
    //           if(hs !== null){
    //             setDuLieuHS(data_HS);
    //             setLopHs(data_HS.get_lop);
    //           }
    //         }catch (e){
    //           console.log(e);
    //         }
    //     }
    //     fetchData();
    // },[]);

  

    const list = [
        {
          title: 'Cập nhập thông tin',
          icon: 'av-timer',
          nameNaviga:'CapNhapThongTin'

        },
        {
          title: 'Đổi mật khẩu',
          icon: 'flight-takeoff',
          nameNaviga:'ChangePass'
        },
      
      ]


      return (
       
            <View style={styles.containers}>
                <View style={{alignItems:'center',padding:10}}>
                     <Image style={styles.imageAvatar}   source={require('../../android/app/src/kids_student.jpg')} />
                     <Text style={{fontSize:16,paddingTop:10,fontWeight:'bold'}}>Bé : {hs.ten} - 5 Tuổi</Text>
                     <Text style={{fontSize:16,fontWeight:'bold'}}>{lop_hs == undefined ? ' ' : lop_hs.ten_lop }</Text>
                </View>
                <View>
                {
                    list.map((item, i) => (
                                
                    <TouchableOpacity onPress={()=>{
                      navigation.navigate(item.nameNaviga)}}>
                            <ListItem key={i} bottomDivider>
                                      <ListItem.Content>
                                        <ListItem.Title>{item.title}</ListItem.Title>
                                      </ListItem.Content>
                                <ListItem.Chevron />
                            </ListItem>
                    </TouchableOpacity>

                    ))
                 }
                    <View style={{borderBottomWidth:1,borderColor:'#E3E1DB'}}>
                        <TouchableOpacity onPress={()=>signOut()} >
                           <Text style={{padding:16,fontSize:16}}>Đăng xuất</Text>

                        </TouchableOpacity>
                    </View>
                </View>
            </View>
      )
  }
  const styles = StyleSheet.create({
  
    containers:{ 
        flex:1,
        backgroundColor:'#fff'
    },
    imageAvatar:{
        width:200,
        height:200,
        borderRadius:100
    }
   
  });
export default Account