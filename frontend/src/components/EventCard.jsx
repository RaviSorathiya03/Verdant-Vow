import React from "react";
import { Typography, Card, CardBody } from "@material-tailwind/react";

export default function EventCard({ image, location, date, description }) {
  return (
    <Card className="rounded-xl overflow-hidden shadow-lg w-80 h-auto">
      {/* Image */}
      <div className="relative">
        <img src={image} alt="Event" className="w-full h-auto" />

        {/* Location Tag */}
        <div className="absolute top-4 left-4 bg-green-500 text-white px-4 py-1 rounded-full">
          <Typography variant="small" className="text-white font-medium">
            {location}
          </Typography>
        </div>
      </div>

      {/* Date and Description */}
      <CardBody className="p-4">
        <Typography variant="small" className="text-gray-600 mb-2">
          {date}
        </Typography>
        <Typography variant="h5" className="text-gray-800">
          {description}
        </Typography>
      </CardBody>
    </Card>
  );
}
