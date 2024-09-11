import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/UseAuth";
import { Avatar, Button, Typography } from "@material-tailwind/react";
import { FaLeaf, FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa"; // Social icons for sharing
import moment from "moment";

const BlogViewer = () => {
  const [blog, setBlog] = useState({});
  const { blogId } = useParams();
  const auth = useAuth();

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_REACT_BASE_URL + `/blog/${blogId}`, { headers: { Authorization: auth.user } })
      .then((res) => {
        console.log(res.data);
        setBlog(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [blogId]);

  return (
    <div className="min-h-screen py-10 px-6 md:px-20 lg:px-40">
      {/* Blog Title Section */}
      <header className="mb-8">
        <Typography variant="h1" className="text-5xl font-bold text-green-900 mb-4">
          {blog.title}
        </Typography>
        <div className="flex items-center mb-4">
          <Avatar src={"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"} alt={"Image"} size="lg" className="mr-4" />
          <div>
            <Typography variant="h6" className="text-green-800 flex items-center">
              {blog.user ? blog.user.username : blog.organization?.name} <FaLeaf className="ml-2 text-green-700" />
            </Typography>
            <Typography variant="small" className="text-gray-500">
              Published on {moment(blog.createdAt).format("D MMM YYYY")}
            </Typography>
          </div>
        </div>
      </header>

      <main className="prose lg:prose-xl max-w-none mb-12">
        {/* Updated Thumbnail Image with height and width */}
        <img
          src={blog.thumbnail}
          alt="Thumbnail Image"
          className="object-cover rounded-lg" // Ensures the image fits nicely within the dimensions
          style={{ width: "500px", height: "300px" }} // Set specific width and height
        />
      </main>

      <article className="prose lg:prose-xl max-w-none mb-12">
        <ReactQuill value={blog.content} modules={{ toolbar: [] }} readOnly={true} theme="snow" className="h-auto text-gray-800" />
      </article>

      <footer>
        {/* Social Sharing Buttons */}
        <div className="flex justify-start space-x-4 mb-6">
          <Button variant="text" className="text-blue-500 hover:text-blue-700">
            <FaTwitter className="w-6 h-6" />
          </Button>
          <Button variant="text" className="text-blue-600 hover:text-blue-800">
            <FaLinkedin className="w-6 h-6" />
          </Button>
          <Button variant="text" className="text-blue-800 hover:text-blue-900">
            <FaFacebook className="w-6 h-6" />
          </Button>
        </div>

        {/* Comment Section */}
        <Typography variant="h5" className="text-green-900 mb-4">
          Leave a Comment
        </Typography>
        <form className="flex flex-col">
          <textarea className="w-full p-4 mb-4 border border-green-600 rounded-lg focus:border-green-700 focus:outline-none" rows="4" placeholder="Write your comment here..." />
          <Button variant="filled" className="bg-green-700 text-white py-2 px-6 rounded-md hover:bg-green-800 transition-colors duration-200">
            Post Comment
          </Button>
        </form>
      </footer>
    </div>
  );
};

export default BlogViewer;
