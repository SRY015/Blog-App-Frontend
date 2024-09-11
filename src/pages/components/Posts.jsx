import React from "react";
import PostCard from "./PostCard";
import SideBar from "./SideBar";

function Posts({ blogs }) {
  return (
    <div className="grid grid-cols-5">
      {/* Posts-- */}
      <div className="col-span-4 grid md:grid-cols-2 lg:grid-cols-4 gap-5 p-10">
        {blogs &&
          blogs.map((blog) => {
            return <PostCard key={blog._id} blog={blog} />;
          })}
      </div>
      {/* SideBar-- */}
      <div className="p-2 bg-slate-50">
        <SideBar />
      </div>
    </div>
  );
}

export default Posts;
