"use client";
import { useEffect, useRef, useState } from "react";
import { BodyText1, BodyText2, H3, SubH2 } from "../Typography2";
import { FadeInRevealBlur } from "../ScrollReveal";
import Image from "next/image";
import MainTimeline from "./MainTimeline";
import MobilePhaseDropdown from "./MobilePhaseDropdown";
import { gsap } from "gsap";
import { TimelineData } from "../../types/our.story.type";

export default function TimeLine({ data }: TimelineData) {
  const sectionTitle = data?.sectionTitle || "Our Journey";

  const phases =
    data?.milestone?.map((milestone) => ({
      title: `${milestone.name} (${milestone.date_range})`,
      years: milestone.timeline_milestones.map((item) => item.year),
      images: milestone.images?.map((image) => image?.url) || [],
    })) || [];

  const yearContent = data?.milestone?.reduce(
    (acc, milestone) => {
      milestone.timeline_milestones.forEach((item) => {
        const yearStr = item.year;
        acc[yearStr] = {
          title: item.title,
          description: item.description || "",
          note: item.note || "",
        };
      });
      return acc;
    },
    {} as Record<string, { title: string; description: string; note: string }>,
  );

  const [currentPhase, setCurrentPhase] = useState(0);
  const [currentYear, setCurrentYear] = useState<string>(
    phases?.[0]?.years?.[0] || "",
  );

  const imagesContainerRef = useRef<HTMLDivElement>(null);
  const image1Ref = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);
  const image3Ref = useRef<HTMLDivElement>(null);

  // Refs for content animation
  const yearRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const isInitialRender = useRef(true);

  // Refs for large background year numbers
  const yearDigit1Ref = useRef<HTMLHeadingElement>(null);
  const yearDigit2Ref = useRef<HTMLHeadingElement>(null);
  const isInitialYearRender = useRef(true);

  const content = yearContent?.[currentYear] || {
    title: "",
    description: "",
    note: "",
  };
  const images = phases?.[currentPhase]?.images || [];

  // Handlers
  const handlePhaseClick = (index: number) => {
    setCurrentPhase(index);
    setCurrentYear(phases[index].years[0]);
  };
  const handleYearClick = (year: string) => setCurrentYear(year);
  const handleMobilePhaseSelect = (i: number) => handlePhaseClick(i);

  // Animation for images
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

  // Animation for content changes (year, title, description)
  useEffect(() => {
    if (yearRef.current && titleRef.current && descriptionRef.current) {
      // Set initial state on first render (no animation)
      if (isInitialRender.current) {
        gsap.set([yearRef.current, titleRef.current, descriptionRef.current], {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
        });
        isInitialRender.current = false;
        return;
      }

      const tl = gsap.timeline();

      // Fade out current content
      tl.to([yearRef.current, titleRef.current, descriptionRef.current], {
        autoAlpha: 0,
        y: 20,
        filter: "blur(8px)",
        duration: 0.3,
        ease: "power2.in",
      })
        // Fade in new content
        .to([yearRef.current, titleRef.current, descriptionRef.current], {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
        });
    }
  }, [currentYear, content.title, content.description]);

  // Animation for large background year numbers
  useEffect(() => {
    if (yearDigit1Ref.current && yearDigit2Ref.current) {
      // Set initial state on first render (no animation)
      if (isInitialYearRender.current) {
        gsap.set([yearDigit1Ref.current, yearDigit2Ref.current], {
          autoAlpha: 1,
        });
        isInitialYearRender.current = false;
        return;
      }

      const tl = gsap.timeline();

      // Fade out and scale down current year digits
      tl.to([yearDigit1Ref.current, yearDigit2Ref.current], {
        autoAlpha: 0,
        duration: 0.3,
        ease: "power2.in",
      })
        // Fade in and scale up new year digits
        .to([yearDigit1Ref.current, yearDigit2Ref.current], {
          autoAlpha: 1,
          duration: 0.3,
          ease: "power3.out",
        });
    }
  }, [currentYear]);

  return (
    <section className="overflow-hidden flex flex-col justify-between my-[50px] lg:mb-[100px] lg:mt-[80px] relative lg:pt-0 pt-4">
      <FadeInRevealBlur className="fluid-container">
        <div className="lg:w-[35%] static lg:absolute lg:top-10 mb-5 lg:mb-[unset]">
          <H3>{sectionTitle}</H3>
        </div>
      </FadeInRevealBlur>

      {/* Large Background Numbers */}
      <div className="absolute lg:right-[-170px] right-10 top-33 lg:-top-48 z-0 pointer-events-none flex gap-0">
        <h1
          ref={yearDigit1Ref}
          className="font-inter text-gray-200 lg:text-[550px] text-[170px] font-bold"
        >
          {currentYear.slice(2, 3)}
        </h1>
        <h1
          ref={yearDigit2Ref}
          className="font-inter text-gray-200 lg:text-[550px] text-[170px] font-bold"
        >
          {currentYear.slice(-1)}
        </h1>
      </div>

      <div className="flex justify-center flex-col-reverse lg:flex-row gap-16 items-start md:items-center lg:items-end fluid-container">
        <div className="lg:w-[420px] h-fit lg:mb-6">
          <div ref={yearRef}>
            <BodyText2 className="text-orange-100 font-alte-hans">
              {currentYear}
            </BodyText2>
          </div>
          <div ref={titleRef}>
            <SubH2 className="capitalize">{content.title}</SubH2>
          </div>
          <div ref={descriptionRef}>
            <BodyText1>{content.description}</BodyText1>
          </div>

          {content?.note && (
            <div
              dangerouslySetInnerHTML={{ __html: content?.note }}
              className="ourStoryNote text-xs pt-2 text-grey-400 font-medium"
            />
          )}
        </div>

        <div
          className="xl:w-[50%] w-full lg:gap-6 gap-2 align-baseline justify-center lg:justify-end flex lg:flex-wrap items-center xl:mr-20"
          ref={imagesContainerRef}
        >
          <div
            className="md:w-[295px] md:h-[340px] w-[170px] h-[196px]"
            ref={image1Ref}
          >
            <Image
              src={images[0]}
              alt={phases[currentPhase]?.title}
              height={340}
              width={295}
              className="h-full w-full object-cover lg:rounded-3xl rounded-xl"
            />
          </div>
          <div
            className="flex flex-col lg:gap-6 gap-2 justify-end"
            ref={image2Ref}
          >
            <div className="md:w-[239px] md:h-[200px] w-[144px] h-[130px] relative">
              <Image
                src={images[2]}
                alt={phases[currentPhase]?.title}
                fill
                className="h-full w-full object-cover lg:rounded-3xl rounded-xl"
              />
            </div>
            <div
              className="md:w-[217px] md:h-[220px] w-[135px] h-[121px]"
              ref={image3Ref}
            >
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
  );
}
