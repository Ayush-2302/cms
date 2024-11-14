import axios from "axios";

const httpService = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

export default httpService;
