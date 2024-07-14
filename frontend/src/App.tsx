import React from 'react';
import './App.css';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer';
import Loader from './components/Loader';

function App() {
  return (
    <div className="App">
      <Header />
      <div className='pl-4 pb-24 lg:space-y-24 lg:pl-16 bg-white'> {/* Margin after NavBar*/}
        <Loader />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
