
import React ,{ useState, useEffect }from 'react';
import { Modal } from 'react-native'
import Loading from '../../Loading';

const Modal_Loading =  ({ showLoading }) => {
  return (
                <Modal
                animationType="slide"
                transparent={true}
                visible={showLoading}
                // onRequestClose={() => {
                // Alert.alert("Modal has been closed.");
                // }}
                >
                    <Loading />
                </Modal>
  );
};

export default Modal_Loading;
