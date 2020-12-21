
import React ,{ useState }from 'react';
import ApiNotification from '../android/app/src/api/NotificationApi';
import { getDataSuccess,setNumberNotification,setArrNotification,setcheckValueCallAgain } from '../src/redux/action/index';
import { useSelector,useDispatch,useStore  } from 'react-redux'



function TabNumberNoti  ()  {

  const counter = useSelector(state => state)
  const abc = counter.notification;

  return (
    abc
  );
};
export default TabNumberNoti;
