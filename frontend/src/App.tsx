import React from 'react';
import './App.css';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer';
import Loader from './components/Loader';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Product from './pages/Product';
import Login from './components/Login';
import Register from './components/Register';
import Account from './pages/Account';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Header />
      <div className='pl-4 pt-4 pb-24 lg:space-y-24 lg:pl-16 bg-white'> {/* Margin after NavBar*/}
        <Loader />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/account' element={<Account />} />
          <Route path='/store' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/:category_slug/:product_slug/" element={<Product/>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
