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

const CateListItem = ({category,navigation,onPress}) => {
      return (
         <TouchableOpacity onPress={()=>{
            navigation.navigate(`${category.name}`)
         }} >
            <View style={styles.containers}>
                        <Image style={styles.imageThucDon} source={category.image}/>
                        <Text style={styles.fontWeight}>{category.name}</Text>
            </View>
        </TouchableOpacity>
      )
  }
  const styles = StyleSheet.create({
    imageThucDon: {
        width:100, height:65,borderRadius:20,
    },
    textThucDon:{
       fontWeight: 'bold', 
       color: "blue",
    },
    containers:{ 
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 2,
        borderColor: "#D8D8D8",  
        // borderColor: "white", 
        borderRadius: 6,
        paddingTop:15,
        marginTop:15,
    },
   
  });
export default CateListItem