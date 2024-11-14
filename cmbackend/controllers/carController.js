import Car from "../models/Car.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createCar = async (req, res) => {
  const { title, description, tags } = req.body;
  console.log(req.files, "request file");

  const images = req.files ? req.files.map((file) => file.filename) : [];

  console.log(images);

  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const car = new Car({
      title,
      description,
      tags,
      images,
      user: req.user.id,
    });
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating car" });
  }
};

export const getAllCars = async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const carList = await Car.find({});
    res.status(200).json({ carList });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching cars" });
  }
};

export const getCarByUserId = async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const carList = await Car.find({ user: req.user.id });
    console.log(carList);
    
    res.status(200).json({ carList });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching cars" });
  }
};

export const getCarById = async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const car = await Car.findById(req.params.car_id);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    if (car.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.status(200).json(car);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching car details" });
  }
};

export const updateCar = async (req, res) => {
  const { title, description, tags } = req.body;
  const images = req.files ? req.files.map((file) => file.filename) : [];

  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const carId = req.params.car_id;

  try {
    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    if (car.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    car.title = title || car.title;
    car.description = description || car.description;
    car.tags = tags || car.tags;
    if (images.length > 0) {
      // const oldImages = car.images || [];
      // const oldImagePaths = oldImages.map((imageName) =>
      //   path.join(__dirname, "..", "uploads", imageName)
      // );

      // try {
      //   await Promise.all(
      //     oldImagePaths.map((imagePath) => fs.unlink(imagePath))
      //   );
      // } catch (err) {
      //   console.log("Error deleting old images:", err);
      //   return res.status(500).json({ message: "Error deleting old images" });
      // }
      car.images = images;
    }

    await car.save();
    res.status(200).json(car);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating car" });
  }
};

export const deleteCar = async (req, res) => {
  const carId = req.params.car_id;

  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    if (car.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await Car.findByIdAndDelete(carId);

    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting car" });
  }
};
