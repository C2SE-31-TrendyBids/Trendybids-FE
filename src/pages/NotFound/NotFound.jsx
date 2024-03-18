import React from "react";

const NotFound = () => {
  return (
    <div className="">
      <div className="max-w-[1200px]   flex items-center mx-32 my-40">
        <div className="container flex flex-row items-center justify-between px-10 text-gray-700">
          <div className="w-full lg:w-1/2 mx-8">
            <div className="text-9xl tracking-widest text-blue-500 font-dark font-extrabold mb-8">
              {" "}
              404
            </div>
            <p className="text-2xl md:text-3xl font-bold leading-normal mb-8">
              Oops, This Page Could Not Be Found!
            </p>

            <a
              href="/"
              className="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-blue-600 active:bg-red-600 hover:bg-red-700"
            >
              Back To Home Page
            </a>
          </div>
          <div className="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
            <img
              src="https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg"
              className=""
              alt="Page not found"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
