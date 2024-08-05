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
import Login from './components/Login';
import Register from './components/Register';
import Account from './pages/Account';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Header />
      <div className=' pt-[72px] pb-24 lg:space-y-24 lg:pl-10 bg-white'> {/* Margin after NavBar*/}
        <Loader />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/account' element={<Account />} />
          <Route path='/store' element={<Home />} />
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
