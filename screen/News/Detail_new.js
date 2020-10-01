
import React ,{ useState }from 'react';
import { View, Text, Image,
    TouchableOpacity, ScrollView
 } from 'react-native'
 import HTMLView from 'react-native-htmlview';
const Detail_new =  ({ route,navigation }) => {
    const { post } = route.params;

  return (
            <View style={{paddingHorizontal:5,paddingVertical:5}}>
              <ScrollView>
                    <Text style={{fontWeight:'bold',fontSize:20}}>{JSON.stringify(post.title)}</Text>

                     <Text style={{fontSize:18}}>{post.short_description}</Text>
                     <HTMLView
                        value={post.content}
                      />
              </ScrollView>
            </View>
  
  );
};

export default Detail_new;
