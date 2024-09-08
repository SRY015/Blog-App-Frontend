import React, { useEffect, useState } from "react";
import HomeHeader from "./components/HomeHeader";
import Posts from "./components/Posts";
import { useLocation } from "react-router-dom";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const { search } = useLocation();

  const fetchBlogs = async () => {
    const res = await fetch(
      `https://blog-app-api-node-mongodb.onrender.com/api/blog/${search}`
    );
    const blogs = await res.json();
    setBlogs(blogs);
  };

  useEffect(() => {
    fetchBlogs();
  }, [search]);

  return (
    <div className="">
      <HomeHeader />
      <Posts blogs={blogs.blogs} />
    </div>
  );
}

export default Home;
