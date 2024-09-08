import { FaGlobeAsia, FaRecycle, FaTree } from "react-icons/fa";
import { Typography } from "@material-tailwind/react";

export default function OurMission() {
  return (
    <section className="py-16 bg-green-100">
      <div className="container mx-auto px-6 text-center">
        <Typography variant="h3" className="mb-6 text-green-900">
          Our Mission
        </Typography>
        <Typography color="gray" className="mb-4 max-w-2xl mx-auto">
          Our mission is to restore balance to our ecosystems by empowering individuals to take meaningful action. We are committed to achieving the United Nations' Sustainable Development Goals, including Climate Action, Life on Land, and Clean Water and Sanitation. Every action taken through our platform contributes directly to creating a greener, healthier planet.
        </Typography>

        {/* Environmental Icons */}
        <div className="flex justify-center space-x-8 mt-8">
          <FaTree className="w-16 h-16" />
          <FaRecycle className="w-16 h-16" />
          <FaGlobeAsia className="w-16 h-16" />
        </div>
      </div>
    </section>
  );
}
