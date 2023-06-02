"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AuthModalInput from "./AuthModalInput";

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
  const [open, setOpen] = React.useState(false);
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

  const renderContent = (signInContent: string, signUpContent: string) => {
    return isSignIn ? signInContent : signUpContent
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div>
      <button 
        type="button" 
        className={`
          ${renderContent("mr-3 text-white bg-blue-400", "")} p-1 px-4 border rounded` 
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
          <div className="p-2">
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
              <button className="w-full p-3 mb-5 text-sm text-white uppercase bg-red-600 rounded disabled:bg-gray-400">
                {renderContent("Sign In", "Create Account")}
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default AuthModal;
