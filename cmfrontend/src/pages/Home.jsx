import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      {/* Header Section */}
      <h1 className="text-5xl font-bold text-gray-800 mb-4">
        Welcome to Car Management
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Manage your car collection effortlessly. Create, view, edit, and delete
        cars in your collection. Sign up today to get started!
      </p>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <Link
          to="/signup"
          className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition duration-200"
        >
          Get Started
        </Link>

        <Link
          to="/cars"
          className="bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition duration-200"
        >
          View My Cars
        </Link>
      </div>
    </div>
  );
};

export default Home;
