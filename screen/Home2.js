import React ,{ useState, useEffect }from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    Dimensions,
    Image,
    TouchableOpacity,
    ImageBackground
  } from 'react-native';
  import axios from 'axios';

const Home2 = ({ navigation }) => 
{

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
         <ImageBackground style={{width: '100%' , height:250 ,position: "relative"}} imageStyle={{opacity: 0.7}}  source={require('../android/app/src/kids_student.jpg')}>
         <View style={styles.infoText}>
              <Text style={{fontSize:18, fontWeight:'bold',color:'black'}}>Tran Thanh Tuyet</Text>
              <Text style={{fontSize:16}}>Lop Mam 1</Text>
         </View>
         </ImageBackground>
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
  
    
});

export default Home2
