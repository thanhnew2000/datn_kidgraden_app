
import React ,{ useState, useEffect }from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView,
    Modal,
    Button
  } from 'react-native';
  import IconKidsStudy from '../../android/app/src/asset/img/icon-kids-study.jpg';
  import { Input } from 'react-native-elements';
  import Icon from 'react-native-vector-icons/FontAwesome';
  import Collapsible from 'react-native-collapsible';
  import ApiHocSinh from '../../android/app/src/api/HocSinhApi';
  import Modal_SubmitLoading from '../component/reuse/Modal_SubmitLoading';

const EditInfoParent = ({navigation,route}) => {
  const { userToken } = route.params;
  const { data_hocsinh } = route.params;

  const [du_lieu_edit_hs, setDuLieuEditHS] = useState({});
  const [submitLoading, setSubmitLoading] = useState(false);

 

  const [isModelThongTinBa, setIsModelThongTinBa] = useState(true);
  const [isModelThongTinMe, setIsModelThongTinMe] = useState(true);



    const getThisHocSinh = () => {
            ApiHocSinh.getOne(userToken,data_hocsinh.id)
              .then(function (response) {
                let data = response.data;
                console.log('data',data);
                setDuLieuEditHS(data);
              })
              .catch(function (error) {
                console.log(error);
              });
      };
      useEffect(getThisHocSinh, []);


    function modelBa(){
        setIsModelThongTinBa(!isModelThongTinBa);
    }
    function modelMe(){
        setIsModelThongTinMe(!isModelThongTinMe);
    }

    function editSubmit(){
      setSubmitLoading(true)
        const formData = new FormData();
        formData.append("ten_cha",du_lieu_edit_hs.ten_cha);
        formData.append("dien_thoai_cha",du_lieu_edit_hs.dien_thoai_cha);
        formData.append("ten_me",du_lieu_edit_hs.ten_me);
        formData.append("dien_thoai_me",du_lieu_edit_hs.dien_thoai_me);
      ApiHocSinh.editInfoHS(userToken,data_hocsinh.id,formData)
        .then(res => {
            console.log(res.data);
            setSubmitLoading(false);
            Alert.alert(
              "Cập nhập thành công",
              "",
              [
                { text: "OK", onPress: () => navigation.navigate('Home') }
              ],
              { cancelable: false }
            );

        })
        .catch(err => {
           setSubmitLoading(false)
           Alert.alert('Gặp vấn đề lỗi !')
            console.log(err);
        });
    }



      return (
        <ScrollView>
                <View style={{backgroundColor:'#fff',padding:10,justifyContent:'center'}}>

                    <View style={{borderWidth:1,marginTop:10,marginBottom:10}} >
                        <TouchableOpacity onPress={()=>modelBa()}>
                            <Text style={{fontSize:17,alignItems:'center',alignSelf:'center',paddingVertical:5}}>Thông tin ba</Text>
                      </TouchableOpacity>
                    </View>

                            <Collapsible collapsed={isModelThongTinBa}>
                                            <Input
                                              value={du_lieu_edit_hs.ten_cha}
                                              onChangeText={text  => {setDuLieuEditHS({...du_lieu_edit_hs,ten_cha:text})}}
                                                label="Tên"
                                                leftIcon={
                                                    <Icon
                                                    name='user'
                                                    size={24}
                                                    color='black'
                                                    />
                                                }
                                                />

                                            <Input
                                            label="Số điện thoại"
                                            onChangeText={text  => {setDuLieuEditHS({...du_lieu_edit_hs,dien_thoai_cha:text})}}
                                            leftIcon={
                                                <Icon
                                                name='phone'
                                                size={24}
                                                color='black'
                                                />
                                            }
                                            value={du_lieu_edit_hs.dien_thoai_cha}
                                          />
                            </Collapsible>


                    <View style={{borderWidth:1,marginTop:10,marginBottom:10}} >
                        <TouchableOpacity onPress={()=>modelMe()}>
                            <Text style={{fontSize:17,alignItems:'center',alignSelf:'center',paddingVertical:5}}>Thông tin mẹ</Text>
                      </TouchableOpacity>
                    </View>
              

                        <Collapsible collapsed={isModelThongTinMe}>
                                        <Input
                      onChangeText={text  => {setDuLieuEditHS({...du_lieu_edit_hs,ten_me:text})}}
                                        
                                            label="Tên"
                                            leftIcon={
                                                <Icon
                                                name='user'
                                                size={24}
                                                color='black'
                                                />
                                            }
                                            value={du_lieu_edit_hs.ten_me}
                                          />
                                          <Input
                      onChangeText={text  => {setDuLieuEditHS({...du_lieu_edit_hs,dien_thoai_me:text})}}

                                            label="Số điện thoại"
                                            leftIcon={
                                                <Icon
                                                name='phone'
                                                size={24}
                                                color='black'
                                                />
                                            }
                                            value={du_lieu_edit_hs.dien_thoai_me}
                                          />
                        </Collapsible>

                    <View style={{alignItems:'flex-end',marginTop:10}}>
                        <Button title="Cập nhập" onPress={editSubmit}/>
                    </View>


                    <Modal_SubmitLoading submitLoading={submitLoading} />

                </View>
            </ScrollView>
      )
  }
  const styles = StyleSheet.create({
    containers:{ 
        flex:1,
        backgroundColor:'#fff'
    }
  });
export default EditInfoParent