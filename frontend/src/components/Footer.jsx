import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full p-8">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 text-center md:justify-between">
        <img src="/favicon.png" alt="logo-ct" className="w-10" />
        <ul className="flex flex-col md:flex-row gap-y-2 md:gap-x-8">
          <li>
            <Link to="/">
              <Typography as="a" href="#" color="blue-gray" className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500" placeholder={undefined}>
                Home
              </Typography>
            </Link>
          </li>
          <li>
            <Link to="/about-us">
              <Typography as="a" href="#" color="blue-gray" className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500" placeholder={undefined}>
                About Us
              </Typography>
            </Link>
          </li>
          <li>
            <Link to="/contact-us">
              <Typography as="a" href="#" color="blue-gray" className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500" placeholder={undefined}>
                Contact Us
              </Typography>
            </Link>
          </li>
        </ul>
      </div>
      <hr className="my-8 border-blue-gray-50" />
      <Typography color="blue-gray" className="text-center font-normal" placeholder={undefined}>
        &copy; 2024 Verdant Vow
      </Typography>
    </footer>
  );
}
