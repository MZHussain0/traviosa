import React from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="mt-32 text-center">
      <h1 className="text-4xl mb-8">Register</h1>
      <form className="max-w-md mx-auto ">
        <input type="text" placeholder="John Doe" />
        <input type="email" placeholder="your@mail.com" />
        <input type="password" placeholder="your password" />
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
