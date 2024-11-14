import axios from "axios";

const httpService = axios.create({
  baseURL: "http://localhost:4000/api",
});

export default httpService;
