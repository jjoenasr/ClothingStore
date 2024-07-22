import React from 'react'
import { Route, Navigate } from 'react-router-dom';
import { useStore } from '../contexts/StoreContext';

const ProtectedRoute = ({ children }: {children: any}) => {
    const {state} = useStore()
    const isAuthenticated = state.isAuthenticated
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
  
    return children;
  };

export default ProtectedRoute
