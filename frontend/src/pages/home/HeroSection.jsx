import { Typography, Button } from "@material-tailwind/react";

export default function HeroSection() {
  return (
    <div className="relative bg-cream h-screen flex flex-col justify-center items-center text-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: "url('/images/Hero-Section.jpeg')", // Replace with your nature image URL
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center text-center mb-16 bg-opacity-85 p-8">
        <i className="fa-solid fa-leaf text-green-900 mb-4 w-15 h-15 text-6xl"></i>
        <Typography variant="h1" textGradient className="font-Jost text-green-900">
          Protect Mother Earth
        </Typography>
        <Typography variant="lead" color="gray" className="my-4 text-bold">
          Join us in supporting the Sustainable Development Goals (SDGs) to create a better future for our planet and all its inhabitants.
        </Typography>
        <Button size="lg" variant="filled" className="bg-green-900">
          Learn More
        </Button>
      </div>
    </div>
  );
}
