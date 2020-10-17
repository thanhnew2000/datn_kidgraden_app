
import React ,{ useState, useEffect }from 'react';
import { Modal } from 'react-native'
import Wait_Loading from '../../Wait_Loading';

const Modal_SubmitLoading =  ({ submitLoading }) => {
  return (
                <Modal
                animationType="slide"
                transparent={true}
                visible={submitLoading}
                // onRequestClose={() => {
                // Alert.alert("Modal has been closed.");
                // }}
                >
                    <Wait_Loading />
                </Modal>
  );
};

export default Modal_SubmitLoading;
