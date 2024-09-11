import { Card, Progress, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export default function EventsCard({ event, username, progress }) {
  const navigate = useNavigate();

  return (
    <Card className="p-4 bg-white shadow-lg rounded-lg flex flex-col">
      <img src={"https://images.unsplash.com/photo-1725610588149-adc351ad606d?q=80&w=3257&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt={event.eventName} className="w-full h-60 rounded-md object-cover mb-4 cursor-pointer transform transition-transform duration-300 hover:scale-105" onClick={() => navigate(`/user/${username}/${event.id}`)} />
      <Typography variant="h5" color="green">
        {event.eventName}
      </Typography>
      <Typography variant="small" color="gray">
        Start Date: {moment(event.createdAt).format("D MMM YYYY")}
      </Typography>
      <Progress value={progress} color="green" className="text-center flex items-center p-0 mt-1" />
    </Card>
  );
}
