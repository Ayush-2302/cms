import multer from "multer";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    // const currentDate = new Date().toISOString().slice(0, 10);
    const directoryPath = path.join(__dirname, "../uploads");
    try {
      await fs.mkdir(directoryPath, { recursive: true });
      cb(null, directoryPath);
    } catch (err) {
      console.error("Error creating directory:", err);
      cb(err);
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

export default upload;
