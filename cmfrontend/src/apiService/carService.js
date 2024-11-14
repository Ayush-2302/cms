import { token } from "./authService";
import httpService from "./httpService";
import { toast } from "react-toastify";

// console.log(token);

export const getCarApi = async () => {
  try {
    const response = await httpService.get("/cars/get-user-cars", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      // toast.success("Cars fetched successfully!");
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching cars:", error);
    toast.error("Error fetching cars. Please try again.");
  }
};

export const getCarByIdApi = async (car_id) => {
  try {
    const response = await httpService.get(`/cars/get-car/${car_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      // toast.success("Car details fetched successfully!");
      return response.data;
    }
  } catch (error) {
    console.error(`Error fetching car with id ${car_id}:`, error);
    toast.error(`Error fetching car with id ${car_id}. Please try again.`);
  }
};

export const createCar = async (carData) => {
  try {
    // Uncomment below if you need to handle formData
    // const formData = new FormData();
    // formData.append("title", carData.title);
    // formData.append("description", carData.description);
    // formData.append("tags", JSON.stringify(carData.tags));
    // carData.images.forEach(image => {
    //   formData.append("images", image);
    // });

    const response = await httpService.post("/cars/create-car", carData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      toast.success("Car created successfully!");
      return response.data;
    }
  } catch (error) {
    console.error("Error creating car:", error);
    toast.error("Error creating car. Please try again.");
  }
};

export const updateCar = async (carId, carData) => {
  try {
    const response = await httpService.put(
      `/cars/update-car/${carId}`,
      carData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      toast.success("Car updated successfully!");
      return response.data;
    }
  } catch (error) {
    console.error(`Error updating car with id ${carId}:`, error);
    toast.error(`Error updating car. Please try again.`);
  }
};

export const deleteCarApi = async (car_id) => {
  try {
    const response = await httpService.delete(`/cars/delete-car/${car_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      toast.success("Car deleted successfully!");
      return response.data;
    }
  } catch (error) {
    console.error(`Error deleting car with id ${car_id}:`, error);
    toast.error(`Error deleting car. Please try again.`);
  }
};
