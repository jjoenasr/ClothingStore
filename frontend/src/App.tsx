import React from 'react';
import './App.css';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer';
import Loader from './components/Loader';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ProductView from './pages/ProductView';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import ProtectedRoute from './components/ProtectedRoute';
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <div className='pb-24 bg-white overflow-x-hidden'>
        <Loader />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/account' element={<ProtectedRoute><Account /></ProtectedRoute>} />
          <Route path='/store' element={<Navigate to="/" />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/:category_slug/:product_slug/" element={<ProductView/>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
