"use client";
import React, { useState } from "react";
import { EventsListingProps } from "@/app/types/events-and-webinars.type";
import EventCard from "./EventCard";
import EventPopup from "./EventPopup";
import Popup from "../Popup";
import { H2 } from "../Typography2";
import clsx from "clsx";

const EventsListing = ({ data, pastEvent = false }: EventsListingProps) => {
  const [selectedEvent, setSelectedEvent] = useState<EventsListingProps['data']['events'][0] | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleButtonClick = (event: EventsListingProps['data']['events'][0]) => {
    setSelectedEvent(event);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedEvent(null);
  };

  return (
    <>
      <section className="py-[40px] lg:py-[60px]">
        <div className="container">
          <H2 className=" mb-[30px]">{data?.title}</H2>
          <div className={clsx('grid   gap-4 gap-y-[25px]', pastEvent ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3')}>
            {data?.events?.map((event) => (
              <EventCard 
                key={event?.title} 
                event={event} 
                pastEvent={pastEvent}
                onButtonClick={ !pastEvent ? undefined : () => handleButtonClick(event)}
              />
            ))}
          </div>
        </div>
      </section>

      {selectedEvent && (
        <Popup isOpen={isPopupOpen} onOverlayClick={handleClosePopup}>
          <EventPopup event={selectedEvent} />
        </Popup>
      )}
    </>
  );
};

export default EventsListing;
