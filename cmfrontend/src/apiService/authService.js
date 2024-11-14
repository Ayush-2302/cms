import httpService from "./httpService";
import { toast } from "react-toastify";

export const signUpApi = async (data) => {
  try {
    const response = await httpService.post("/auth/signup", data);
    if (response.status === 201) {
      toast.success("Registration successful!");
    }
    return response;
  } catch (error) {
    console.error(error);
    toast.error("Registration failed. Please try again.");
  }
};

export const loginApi = async (data) => {
  try {
    const response = await httpService.post("/auth/login", data);
    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      toast.success("Login successful!");
    }
    return response;
  } catch (error) {
    console.error(error);
    toast.error("Login failed. Please check your credentials.");
  }
};

export const token = localStorage.getItem("token");
