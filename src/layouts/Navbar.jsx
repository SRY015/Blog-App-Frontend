import React, { useContext } from "react";
import { FaSquareFacebook } from "react-icons/fa6";
import {
  FaTwitter,
  FaInstagramSquare,
  FaPinterestSquare,
  FaSearch,
} from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { UserContext } from "../context/UserContext";

function Navbar() {
  const { user, setUser } = useContext(UserContext);
  console.log(user);
  return (
    <div
      className={`sticky top-0 font-josefin grid grid-cols-4 p-2 ${
        user == null && "py-4"
      } bg-white z-50`}
    >
      <div className="flex items-center space-x-3 justify-center">
        <FaSquareFacebook className="text-gray-400 text-3xl hover:cursor-pointer" />
        <FaTwitter className="text-gray-400 text-3xl hover:cursor-pointer" />
        <FaInstagramSquare className="text-gray-400 text-3xl hover:cursor-pointer" />
        <FaPinterestSquare className="text-gray-400 text-3xl hover:cursor-pointer" />
      </div>
      <div className="col-span-2 flex items-center space-x-5 justify-center">
        <NavLink to="/" className="text-2xl text-gray-400 hover:cursor-pointer">
          HOME
        </NavLink>
        <NavLink
          to="/about"
          className="text-2xl text-gray-400 hover:cursor-pointer"
        >
          ABOUT
        </NavLink>
        <NavLink
          to="/contact"
          className="text-2xl text-gray-400 hover:cursor-pointer"
        >
          CONTACT
        </NavLink>
        <NavLink
          to="/writePost"
          className="text-2xl text-gray-400 hover:cursor-pointer"
        >
          WRITE
        </NavLink>
        {user !== null && (
          <span
            className="text-2xl text-gray-400 hover:cursor-pointer"
            onClick={() => setUser(null)}
          >
            LOGOUT
          </span>
        )}
      </div>
      <div className="flex items-center space-x-5 justify-center">
        {user == null ? (
          <>
            <NavLink
              to="/login"
              className="text-2xl text-gray-400 hover:cursor-pointer"
            >
              LOGIN
            </NavLink>
            <NavLink
              to="/register"
              className="text-2xl text-gray-400 hover:cursor-pointer"
            >
              REGISTER
            </NavLink>
          </>
        ) : (
          <>
            <Link to="/profile">
              {user.profilePic ? (
                <img
                  src={user.profilePic}
                  alt="image loading ..."
                  className="h-12 w-12 rounded-full hover:cursor-pointer"
                />
              ) : (
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq2k2sI1nZyFTtoaKSXxeVzmAwIPchF4tjwg&s"
                  alt="image loading ..."
                  className="h-12 rounded-full hover:cursor-pointer"
                />
              )}
            </Link>
            <span className="text-2xl font-lobster font-semibold text-red-600">
              {user && user?.username}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
