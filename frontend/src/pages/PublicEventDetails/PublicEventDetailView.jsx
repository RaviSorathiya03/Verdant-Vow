import { Alert, Typography } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

import CompeletedLevelcard from "./CompeletedLevelCard";
import LevelDetailModal from "./LevelDetailModal";
import { useAuth } from "../../hooks/UseAuth";
import LevelCard from "./LevelCard";
import { useRecoilState } from "recoil";
import { isLoding } from "../../store/atoms";
import LoadingScreen from "../../components/LoadingScreen";

const EventDetailView = () => {
  const [loading, setIsLoading] = useRecoilState(isLoding);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [levels, setLevels] = useState([]);
  const [open, setOpen] = useState(false);
  const [cnt, setCnt] = useState(0);
  const { eventId } = useParams();
  const auth = useAuth();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(import.meta.env.VITE_REACT_BASE_URL + `/event/${eventId}`, {
        headers: {
          Authorization: auth.user,
        },
      })
      .then((res) => {
        console.log(res.data);
        setLevels(res.data.levels);
        for (let i = 0; i <= res.data.length; i++) {
          if (res.data[i].isCompleted) {
            setCnt((pre) => pre + 1);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return loading ? (
    <LoadingScreen />
  ) : (
    <div className="min-h-screen p-6">
      <header className="mb-6">
        <Typography variant="h3" className="text-green-900">
          Event Progress: {cnt} Levels Completed
        </Typography>
        <Typography variant="small" color="gray">
          Contributing to SDG: Life on Land 🌿
        </Typography>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {levels.map((level, index) => (
          <div key={level.id} className="relative">
            {level.isCompleted ? <CompeletedLevelcard level={level} setOpen={setOpen} setSelectedLevel={setSelectedLevel} /> : <LevelCard level={level} />}
          </div>
        ))}
      </div>

      {selectedLevel && <LevelDetailModal selectedLevel={selectedLevel} setOpen={setOpen} open={open} />}
    </div>
  );
};

export default EventDetailView;
