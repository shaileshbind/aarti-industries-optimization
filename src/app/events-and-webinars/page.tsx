import React from "react";
import EventsBanner from "../components/events-and-webinars/eventsBanner";
import EventsListing from "../components/events-and-webinars/EventsListing";
import SEO from "../components/SEO";
import { getPageData } from "@/_lib/pageData.fetch";
import { getData } from "@/_lib/getData.fetch";
import PodcastListing from "../components/events-and-webinars/PodcastListing";
import VideoScrollBarContainer from "../components/manufacturing-capabilities/VideoScrollBarContainer";
import GloballyCertified from "../components/GloballyCertified";
import ContactBanner from "../components/ContactBanner";

export const dynamic = "force-dynamic";

export default async function page() {
  const currentDate = new Date().toISOString();
  const data = await getPageData("/pages/by-slug/events-and-webinars");
  const upcomingEventsData = await getData(`/events?sort[0]=title:asc&sort[1]=date:asc&filters[date][$gte]=${currentDate}&populate[eventGallery][fields][0]=url&populate[eventGallery][fields][1]=alternativeText&populate[eventGallery][fields][2]=mime&populate[eventGallery][fields][3]=ext&populate[image][fields][0]=url&populate[image][fields][1]=alternativeText&populate[image][fields][2]=mime&populate[image][fields][3]=ext&populate[mobImage][fields][0]=url&populate[mobImage][fields][1]=alternativeText&populate[mobImage][fields][2]=mime&populate[mobImage][fields][3]=ext&pagination[pageSize]=10&pagination[page]=1&status=published`);
  const podcastsData = await getData("/podcasts?sort[0]=title:asc&sort[1]=date:desc&populate[image][fields][0]=url&populate[image][fields][1]=alternativeText&populate[image][fields][2]=mime&populate[image][fields][3]=ext&populate[mobImage][fields][0]=url&populate[mobImage][fields][1]=alternativeText&populate[mobImage][fields][2]=mime&populate[mobImage][fields][3]=ext&populate[file][fields][0]=url&populate[file][fields][1]=alternativeText&populate[file][fields][2]=mime&populate[file][fields][3]=ext&pagination[pageSize]=10&pagination[page]=1&status=published");
  const webinarsData = await getData("/webinars?sort[0]=title%3Aasc&sort[1]=date%3Adesc&populate[image][fields][0]=url&populate[image][fields][1]=alternativeText&populate[image][fields][2]=mime&populate[image][fields][3]=ext&populate[mobImage][fields][0]=url&populate[mobImage][fields][1]=alternativeText&populate[mobImage][fields][2]=mime&populate[mobImage][fields][3]=ext&populate[media][fields][0]=url&populate[media][fields][1]=alternativeText&populate[media][fields][2]=mime&populate[media][fields][3]=ext&pagination[pageSize]=10&pagination[page]=1&status=published'");
  const pastEventsData = await getData(`/events?sort[0]=title:asc&sort[1]=date:asc&filters[date][$lt]=${currentDate}&populate[eventGallery][fields][0]=url&populate[eventGallery][fields][1]=alternativeText&populate[eventGallery][fields][2]=mime&populate[eventGallery][fields][3]=ext&populate[image][fields][0]=url&populate[image][fields][1]=alternativeText&populate[image][fields][2]=mime&populate[image][fields][3]=ext&populate[mobImage][fields][0]=url&populate[mobImage][fields][1]=alternativeText&populate[mobImage][fields][2]=mime&populate[mobImage][fields][3]=ext&pagination[pageSize]=10&pagination[page]=1&status=published`);
  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*"
  );
  console.log("upcomingEventsData::::", upcomingEventsData);

  const { 
    section_one, 
    section_two, 
    section_three,
    section_four,
    section_five,
    section_six
    } = data?.data;
  const seo = data?.seo;
  
  return (
    <div>
      <SEO
        title={seo?.title ?? "Events & Webinars"}
        metaTitle={seo?.metaTitle}
        metaDescription={seo?.metaDescription}
        keywords={seo?.keywords}
        canonical={seo?.canonical ?? "https://www.aarti-industries.com/events-and-webinars"}
        robots={seo?.robots ?? "index, follow"}
        ogURL={seo?.ogURL}
        ogImg={seo?.ogImg?.url}
        ogTitle={seo?.ogTitle}
        ogDesc={seo?.ogDesc}
        twtUrl={seo?.twtUrl}
        twtImg={seo?.twtImg?.url}
        twtTitle={seo?.twtTitle}
        twtDesc={seo?.twtDesc}
        schemaData={seo?.schemaData}
      />

      {section_one && <EventsBanner data={section_one} />}  
        {section_two && <EventsListing data={section_two} upcomingEventsData={upcomingEventsData} />}
      {section_three && <PodcastListing data={section_three} podcastsData={podcastsData} />}
      {section_four && (
        <div className="py-[40px] lg:py-[60px]">
          <VideoScrollBarContainer data={section_four} webinarsData={webinarsData} />
        </div>
      )}
      {section_five && <EventsListing data={section_five} upcomingEventsData={pastEventsData} pastEvent={true} />} 
      
      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}

      {section_six && <ContactBanner data={section_six} />}  
    </div>
  );
}
