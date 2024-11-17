import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SnackbarContextType {
  message: string;
  isOpen: boolean;
  showSnackbar: (message: string) => void;
  hideSnackbar: () => void;
}

export const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

const SnackbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const showSnackbar = (msg: string) => {
    setMessage(msg);
    setIsOpen(true);
  };

  const hideSnackbar = () => {
    setIsOpen(false);
    setMessage('');
  };

  return (
    <SnackbarContext.Provider value={{ message, isOpen, showSnackbar, hideSnackbar }}>
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

export default SnackbarProvider
