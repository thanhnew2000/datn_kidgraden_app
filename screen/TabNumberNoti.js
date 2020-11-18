
import React ,{ useState }from 'react';
import { useSelector } from 'react-redux'
const TabNumberNoti =  () => {
  const counter = useSelector(state => state)
  const abc = counter.notification;
  return (
    abc
  );
};
export default TabNumberNoti;
