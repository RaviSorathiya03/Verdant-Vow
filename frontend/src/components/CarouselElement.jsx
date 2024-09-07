import { Typography } from "@material-tailwind/react";

export default function CarouselElement({ image, heading, subtext }) {
  return (
    <div className="flex justify-center space-x-5">
      <div className="relative h-full w-full">
        <img src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80" alt="image 1" className="h-full w-full object-cover" />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography variant="h1" color="white" className="mb-4 text-3xl md:text-4xl lg:text-5xl font-Jost">
              The Beauty of Nature
            </Typography>
            <Typography variant="lead" color="white" className="mb-12 opacity-80 font-Jost">
              It is not so much for its beauty that the forest makes a claim upon men&apos;s hearts, as for that subtle something, that quality of air that emanation from old trees, that so wonderfully changes and renews a weary spirit.
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
