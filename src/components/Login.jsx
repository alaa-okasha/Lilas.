import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/Confij.jsx";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handelLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password) 
      .then(() => {
        setSuccessMsg(
          "Login successful, you will be redirected to the Home page"
        );
        setEmail("");
        setPassword("");
        setErrorMsg("");
        setTimeout(() => {
          setSuccessMsg("");
          navigate("/");
        }, 3000);
      })
      .catch((error) => setErrorMsg(error.message));
  };
  return (
    <div className="container flex flex-col px-4 sm:px-8 md:px-16 lg:px-24 xl:px-60 py-14 font-poppins">
      <div className="font-poppins text-3xl">
        <p>Login</p>
      </div>
      {successMsg && <div className="text-green-700">{successMsg}</div>}
      <div>
        <form
          action=""
          className="flex flex-col space-y-2"
          autoComplete="off"
          onSubmit={handelLogin}
        >
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 rounded-md mt-8 border-2 border-solid border-gray-400"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 rounded-md mt-8 border-2 border-solid border-gray-400"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="mb-4 sm:mb-0">
              <span className="mr-1">Don't have an account? Sign Up</span>
              <Link to="/signup">
                <span className="text-blue-500">Here</span>
              </Link>
            </div>
            <button
              type="submit"
              className="py-2 px-4 bg-green-700 text-white rounded-md"
            >
              Login
            </button>
          </div>
        </form>
        {errorMsg && <div className="text-red-700">{errorMsg}</div>}
      </div>
    </div>
  );
}

export default Login;
