import React from "react";
import { Typography } from "@material-tailwind/react";

export default function InfoCard({ icon, heading, paragraph }) {
  return (
    <div className="flex items-start space-x-4">
      {/* Icon */}
      <div className="w-12 h-12">{icon}</div>

      {/* Text content */}
      <div>
        <Typography variant="h6" className="font-bold text-gray-900">
          {heading}
        </Typography>
        <Typography variant="paragraph" className="text-gray-600">
          {paragraph}
        </Typography>
      </div>
    </div>
  );
}
