
import React ,{ useState,useEffect }from 'react';
import { View, Text, Image,
    TouchableOpacity, ScrollView,StyleSheet, Button,FlatList
 } from 'react-native'
 import HTMLView from 'react-native-htmlview';

 import { VictoryBar, VictoryGroup, VictoryChart, VictoryLine,VictoryZoomContainer,VictoryBrushContainer ,VictoryAxis,VictoryScatter, VictoryLegend } from "victory-native";
 import ApiBieuDoSucKhoe from '../../android/app/src/api/BieuDoSucKhoeApi';
 import AsyncStorage from '@react-native-community/async-storage';
 import { useSelector,useDispatch } from 'react-redux'

const BieuDo =  ({ navigation }) => {

  const data_redux = useSelector(state => state)
  const du_lieu_hs = data_redux.hocsinh.data;
 
  const data = {
    some : [
      {y:50},
    ]
  }
  const [All_data_suc_khoe_hs, setData_suc_khoe_hs] = useState([]); 
  const [data_suc_khoe_hs_nam, setData_suc_khoe_hs_nam] = useState([]); 
  const [choseNam, setChoseNam] = useState(0); 
  const [all_year, setAllYear] = useState([
    {
        year : ''
    },

  ]); 

  const [data_chieu_cao, setDataChieuCao] = useState([]); 
  const [data_can_nang, setDataCanNang] = useState([]); 
  const [data_nearest, setDataNearest] = useState({
    chieu_cao : '',
    can_nang : ''
  }); 
 

  function layNamAndGetAllSkHs(token,id_hs){
    ApiBieuDoSucKhoe.getYear(token)
    .then(function (response) {
      let data = response.data;
      setAllYear(data);
      let lengthIndexNam = data.length - 1;
      console.log(id_hs);
      getAllSucKhoeOfHs(token,data[lengthIndexNam]['year'],id_hs);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

async function getYear () {
   var token = await AsyncStorage.getItem('data_token');
  //  var hs = await AsyncStorage.getItem('data_hs');
  //  let data_HocSinh = JSON.parse(hs)
   await layNamAndGetAllSkHs(token,du_lieu_hs.id)
 };

 useEffect(() => {getYear()}, []);




  function locByYear(year){
    setChoseNam(year);
    let arr  =  All_data_suc_khoe_hs.filter((item) => new Date(item.thoi_gian).getFullYear() == year)
    // setData_suc_khoe_hs_nam(arr);
    changeDataSkNamToShow(arr,year)
    console.log(arr);
  }

  function getAllSucKhoeOfHs(token,yearNear,id_hs) {
    ApiBieuDoSucKhoe.getAllDataSkHs(token,id_hs)
    .then(function (response) {
      let data = response.data;
      console.log('data',data);
      setData_suc_khoe_hs(data);
      let arr  =  data.filter((item) => new Date(item.thoi_gian).getFullYear() == yearNear)
      // setData_suc_khoe_hs_nam(arr);

      changeDataSkNamToShow(arr,2020)

      let lengthData = arr.length - 1;
      setDataNearest({
        chieu_cao : arr[lengthData].chieu_cao,
        can_nang : arr[lengthData].can_nang,
      });

    })
    .catch(function (error) {
      console.log(error);
    });
  }


  const changeDataSkNamToShow = (data,year) => {
        let arrChieu_Cao = [];
        let arrCan_Nang = [];
        console.log('dataShi',data)
        data.forEach((element,index) => {
          var date = new Date(element.thoi_gian)
          var ngay = date.getDate();
          var thang = date.getMonth();
          arrChieu_Cao.push({x: ngay+'/'+thang,y: Number(element.chieu_cao),label:element.chieu_cao})
          arrCan_Nang.push({x: ngay+'/'+thang,y: Number(element.can_nang),label:element.can_nang})
        });
        setDataChieuCao(arrChieu_Cao);
        setDataCanNang(arrCan_Nang);
  };



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
                        <Text style={{fontSize:16}}>Chiều cao : {data_nearest.chieu_cao} (cm)</Text>
                      </View>
                      <View style={{width:'50%'}}>
                        <Text style={{fontSize:16}}>Cân nặng: {data_nearest.can_nang} (kg) </Text>
                      </View>
                </View>
              </View>


              <ScrollView>

                
                
                <View style={{flexDirection:'row',marginTop:10}}>
                  <View style={{alignSelf:'center'}}>
                    <Text >Năm</Text>
                  </View>
                  <View>
                      <FlatList
                        data={all_year}
                        horizontal={true}
                        renderItem={({item,index}) =>
                        <TouchableOpacity onPress={() => locByYear(item.year) } style={choseNam == item.year ? styles.choseYear : styles.nomarl }>
                              <Text>{item.year}</Text>
                        </TouchableOpacity>
                        }
                        keyExtractor={(value, index) => index}
                    />
                  </View>
                </View>

                <Text style={{fontSize:16,color:'black',marginTop:10}}>Biểu đồ tăng trưởng cân nặng</Text>
                <ScrollView horizontal={true}>
                    <VictoryChart  domainPadding={{ x: 20 }} width={data_chieu_cao.length >= 7 ? 550 : 380} >
                        <VictoryBar   style={{
                            data: {stroke: "tomato",fill:'#48D2FE',width:10},
                          }}
                            data = {data_chieu_cao}
                  
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
                    <VictoryChart  domainPadding={{ x: 10 }}    width={data_can_nang.length >= 7 ? 550 : 380}>
                        <VictoryBar   style={{
                            data: {stroke: "tomato",fill:'#FCCF5F',width:10},
                          }}
                            data =  {data_can_nang}
                          
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
  choseYear:{
    backgroundColor:'#ff6699',
    borderWidth:1,borderColor:'pink',padding:7,marginLeft:5
  },
  nomarl:{
    borderWidth:1,borderColor:'pink',padding:7,marginLeft:5
  }
 
 
});

export default BieuDo;
