import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { UserContext } from "../context/UserContext";
import { FaBars, FaRegWindowClose } from "react-icons/fa";
import { GrBlog } from "react-icons/gr";

function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const [toggle, setToggle] = useState(false);

  const closeNav = () => {
    setToggle(false);
  };

  return (
    <div
      className={`phone:sticky md:fixed w-full top-0 font-josefin grid phone:grid-cols-1 lg:grid-cols-4 lg:p-2  md:bg-white z-50`}
    >
      <div className="font-lobster flex items-center text-3xl text-cyan-600 phone:bg-gray-300 lg:bg-white phone:py-2 lg:py-0">
        BlogHaven <GrBlog />
        <div className="grow"></div>
        <FaBars
          className={`${toggle ? "hidden" : "block"} sm:block lg:hidden`}
          onClick={() => setToggle(true)}
        />
        <FaRegWindowClose
          className={`${toggle ? "block" : "hidden"} sm:block lg:hidden`}
          onClick={() => setToggle(false)}
        />
      </div>
      <div
        className={`lg:col-span-2 flex flex-col space-y-2 lg:flex-row items-center space-x-5 justify-center phone:bg-gray-300 lg:bg-white ${
          toggle ? "flex" : "phone:hidden"
        } lg:flex`}
      >
        <NavLink
          to="/"
          onClick={closeNav}
          className="lg:text-2xl text-gray-400 hover:cursor-pointer phone:bg-yellow-200 lg:bg-white phone:w-[85%] lg:w-min text-center phone:p-1 lg:p-0 phone:rounded-lg phone:ml-[5%] lg:ml-0 lg:pt-1"
        >
          HOME
        </NavLink>
        <NavLink
          to="/about"
          onClick={closeNav}
          className="lg:text-2xl text-gray-400 hover:cursor-pointer phone:bg-yellow-200 lg:bg-white phone:w-[85%] lg:w-min text-center phone:p-1 lg:p-0 phone:rounded-lg"
        >
          ABOUT
        </NavLink>
        <NavLink
          to="/contact"
          onClick={closeNav}
          className="lg:text-2xl text-gray-400 hover:cursor-pointer phone:bg-yellow-200 lg:bg-white phone:w-[85%] lg:w-min text-center phone:p-1 lg:p-0 phone:rounded-lg"
        >
          CONTACT
        </NavLink>
        <NavLink
          to="/writePost"
          onClick={closeNav}
          className="lg:text-2xl text-gray-400 hover:cursor-pointer phone:bg-yellow-200 lg:bg-white phone:w-[85%] lg:w-min text-center phone:p-1 lg:p-0 phone:rounded-lg"
        >
          WRITE
        </NavLink>
        {user !== null && (
          <span
            className="lg:text-2xl text-gray-400 hover:cursor-pointer phone:bg-yellow-200 lg:bg-white phone:w-[85%] lg:w-min text-center phone:p-1 lg:p-0 phone:rounded-lg"
            onClick={() => setUser(null)}
          >
            LOGOUT
          </span>
        )}
      </div>
      <div
        className={`flex items-center space-x-5 justify-center phone:bg-gray-300 lg:bg-white phone:pt-4 lg:pt-0 ${
          toggle ? "flex" : "hidden"
        } lg:flex`}
      >
        {user == null ? (
          <>
            <NavLink
              to="/login"
              onClick={closeNav}
              className="lg:text-2xl text-gray-400 hover:cursor-pointer"
            >
              LOGIN
            </NavLink>
            <NavLink
              to="/register"
              onClick={closeNav}
              className="lg:text-2xl text-gray-400 hover:cursor-pointer"
            >
              REGISTER
            </NavLink>
          </>
        ) : (
          <>
            <Link to="/profile" onClick={closeNav}>
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
