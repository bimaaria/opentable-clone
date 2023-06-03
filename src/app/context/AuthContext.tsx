"use client";

import React, { useState, createContext, useEffect } from "react";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  phone: string;
}

interface State {
  data: User | null;
  error: string | null;
  loading: boolean;
}

interface AuthState extends State {
  setAuthState: React.Dispatch<React.SetStateAction<State>>
}

export const AuthenticationContext = createContext<AuthState>({
  data: null,
  error: null,
  loading: false,
  setAuthState: () => {}
})

const AuthContext = ({ 
  children 
}: { 
  children: React.ReactNode 
}) => {
  const [authState, setAuthState] = useState<State>({
    data: null,
    error: null,
    loading: false
  });

  return (
    <AuthenticationContext.Provider 
      value={{
        ...authState,
        setAuthState
      }}
    >
      {children}
    </AuthenticationContext.Provider>)
}

export default AuthContext;
