import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Input, Typography, Button, Tooltip, Alert } from "@material-tailwind/react";
import { FaLeaf } from "react-icons/fa"; // Environmental icons for nature theme
import { CameraIcon } from "@heroicons/react/24/outline"; // For the image upload field
import axios from "axios";
import { useAuth } from "../../hooks/UseAuth";

const BlogEditor = () => {
  const [alert, setAlert] = useState({ vis: false, color: "", msg: "" });
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // Image state
  const auth = useAuth();

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (selectedImage) {
      formData.append("image", selectedImage); // Add the selected image to form data
    }

    axios
      .post(import.meta.env.VITE_REACT_BASE_URL + "/blog", formData, {
        headers: {
          Authorization: auth.user,
          "Content-Type": "multipart/form-data", // Set the correct content type for file upload
        },
      })
      .then((res) => {
        setAlert({ vis: true, color: "blue", msg: res.data.message });
        setTitle("");
        setContent("");
        setSelectedImage(null); // Reset image after submission
      })
      .catch((error) => {
        console.log(error);
        setAlert({ vis: true, color: "red", msg: error.response.data.message });
      });
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center justify-center">
      <Alert color={alert.color} variant="outlined" open={alert.vis} className="max-w-md mb-6 w-full">
        {alert.msg}
      </Alert>
      <Typography variant="h3" className="mb-6 text-green-900 text-center">
        Create a New Blog
      </Typography>

      <div className="w-full max-w-lg mb-6 relative">
        <FaLeaf className="absolute top-3 left-3 text-green-700" />
        <Tooltip content="Enter Blog Title" placement="top">
          <Input placeholder="Enter blog title..." className="rounded-lg pl-10 border border-green-600 focus:border-green-700" value={title} onChange={(e) => setTitle(e.target.value)} />
        </Tooltip>
      </div>

      {/* Image Upload Field */}
      <div className="w-full max-w-lg mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md border-2 border-dashed border-green-600 hover:border-green-700 transition-colors relative">
          <div className="flex flex-col items-center justify-center text-gray-600 cursor-pointer">
            <CameraIcon className="h-12 w-12" />
            <Typography variant="small" className="mt-2">
              Drag and drop or click to upload an image
            </Typography>
          </div>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" />
        </div>
      </div>

      <div className="w-full max-w-lg mb-6">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <ReactQuill value={content} onChange={handleContentChange} className="mb-4 h-64 text-gray-800 rounded-lg" theme="snow" />
        </form>
      </div>
      <div className="w-full max-w-lg mt-6">
        <Button type="submit" className="w-full bg-green-700 text-white font-medium py-2 px-4 rounded-md hover:bg-green-800 transition-colors duration-200" onClick={handleSubmit}>
          Save Blog
        </Button>
      </div>

      <footer className="mt-8">
        <Typography variant="small" color="gray" className="text-center">
          Together, we can make the world greener! 🌿
        </Typography>
      </footer>
    </div>
  );
};

export default BlogEditor;
