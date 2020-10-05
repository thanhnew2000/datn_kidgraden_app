import React from 'react'
import {
    StyleSheet,
    Image,
    View,
    Text,
    TouchableOpacity,
    Alert,
    Picker,
    Button
  } from 'react-native';

  import { Input } from 'react-native-elements';
const Feedback = ({navigation}) => {
      return (
            <View style={styles.container}>
                <View style={{flexDirection:'row',alignItems:'center',paddingLeft:10}}>
                    <View style={{width:'40%'}}>
                        <Text style={{fontSize:16}}>Chọn giáo viên</Text>
                    </View>
                    <View style={{width:'50%'}}>
                              <Picker
                                // selectedValue={selectedValue}
                                style={{ height: 50, width: 150 }}
                                // onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                                >
                                <Picker.Item label="Java" value="java" />
                                <Picker.Item label="JavaScript" value="js" />
                                </Picker>
                    </View>
                </View>

                <View style={{paddingTop:10}}>
                    <Input label="Nội dung đánh giá"
                       multiline
                       numberOfLines={4} />
                </View>
                <View style={{width:'40%',alignSelf:'flex-end'}}>
                    <Button  title="Gửi"/>
                </View>
                        

            </View>
      )
  }
  const styles = StyleSheet.create({
    container:{ 
     flex:1,
     backgroundColor:'#fff',
     padding:10
    },
   
  });
export default Feedback