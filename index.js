/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import React from 'react';
import App from './App';
// import { Provider } from 'react-redux'
import {name as appName} from './app.json';
// import thunk from 'redux-thunk'
// import { createStore,applyMiddleware} from 'redux';
// import myReducer from './src/redux/reducers/index';
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//     console.log('Message handled in the background!', remoteMessage);
//   });
// const store = createStore(myReducer,applyMiddleware(thunk));

// ReactDOM.render(
//         <Provider store={store}><App /></Provider>,
//     document.getElementById('root')
//   );
// const Root = () => (
//     <Provider store={store}>
//                <App />
//       </AuthContext.Provider>
//     </Provider>
//   )


// ReactDOM.render(
//         <Provider store={store}><App /></Provider>,
//     document.getElementById('root')
//   );

AppRegistry.registerComponent(appName, () => App);
