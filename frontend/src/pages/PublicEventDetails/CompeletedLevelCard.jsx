import { Card, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useAuth } from "../../hooks/UseAuth";
import moment from "moment";

export default function CompeletedLevelcard({ level, setOpen, setSelectedLevel }) {
  const auth = useAuth();

  return (
    <Card
      className="p-4 bg-green-500 shadow-lg rounded-lg cursor-pointer hover:bg-green-400"
      onClick={() => {
        axios
          .get(import.meta.env.VITE_REACT_BASE_URL + `/post/${level.id}`, {
            headers: {
              Authorization: auth.user,
            },
          })
          .then((res) => {
            console.log(res.data);
            setSelectedLevel(res.data);
            setOpen(true);
          })
          .catch((error) => console.log(error));
      }}
    >
      {/* <img src={level.image} alt={level.level} className="w-full h-60 rounded-md object-cover mb-4" /> */}
      <Typography variant="h5" className="text-green-900">
        Level {level.levelNumber}
      </Typography>
      <Typography variant="small" color="gray">
        Posted on: {moment(level.postedDate).format("D MMM YYYY")}
      </Typography>
      <Typography variant="paragraph" className="mt-2" color="gray">
        {level.progress}
      </Typography>
    </Card>
  );
}
