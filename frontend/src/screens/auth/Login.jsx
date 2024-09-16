import React from "react";
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";

const Login = () => {
  const nameRef = useRef(null);
  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus();
    }
  }, []);
  return (
    <>
      <div className=" flex flex-col gap-4 text-center">
        <input type="text" placeholder="Enter your name" ref={nameRef} />
        <input type="email" placeholder="Enter your email" />
        <input type="password" placeholder="Enter your password" />
        <button className=" border-2 border-black">Login</button>
        <Link to={"/"}>SignUp</Link>
      </div>
    </>
  );
};

export default Login;
