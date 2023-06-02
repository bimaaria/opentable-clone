import * as React from "react";

interface Props {
  input: {
    firstName: string,
    lastName: string
    phone: string,
    city: string,
    email: string,
    password: string
  }
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void
  isSignIn: boolean
}

const AuthModalInput = ({ input, handleChangeInput, isSignIn }: Props) => {
  return (
    <div>
      {isSignIn ? null : (
        <div className="flex justify-between my-3 text-sm">
          <input 
            type="text" 
            className="w-full p-2 py-3 border rounded" 
            placeholder="First Name"
            value={input.firstName}
            onChange={handleChangeInput}
            name="firstName"
          />
        </div>
      )}
      {isSignIn ? null : (
        <div className="flex justify-between my-3 text-sm">
          <input 
            type="text" 
            className="w-full p-2 py-3 border rounded" 
            placeholder="Last Name" 
            value={input.lastName}
            onChange={handleChangeInput}
            name="lastName"
          />
        </div>
      )}
      {isSignIn ? null : (
        <div className="flex justify-between my-3 text-sm">
          <input 
            type="text" 
            className="w-full p-2 py-3 border rounded" 
            placeholder="Phone" 
            value={input.phone}
            onChange={handleChangeInput}
            name="phone"
          />
        </div>
      )}
      {isSignIn ? null : (
        <div className="flex justify-between my-3 text-sm">
          <input 
            type="text" 
            className="w-full p-2 py-3 border rounded" 
            placeholder="City" 
            value={input.city}
            onChange={handleChangeInput}
            name="city"
          />
        </div>
      )}
      <div className="flex justify-between my-3 text-sm">
        <input 
          type="email" 
          className="w-full p-2 py-3 border rounded" 
          placeholder="Email" 
          value={input.email}
          onChange={handleChangeInput}
          name="email"
        />
      </div>
      <div className="flex justify-between my-3 text-sm">
        <input 
          type="password" 
          className="w-full p-2 py-3 border rounded" 
          placeholder="Password" 
          value={input.password}
          onChange={handleChangeInput}
          name="password"
        />
      </div>
    </div>
  )
}

export default AuthModalInput
