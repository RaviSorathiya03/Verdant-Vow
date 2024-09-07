import { Typography, Button } from "@material-tailwind/react";
import { FlagIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="h-screen mx-auto grid place-items-center text-center px-8">
      <div>
        <FlagIcon className="w-20 h-20 mx-auto text-green-900" />
        <Typography variant="h1" className="mt-10 !text-3xl !leading-snug md:!text-4xl text-green-900" placeholder={undefined}>
          Error 404 <br /> It looks like something went wrong.
        </Typography>
        <Typography className="mt-8 mb-14 text-[18px] font-normal text-gray-500 mx-auto md:max-w-sm" placeholder={undefined}>
          Don&apos;t worry, our team is already on it.Please try refreshing the page or come back later.
        </Typography>
        <Button className="w-full px-4 md:w-[8rem] bg-green-900" onClick={handleClick} placeholder={undefined}>
          back home
        </Button>
      </div>
    </div>
  );
}
