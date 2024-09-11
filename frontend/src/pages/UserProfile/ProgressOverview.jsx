import { Card, Typography } from "@material-tailwind/react";

export default function ProgressOverview({ ongoingEvent, completedEvent }) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card className="p-4 bg-[#1b4332] shadow-sm">
        <Typography variant="h6" color="white">
          Ongoing Events
        </Typography>
        <Typography variant="h4" color="white">
          {ongoingEvent}
        </Typography>
      </Card>
      <Card className="p-4 bg-[#1b4332] shadow-sm">
        <Typography variant="h6" color="white">
          Completed Events
        </Typography>
        <Typography variant="h4" color="white">
          {completedEvent}
        </Typography>
      </Card>
      <Card className="p-4 bg-[#1b4332] shadow-sm">
        <Typography variant="h6" color="white">
          Certificates Earned
        </Typography>
        <Typography variant="h4" color="white">
          0
        </Typography>
      </Card>
    </div>
  );
}
