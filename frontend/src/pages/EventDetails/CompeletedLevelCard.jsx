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
      <Typography variant="h5" className="text-white">
        Level {level.levelNumber}
      </Typography>
      <Typography variant="small" className="text-black">
        Posted on: {moment(level.postedDate).format("D MMM YYYY")}
      </Typography>
    </Card>
  );
}
