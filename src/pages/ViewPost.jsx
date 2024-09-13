import React, { useContext, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import SideBar from "./components/SideBar";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { ToastContainer } from "react-toastify";

function ViewPost() {
  const [blog, setBlog] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  const { user, showErrorToast, showSuccessToast } = useContext(UserContext);

  const { postId } = useParams();

  // const PF = "https://blog-app-api-node-mongodb.onrender.com/Images/";

  const getBlogDetails = async () => {
    const res = await fetch(
      `https://blog-app-api-node-mongodb.onrender.com/api/blog/${postId}`
    );
    const blogs = await res.json();
    // console.log(blogs);
    setBlog(blogs);
    setTitle(blogs.blog.title);
    setDescription(blogs.blog.description);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://blog-app-api-node-mongodb.onrender.com/api/blog/${postId}`,
        {
          data: { email: user?.email },
        }
      );
      window.location.replace("/");
    } catch (error) {
      // console.log(error.message);
      showErrorToast("Something went wrong, please try again later !!");
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `https://blog-app-api-node-mongodb.onrender.com/api/blog/${postId}`,
        {
          title,
          description,
          email: user?.email,
        }
      );
      getBlogDetails();
      showSuccessToast("Blog has been updated ...");
      setUpdateMode(false);
    } catch (error) {
      console.log(error.message);
      showErrorToast("Something went wrong, please try again later !!");
    }
  };

  useEffect(() => {
    getBlogDetails();
  }, []);

  return (
    <div className="grid phone:grid-cols-1 lg:grid-cols-5 lg:pt-16">
      {/* Post-- */}
      <div className="col-span-4 py-5">
        <img
          src={blog?.blog?.photo}
          alt="Image is loading..."
          className="w-full phone:h-[250px] lg:h-[400px] pr-5 pl-5 rounded-xl"
        />
        <div className="flex mt-2 px-5">
          {updateMode ? (
            <input
              className="text-center text-gray-400 font-lora font-semibold text-3xl w-[85%] focus:outline-none border-b-2 py-2"
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <p className="text-center font-lora font-semibold text-3xl">
              {blog && blog?.blog?.title}
            </p>
          )}
          <div className="grow"></div>
          {blog?.blog?.email === user?.email && (
            <span className="text-3xl">
              <FaEdit
                className="cursor-pointer mr-3 inline-block text-blue-600 phone:text-[20px] lg:text-[30px]"
                onClick={() => setUpdateMode(true)}
              />
              <MdDelete
                className="cursor-pointer inline-block text-red-600 phone:text-[20px] lg:text-[30px]"
                onClick={handleDelete}
              />
            </span>
          )}
        </div>
        <div className="flex mt-2 px-5 font-extrabold font-josefin opacity-70 text-orange-600">
          <Link
            to={`/?user=${blog?.blog?.email}`}
            className="phone:text-[12px]"
          >
            Author : {blog && blog?.blog?.email}
          </Link>
          <div className="grow"></div>
          <span className="phone:text-[12px]">
            {blog && new Date(blog?.blog?.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name=""
            id=""
            rows="3"
            className="font-josefin text-justify mx-5 mt-2 first-letter:text-3xl first-letter:font-extrabold w-[95%] text-gray-400 p-2 outline-none border-b-2 resize-none"
          />
        ) : (
          <p className="font-josefin text-justify px-5 mt-2 first-letter:text-3xl first-letter:font-extrabold">
            {blog && blog?.blog?.description}
          </p>
        )}
        {updateMode && (
          <button
            className="bg-teal-700 mt-3 ml-auto block mr-10 px-10 py-2 rounded-lg text-white font-bold hover:bg-teal-500"
            onClick={handleUpdate}
          >
            Update
          </button>
        )}
      </div>
      {/* SideBar-- */}
      <div className="p-5 bg-slate-50">
        <SideBar />
      </div>
      <ToastContainer />
    </div>
  );
}

export default ViewPost;
