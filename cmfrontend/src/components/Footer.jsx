import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left section: Company Name */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-2xl font-semibold">CompanyName</h2>
            <p className="text-sm text-gray-400">
              © 2024 CompanyName. All Rights Reserved.
            </p>
          </div>

          {/* Middle section: Links */}
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
            <a href="/" className="text-gray-300 hover:text-white">
              Home
            </a>
            <a href="/about" className="text-gray-300 hover:text-white">
              About Us
            </a>
            <a href="/services" className="text-gray-300 hover:text-white">
              Services
            </a>
            <a href="/contact" className="text-gray-300 hover:text-white">
              Contact
            </a>
          </div>

          {/* Right section: Social Media Icons */}
          <div className="flex justify-center space-x-6 mt-4 md:mt-0">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white"
            >
              <i className="fab fa-facebook-f"></i>{" "}
              {/* You can use icons from FontAwesome */}
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
