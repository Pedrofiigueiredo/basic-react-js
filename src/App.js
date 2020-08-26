import React from 'react';
import Routes from './routes';

import Header from './components/Header';
import Main from './pages/Main';

import './assets/styles/global.css';

function App() {
  return (
    <div className="app">
      <Header />
      <Routes />
    </div>

  );
}

export default App;
