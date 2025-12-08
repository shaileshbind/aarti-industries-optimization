"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { BodyText1, BodyText2, H3, SubH1, SubH2 } from '../Typography2';
import { ImpactStoriesSliderProps } from '@/app/types/social-health-and-safety.type';
import FaqAccordion from '../FaqAccordian';

const ImpactStoriesSlider = ({ data }: ImpactStoriesSliderProps) => {
  const { title, stories = [] } = data || {};
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [expanded, setExpanded] = useState<string | false>("panel0");
  const [active, setActive] = useState(0);
  const [accordionProgress, setAccordionProgress] = useState(0);
  const AUTOPLAY_DURATION = 4500;
  const ACCORDION_AUTOPLAY_DURATION = 4500;

  // Desktop slider progress
  useEffect(() => {
    if (!stories || stories.length === 0) return;
    
    setProgress(0);
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + (100 / (AUTOPLAY_DURATION / 50));
      });
    }, 50);

    const autoplayTimeout = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % stories.length);
    }, AUTOPLAY_DURATION);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(autoplayTimeout);
    };
  }, [activeIndex, stories.length]);

  useEffect(() => {
    if (!stories || stories.length === 0) return;
    
    setAccordionProgress(0);
    const progressInterval = setInterval(() => {
      setAccordionProgress((prev) => {
        if (prev >= 100) {
          // Move to next accordion when progress completes
          const nextIndex = (active + 1) % stories.length;
          setActive(nextIndex);
          setExpanded(`panel${nextIndex}`);
          return 0; // Reset progress
        }
        return prev + (100 / (ACCORDION_AUTOPLAY_DURATION / 50));
      });
    }, 50);

    return () => {
      clearInterval(progressInterval);
    };
  }, [active, stories.length]);

  // Early return if no stories (after hooks)
  if (!stories || stories.length === 0) {
    return null;
  }

  const handleSlideClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      const panelIndex = parseInt(panel.replace("panel", ""));
      if (isExpanded) {
        setActive(panelIndex);
        setExpanded(panel);
        setAccordionProgress(0); // Reset progress when user manually changes accordion
      }
    };
  return (
    <>
      <div className="hidden xl:block relative w-full h-[calc(100dvh-64px)] overflow-hidden bg-black mt-20 lg:mt-40">
        {/* Background Images with Fade Effect */}
        <div className="absolute inset-0">
          {stories?.map((item, index) => (
            <div
              key={`bg-${item.id}`}
              className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
              style={{
                opacity: index === activeIndex ? 1 : 0,
                backgroundImage: item.image?.url ? `url(${item.image.url})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
            </div>
          ))}
        </div>
        {/* Slider Container */}
        <div className="relative h-full flex ">
          <div className="w-full">
            {/* Decorative Header */}
            <div className="absolute top-0 left-0 p-20 z-10">
              <H3 className='text-white'>
                {title}
              </H3>
            </div>
            {/* Slides Grid */}
            <div className="flex h-full">
              {stories?.map((story, index) => {
                const isActive = index === activeIndex;
                const slideProgress = isActive ? progress : 0;
                return (
                  <div
                    key={story.id}
                    onClick={() => handleSlideClick(index)}
                    className={`
                    relative cursor-pointer group
                    transition-all duration-700 ease-out
                    ${isActive ? 'w-[40%]' : 'w-[20%]'}
                  `}

                  >
                    {/* Slide Card */}
                    <div
                      className={`
                      h-full  relative overflow-hidden transition-all duration-700 ease-out`}
                    >
                      {/* Content */}
                      <div className="relative h-full p-8 flex flex-col justify-between pt-50">

                        <div className={`flex flex-col ${isActive ? 'px-10' : ''}`}>
                          <div className={`text-white text-xs tracking-widest ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                            {String(index + 1).padStart(2, '0')}
                          </div>
                          <SubH2 className={`text-white mt-5 mb-4 ${isActive ? 'opacity-100' : 'opacity-60'}`}>{story.title}</SubH2>

                          <div
                            className={`
                            transition-all duration-700 overflow-hidden
                            ${isActive ? 'max-h-none opacity-100' : 'max-h-0 opacity-0'}
                          `}
                          >
                            <p className="text-white/80 leading-relaxed text-sm mb-6">
                              {story.description}
                            </p>
                            {story.items?.map((item) => (  
                              <div key={item.id}>
                                <BodyText1 className="text-white">{item.title}</BodyText1>
                                <BodyText2 className="text-white/80 leading-relaxed text-sm mb-6 mt-2">{item.description}</BodyText2> 
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* Slide Number for Inactive */}
                      </div>
                      {/* Vertical Progress Bar */}
                      <div className="absolute right-0 top-0 bottom-0 w-[1px]">
                        {/* Background track */}
                        <div className="absolute inset-0 bg-white/10 rounded-full" />

                        {/* Active progress */}
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-white/80 rounded-full  shadow-lg shadow-white/50"
                          style={{
                            height: `${slideProgress}%`,
                            opacity: isActive ? 1 : 0,
                          }}
                        />
                      </div>
                      {/* Hover Glow Effect */}
                      {!isActive && (
                        <div className="absolute inset-0 bg-gradient-to-t from-white/0 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {stories?.length > 0 && (
        <div className="block xl:hidden w-full px-[20px] pt-[0px] pb-[50px] lg:py-[70px]">
          <H3 className='my-5'>
                {title}
              </H3>
          {stories?.map((item, index) => (
            <div key={item.id} className="relative">
              <FaqAccordion
              imageClassName="min-w-[28px]"
                faqTitle={
                  <SubH1
                    className={
                      expanded === `panel${index}`
                        ? "text-orange-100"
                        : "text-gray-300"
                    }
                  >
                    {item.title}
                  </SubH1>
                }
                faqContent={
                  <div className="mt-[20px] mb-[30px]">
                    <div className="relative w-full h-[190px] xl:h-[200px] rounded-[14px] overflow-hidden">
                      {item?.image?.url && (
                        <>

                          <Image
                            src={item.image.url}
                            alt={
                              item.image.alternativeText || "img"
                            }
                            fill
                            className="object-cover object-top"
                          />

                        </>
                      )}
                    </div>
                    {item?.description && (
                      <BodyText1 className="mt-[10px]">
                        {item.description}
                      </BodyText1>
                    )}
                      <div className="flex flex-col gap-2 mt-5">
                        {item.items?.length > 0 &&
                          item.items?.map(
                            (item, index2) => (
                              <div
                                className="flex gap-2 flex-col"
                                key={"pointerss_" + index2}
                              >

                                <SubH2 className=" text-blue-200">{item.title}</SubH2>
                                <BodyText1 className="text-[#4C5861] text-sm">{item.description}</BodyText1>
                              </div>
                            )
                          )}
                      </div>
                  </div>
                }
                showIcon
                expanded={expanded === `panel${index}`}
                handleChange={handleChange(`panel${index}`)}
                className="!mb-0"
              />
              {/* Grey line */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-200" />
              {/* Orange progress bar only for active accordion */}
              {index === active && (
                <div
                  className="absolute bottom-0 left-0 h-[2px] bg-orange-200 z-10"
                  style={{
                    width: `${accordionProgress}%`,
                    transition: "none",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}

    </>
  );
};

export default ImpactStoriesSlider;