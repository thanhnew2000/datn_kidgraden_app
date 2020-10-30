
import React ,{ useState, useEffect }from 'react';
import { Modal,StyleSheet,View,Image } from 'react-native'

const Modal_Start_App =  ({ showLoading }) => {
  return (
                <Modal
                animationType="slide"
                transparent={true}
                visible={showLoading}
                // onRequestClose={() => {
                // Alert.alert("Modal has been closed.");
                // }}
                >
                        <View style={styles.container}>
                            <View style={styles.content}>
                             <Image style={{}} source={require('../../../android/app/src/asset/img/coolkids.png')}/>
                            </View>
                        </View>
                </Modal>
  );
};
const styles = StyleSheet.create({
    container: {
        flex:1,
       backgroundColor:'#fff',
    },
    content:{
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal:30
    }
  });
export default Modal_Start_App;
