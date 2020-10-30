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
            navigation.navigate(`${category.naviga}`)
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
        width:55, height:55,borderRadius:100,marginLeft:'6%'
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
        paddingTop:5,
        marginTop:15,
        marginLeft:17
    },
   
  });
export default CateListItem