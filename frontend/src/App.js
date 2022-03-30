import React from 'react';
import Header from './components/Header';
import Repositories from './components/Repositories';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Repositories />
      <Footer />
    </div>
  );
}

export default App;
