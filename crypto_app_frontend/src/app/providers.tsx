'use client';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import store from '@/app/store/store';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      {children}
    </ReduxProvider>
  );
};

export default Providers;
