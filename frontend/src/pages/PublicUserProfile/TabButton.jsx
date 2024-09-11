import { Typography } from "@material-tailwind/react";
import { createElement } from "react";

export default function TabButton({ TabIcon, TabName }) {
  return (
    <div className="flex items-center gap-2">
      {createElement(TabIcon, { className: "w-5 h-5" })}
      <Typography variant="small" className="hidden md:block">
        {TabName}
      </Typography>
    </div>
  );
}
