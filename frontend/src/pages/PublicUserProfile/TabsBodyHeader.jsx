import { Card, Progress, Typography } from "@material-tailwind/react";

export default function TabsBodyHeader({ progress }) {
  return (
    <Card className="p-4 bg-white mb-4">
      <div className="flex justify-between">
        <Typography variant="h5" color="green">
          Overall Progress
        </Typography>
        <Typography variant="h5" color="green">
          {progress} / 100
        </Typography>
      </div>
      <Progress value={progress} color="green" className="mt-4" />
    </Card>
  );
}
