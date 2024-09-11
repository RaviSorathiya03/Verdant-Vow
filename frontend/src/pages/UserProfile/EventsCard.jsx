import { AdjustmentsHorizontalIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Card, Menu, MenuHandler, MenuItem, MenuList, Progress, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export default function EventsCard({ event, handleMenuToggle, isMenuOpen, progress, index }) {
  const navigate = useNavigate();

  return (
    <Card className="p-4 bg-white shadow-lg rounded-lg flex flex-col">
      <img src={"https://images.unsplash.com/photo-1725610588149-adc351ad606d?q=80&w=3257&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt={event.eventName} className="w-full h-60 rounded-md object-cover mb-4 cursor-pointer transform transition-transform duration-300 hover:scale-105" onClick={() => navigate(`/event/${event.id}`)} />
      <Typography variant="h5" color="green">
        {event.eventName}
      </Typography>
      <Typography variant="small" color="gray">
        Start Date: {moment(event.createdAt).format("D MMM YYYY")}
      </Typography>
      <div className="flex justify-between items-center space-x-2">
        <Progress value={progress} color="green" className="text-center flex items-center p-0 mt-1" />
        <Menu open={isMenuOpen === index} handler={() => handleMenuToggle(index)} placement="bottom">
          <MenuHandler>
            <AdjustmentsHorizontalIcon className="w-5 h-5 text-center flex items-center p-0" />
          </MenuHandler>
          <MenuList className="p-1">
            <MenuItem className="flex items-center gap-2 rounded">
              <PencilIcon className="w-5 h-5" />
              <Typography as="span" variant="small" className="font-normal" color="inherit">
                Edit
              </Typography>
            </MenuItem>
            <MenuItem className="flex items-center gap-2 rounded">
              <TrashIcon className="w-5 h-5 text-red-500" />
              <Typography as="span" variant="small" className="font-normal" color="red">
                Delete
              </Typography>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </Card>
  );
}
