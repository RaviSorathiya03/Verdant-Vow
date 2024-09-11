import multer from "multer";
import cloudinary from "../config/Cloudinary.js";

const storage = multer.memoryStorage();

const upload = multer({ storage });

const uploadToCloudinary = async (file) => {
  if (!file) {
    throw new Error("No file provided");
  }

  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader
      .upload_stream(
        { resource_type: "auto" }, // Use 'auto' to handle different types of files
        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        }
      )
      .end(file.buffer);
  });
};

export { upload, uploadToCloudinary };
