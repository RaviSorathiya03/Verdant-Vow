import { Card, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export default function LevelCard({ level, setAlert }) {
  const navigate = useNavigate();
  const levelDueDate = moment(level.dueDate); // Keep as moment object

  return (
    <Card
      className="p-4 bg-white shadow-lg rounded-lg cursor-pointer hover:bg-white/50 opacity-70"
      onClick={() => {
        if (levelDueDate.isBefore(moment())) {
          // Compare moment objects
          navigate(`/new-post/${level.id}`);
        } else {
          setAlert({ vis: true, color: "red", msg: "Action unavailable: The due date for this level has not yet passed." });
        }
      }}
    >
      <Typography variant="h5" className="text-green-900">
        Level {level.levelNumber}
      </Typography>
      <Typography variant="small" color="gray">
        Due on: {levelDueDate.format("D MMM YYYY")}
      </Typography>
      <Typography variant="paragraph" className="mt-2" color="gray">
        {level.progress}
      </Typography>
    </Card>
  );
}
