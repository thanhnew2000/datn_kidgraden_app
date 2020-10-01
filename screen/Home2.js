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
  
 
  
const Home2 = ({ navigation }) => 
{

  const [Category,setCategory] = useState([
    {id: 1, name : 'Điểm danh',image :IconDiemDanh },
    {id: 2, name : 'Xin nghỉ',image :IconXinNghi },
    {id: 3, name : 'Dặn thuốc',image :IconMedicine },
    {id: 4, name : 'Bản tin',image :IconNews },
    {id: 5, name : 'Sức khỏe',image :IconNatri },
    {id: 6, name : 'Hoạt động',image :IconCalender },
    {id: 7, name : 'Feedback GV',image :IconFeedBack },
    {id: 8, name : 'Đón hộ',image :IconDonHo },
    {id: 9, name : 'Học phí',image :IconMoney },
  ])


    const [News, setAllTinTuc] = useState([])
    const getListCate = () => {
         axios.get('https://hosteshoper.000webhostapp.com/api/post')
         .then(function (response) {
           let data = response.data;
           let threeNews = data.filter(el => (el.id <= 3));
            setAllTinTuc(threeNews);
         })
         .catch(function (error) {
           console.log(error);
         });
     };
     useEffect(getListCate, []);

  return (

    
    <View style={styles.container}>
         <ImageBackground style={{width: '100%' , height:250 }}   source={require('../android/app/src/kids_student.jpg')}>
            <View style={styles.infoText}>
                <View style={styles.borderOftext}>
                      <Text style={{fontSize:20, fontWeight:'bold',color:'white'}}>Tran Thanh Tuyet</Text>
                      <Text style={{fontSize:18,color:'white'}}>Lop Mam 1 - năm 2020</Text>
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
        // backgroundColor: 'rgba(10, 150, 38, 0.83)',
        backgroundColor: 'rgba(11, 75, 120, 0.82)',
      
        borderTopLeftRadius:60,
        borderTopRightRadius:60,
        height:100,
        alignItems:'center',
        justifyContent:'center',
        position: 'relative',
      },
    
});

export default Home2
