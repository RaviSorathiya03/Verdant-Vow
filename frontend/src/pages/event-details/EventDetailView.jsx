import React, { useState } from "react";
import { Card, Button, Typography, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const EventDetailView = () => {
  // State for the modal pop-up
  const [open, setOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);

  // Example levels data
  const levels = [
    {
      id: 1,
      level: "Level 1",
      image: "https://images.unsplash.com/photo-1476712395872-c2971d88beb7?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      postedDate: "July 5, 2023",
      description: "Planted the first tree and documented the process.",
      tips: "Ensure to plant in a well-lit area with good soil quality.",
      progress: "Tree planting day",
      images: ["https://example.com/selfie1.jpg", "https://example.com/selfie2.jpg"],
    },
    {
      id: 2,
      level: "Level 2",
      image: "https://images.unsplash.com/photo-1476712395872-c2971d88beb7?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      postedDate: "July 15, 2023",
      description: "Watered the tree regularly for healthy growth.",
      tips: "Water the tree early in the morning for best results.",
      progress: "Watering day",
      images: ["https://example.com/selfie3.jpg"],
    },
    {
      id: 3,
      level: "Level 3",
      image: "https://images.unsplash.com/photo-1476712395872-c2971d88beb7?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      postedDate: "July 30, 2023",
      description: "The tree has grown by 10cm! Continued to nurture.",
      tips: "Keep monitoring soil moisture and apply fertilizers if necessary.",
      progress: "Growth milestone",
      images: ["https://images.unsplash.com/photo-1476712395872-c2971d88beb7?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1476712395872-c2971d88beb7?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1476712395872-c2971d88beb7?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    },
    {
      id: 4,
      level: "Level 4",
      image: "https://images.unsplash.com/photo-1476712395872-c2971d88beb7?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      postedDate: "July 30, 2023",
      description: "The tree has grown by 10cm! Continued to nurture.",
      tips: "Keep monitoring soil moisture and apply fertilizers if necessary.",
      progress: "Growth milestone",
      images: ["https://images.unsplash.com/photo-1476712395872-c2971d88beb7?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1476712395872-c2971d88beb7?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1476712395872-c2971d88beb7?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    },
    // Add more levels as needed
  ];

  const openModal = (level) => {
    setSelectedLevel(level);
    setOpen(true);
  };

  const closeModal = () => setOpen(false);

  return (
    <div className="min-h-screen p-6">
      <header className="mb-6">
        <Typography variant="h3" className="text-green-900">
          Event Progress: 3 Levels Completed
        </Typography>
        <Typography variant="small" color="gray">
          Contributing to SDG: Life on Land 🌿
        </Typography>
      </header>

      {/* Levels Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {levels.map((level, index) => (
          <div key={level.id} className="relative">
            {/* Connection Lines Between Levels */}
            {index > 0 && (
              <div className="absolute left-1/2 transform -translate-x-1/2 top-0 h-full flex items-center justify-center">
                <div className="h-20 w-1 bg-green-400"></div>
              </div>
            )}
            {/* Level Card */}
            <Card className="p-4 bg-white shadow-lg rounded-lg cursor-pointer hover:bg-green-100" onClick={() => openModal(level)}>
              <img src={level.image} alt={level.level} className="w-full h-60 rounded-md object-cover mb-4" />
              <Typography variant="h5" className="text-green-900">
                {level.level}
              </Typography>
              <Typography variant="small" color="gray">
                Posted on: {level.postedDate}
              </Typography>
              <Typography variant="paragraph" className="mt-2" color="gray">
                {level.progress}
              </Typography>
            </Card>
          </div>
        ))}
      </div>

      {/* Modal for Level Interaction */}
      {selectedLevel && (
        <Dialog open={open} handler={closeModal}>
          <DialogHeader className="flex justify-between">
            {selectedLevel.level}
            <XMarkIcon className="w-5 h-5" onClick={() => setOpen(false)} />
          </DialogHeader>
          <DialogBody divider className="h-[42rem] overflow-scroll">
            <img src={selectedLevel.image} alt={selectedLevel.level} className="w-full h-50 object-cover rounded-md mb-4" />
            <Typography variant="h6" color="green">
              Description
            </Typography>
            <Typography className="mb-4">{selectedLevel.description}</Typography>
            <Typography variant="h6" color="green">
              Tips for this level
            </Typography>
            <Typography className="mb-4">{selectedLevel.tips}</Typography>
            <Typography variant="h6" color="green">
              Uploaded Images
            </Typography>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {selectedLevel.images.map((img, index) => (
                <img key={index} src={img} alt={`Selfie ${index + 1}`} className="w-full h-32 object-cover rounded-md" />
              ))}
            </div>
          </DialogBody>
          <DialogFooter>
            <Button variant="text" color="red" onClick={closeModal}>
              Close
            </Button>
          </DialogFooter>
        </Dialog>
      )}
    </div>
  );
};

export default EventDetailView;
