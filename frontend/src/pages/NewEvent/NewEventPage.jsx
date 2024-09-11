import React, { useState } from "react";
import { Button, Input, Radio, Typography, Tooltip, Alert } from "@material-tailwind/react";
import { FaLeaf, FaCalendarAlt, FaTree } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../../hooks/UseAuth";
import { useNavigate } from "react-router-dom";

const NewEventPage = () => {
  const [alert, setAlert] = useState({ vis: false, color: "", msg: "" });
  const [eventName, setEventName] = useState("");
  const [eventDays, setEventDays] = useState("30");
  const [customDays, setCustomDays] = useState("");
  const [frequency, setFrequency] = useState("");
  const navigate = useNavigate();
  const auth = useAuth();

  const handleEventCreation = () => {
    const days = eventDays === "custom" ? customDays : eventDays;
    axios
      .post(
        import.meta.env.VITE_REACT_BASE_URL + "/event",
        {
          eventName,
          eventDays: parseInt(days),
          dayFrequency: parseInt(frequency),
        },
        { headers: { Authorization: auth.user } }
      )
      .then((res) => {
        setAlert({ vis: true, color: "blue", msg: res.data.message });
        setEventName("");
        setEventDays("30");
        setCustomDays("");
        setFrequency("");
        navigate(`/event/${res.data.event.id}`);
      })
      .catch((error) => {
        setAlert({ vis: true, color: "red", msg: error.response.data.message });
      });
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center justify-center">
      <Alert color={alert.color} variant="outlined" open={alert.vis} className="max-w-md mb-6 w-full">
        {alert.msg}
      </Alert>
      <Typography variant="h3" className="mb-6 text-green-900">
        Create a New Event
      </Typography>

      <div className="w-full max-w-lg mb-6 relative">
        <FaTree className="absolute top-3 left-3 text-green-700" />
        <Tooltip content="Enter Event Name" placement="top">
          <Input placeholder="Enter event name..." className="rounded-lg pl-10 border border-green-600 focus:border-green-700" value={eventName} onChange={(e) => setEventName(e.target.value)} />
        </Tooltip>
      </div>

      <div className="w-full max-w-lg mb-6">
        <Typography variant="h5" className="mb-4 text-green-900">
          Select Event Duration
        </Typography>
        <div className="grid grid-cols-2 md:grid-cols-4">
          <Radio
            id="30-days"
            name="days"
            label={
              <span className="flex items-center">
                <FaLeaf className="text-green-600 mr-2" /> 30 Days
              </span>
            }
            value="30"
            checked={eventDays === "30"}
            onChange={(e) => setEventDays(e.target.value)}
          />
          <Radio
            id="60-days"
            name="days"
            label={
              <span className="flex items-center">
                <FaLeaf className="text-green-600 mr-2" /> 60 Days
              </span>
            }
            value="60"
            checked={eventDays === "60"}
            onChange={(e) => setEventDays(e.target.value)}
          />
          <Radio
            id="90-days"
            name="days"
            label={
              <span className="flex items-center">
                <FaLeaf className="text-green-600 mr-2" /> 90 Days
              </span>
            }
            value="90"
            checked={eventDays === "90"}
            onChange={(e) => setEventDays(e.target.value)}
          />
          <Radio
            id="custom-days"
            name="days"
            label={
              <span className="flex items-center">
                <FaLeaf className="text-green-600 mr-2" /> Custom
              </span>
            }
            value="custom"
            checked={eventDays === "custom"}
            onChange={(e) => setEventDays(e.target.value)}
          />
        </div>
        {eventDays === "custom" && (
          <div className="mt-4">
            <Tooltip content="Enter Event Duration (e.g., 120 days)" placement="top">
              <Input type="number" placeholder="Enter custom number of days..." className="rounded-lg border border-green-600 focus:border-green-700" value={customDays} onChange={(e) => setCustomDays(e.target.value)} />
            </Tooltip>
          </div>
        )}
      </div>

      <div className="w-full max-w-lg mb-6 relative">
        <FaCalendarAlt className="absolute top-3 left-3 text-green-700" />
        <Tooltip content="Enter how frequently you’ll post updates (e.g., Every 2 days)" placement="top">
          <Input type="number" placeholder="Frequency of days..." className="rounded-lg pl-10 border border-green-600 focus:border-green-700" value={frequency} onChange={(e) => setFrequency(e.target.value)} />
        </Tooltip>
      </div>

      {/* Create Event Button */}
      <div className="w-full max-w-lg">
        <Button className="bg-green-700 text-white w-full flex justify-center items-center space-x-2 hover:bg-green-800 transition-all" size="lg" onClick={handleEventCreation}>
          <FaLeaf className="h-5 w-5" />
          <span>Create Event</span>
        </Button>
      </div>

      {/* Footer Section with Eco Message */}
      <footer className="mt-8">
        <Typography variant="small" color="gray" className="text-center">
          Together, we can make the world greener! 🌿
        </Typography>
      </footer>
    </div>
  );
};

export default NewEventPage;
