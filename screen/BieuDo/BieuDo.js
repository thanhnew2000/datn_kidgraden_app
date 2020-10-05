
import React ,{ useState }from 'react';
import { View, Text, Image,
    TouchableOpacity, ScrollView,StyleSheet
 } from 'react-native'
 import HTMLView from 'react-native-htmlview';

 import { VictoryBar, VictoryGroup, VictoryChart, VictoryLine,VictoryZoomContainer,VictoryBrushContainer ,VictoryAxis,VictoryScatter, VictoryLegend } from "victory-native";


const BieuDo =  ({ navigation }) => {

  const data = {
    some : [
      {y:50},
    ]
  }

  const [thisState,setThisState] = useState(
    {
      selectedDomain:'',
      zoomDomain:''
    },
  );

  function handleZoom(domain) {
    setThisState({selectedDomain: domain});
  }

  function handleBrush(domain) {
    setThisState({zoomDomain: domain});
  }

  
  return (
            <View style={{padding:10,backgroundColor:'#fff'}}>

              <View style={styles.oTop}>
                <Text style={{fontSize:16,fontWeight:'bold'}}>Số đo mới nhất </Text>
      
                <View style={{flexDirection:'row'}}>
                      <View style={{width:'50%'}}>
                        <Text style={{fontSize:16}}>Chiều cao : 126 (cm)</Text>
                      </View>
                      <View style={{width:'50%'}}>
                        <Text style={{fontSize:16}}>Cân nặng: 30 (kg) </Text>
                      </View>
                </View>
              </View>


              <ScrollView>

                <Text style={{fontSize:16,color:'black',marginTop:10}}>Biểu đồ tăng trưởng cân nặng</Text>
                <ScrollView horizontal={true}>
                    <VictoryChart  domainPadding={{ x: 10 }}   width={600} >
                        <VictoryBar   style={{
                            data: {stroke: "tomato",fill:'#48D2FE',width:10},
                          }}
                            data = {[
                              {x:'1/2009',y:50,label: "50"},
                              {x:'2/2009',y:30,label: "30"},
                              {x:'3/2009',y:30,label: "30"},
                              {x:'4/2009',y:39,label: "39"},
                              {x:'5/2009',y:49,label: "49"},
                              {x:'6/2009',y:50,label: "51"},
                              {x:'7/2009',y:61,label: "51"},
                              {x:'8/2009',y:20,label: "20"},
                              {x:'9/2009',y:26,label: "26"},
                              {x:'12/2009',y:38,label: "38"},
                            ]}
                          >
                        </VictoryBar>
                      <VictoryAxis  label="Tháng" />
                        <VictoryAxis dependentAxis
                        label="Số cân"
                        style={{
                          axisLabel: { padding: 35 }
                        }}
                      />
                      <VictoryLegend
                        data={[
                          {
                            name:'Đơn vị : Kg'
                          }
                        ]}
                      />
                      </VictoryChart>
                </ScrollView>


                <Text style={{fontSize:16,paddingTop:10}}>Biểu đồ tăng trưởng chiều cao</Text>
                <ScrollView horizontal={true} style={{paddingBottom:100}}>
                    <VictoryChart  domainPadding={{ x: 10 }}   width={600} >
                        <VictoryBar   style={{
                            data: {stroke: "tomato",fill:'#FCCF5F',width:10},
                          }}
                            data = {[
                              {x:'1/2009',y:50,label: "50"},
                              {x:'2/2009',y:55,label: "55"},
                              {x:'3/2009',y:60,label: "60"},
                              {x:'4/2009',y:65,label: "65"},
                              {x:'5/2009',y:67,label: "67"},
                              {x:'6/2009',y:68,label: "68"},
                              {x:'7/2009',y:69,label: "69"},
                              {x:'8/2009',y:70,label: "70"},
                              {x:'9/2009',y:72,label: "72"},
                              {x:'12/2009',y:75,label: "75"},
                            ]}
                          >
                        </VictoryBar>
                      <VictoryAxis  label="Tháng" />
                        <VictoryAxis dependentAxis
                        label="Chiều cao (cm)"
                        style={{
                          axisLabel: { padding: 35 }
                        }}
                      />

                      <VictoryLegend
                        data={[
                          {
                            name:'Đơn vị : Cm'
                          }
                        ]}
                      />  
                      </VictoryChart>
                </ScrollView>
              </ScrollView>

            </View>
  
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:10,
    backgroundColor:"#fff",
  },
  oTop:{
    padding:10,
    borderRadius:4,
    backgroundColor:'#fff',
    shadowColor: "#000",
    alignItems:'center',
    shadowOffset: {
        width: 0,
        height: 7,
    },
    shadowOpacity: 1.70,
    shadowRadius: 6.27,
    
    elevation: 15,
  },
 
 
});

export default BieuDo;
