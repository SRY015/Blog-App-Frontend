import React, { useContext, useEffect, useState } from "react";
import SideBar from "./components/SideBar";
import axios from "axios";

import { GrUpdate } from "react-icons/gr";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Lightbox from "./components/Lightbox";

function Profile() {
  const { user, setUser, showSuccessToast, showErrorToast } =
    useContext(UserContext);
  const navigate = useNavigate();

  const [showLightbox, setShowLightbox] = useState(false);
  const [userSpecificBlog, setUserSpecificBlog] = useState([]);

  const handleShowLightbox = () => {
    setShowLightbox(!showLightbox);
  };

  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      userId: user?._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      try {
        const res = await axios.post(
          "https://blog-app-api-node-mongodb.onrender.com/api/image/",
          data
        );
        updatedUser.profilePic = res.data.image.url;
        updatedUser.cloudinary_id = res.data.image.cloudinary_id;
      } catch (error) {
        console.log(error.message);
      }
    }
    try {
      await axios.put(
        `https://blog-app-api-node-mongodb.onrender.com/api/user/${user?._id}`,
        updatedUser
      );
      const { password, ...other } = updatedUser;
      setUser(other);
      setPassword("");
      showSuccessToast("Profile has been updated !!");
    } catch (error) {
      console.log(error.message);
      showErrorToast("Something went wrong please try again later !!");
    }
  };

  const handleDeleteAccount = async (value) => {
    setShowLightbox(false);
    if (value) {
      try {
        await axios.delete(
          `https://blog-app-api-node-mongodb.onrender.com/api/user/${user?.email}`
        );
        showSuccessToast("Profile has been deleted !!");
        setUser(null);
      } catch (error) {
        console.log(error.message);
        showErrorToast("Something went wrong please try again later !!");
      }
    }
  };

  const fetchBlogs = async () => {
    const res = await fetch(
      `https://blog-app-api-node-mongodb.onrender.com/api/blog/?email=${user?.email}`
    );
    const blog = await res.json();
    setUserSpecificBlog(blog.blogs);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [user]);

  return (
    <>
      {showLightbox && <Lightbox onClose={handleDeleteAccount} />}
      <div
        className={`min-h-screen w-[95%] mr-auto ml-auto grid phone:grid-cols-1 lg:grid-cols-5 py-5 ${
          showLightbox && "fixed opacity-50"
        }`}
      >
        <div className="lg:col-span-4">
          <div className="flex lg:px-10 text-red-600">
            <p className="lg:text-4xl font-lora">Update Your Account</p>
            <div className="grow"></div>
            <span
              className="lg:text-2xl font-lora cursor-pointer hover:bg-red-100 p-2 rounded-md"
              onClick={handleShowLightbox}
            >
              Delete Accout
            </span>
          </div>
          <form className="px-10 relative mt-10" onSubmit={handleSubmit}>
            {file ? (
              <img
                src={URL.createObjectURL(file)}
                alt=""
                className="rounded-full h-[150px] w-[150px]"
              />
            ) : (
              <img
                src={
                  user?.profilePic ||
                  `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq2k2sI1nZyFTtoaKSXxeVzmAwIPchF4tjwg&s`
                }
                alt="image not supported ..."
                className="rounded-full h-[150px] w-[150px] border-2"
              />
            )}
            <label htmlFor="profilePic">
              <div className="">
                <GrUpdate className="absolute top-32 font-bold left-[135px] cursor-pointer text-2xl" />
              </div>
            </label>
            <input
              type="file"
              name="profilePic"
              id="profilePic"
              className="hidden"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
            <br />
            <label htmlFor="name" className="text-2xl font-lora">
              Username :
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={username}
              className="w-full focus:outline-none outline-none border-b-2 px-2 py-3"
              onChange={(e) => setUsername(e.target.value)}
            />{" "}
            <br />
            <br />
            <label htmlFor="email" className="text-2xl font-lora">
              Email :
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder={email}
              readOnly
              className="w-full focus:outline-none outline-none border-b-2 px-2 py-3"
            />{" "}
            <br />
            <br />
            <label htmlFor="password" className="text-2xl font-lora">
              Password :
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="*************"
              className="w-full focus:outline-none outline-none border-b-2 px-2 py-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />{" "}
            <br />
            <br />
            <button
              type="submit"
              className="bg-teal-600 px-10 py-2 text-white font-semibold rounded-lg block mr-auto ml-auto hover:bg-teal-500 phone:mb-5 lg:mb-0"
            >
              Update
            </button>
          </form>
        </div>
        <div>
          <SideBar />
        </div>
        <ToastContainer />
      </div>
      <div className={`${showLightbox && "hidden"}`}>
        <p className="text-center lg:-mt-5 font-bold phone:text-2xl lg:text-4xl font-josefin underline bg-gradient-to-r from-blue-600 to-red-600 text-transparent bg-clip-text">
          Blogs Uploaded By You
        </p>
        <div className="grid phone:grid-cols-1 lg:grid-cols-5 p-10 gap-5">
          {userSpecificBlog &&
            userSpecificBlog.map((blog) => {
              return (
                <div
                  onClick={() => {
                    window.location.replace(`post/${blog.blogId}`);
                  }}
                  key={blog._id}
                  className="shadow-2xl hover:cursor-pointer p-3 hover:scale-105 duration-150 hover:shadow-black border-2 border-gray-300 rounded-md bg-slate-100"
                >
                  <img
                    src={blog.photo}
                    alt="image loading..."
                    className="h-40 w-full"
                  />
                  <p className="text-center font-bold font-sans mt-2 opacity-50">
                    {new Date(blog.createdAt).toDateString()}
                  </p>
                  <p className="text-center text-[20px] font-semibold font-josefin mt-2">
                    {blog.title}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Profile;
