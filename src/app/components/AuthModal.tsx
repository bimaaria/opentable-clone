"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AuthModalInput from "./AuthModalInput";
import useAuth from "../../../hooks/useAuth";
import { AuthenticationContext } from "../context/AuthContext";
import { Alert, CircularProgress } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const AuthModal = ({ isSignIn }: { isSignIn: boolean }) => {
  const { data, error, loading, setAuthState } = React.useContext(AuthenticationContext)
  const [open, setOpen] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true)
  const [input, setInput] = React.useState({
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    email: "",
    password: ""
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { signin, signup } = useAuth()

  React.useEffect(() => {
    if(isSignIn) {
      if(input.email && input.password) {
        return setDisabled(false)
      }
    } else {
      if(
        input.firstName && 
        input.lastName && 
        input.phone && 
        input.city && 
        input.email && 
        input.password
      ) {
        return setDisabled(false)
      }
    }

    setDisabled(true)
  }, [input]);

  const renderContent = (signInContent: string, signUpContent: string) => {
    return isSignIn ? signInContent : signUpContent
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const handleAuth = () => {
    if(isSignIn) {
      signin({ email: input.email, password: input.password }, handleClose);
    } else {
      signup(input, handleClose);
    }
  }

  return (
    <div>
      <button 
        type="button" 
        className={`
          ${renderContent("mr-3 text-white bg-blue-400", "mr-5")} p-1 px-4 border rounded` 
        }
        onClick={handleOpen}
      >
        {renderContent("Sign in", "Sign up")}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loading ? (
            <div className="flex justify-center px-2 py-24">
              <CircularProgress />
            </div>
          ) : (
            <div className="p-2">
              {error ? (
                <Alert severity="error" className="mb-4">{error}</Alert>
              ): 
                null
              }
              <div className="pb-2 mb-2 font-bold text-center uppercase border-b">
                <p className="text-sm">
                  {renderContent("Sign in", "Create Account")}
                </p>
              </div>
              <div className="m-auto">
                <h2 className="text-2xl font-light text-center">
                  {renderContent("Log Into Your Account", "Create your OpenTable account")}
                </h2>
                <AuthModalInput 
                  input={input} 
                  handleChangeInput={handleChangeInput} 
                  isSignIn={isSignIn} 
                />
                <button 
                  className="w-full p-3 mb-5 text-sm text-white uppercase bg-red-600 rounded disabled:bg-gray-400"
                  disabled={disabled}
                  onClick={handleAuth}
                >
                  {renderContent("Sign In", "Create Account")}
                </button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default AuthModal;
