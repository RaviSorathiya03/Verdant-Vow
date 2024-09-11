import React from "react";
import { Typography } from "@material-tailwind/react";

export default function TreeCard({ icon, heading, paragraph, linkText, link, bgColor }) {
  return (
    <div className={`rounded-lg p-6 ${bgColor} flex flex-col items-start space-y-4`}>
      {/* Icon */}
      <div>{icon}</div>

      {/* Heading */}
      <Typography variant="h3" className="text-gray-800">
        {heading}
      </Typography>

      {/* Paragraph */}
      <Typography variant="paragraph" className="text-gray-600">
        {paragraph}
      </Typography>

      {/* Link */}
      <a href={link} className="underline text-black font-medium">
        {linkText}
      </a>
    </div>
  );
}
