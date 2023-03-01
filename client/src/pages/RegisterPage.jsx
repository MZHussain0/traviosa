import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("account created. Heading to login page... press OK");
    } catch (error) {
      alert("registration failed!!!");
    }
  };
  return (
    <div className="mt-32 text-center">
      <h1 className="text-4xl mb-8">Register</h1>
      <form className="max-w-md mx-auto" onSubmit={registerUser}>
        <input
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="your@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="primary">Register</button>
        <div className="py-2 font-semibold text-sm text-gray-600">
          Already a member?{" "}
          <Link to={"/login"} className="underline text-primary">
            Login!
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
