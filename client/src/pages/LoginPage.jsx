import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/login", {
        email,
        password,
      });
      setUser(data);
      alert("Login successful!!!");
      setRedirect(true);
    } catch (error) {
      alert(`${error}`);
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="mt-32 text-center">
      <h1 className="text-4xl mb-8">Login</h1>
      <form className="max-w-md mx-auto" onSubmit={handleLogin}>
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
        <button className="primary">Login</button>
        <div className="py-2 font-semibold text-sm text-gray-600">
          don't have an account yet?{" "}
          <Link to={"/register"} className="underline text-primary">
            Register Now!
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
