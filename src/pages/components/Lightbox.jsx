import React from "react";

function Lightbox({ onClose }) {
  return (
    <div className="w-auto h-auto left-[20%] top-[20%] bg-white z-10 absolute ml-[20%]  rounded-lg shadow-2xl shadow-zinc-800 p-5">
      <img
        src="https://app.tryzulu.com/assets/static/images/delete-gif-dark-mode.gif"
        alt=""
        className="w-60 h-52"
      />
      <p className="text-center text-2xl font-bold font-josefin -mt-5">
        Are you sure ?
      </p>
      <div className="flex mt-4">
        <button
          className="py-2 px-5 bg-red-500 rounded-lg text-white font-bold ml-2"
          onClick={() => onClose(true)}
        >
          Delete
        </button>
        <div className="grow"></div>
        <button
          className="py-2 px-5 bg-blue-500 rounded-lg text-white font-bold mr-2"
          onClick={() => onClose(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Lightbox;
