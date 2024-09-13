import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [err, setErr] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://blog-app-api-node-mongodb.onrender.com/api/auth/register",
        {
          username,
          email,
          password,
        }
      );
      res.data && window.location.replace("/login");
    } catch (error) {
      setErr(error.message);
      setTimeout(() => {
        setErr(false);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1654481414716-2f4ab5fe0fbe?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVuJTIwYW5kJTIwcGFwZXJ8ZW58MHx8MHx8fDA%3D')] bg-no-repeat bg-cover flex items-center">
      <form
        action=""
        className=" border-4 border-black phone:w-[90%] lg:w-[30%] mr-auto ml-auto text-center p-5 shadow-2xl shadow-slate-400 rounded-lg bg-opacity-60 bg-slate-400"
        onSubmit={handleSubmit}
      >
        <p className="font-lobster text-6xl mb-5 text-black">Register</p>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter your username..."
          className="bg-transparent focus:outline-none border-b-2 border-black w-[80%] px-2 py-3 text-2xl text-black font-lobster placeholder-gray-700"
          onChange={(e) => setUsername(e.target.value)}
        />{" "}
        <br /> <br />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email..."
          className="bg-transparent focus:outline-none border-b-2 border-black w-[80%] px-2 py-3 text-2xl text-black font-lobster placeholder-gray-700"
          onChange={(e) => setEmail(e.target.value)}
        />{" "}
        <br /> <br />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="*************"
          className="bg-transparent focus:outline-none border-b-2 border-black w-[80%] px-2 py-3 text-2xl text-black placeholder-gray-700"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="text-white font-bold px-10 py-2 bg-teal-500 mt-10 rounded-lg hover:bg-teal-700"
          type="submit"
        >
          Register
        </button>
        <br />
        {err && (
          <span className="text-red-600 font-semibold">
            Something went wrong, Please try again later !!
          </span>
        )}
        <p className="mt-5 text-black">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-blue-600 underline cursor-pointer"
          >
            Please Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
