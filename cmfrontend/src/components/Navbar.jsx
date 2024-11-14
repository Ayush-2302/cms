import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "My Cars", path: "/cars" },
    { name: "Add New Car", path: "/new-car" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success(" Logout successfully !! ");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav className=" bg-[#242424] z-50 sticky top-0 shadow-lg p-4 text-white flex justify-between items-center">
      <img
        src="https://spyne.ai/_next/image?url=https%3A%2F%2Fmedia.spyneai.com%2Funsafe%2Ffilters%3Aformat(webp)%2Fd20uiuzezo3er4.cloudfront.net%2FAI-tools%2Fai-tool-home%2FHeaderNew%2FSpyne%2BLogo%2Bblack.png&w=256&q=75"
        alt="logo"
        className="w-24"
      />

      <div className="flex items-center space-x-6">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="text-white hover:text-teal-500 transition duration-200"
          >
            {item.name}
          </Link>
        ))}
      </div>

      <div>
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition duration-200"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition duration-200"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
