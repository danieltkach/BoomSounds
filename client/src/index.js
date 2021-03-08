// react
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// redux
import store from './redux/store/index';
import { Provider } from 'react-redux';
// components
import App from './App';
import * as serviceWorker from './serviceWorker';
// styles
import './index.css';
//Firebase
import { FirebaseAppProvider } from 'reactfire';
import firebaseConfig from './firebaseConf';
//Toast
import { ToastProvider } from 'react-toast-notifications';

ReactDOM.render(
  <Provider store={store}>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <ToastProvider
        autoDismiss
        autoDismissTimeout={5000}
        placement="bottom-center"
      >
        <Router>
          <App />
        </Router>
      </ToastProvider>
    </FirebaseAppProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
