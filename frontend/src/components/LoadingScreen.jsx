import React, { useState, useEffect } from "react";
import { Spinner, Typography } from "@material-tailwind/react"; // Assuming you're using Material Tailwind components

const LoadingScreen = () => {
  const phrases = ["Nurturing nature, one step at a time... 🌱", "Growing a greener tomorrow... 🌍🌿", "Planting the seeds for a sustainable future... 🌳✨", "Saving the planet, loading your experience... 🌎💚", "Refreshing the earth, just a moment... 🍃💧", "Nature’s progress is loading... 🌿⏳", "Greening your journey, please wait... 🌲🚶‍♂️🌍"];

  const [currentPhrase, setCurrentPhrase] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPhrase((prevPhrase) => (prevPhrase + 1) % phrases.length);
    }, 5000); // Change phrase every 5 seconds

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures the effect only runs once

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="grid grid-cols-1 place-items-center">
        <Spinner color="green" className="h-14 w-14" />
        <Typography variant="h5" color="gray" className="text-center text-gray-500 mt-4">
          {phrases[currentPhrase]}
        </Typography>
      </div>
    </div>
  );
};

export default LoadingScreen;
