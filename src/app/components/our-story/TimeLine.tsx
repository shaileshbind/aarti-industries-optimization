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
      title: "Commercialised First NCB Facility",
      description: "Commercialised the first Nitro Chloro Benzenes (NCB) 1,200 TPA facility at Sarigram, marking a major step in the company’s manufacturing capabilities.",
    },
    1990: {
      title: "Expansion of NCB Operations",
      description: "Expanded with a 4,500 TPA NCB plant, AIL’s first large-scale organic facility in Vapi, enhancing production capacity and market reach.",
    },
    1992: {
      title: "Listed on BSE and NSE",
      description: "Between 1992 and 1995, Aarti Industries successfully listed on the Bombay Stock Exchange (BSE) and National Stock Exchange (NSE), broadening its investor base.",
    },
    1997: {
      title: "Hydrogenation and Nitration Facilities",
      description: "From 1997 to 2001, established pioneering hydrogenation and nitration facilities at Jhagadia, strengthening process excellence and operational efficiency.",
    },
    2004: {
      title: "Capacity Expansion and New Facilities",
      description: "Between 2004 and 2008, expanded NCB and sulphuric acid capacities and established a new specialty chemical facility at Kutch, advancing production capabilities.",
    },
    2011: {
      title: "Process Upgrade and USFDA Approval",
      description: "Between 2011 and 2012, upgraded the hydrogenation process to continuous, achieved USFDA approval for the Vapi Custom Synthesis unit, and began global bulk shipments.",
    },
    2013: {
      title: "Sustained Growth and Strategic Merger",
      description: "Merged the manufacturing division of Anushakti Chemicals and Drugs Ltd., surpassing the ₹2,000 crore revenue milestone, reinforcing growth momentum.",
    },
    2014: {
      title: "Process Modernization and Capacity Expansion",
      description: "Between 2014 and 2016, upgraded batch nitration to continuous, expanded NCB capacity to 75 KTPA, and commissioned an ethylation facility at Dahej SEZ.",
    },
    2017: {
      title: "Energy and Sustainability Initiatives",
      description: "Commissioned calcium chloride, cogeneration, and solar power plants, and started the Nitro Toluene plant, reflecting commitment to sustainability and diversification.",
    },
    2018: {
      title: "Strategic Global Partnerships",
      description: "Signed two large multi-year contracts with global conglomerates, solidifying long-term partnerships and strengthening global market presence.",
    },
    2019: {
      title: "Advancing Specialty Manufacturing",
      description: "Commissioned the nitrotoluene hydrogenation facility at Jhagadia and signed another multi-year contract with a global partner, expanding specialty product offerings.",
    },
    2020: {
      title: "Research and Technology Expansion",
      description: "Expanded agrochemical intermediates and specialty chemicals at Dahej SEZ, and launched the Aarti Research and Technology Centre in Navi Mumbai, enhancing R&D capabilities.",
    },
    2021: {
      title: "Commercialisation of Chlorination Unit",
      description: "Commercialised the new chlorination unit at Jhagadia, further broadening the company’s portfolio of chemical intermediates.",
    },
    2022: {
      title: "Pharma Demerger and New Contract Facility",
      description: "Demerged the Pharmaceutical business and commercialised the 2nd long-term contract facility, enhancing operational focus and growth in core segments.",
    },
    2023: {
      title: "Chlorination Expansion and New Supply Agreement",
      description: "Commercialised a specialty chlorination facility and signed a raw material supply deal with DFPCL for the 3rd long-term contract, ensuring robust supply chain integration.",
    },
    2024: {
      title: "Capacity Growth and Renewable Energy Milestones",
      description: "Expanded NCB capacity from 75 KTPA to 108 KTPA, commercialised Phase 1 of the acid unit revamp, commissioned a 13.2 MW hybrid renewable power plant, and signed two new multi-year contracts with global partners.",
    },
    2025: {
      title: "Strategic Joint Ventures and Major Expansions",
      description: "Entered into a joint venture with UPL for manufacturing and marketing of specialty chemicals, another with ReSl for plastic recycling development, signed agreement for an additional 27.5 MW hybrid renewable power, commissioned a new pilot plant at Zone IV, Jhagadia, expanded ethylation value chain projects, increased Nitro Toluene capacity to 45 KTPA, and completed MMA expansion to 200 KTPA.",
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
          {String(currentYear).slice(2, 3)}
        </h1>
        <h1 className='font-alte-hans text-gray-200 font-extralight lg:text-[550px] text-[200px]' data-scroll>
          {String(currentYear).slice(-1)}
        </h1>
      </FadeInGroup>

      <div className='flex justify-center flex-col-reverse lg:flex-row gap-16 items-end fluid-container'>

        <div className='lg:w-[32%] h-fit'>
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