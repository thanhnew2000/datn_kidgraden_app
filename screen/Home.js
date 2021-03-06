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

const Home = ({ navigation }) => 
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
    <View style={{flexDirection: 'row'}}>
       <View style={styles.titleTinTuc}>
         <Text style={styles.textTitleTinTuc}>Tin tức</Text>
       </View>
       <View  style={styles.titleXemThem}>
         <TouchableOpacity>
                 <Text style={styles.textTitleTinTuc}>Xem Thêm</Text>
         </TouchableOpacity>

       </View>
   </View>

   <View>
       <FlatList
         data={News}
         renderItem={({item})=>
         <TouchableOpacity >
             <View  style={{flexDirection: 'row',paddingVertical:5}}>
                 <Image style={{width: 30 , height:30 }}  source={require('../android/app/src/funny.png')}/>
                 <Text style={{paddingVertical:5,paddingHorizontal:5}}> - {item.title}</Text>
               </View>
           </TouchableOpacity>
         } 
         keyExtractor={(item,index) => `${index}`}
       />
   </View>

      <View style={{  flexDirection: 'row', backgroundColor:'#81F79F'}}>
         <View style={styles.cotnho}>
            <Image style={{width: 150 , height:120 }}  source={require('../android/app/src/kids.jpg')}/>
         </View>
         <ImageBackground style={{width: '100%' , height:120 }} imageStyle={{opacity: 0.7}}  source={require('../android/app/src/cauvong.jpg')}>
         <View style={styles.infoText}>
              <Text style={{fontSize:18, fontWeight:'bold',color:'black'}}>Tran Thanh Tuyet</Text>
              <Text style={{fontSize:16}}>Lop Mam 1</Text>
         </View>
         </ImageBackground>

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
        alignItems:'center',
        paddingTop:30,
        paddingRight:43,
        backgroundColor:'black',
        opacity:0.5,
        width: (Dimensions.get('screen').width - 60) / 1.2,
      },
   
    
});

export default Home
