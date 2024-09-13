import React from "react";

function HomeHeader() {
  return (
    <div className="">
      <p className="font-lobster font-semibold text-2xl text-center phone:text-purple-500 lg:text-gray-600 transform lg:translate-y-[35%] phone:translate-y-[160%]">
        React & Node
        <br />
        <span className="font-lobster font-extralight text-8xl">Blogs</span>
      </p>
      <img
        src="https://e0.pxfuel.com/wallpapers/970/337/desktop-wallpaper-forest-sun-path-pc-and-mac-jungle.jpg"
        alt=""
        className="w-full phone:h-[400px] lg:h-[650px]"
      />
    </div>
  );
}

export default HomeHeader;
