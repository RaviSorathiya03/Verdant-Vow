import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from "@material-tailwind/react";
import moment from "moment";

export default function LevelDetailModal({ selectedLevel, setOpen, open }) {
  const closeModal = () => setOpen(false);

  return (
    <Dialog open={open} handler={closeModal}>
      <DialogHeader className="flex justify-between">
        Level {selectedLevel.level.levelNumber}
        <XMarkIcon className="w-5 h-5" onClick={() => setOpen(false)} />
      </DialogHeader>
      <DialogBody divider className="h-[42rem] overflow-scroll">
        <img src={selectedLevel.post.image} alt={selectedLevel.level.levelNumber} className="w-full h-45 object-cover rounded-md mb-4" />
        <Typography variant="h6" className="text-green-900">
          Postedn On :
        </Typography>
        <Typography className="mb-4">{moment(selectedLevel.post.postedAt).format("D MMM YYYY")}</Typography>
        <Typography variant="h6" className="text-green-900">
          Description
        </Typography>
        <Typography className="mb-4">{selectedLevel.post.content}</Typography>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={closeModal}>
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
