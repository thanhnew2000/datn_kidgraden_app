import React from 'react'
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
const Account = ({navigation}) => {

    const { signOut } = React.useContext(AuthContext);

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
                     <Text style={{fontSize:16,paddingTop:10,fontWeight:'bold'}}>Bé : Tuyết Thanh Hà - 5 Tuổi</Text>
                     <Text style={{fontSize:16,fontWeight:'bold'}}>Lớp Mầm</Text>
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