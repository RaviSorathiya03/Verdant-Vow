import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export default function ProfileMenu({ className }) {
  const navigate = useNavigate();

  return (
    <div className={className}>
      <Button variant="text" color="blue-gray" className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto" onClick={() => navigate("/porfile")} placeholder={undefined}>
        <Avatar variant="circular" size="sm" alt="tania andrew" className="border border-gray-900 p-0.5" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80" placeholder={undefined} />
      </Button>
    </div>
  );
}
