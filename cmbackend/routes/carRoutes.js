import express from "express";
import {
  createCar,
  deleteCar,
  getAllCars,
  getCarById,
  getCarByUserId,
  updateCar,
} from "../controllers/carController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post(
  "/create-car",
  authMiddleware,
  upload.array("images", 10),
  createCar
);
router.get("/get-cars", authMiddleware, getAllCars);
router.get("/get-user-cars", authMiddleware, getCarByUserId);

router.put(
  "/update-car/:car_id",
  authMiddleware,
  upload.array("images", 10),
  updateCar
);

router.get("/get-car/:car_id", authMiddleware, getCarById);
router.delete("/delete-car/:car_id", authMiddleware, deleteCar);

export default router;
