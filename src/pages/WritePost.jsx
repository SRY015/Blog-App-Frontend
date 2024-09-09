import React, { useContext, useEffect, useState } from "react";
import { MdOutlineAdd } from "react-icons/md";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axios from "axios";

function WritePost() {
  const navigate = useNavigate();
  const { user, showErrorToast } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBlog = {
      email: user.email,
      title,
      description,
      category,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      // newBlog.photo = filename;
      try {
        const res = await axios.post(
          "https://blog-app-api-node-mongodb.onrender.com/api/image/",
          data
        );
        //console.log(res.data);
        newBlog.photo = res.data.image.url;
        newBlog.cloudinary_id = res.data.image.cloudinary_id;
      } catch (error) {
        showErrorToast("Photo did not uploaded !!");
      }
    } else {
      showErrorToast("Please upload photo for your blog !!");
    }
    try {
      const res = await axios.post(
        "https://blog-app-api-node-mongodb.onrender.com/api/blog/create",
        newBlog
      );
      console.log(res.data);
      window.location.replace(`post/${res.data.blog._id}`);
    } catch (error) {}
  };

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  });

  return (
    <div className="px-5 min-h-screen w-11/12 mr-auto ml-auto py-10">
      {file && (
        <img
          src={URL.createObjectURL(file)}
          alt="Image is loading ..."
          className="w-full h-[350px] rounded-lg mb-5 "
        />
      )}
      <form action="" onSubmit={handleSubmit}>
        <div className="flex items-center">
          <label
            htmlFor="fileInput"
            className="border-4 rounded-full  border-gray-500 mr-5"
          >
            <MdOutlineAdd className="inline-block text-3xl text-gray-500 cursor-pointer font-extrabold" />
          </label>
          <input
            type="file"
            name="photo"
            id="fileInput"
            className="hidden"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <select
            name="category"
            id="category"
            className="w-[20%] text-center p-2 focus:outline-none block mx-10"
            required
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Select category"
          >
            <option value="select">---Select Category---</option>
            <option value="nature">Nature</option>
            <option value="music">Music</option>
            <option value="game">Game</option>
            <option value="news">News</option>
          </select>
          <input
            type="text"
            placeholder="Write the title of your story ..."
            className="focus:outline-none px-5 py-2 text-4xl w-[80%]"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mt-5">
          <textarea
            type="text"
            name="desc"
            id=""
            placeholder="Tell your story ..."
            className="p-10 text-2xl w-full text-black focus:outline-none resize-none"
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <button
            type="submit"
            className="bg-sky-600 p-2 text-white text-2xl font-semibold rounded-lg block ml-auto mt-10 hover:bg-sky-800"
          >
            Publish
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default WritePost;
