import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../config/Confij.jsx";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth"; 
import { doc, setDoc } from "firebase/firestore"; 

function Signup() {
      const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handelSignUp = (e) => {
    e.preventDefault();

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
          const user = userCredential.user;

          
          const userRef = doc(db, "users", user.uid); 

          setDoc(userRef, {
            FullName: fullName,
            Email: email,
            Password: password, 
          })
            .then(() => {
              setSuccessMsg("Signed up successfully, you will be redirected to the Login page");
              setFullName("");
              setEmail("");
              setPassword("");
              setErrorMsg("");
              setTimeout(() => {
                setSuccessMsg("");
                navigate("/login"); 
              }, 3000);
            })
            .catch((error) => setErrorMsg(error.message));
        })
        .catch((error) => {
          setErrorMsg(error.message);
        });

  };
  return (
    <div className="container flex flex-col px-4 md:px-10 lg:px-20 xl:px-60 py-14 font-poppins">
      <div className="font-poppins text-3xl">
        <p>Sign Up</p>
      </div>
      {successMsg && <div className="text-green-700">{successMsg}</div>}
      <div>
        <form
          action=""
          className="flex flex-col space-y-2"
          autoComplete="off"
          onSubmit={handelSignUp}
        >
          <div>
            <input
              type="text"
              placeholder="full name"
              className="w-full p-2 rounded-md mt-8 border-2 border-solid border-gray-400"
              required
              onChange={(e) => {
                setFullName(e.target.value);
              }}
              value={fullName}
            />
          </div>
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
              placeholder="password"
              className="w-full p-2 rounded-md mt-8 border-2 border-solid border-gray-400"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-4 md:mb-0">
              <span className="mr-1">Already have an account? Login</span>
              <Link to="/login">
                <span className="text-blue-500">Here</span>
              </Link>
            </div>
            <button
              type="submit"
              className="py-2 px-4 bg-green-700 text-white rounded-md"
            >
              SIGN UP
            </button>
          </div>
        </form>
        {errorMsg && <div className="text-red-700">{errorMsg}</div>}
      </div>
    </div>
  );
}

export default Signup;
