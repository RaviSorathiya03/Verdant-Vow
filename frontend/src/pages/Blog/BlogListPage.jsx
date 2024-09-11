import { Button, Input, Typography, Card } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { FaSearch, FaLeaf } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";

import { useAuth } from "../../hooks/UseAuth";

const BlogListPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState("Newest");
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_REACT_BASE_URL + "/blog", {
        headers: {
          Authorization: auth.user,
        },
      })
      .then((res) => {
        console.log(res.data);
        setBlogs(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBlogs = blogs.filter((blog) => blog.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen p-6">
      <header className="text-center mb-8">
        <Typography variant="h2" className="text-green-900 font-bold mb-4">
          Our Green Stories
        </Typography>
        <Typography className="text-gray-600 text-lg">Inspiring environmental stories and tips for a sustainable future.</Typography>
      </header>

      <div className="grid grid-cols-1 space-y-2 md:flex md:justify-between md:items-center mb-8">
        <div className="flex items-center bg-white shadow-lg rounded-lg px-4 py-2 w-full max-w-lg border border-gray-300">
          <FaSearch className="text-green-600 text-xl mr-3" />
          <Input type="text" placeholder="Search blog posts..." value={searchTerm} onChange={handleSearch} className="w-full bg-transparent focus:outline-none placeholder-gray-500" inputProps={{ "aria-label": "Search blog posts" }} />
        </div>

        <div className="flex space-x-4">
          <Button size="sm" color={filters === "Newest" ? "green" : "gray"} onClick={() => setFilters("Newest")}>
            Newest
          </Button>
          <Button size="sm" color={filters === "Popular" ? "green" : "gray"} onClick={() => setFilters("Popular")}>
            Popular
          </Button>
          <Button size="sm" color={filters === "Category" ? "green" : "gray"} onClick={() => setFilters("Category")}>
            Categories
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.map((blog) => (
          <Card key={blog.id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-200">
            <img src={blog.thumbnail} alt={blog.title} className="rounded-md w-full h-40 object-cover mb-4" />
            <Typography variant="h5" className="text-green-900 mb-2">
              {blog.title}
            </Typography>
            <Typography className="text-gray-700 text-sm mb-2">{}</Typography>
            <div className="flex items-center justify-between">
              <Typography className="text-gray-500 text-sm">
                By {blog.user == null || undefined ? blog.organization.name : blog.user.username} | {moment(blog.createdAt).format("D MMM YYYY")}
              </Typography>
              <Button size="sm" className="flex items-center bg-green-500 text-white" onClick={() => navigate(`/blog/${blog.id}`)}>
                <FaLeaf className="mr-2" /> View Full
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <footer className="mt-12 text-center">
        <Typography className="text-gray-600">Thank you for joining us on our journey to save the planet. Together, we can make a difference!</Typography>
      </footer>
    </div>
  );
};

export default BlogListPage;
