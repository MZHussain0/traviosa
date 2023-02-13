import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="mt-32 text-center">
      <h1 className="text-4xl mb-8">Login</h1>
      <form className="max-w-md mx-auto ">
        <input type="email" placeholder="your@mail.com" />
        <input type="password" placeholder="your password" />
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
