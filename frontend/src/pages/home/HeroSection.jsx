import { Typography, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen flex flex-col justify-center items-center text-center overflow-hidden">
      {/* Video Background */}
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src="/videos/Hero Section.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay for Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-brown-500 opacity-40"></div>

      {/* Text and Button Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center text-center mb-16 bg-opacity-85 p-8">
        <i className="fa-solid fa-leaf text-[#fbf5ef] mb-4 w-15 h-15 text-6xl"></i>
        <Typography variant="h1" textGradient className="font-Jost text-[#fbf5ef]">
          Protect Mother Earth
        </Typography>
        <Typography variant="lead" className="my-4 text-gray-400">
          Join us in supporting the Sustainable Development Goals (SDGs) to create a better future for our planet and all its inhabitants.
        </Typography>
        <Button size="lg" variant="filled" className="bg-[#fbf5ef] text-green-900" onClick={() => navigate("/about-us")}>
          Learn More
        </Button>
      </div>
    </div>
  );
}
