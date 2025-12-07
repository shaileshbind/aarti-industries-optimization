'use client'
import React, { useEffect, useRef, useState } from 'react'
import { BodyText1, BodyText2, H3, SubH2 } from '../Typography2'
import { FadeInGroup, FadeInRevealBlur, WordReveal } from '../ScrollReveal'
import Image from 'next/image'
import MainTimeline from './MainTimeline'
import MobilePhaseDropdown from './MobilePhaseDropdown'
import { gsap } from 'gsap'
import { TimelineData } from '../../types/our.story.type' // adjust import path if needed

export default function TimeLine({
 data
}: TimelineData) {
  const sectionTitle = data?.sectionTitle || "Our Journey";

  const phases = data?.milestone?.map((milestone) => ({
    title: `${milestone.name} (${milestone.date_range})`,
    years: milestone.timeline_milestones.map((item) =>
      parseInt(item.year.slice(0, 4))
    ),
    images: [
      "/images/our-story/old1.png",
      "/images/our-story/old2.png",
      "/images/our-story/old3.png",
    ],
  })) || [];

  const yearContent = data?.milestone?.reduce((acc, milestone) => {
    milestone.timeline_milestones.forEach((item) => {
      const numericYear = parseInt(item.year.slice(0, 4));
      acc[numericYear] = {
        title: item.title,
        description: item.description || "",
      };
    });
    return acc;
  }, {} as Record<number, { title: string; description: string }>);

  const [currentPhase, setCurrentPhase] = useState(0);
  const [currentYear, setCurrentYear] = useState(
    phases?.[0]?.years?.[0] || 0
  );

  const imagesContainerRef = useRef<HTMLDivElement>(null);
  const image1Ref = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);
  const image3Ref = useRef<HTMLDivElement>(null);

  const content = yearContent?.[currentYear] || { title: "", description: "" };
  const images = phases?.[currentPhase]?.images || [];

  // Handlers
  const handlePhaseClick = (index: number) => {
    setCurrentPhase(index);
    setCurrentYear(phases[index].years[0]);
  };
  const handleYearClick = (year: number) => setCurrentYear(year);
  const handleMobilePhaseSelect = (i: number) => handlePhaseClick(i);

  // Animation
  useEffect(() => {
    if (imagesContainerRef.current) {
      const tl = gsap.timeline();

      gsap.set([image1Ref.current, image2Ref.current, image3Ref.current], {
        opacity: 0,
        y: 30,
        scale: 0.9,
      });

      tl.to([image1Ref.current, image2Ref.current, image3Ref.current], {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    }
  }, [currentPhase]);

  return (
    <section className="overflow-hidden flex flex-col justify-between my-[50px] lg:mb-[100px] lg:mt-[50px] relative lg:pt-0 pt-4">
      <WordReveal className="fluid-container" stagger={0.1} fromY={10} duration={3}>
        <H3 className="lg:w-[35%] static lg:absolute lg:top-40 mb-5 lg:mb-[unset]">
          {sectionTitle}
        </H3>
      </WordReveal>

      <FadeInGroup
        stagger={0.2}
        className="absolute lg:right-[-170] right-10 top-36 lg:-top-10 z-0 pointer-events-none flex gap-0"
      >
        <h1 className="font-alte-hans text-gray-200 font-extralight lg:text-[550px] text-[200px]">
          {String(currentYear).slice(2, 3)}
        </h1>
        <h1 className="font-alte-hans text-gray-200 font-extralight lg:text-[550px] text-[200px]">
          {String(currentYear).slice(-1)}
        </h1>
      </FadeInGroup>

      <div className="flex justify-center flex-col-reverse lg:flex-row gap-16 items-center lg:items-end fluid-container">
        <div className="lg:w-[320px] h-fit lg:mb-9">
          <FadeInRevealBlur delay={0.1}>
            <BodyText2 className="text-orange-100 font-alte-hans">
              {currentYear}
            </BodyText2>
            <SubH2>{content.title}</SubH2>
            <BodyText1>{content.description}</BodyText1>
          </FadeInRevealBlur>
        </div>

        <div
          className="xl:w-[50%] w-full lg:gap-6 gap-2 align-baseline justify-center lg:justify-end flex lg:flex-wrap items-center xl:mr-20"
          ref={imagesContainerRef}
        >
          <div className="md:w-[295px] md:h-[340px] w-[170px] h-[196px]" ref={image1Ref}>
            <Image
              src={images[0]}
              alt={phases[currentPhase]?.title}
              height={340}
              width={295}
              className="h-full w-full object-cover lg:rounded-3xl rounded-xl"
            />
          </div>
          <div className="flex flex-col lg:gap-6 gap-2 justify-end" ref={image2Ref}>
            <div className="md:w-[239px] md:h-[200px] w-[144px] h-[130px] relative">
              <Image
                src={images[2]}
                alt={phases[currentPhase]?.title}
                fill
                className="h-full w-full object-cover lg:rounded-3xl rounded-xl"
              />
            </div>
            <div className="md:w-[217px] md:h-[220px] w-[135px] h-[121px]" ref={image3Ref}>
              <Image
                src={images[1]}
                alt={phases[currentPhase]?.title}
                height={220}
                width={217}
                className="h-full w-full object-cover lg:rounded-3xl rounded-xl"
              />
            </div>
          </div>
        </div>

        <div className="lg:hidden flex justify-center w-full mt-8 mb-4">
          <MobilePhaseDropdown
            phases={phases}
            activePhase={currentPhase}
            onPhaseSelect={handleMobilePhaseSelect}
          />
        </div>
      </div>

      <div className="fluid-container">
        <MainTimeline
          phases={phases}
          activePhase={currentPhase}
          activeYear={currentYear}
          onPhaseClick={handlePhaseClick}
          onYearClick={handleYearClick}
          onYearChange={setCurrentYear}
          onPhaseChange={setCurrentPhase}
        />
      </div>
    </section>
  )
}
