import { Typography } from "@material-tailwind/react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function TeamCard({ member }) {
  return (
    <div className="text-center bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
      <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
      <Typography variant="h5" color="green">
        {member.name}
      </Typography>
      <Typography variant="small" color="gray">
        {member.role}
      </Typography>
      <div className="flex justify-center mt-4 space-x-4">
        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
          <FaLinkedin size={20} />
        </a>
        <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900">
          <FaGithub size={20} />
        </a>
        <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
          <FaInstagram size={20} />
        </a>
      </div>
    </div>
  );
}
