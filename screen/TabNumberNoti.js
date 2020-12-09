
import React ,{ useState }from 'react';
import { useSelector } from 'react-redux'
function TabNumberNoti  ()  {
  const counter = useSelector(state => state)
  const abc = counter.notification;
  // const value =   abc[0] == undefined ? 0 : abc[0].id_hs ;
  // let giatri = 0;
  // if(abc.length !== 0){
  //     abc.map((item)=>{
  //        return giatri = item.id_hs
  //     })
  // }
  // return (
  //   giatri
  // );

  return (
    abc
  );
};
export default TabNumberNoti;
