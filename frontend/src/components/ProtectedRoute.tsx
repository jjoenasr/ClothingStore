import React, { useEffect, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../contexts/StoreContext';

const ProtectedRoute = ({ children }: {children: ReactNode}) => {
    const {state} = useStore()
    const router = useNavigate();
    const isAuthenticated = state.isAuthenticated
    useEffect(() => {
      if (!isAuthenticated) {
        // Redirect to login page if not authenticated
        router('/login');
      }
    }, [isAuthenticated, router]);
    
    return <>{children}</>;;
  };

export default ProtectedRoute
