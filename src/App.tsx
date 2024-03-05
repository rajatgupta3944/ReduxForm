import React from 'react';
import logo from './logo.svg';
import './App.css';
import PersonalDetails from './components/Personal';
import AddressDetails from './components/Address';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (

    <Provider store={store}>
      <PersonalDetails />
      {/* <AddressDetails /> */}
    </Provider>

  );
}

export default App;
