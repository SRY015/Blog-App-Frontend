import React from "react";
import { Link } from "react-router-dom";

function PostCard({ blog }) {
  return (
    <Link
      to={`post/${blog._id}`}
      className="p-3 shadow-2xl hover:cursor-pointer h-min hover:scale-105 duration-150 hover:shadow-black border-2 border-gray-300 rounded-md"
    >
      <img src={blog.photo} alt="" className="w-full h-32" />
      <p className="text-center font-bold opacity-35 mt-2 font-lora">
        {blog.category}
      </p>
      <p className="text-center text-[20px] font-semibold font-josefin line-clamp-1">
        {blog.title}
      </p>
      <p className="text-center font-bold font-sans opacity-50">
        {new Date(blog.createdAt).toDateString()}
      </p>
      <p className="mt-1 text-[15px] text-justify line-clamp-1">
        {blog.description}
      </p>
    </Link>
  );
}

export default PostCard;
