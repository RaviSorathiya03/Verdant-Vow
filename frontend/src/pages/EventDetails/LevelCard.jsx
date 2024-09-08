import { Card, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export default function LevelCard({ level }) {
  const navigate = useNavigate();

  return (
    <Card className="p-4 bg-white shadow-lg rounded-lg cursor-pointer hover:bg-green-200 opacity-70" onClick={() => navigate(`/new-post/${level.id}`)}>
      {/* <img src="https://placehold.co/600x400/png" alt={level.level} className="w-full h-60 rounded-md object-cover mb-4" /> */}
      <Typography variant="h5" className="text-green-900">
        Level {level.levelNumber}
      </Typography>
      <Typography variant="small" color="gray">
        Due on: {level.dueDate}
      </Typography>
      <Typography variant="paragraph" className="mt-2" color="gray">
        {level.progress}
      </Typography>
    </Card>
  );
}
