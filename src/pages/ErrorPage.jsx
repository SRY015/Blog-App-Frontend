import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="flex flex-col items-center">
      <img
        src="https://cdn.svgator.com/images/2024/04/electrocuted-caveman-animation-404-error-page.gif"
        alt=""
        className="mr-auto ml-auto"
      />
      <p className="text-2xl text-green-600 font-lora font-bold -mt-28">
        404 Error : Page Not Found !!
      </p>
      <Link
        to="/"
        className="bg-green-600 hover:bg-green-500 mt-5 px-10 py-2 rounded-lg text-white font-bold"
      >
        Go To Home
      </Link>
    </div>
  );
}

export default ErrorPage;
