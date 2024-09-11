import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white py-6">
      <div className="container mx-auto text-center">
        <Typography className="mb-4">Protecting the planet, one tree at a time. Join us on our journey to make the world greener.</Typography>
        <div className="md:flex md:justify-center grid grid-cols-1 md:space-x-8">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/blog" className="hover:underline">
            Blog
          </Link>
          <Link to="/about-us" className="hover:underline">
            About Us
          </Link>
          <Link to="/contact-us" className="hover:underline">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
