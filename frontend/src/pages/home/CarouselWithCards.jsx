import { Carousel, Typography } from "@material-tailwind/react";
import CarouselElement from "../../components/CarouselElement";

export default function CarouselWithEventCards() {
  return (
    <div className="bg-cream p-10 text-center">
      {/* Heading and Subtext */}
      <div className="mb-8">
        <Typography variant="h2" textGradient className="text-green-900">
          Upcoming Events
        </Typography>
        <Typography variant="lead" color="gray" className="mt-2">
          Check out our latest events promoting sustainability and community engagement.
        </Typography>
      </div>

      {/* Carousel with Event Cards */}
      <Carousel
        className="rounded-xl"
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span key={i} className={`block h-1 cursor-pointer rounded-2xl transition-all ${activeIndex === i ? "w-8 bg-green-600" : "w-4 bg-green-400/50"}`} onClick={() => setActiveIndex(i)} />
            ))}
          </div>
        )}
      >
        {/* Centered Event Cards */}
        <div className="flex justify-center space-x-5">
          <CarouselElement image={"https://images.unsplash.com/photo-1725046908999-195118679132?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} heading={"Heading"} subtext={"It is some random text"} />
        </div>
        <div className="flex justify-center space-x-5">
          <CarouselElement image={"https://images.unsplash.com/photo-1725046908999-195118679132?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} heading={"Heading"} subtext={"It is some random text"} />
        </div>
        <div className="flex justify-center space-x-5">
          <CarouselElement image={"https://images.unsplash.com/photo-1725046908999-195118679132?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} heading={"Heading"} subtext={"It is some random text"} />
        </div>
      </Carousel>
    </div>
  );
}
