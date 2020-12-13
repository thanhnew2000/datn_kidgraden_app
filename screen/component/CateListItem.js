import React from 'react'
import {
    StyleSheet,
    Image,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ImageBackground
  } from 'react-native';

const CateListItem = ({category,navigation,onPress}) => {
      return (
        //  <TouchableOpacity onPress={()=>{
        //     navigation.navigate(`${category.naviga}`)
        //  }} >
        //     <View style={styles.containers}>
        //                 <Image style={styles.imageThucDon} source={category.image}/>
        //                 <Text style={styles.fontWeight}>{category.name}</Text>
        //     </View>
        // </TouchableOpacity>

        <View style={{width:'50%',paddingHorizontal:5, paddingVertical:10}}> 
          <TouchableOpacity onPress={()=>{ navigation.navigate(`${category.naviga}`)}} >
            <Image style={{width: '100%',height:100,borderTopRightRadius:20,borderTopLeftRadius:20 }}   source={category.image}>  
            </Image>
            <View>
            <View style={styles.containersText}>
                        <Text style={styles.fontWeight}>{category.name}</Text>
            </View>
            </View>
         </TouchableOpacity>
         </View>

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
    fontWeight:{fontWeight:'normal'},
    containersText:{ 
         paddingLeft:15,
         fontSize:19,
         paddingVertical:10,
        borderColor: "#D8D8D8",  
        backgroundColor:'#fff',
        borderBottomLeftRadius:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.5,
        shadowRadius: 1.0,
        elevation: 5,
    },
   
  });
export default CateListItem