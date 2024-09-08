import { Typography } from "@material-tailwind/react";

export default function OurStory() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <Typography variant="h3" className="mb-4 text-green-900">
            Our Story
          </Typography>
          <Typography color="gray" className="leading-relaxed">
            Our platform was created with a single goal in mind: to help save the planet. Starting as a small initiative in 2015, we have grown into a community of like-minded individuals dedicated to environmental sustainability. Through our work, we aim to plant trees, clean oceans, and reduce carbon footprints.
            <br />
            <br />
            Our platform connects volunteers, environmentalists, and organizations who believe in the power of collective action to protect the Earth for future generations.
          </Typography>
        </div>
        <div>
          <img src="images/aboutUs.jpeg" alt="Nature" className="w-full h-auto rounded-lg shadow-lg" />
        </div>
      </div>
    </section>
  );
}
