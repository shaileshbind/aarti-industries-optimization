"use client";
import { useState, useMemo, useEffect } from "react";
import {
  EventsListingProps,
  UpcomingEventData,
} from "@/app/types/events-and-webinars.type";
import EventCard from "./EventCard";
import EventPopup from "./EventPopup";
import Popup from "../Popup";
import { H2 } from "../Typography2";
import clsx from "clsx";
import { ButtonProps } from "@/app/types/global.type";

const EventCardSkeleton = ({ pastEvent = false }: { pastEvent?: boolean }) => (
  <div className="animate-pulse">
    <div className="relative w-full aspect-[424/313] rounded-[10px] bg-grey-200" />
    <div className="mt-[16px]">
      <div className="h-3 w-28 rounded bg-grey-200 mb-[8px]" />
      <div className="h-5 w-3/4 rounded bg-grey-200 mb-[8px]" />
      <div className="h-4 w-1/2 rounded bg-grey-200 mb-[8px]" />
      {!pastEvent && (
        <>
          <div className="h-3 w-full rounded bg-grey-200 mb-[4px]" />
          <div className="h-3 w-2/3 rounded bg-grey-200 mb-[12px]" />
          <div className="h-10 w-32 rounded-full bg-grey-200" />
        </>
      )}
      {pastEvent && <div className="h-4 w-24 rounded bg-grey-200" />}
    </div>
  </div>
);

// Helper function to format date from ISO string to readable format
const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  } catch {
    return dateString;
  }
};

// Type for event data that can be displayed in EventCard and EventPopup
type DisplayEvent = {
  title: string;
  date: string;
  end_date: string;
  location: string;
  description: string;
  image: { url: string; alternativeText: string };
  mobImage: { url: string; alternativeText: string };
  ctaButton?: ButtonProps;
  gallery?: { url: string; alternativeText: string }[];
};

// Transform API event data to component format
const transformEventData = (event: UpcomingEventData): DisplayEvent => {
  // Use first gallery image as fallback if image/mobImage is null
  const fallbackImage =
    event.eventGallery && event.eventGallery.length > 0
      ? {
          url: event.eventGallery[0].url,
          alternativeText: event.eventGallery[0].alternativeText || event.title,
        }
      : { url: "", alternativeText: event.title };

  const image = event.image
    ? {
        url: event.image.url,
        alternativeText: event.image.alternativeText || event.title,
      }
    : fallbackImage;

  const mobImage = event.mobImage
    ? {
        url: event.mobImage.url,
        alternativeText: event.mobImage.alternativeText || event.title,
      }
    : fallbackImage;

  // Create CTA button from available CTA fields
  let ctaButton: ButtonProps | undefined = undefined;
  if (event.galleryCtaTitle && event.galleryCtaLink) {
    ctaButton = {
      title: event.galleryCtaTitle,
      link: { link: event.galleryCtaLink, target: "_blank" },
      hasExternalLink: "false",
    };
  } else if (event.globalTeamCtaTitle && event.globalTeamCtaLink) {
    ctaButton = {
      title: event.globalTeamCtaTitle,
      link: { link: event.globalTeamCtaLink, target: "_blank" },
      hasExternalLink: "false",
    };
  }

  // Transform gallery for popup
  const gallery = event.eventGallery?.map((img) => ({
    url: img.url,
    alternativeText: img.alternativeText || event.title,
  }));

  return {
    title: event.title,
    date: formatDate(event.date),
    end_date: event.end_date ? formatDate(event.end_date) : "",
    location: event.location,
    description: event.description,
    image,
    mobImage,
    ctaButton,
    gallery,
  };
};

const EventsListing = ({
  data,
  pastEvent = false,
  upcomingEventsData,
}: EventsListingProps) => {
  const [selectedEvent, setSelectedEvent] = useState<DisplayEvent | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  // Transform upcoming events data if available
  // Handle both direct API response structure and getPageData wrapped structure
  const transformedEvents = useMemo(() => {
    // Check if data is wrapped in pressData (from getPageData)
    let eventsData: UpcomingEventData[] | undefined;

    // getData returns the array directly, so check if it's already an array
    if (Array.isArray(upcomingEventsData)) {
      eventsData = upcomingEventsData;
    } else if (upcomingEventsData && "pressData" in upcomingEventsData) {
      eventsData = upcomingEventsData.pressData?.data;
    } else if (upcomingEventsData && "data" in upcomingEventsData) {
      eventsData = upcomingEventsData.data;
    }

    if (Array.isArray(eventsData) && eventsData.length > 0) {
      return eventsData.map(transformEventData);
    }
    return [];
  }, [upcomingEventsData]);

  // Use transformed events if available, otherwise fall back to data.events
  const eventsToDisplay = useMemo((): DisplayEvent[] => {
    if (transformedEvents.length > 0) {
      return transformedEvents;
    }
    // Transform legacy events to DisplayEvent format

    return (data?.events || []).map((event) => ({
      title: event.title,
      date: event.date || "",
      end_date: event.end_date || "",
      location: event.location || "",
      description: event.description || "",
      image: event.image,
      mobImage: event.mobImage,
      ctaButton: event.ctaButton
        ? {
            title: event.ctaButton.title,
            link: event.ctaButton.link,
            externalLink:
              event.ctaButton.hasExternalLink == "true"
                ? event.ctaButton.externalLink
                : event.ctaButton.link?.link,
          }
        : undefined,
      gallery: undefined, // Legacy events might not have gallery
    }));
  }, [transformedEvents, data?.events]);

  const handleButtonClick = (event: DisplayEvent) => {
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
          <div
            className={clsx(
              "grid   gap-4 gap-y-[25px]",
              pastEvent
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
            )}
          >
            {!hydrated || eventsToDisplay.length === 0
              ? Array.from({ length: pastEvent ? 4 : 3 }).map((_, i) => (
                  <EventCardSkeleton key={i} pastEvent={pastEvent} />
                ))
              : eventsToDisplay.map((event, index) => (
                  <EventCard
                    key={event.title + index}
                    event={{
                      title: event.title,
                      date: event.date,
                      end_date: event.end_date,
                      location: event.location,
                      description: event.description,
                      image: event.image,
                      mobImage: event.mobImage,
                      ctaButton: event.ctaButton as ButtonProps,
                    }}
                    pastEvent={pastEvent}
                    onButtonClick={
                      !pastEvent ? undefined : () => handleButtonClick(event)
                    }
                  />
                ))}
          </div>
        </div>
      </section>

      {selectedEvent && (
        <Popup
          isOpen={isPopupOpen}
          onOverlayClick={handleClosePopup}
          className="!py-14 !w-[90%] max-w-[1156px]"
        >
          <EventPopup event={selectedEvent} />
        </Popup>
      )}
    </>
  );
};

export default EventsListing;
