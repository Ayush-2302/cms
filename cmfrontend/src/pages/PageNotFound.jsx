import React from "react";
import { Link } from "react-router-dom"; // Importing Link if you're using React Router for navigation

const PageNotFound = () => {
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full sm:w-10/12 md:w-1/2 p-6 bg-white rounded-xl shadow-lg text-center">
        <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
        <p className="text-2xl text-gray-700 mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-block py-2 px-4 bg-teal-700 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
