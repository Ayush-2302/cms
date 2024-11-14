import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="text-center  mb-4 md:mb-0">
            <h2 className="text-2xl font-semibold">Car Management</h2>
            <p className="text-sm text-gray-400">
              © 2024 CompanyName. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
