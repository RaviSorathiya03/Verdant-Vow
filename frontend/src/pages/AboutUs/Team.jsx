import { Typography } from "@material-tailwind/react";

import TeamCard from "./TeamCard";

export default function Team() {
  const teamMembers = [
    {
      name: "Jenil Desai",
      role: "Frontend Devloper",
      image: "https://via.placeholder.com/150",
      linkedin: "#",
      github: "#",
      instagram: "#",
    },
    {
      name: "Ravi Sorathiya",
      role: "Backend Devloper",
      image: "https://via.placeholder.com/150",
      linkedin: "#",
      github: "#",
      instagram: "#",
    },
    {
      name: "Parth Kachela",
      role: "Frontend Devloper",
      image: "https://via.placeholder.com/150",
      linkedin: "#",
      github: "#",
      instagram: "#",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <Typography variant="h3" className="text-center mb-10 text-green-900">
          Our Team
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamCard member={member} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
