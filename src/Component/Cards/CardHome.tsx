import React from "react";

interface CardHomeProps {
  firstname: string;
  event?: {
    image?: string;
    description?: string;
    date?: string;
    location?: string;
    price?: number;
  };
}

function CardHome({ firstname, event }: CardHomeProps) {
  return (
    <div className="w-[480px] h-[450px] max-w-sm md:max-w-md lg:max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-3xl">
      {/* Image */}
      <div className="h-60 overflow-hidden">
        <img
          src={event?.image || "https://picsum.photos/500/500?random=1"}
          alt="Card"
          className="w-full h-full object-cover rounded-t-3xl transition-transform duration-500 hover:scale-110"
        />
      </div>

      <div className="p-4 flex flex-col gap-1">
        <h2 className="text-xl font-bold text-black">
          {firstname}
        </h2>
        <p className="text-gray-900 dark:text-gray-900 text-lg">{event?.description}</p>

        <div className="flex flex-wrap justify-between text-gray-500 dark:text-gray-400 mt-2">
          <span className="font-medium text-sm text-black">📅{event?.date}</span>
          <span className="font-medium text-sm text-black">📍{event?.location}</span>
        </div>

        <p className="mt-3 text-royalblue-200 font-semibold text-lg">
          {event?.price ? `$${event.price}` : "Free"}
        </p>

       
      </div>
    </div>
  );
}

export default CardHome;
