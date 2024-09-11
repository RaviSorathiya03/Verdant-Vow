import { Card, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export default function LevelCard({ level }) {
  const navigate = useNavigate();

  return (
    <Card className="p-4 bg-white shadow-lg rounded-lg cursor-pointer hover:bg-white/50">
      <Typography variant="h5" className="text-green-900">
        Level {level.levelNumber}
      </Typography>
      <Typography variant="small" color="gray">
        Due on: {moment(level.dueDate).format("D MMM YYYY")}
      </Typography>
      <Typography variant="paragraph" className="mt-2" color="gray">
        {level.progress}
      </Typography>
    </Card>
  );
}
