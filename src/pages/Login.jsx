import React, { useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { ToastContainer } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  const { user, setUser, showErrorToast } = useContext(UserContext);

  const handleSubmit = async (e) => {
    console.log("Submitted !");
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://blog-app-api-node-mongodb.onrender.com/api/auth/login",
        {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }
      );
      console.log(res.data);
      setUser(res.data.user);
      navigate("/");
    } catch (error) {
      console.log(error.message);
      showErrorToast("Invalid email or password !!");
    }
  };

  useEffect(() => {
    if (user !== null) {
      navigate("/");
    }
  }, []);

  {
    return (
      <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1654481414716-2f4ab5fe0fbe?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVuJTIwYW5kJTIwcGFwZXJ8ZW58MHx8MHx8fDA%3D')] bg-no-repeat bg-cover flex items-center">
        <form
          onSubmit={handleSubmit}
          action=""
          className="border-4 border-black phone:w-[90%] lg:w-[30%] mr-auto ml-auto text-center p-5 shadow-2xl shadow-teal-700 rounded-lg"
        >
          <p className="font-lobster text-6xl mb-5 text-black">Login</p>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email..."
            className="bg-transparent focus:outline-none border-b-2 border-black w-[80%] px-2 py-3 text-2xl text-black font-lobster placeholder-gray-700"
            ref={emailRef}
          />{" "}
          <br /> <br />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="*************"
            className="bg-transparent focus:outline-none border-b-2 border-black w-[80%] px-2 py-3 text-2xl text-black placeholder-gray-700"
            ref={passwordRef}
          />
          <button
            type="submit"
            className="text-white font-bold px-10 py-2 bg-teal-500 mt-10 rounded-lg hover:bg-teal-700"
          >
            Login
          </button>
          <p className="mt-5 text-black">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-blue-600 underline cursor-pointer"
            >
              Register here
            </Link>
          </p>
        </form>
        <ToastContainer />
      </div>
    );
  }
}

export default Login;
