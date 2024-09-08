import { Button, Typography } from "@material-tailwind/react";

export default function SkeletonProfileInfo() {
  return (
    <div className="flex justify-between items-center animate-pulse">
      <div className="grid grid-cols-1 place-items-center md:flex md:items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-12 w-12 text-gray-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
        <div className="md:ml-6 mt-2">
          <Typography variant="h4" className="mb-4 h-3 w-40 rounded-full text-center md:text-left bg-gray-100" as="div">
            &nbsp;
          </Typography>
          <div className="md:text-left text-center md:flex md:items-center grid grid-cols-1">
            <Typography variant="paragraph" className="w-14 h-2 bg-blue-gray-100 rounded-full">
              &nbsp;
            </Typography>
            <div className="md:flex">
              <Button disabled className="h-8 w-20 bg-gray-300 shadow-none hover:shadow-none md:ml-2">
                &nbsp;
              </Button>
              <Button disabled className="h-8 w-20 bg-gray-300 shadow-none hover:shadow-none md:ml-2">
                &nbsp;
              </Button>
            </div>
          </div>
          <Typography variant="paragraph" className="mt-2 md:text-left text-center h-2 w-80 rounded-full bg-gray-100">
            &nbsp;
          </Typography>
        </div>
      </div>
    </div>
  );
}
