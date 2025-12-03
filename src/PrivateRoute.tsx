/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from './redux/hooks';

interface PrivateRouteProps {
  children: React.ReactNode; // This will allow the component to wrap other components as children
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { data, isLoading }:any = useAppSelector((state) => state.auth); // Accessing auth state
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !data?.data?.email) {
      // If the user is not an admin, navigate to the login page
      navigate('/');
    }
  }, [data, isLoading, navigate]);

  if (isLoading) {
    // Optionally render a loading state while redirecting
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
