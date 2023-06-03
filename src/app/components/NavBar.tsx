"use client";

import Link from "next/link";
import AuthModal from "./AuthModal";
import * as React from "react";
import { AuthenticationContext } from "../context/AuthContext";
import useAuth from "../../../hooks/useAuth";

const NavBar = () => {
  const { data, loading } = React.useContext(AuthenticationContext);
  const { signout } = useAuth();

  return (
    <nav className="flex justify-between p-2 bg-white">
      <Link href="/" className="text-2xl font-bold text-gray-700">OpenTable</Link>
      <div>
        {loading ? (
          null
        ) : (
          <div className="flex">
            {data ? (
              <button 
                className="p-1 px-4 mr-3 text-white bg-blue-400 border rounded"
                onClick={signout} 
              >
                Sign out
              </button>
            ): (
              <>
                <AuthModal isSignIn={true} />
                <AuthModal isSignIn={false} />
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default NavBar
