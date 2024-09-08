import React, { useEffect, useState } from "react";
import { FaSquareFacebook } from "react-icons/fa6";
import {
  FaTwitter,
  FaInstagramSquare,
  FaPinterestSquare,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function SideBar() {
  const [categories, setCategories] = useState([]);

  const getAllCategories = async () => {
    const res = await fetch(
      "https://blog-app-api-node-mongodb.onrender.com/api/category"
    );
    const cat = await res.json();
    setCategories(cat);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <p className="text-center font-semibold p-2 border-t-2 border-b-2 border-gray-300">
        ABOUT ME
      </p>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHDvGtFaM6K4O58S1kMJ8G7PWyTvUj3rE5zw&s"
        alt=""
        className="w-[85%] mr-auto ml-auto mt-5"
      />
      <p className="text-justify px-5 mt-5 font-lora">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae
        provident qui obcaecati neque? Iure aperiam nobis odio alias! Dolores
      </p>
      <p className="text-center font-semibold p-2 mt-5 border-t-2 border-b-2 border-gray-300">
        CATEGORIES
      </p>
      <ul className="flex flex-wrap pl-12 pt-5 font-semibold">
        {categories.allCategories &&
          categories.allCategories.map((cat) => {
            return (
              <Link to={`/?cat=${cat.name}`} key={cat._id}>
                <li className="mr-[90px] hover:bg-gray-200 py-1 px-2">
                  {cat.name}
                </li>
              </Link>
            );
          })}
      </ul>
      <p className="text-center font-semibold p-2 mt-8 border-t-2 border-b-2 border-gray-300">
        FOLLOW US
      </p>
      <div className="flex items-center space-x-3 justify-center mt-5">
        <FaSquareFacebook className="text-black text-2xl hover:cursor-pointer" />
        <FaTwitter className="text-black text-2xl hover:cursor-pointer" />
        <FaInstagramSquare className="text-black text-2xl hover:cursor-pointer" />
        <FaPinterestSquare className="text-black text-2xl hover:cursor-pointer" />
      </div>
    </>
  );
}

export default SideBar;
