'use client'
import React, { useEffect, useRef, useState } from 'react'
import { BodyText1, BodyText2, H3, SubH2 } from '../Typography2'
import { FadeInGroup, FadeInRevealBlur, WordReveal } from '../ScrollReveal'
import Image from 'next/image'
import MainTimeline from './MainTimeline'
import MobilePhaseDropdown from './MobilePhaseDropdown'
import { gsap } from 'gsap'

function TimeLine() {

  interface YearContent {
    title: string;
    description: string;
  }

  interface YearContentMap {
    [key: number]: YearContent;
  }

  interface Phase {
    title: string;
    years: number[];
    images?: string[];
  }

  // Year-specific content data
  const yearContent: YearContentMap = {
    1984: {
      title: "Established as Aarti Organics Private Limited",
      description: "Founded with a vision to become a leader in specialty chemicals, Aarti Organics began its journey with a small manufacturing unit in Vapi, Gujarat.",
    },
    1986: {
      title: "First Major Export Order",
      description: "Secured first international client, marking the beginning of global expansion. Started exporting benzene-based intermediates to European markets.",
    },
    1990: {
      title: "ISO Certification Achievement",
      description: "Became one of the first Indian chemical companies to receive ISO 9001 certification, establishing quality standards that continue to this day.",
    },
    1992: {
      title: "IPO and Public Listing",
      description: "Successfully listed on the Bombay Stock Exchange, raising capital for expansion and modernization of manufacturing facilities.",
    },
    1997: {
      title: "Backward Integration Initiative",
      description: "Implemented backward integration strategy, establishing in-house production of key raw materials to ensure supply chain stability.",
    },
    2004: {
      title: "New Manufacturing Facility",
      description: "Commissioned state-of-the-art manufacturing plant in Jhagadia, Gujarat, doubling production capacity for specialty chemicals.",
    },
    2011: {
      title: "Global Partnership Expansion",
      description: "Formed strategic alliances with leading global chemical companies, strengthening position in international markets.",
    },
    2013: {
      title: "Green Chemistry Initiative",
      description: "Launched comprehensive sustainability program, implementing eco-friendly manufacturing processes and waste reduction systems.",
    },
    2014: {
      title: "R&D Center Inauguration",
      description: "Opened advanced Research & Development center with 50+ scientists, focusing on innovation in specialty chemicals.",
    },
    2015: {
      title: "Capacity Expansion Program",
      description: "Invested $100 million in capacity expansion, adding new production lines for high-value pharmaceutical intermediates.",
    },
    2016: {
      title: "Industry Recognition",
      description: "Received 'Chemical Company of the Year' award, recognizing excellence in manufacturing and sustainable practices.",
    },
    2018: {
      title: "Digital Transformation",
      description: "Implemented Industry 4.0 technologies across manufacturing facilities, enhancing efficiency and quality control.",
    },
    2019: {
      title: "Specialty Chemicals Focus",
      description: "Strategically shifted focus to high-margin specialty chemicals, divesting from commodity chemical business.",
    },
    2020: {
      title: "Pandemic Response Excellence",
      description: "Maintained uninterrupted supply chain during COVID-19, supporting global pharmaceutical industry with critical intermediates.",
    },
    2021: {
      title: "Carbon Neutral Commitment",
      description: "Announced ambitious target to achieve carbon neutrality by 2030, investing in renewable energy and green technologies.",
    },
    2023: {
      title: "AI-Powered Operations",
      description: "Integrated artificial intelligence in production planning and quality assurance, achieving 99.9% quality consistency.",
    },
    2025: {
      title: "Future-Ready Infrastructure",
      description: "Completed construction of next-generation manufacturing complex, positioning for leadership in advanced materials.",
    },
  };

  const phases: Phase[] = [
    {
      title: "Laying the Roots (1984–2012)",
      years: [1984, 1986, 1990, 1992, 1997, 2004, 2011],
      images: ["/images/our-story/old1.png", "/images/our-story/old2.png", "/images/our-story/old3.png"]
    },
    {
      title: "Sustained Growth (2013–2018)",
      years: [2013, 2014, 2015, 2016, 2018],
      images: ["/images/our-story/old1.png", "/images/our-story/our-story-banner.png", "/images/our-story/old3.png"]
    },
    {
      title: "Branching into the Future (2019–2025)",
      years: [2019, 2020, 2021, 2023, 2025],
      images: ["/images/our-story/old1.png", "/images/our-story/old2.png", "/images/our-story/old3.png"]
    },
  ];

  const [currentYear, setCurrentYear] = useState<number>(1984);
  const [currentPhase, setCurrentPhase] = useState<number>(0);

  // Refs for GSAP animation
  const imagesContainerRef = useRef<HTMLDivElement>(null);
  const image1Ref = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);
  const image3Ref = useRef<HTMLDivElement>(null);

  const content: YearContent = yearContent[currentYear] || yearContent[1984];
  const images: string[] = phases[currentPhase].images || phases[0].images || [];

  // Handler for mobile phase selection
  const handleMobilePhaseSelect = (phaseIndex: number) => {
    setCurrentPhase(phaseIndex);
    setCurrentYear(phases[phaseIndex].years[0]);
  };

  // Handler for phase click from timeline
  const handlePhaseClick = (phaseIndex: number) => {
    setCurrentPhase(phaseIndex);
    setCurrentYear(phases[phaseIndex].years[0]);
  };

  // Handler for year click from timeline
  const handleYearClick = (year: number) => {
    setCurrentYear(year);
  };

  // GSAP Animation on phase change
  useEffect(() => {
    if (imagesContainerRef.current) {
      const tl = gsap.timeline();

      gsap.set([image1Ref.current, image2Ref.current, image3Ref.current], {
        opacity: 0,
        y: 30,
        scale: 0.9
      });

      tl.to([image1Ref.current, image2Ref.current, image3Ref.current], {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        clearProps: "all"
      });

      tl.to([image1Ref.current, image2Ref.current, image3Ref.current], {
        rotation: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.inOut"
      }, "-=0.6");
    }
  }, [currentPhase]);

  return (
    <section className='overflow-hidden flex flex-col justify-between my-[50px] lg:my-[100px] relative lg:pt-32 pt-4'>
      <WordReveal className='fluid-container' stagger={0.1} fromY={10} duration={3}>
        <H3 className='lg:w-[35%] static lg:absolute lg:top-24 mb-5 lg:mb-[unset]'>
          Decades of Discovery and Growth in the Chemical Industry
        </H3>
      </WordReveal>

      <FadeInGroup stagger={0.2} className='absolute lg:right-[-170] right-[-10] top-11 z-0 pointer-events-none flex gap-0'>
        <h1 className='font-alte-hans text-gray-200 font-extralight lg:text-[550px] text-[200px]' data-scroll>
          {String(currentYear).slice(2,3)}
        </h1>
        <h1 className='font-alte-hans text-gray-200 font-extralight lg:text-[550px] text-[200px]' data-scroll>
          {String(currentYear).slice(-1)}
        </h1>
      </FadeInGroup>

      <div className='flex justify-center flex-col-reverse lg:flex-row gap-16 items-end fluid-container'>

        <div className='lg:w-[25%] h-fit'>
          <FadeInRevealBlur delay={0.1}>
            <BodyText2 className="text-orange-100 font-alte-hans">
              {currentYear}
            </BodyText2>
            <SubH2>{content.title}</SubH2>
            <BodyText1>{content.description}</BodyText1>
          </FadeInRevealBlur>
        </div>

        {/* Timeline Component - handles its own mobile/desktop views */}
        <div className='block lg:hidden w-full'>
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

        <div
          className='lg:w-[50%] w-full lg:gap-6 gap-2 align-baseline justify-center lg:justify-end flex lg:flex-wrap'
          ref={imagesContainerRef}
        >
          <div className='lg:w-[295px] lg:h-[340px] w-[170px] h-[196px] lg:mt-16 mt-10' ref={image1Ref}>
            <Image
              src={images[0] || "/images/our-story/old1.png"}
              alt={`${phases[currentPhase].title} - Image 1`}
              height={340}
              width={295}
              className="h-full w-full object-cover lg:rounded-3xl rounded-xl"
            />
          </div>
          <div className='flex flex-col lg:gap-6 gap-2 justify-end' ref={image2Ref}>
            <div className='lg:w-[239px] lg:h-[200px] w-[144px] h-[130px] relative'>
              <Image
                src={images[2] || "/images/our-story/old3.png"}
                alt={`${phases[currentPhase].title} - Image 3`}
                fill
                className="h-full w-full object-cover lg:rounded-3xl rounded-xl"
              />
            </div>
            <div className='lg:w-[217px] lg:h-[220px] w-[135px] h-[121px]' ref={image3Ref}>
              <Image
                src={images[1] || "/images/our-story/old2.png"}
                alt={`${phases[currentPhase].title} - Image 2`}
                height={220}
                width={217}
                className="h-full w-full object-cover lg:rounded-3xl rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Mobile Phase Dropdown - Only visible on mobile */}
        <div className="lg:hidden flex justify-center w-full mt-8 mb-4">
          <MobilePhaseDropdown
            phases={phases}
            activePhase={currentPhase}
            onPhaseSelect={handleMobilePhaseSelect}
          />
        </div>
      </div>

      {/* Timeline Component - handles its own mobile/desktop views */}
      <div className='hidden lg:block fluid-container'>
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

export default TimeLine