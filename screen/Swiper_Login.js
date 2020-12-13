
import React ,{ useState, useMemo, useReducer, useContext,useEffect }from 'react';
import axios from 'axios';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ImageBackground,
    Dimensions,
  } from 'react-native';


  import slide_kid_1 from '../android/app/src/slide_kid_1.jpg';
  import slide_kid_logo from '../android/app/src/logo.png';
  import slide_kid_2 from '../android/app/src/slide_kid_2.jpg';

const { width } = Dimensions.get('window');
const { height } =  Dimensions.get('window').height;

import Swiper from 'react-native-swiper';
const Swiper_Login =  ({ navigation  }) => {
  

  return (
        <Swiper
        showsButtons={false}
        autoplay={true}
        autoplayTimeout={1.8}
        paginationStyle={styles.paginationStyle}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
            >
                <View style={styles.slide}>
                   <Image style={{ flex: 1, width:'80%', resizeMode: 'contain' }}   source={slide_kid_logo}/>
                </View>
                <View style={styles.slide}>
                      <Image style={styles.image}  source={slide_kid_1}/>
                </View>
                <View style={styles.slide}>
                  <Image style={styles.image}    source={slide_kid_2}/>
                </View>
            </Swiper>
  
  );
};
const styles = StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },

    image: {
        flex: 1,
        maxWidth: width,
        resizeMode: 'contain',
    },

    dotStyle: {
        borderColor:'green',
        borderRadius: 15,
        borderWidth: 1,
        backgroundColor: 'rgba(255, 0, 0, 0)',
        width: 15,
        height: 15,
    },

    activeDotStyle: {
        backgroundColor:'green',
        borderRadius: 15,
        width: 15,
        height: 15,
    },

    paginationStyle: {
        position: 'absolute',
        bottom: 0,
    },
});
export default Swiper_Login;
