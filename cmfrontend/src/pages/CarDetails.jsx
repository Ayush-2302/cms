import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { deleteCarApi, getCarByIdApi } from "../apiService/carService";
import CarForm from "./CarForm";
import { Autoplay } from "swiper/modules";
import { ToastContainer, toast } from "react-toastify";

const CarDetails = () => {
  const { car_id } = useParams();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await getCarByIdApi(car_id);
        setCar(response);
      } catch (err) {
        setError(err.message);
        toast.error("Failed to fetch car details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [car_id]);

  const handleDelete = async () => {
    try {
      await deleteCarApi(car_id);
      toast.success("Car deleted successfully!");
      navigate("/cars");
    } catch (err) {
      setError(err.message);
      toast.error("Failed to delete car.");
    }
  };

  const handleEdit = () => {
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  if (loading) {
    return <div className="text-center text-lg">Loading car details...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-lg text-red-500">Error: {error}</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-white shadow-lg rounded-lg">
      {/* Modal for Editing */}
      {modal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-3/4 lg:w-1/2">
            <CarForm isEditMode={true} car={car} onClose={handleCloseModal} />
          </div>
        </div>
      )}

      <ToastContainer /> {/* Toast Notifications */}

      {/* Image Slider */}
      {car.images.length > 0 && (
        <div className="my-4">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={true}
            className="rounded-lg h-[520px]"
          >
            {car.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={
                    `${import.meta.env.VITE_API_URL}/images/${image}` ||
                    "https://via.placeholder.com/300x200"
                  }
                  alt={`Car image ${index + 1}`}
                  className="w-full rounded-lg shadow-lg object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      <h1 className="text-3xl font-semibold text-gray-800">{car.title}</h1>
      <p className="text-lg text-gray-600 mt-2">{car.description}</p>

      <div className="flex items-center space-x-4 mt-4">
        <strong className="font-medium text-gray-800">Tags: </strong>
        <span className="text-gray-600">{car.tags.join(", ")}</span>
      </div>

      <div className="mt-6 flex space-x-4">
        <button
          onClick={handleEdit}
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition duration-200"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CarDetails;
