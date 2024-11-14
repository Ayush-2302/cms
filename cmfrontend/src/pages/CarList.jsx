import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCarApi } from "../apiService/carService";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const response = await getCarApi();
        setCars(response.carList);
        console.log(response.carList);
      } catch (err) {
        setError("Failed to fetch cars");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Car Listings</h2>
        <Link
          to="/new-car"
          className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          Add New Car
        </Link>
      </div>

      {loading && (
        <div className="mt-4 text-center text-gray-600 animate-pulse">
          Loading...
        </div>
      )}

      {error && (
        <div className="mt-4 text-center text-red-600">
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        {cars.length > 0 ? (
          cars.map((car) => <CarCard key={car._id} car={car} />)
        ) : (
          <div className="col-span-full mt-4 text-center text-gray-600">
            <span className=" text-gray-400">😞</span>
            No cars found
          </div>
        )}
      </div>
    </div>
  );
};

const CarCard = ({ car }) => {
  return (
    <Link
      to={`/cars/${car._id}`}
      className="block p-4 bg-white border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
    >
      <div className="relative">
        <img
          src={
            `${import.meta.env.VITE_API_URL}/images/${car.images[0]}` ||
            "https://via.placeholder.com/300x200"
          }
          alt={car.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-gray-800 hover:text-indigo-600 transition-colors duration-300">
          {car.title}
        </h3>
        <p className="text-gray-600 text-sm">{car.description}</p>
        <div className="mt-2 text-indigo-500 font-medium hover:underline">
          View Details
        </div>
      </div>
    </Link>
  );
};

export default CarList;
