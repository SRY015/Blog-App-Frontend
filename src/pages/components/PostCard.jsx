import React from "react";
import { Link } from "react-router-dom";

function PostCard({ blog }) {
  return (
    <Link
      to={`post/${blog._id}`}
      className="p-5 shadow-2xl hover:cursor-pointer h-[450px] hover:scale-105 duration-150 hover:shadow-black border-2 border-gray-300 rounded-md"
    >
      <img src={blog.photo} alt="" className="w-full h-52" />
      <p className="text-center font-bold opacity-35 mt-2 font-lora">
        {blog.category}
      </p>
      <p className="text-center text-[20px] font-semibold font-josefin mt-3">
        {blog.title}
      </p>
      <p className="text-center font-bold font-sans mt-2 opacity-50">
        {new Date(blog.createdAt).toDateString()}
      </p>
      <p className="mt-3 text-[15px] font-semibold text-justify line-clamp-3">
        {blog.description}
      </p>
    </Link>
  );
}

export default PostCard;
