"use client";

import * as React from "react";
import axios from "axios";
import { getCookie } from "cookies-next";

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

export const AuthenticationContext = React.createContext<AuthState>({
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
  const [authState, setAuthState] = React.useState<State>({
    data: null,
    error: null,
    loading: false
  });

  const fetchUser = async () => {
    setAuthState({ data: null, error: null, loading: true });
    try {
      const jwt = getCookie("jwt");

      if(!jwt) {
        setAuthState({ data: null, error: null, loading: false });
      }

      const response = await axios.get("http://localhost:3000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      })
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      setAuthState({ data: response.data, error: null, loading: false });
    } catch (error: any) {
      setAuthState({ data: null, error: error.response.data.errorMessage, loading: false });
    }
  }

  React.useEffect(() => {
    fetchUser();
  }, []);
  

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
