"use client";
import React, { useRef, useLayoutEffect, useState } from "react";
import { H2, SubH2 } from "../Typography2";
import Image from "next/image";
import MainAccordion from "../Accordion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function InvestingInPotential() {
  const [activeCard, setActiveCard] = useState(0);
  const [expanded, setExpanded] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<HTMLDivElement[]>([]);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const prevIndexRef = useRef(0);

  const cardData = [
    {
      title: "Capability Building",
      description:
        "We empower our people to learn with purpose, perform with confidence, and lead with impact. Through ATOMS, our digital learning platform, employees chart their own growth journeys and access self-paced learning opportunities across five streams — Functional (technical expertise and cross-functional excellence), Behavioural (guided by the Aarti Leadership Competency Framework), Systems (digital tools, and plant management systems), Sustainability (high standards of safety, and environmental responsibility), and Compliance (regulatory norms, ethical conduct, and quality standards)",
      image: {
        url: "/images/thrive-at-aarti/banner.png",
        alternativeText: "banner",
      },
    },
    {
      title: "Talent & Leadership Development",
      description:
        "Talent We empower our people to learn with purpose, perform with confidence, and lead with impact. Through ATOMS, our digital learning platform, employees chart their own growth journeys and access self-paced learning opportunities across five streams — Functional (technical expertise and cross-functional excellence), Behavioural (guided by the Aarti Leadership Competency Framework), Systems (digital tools, and plant management systems), Sustainability (high standards of safety, and environmental responsibility), and Compliance (regulatory norms, ethical conduct, and quality standards)",
      image: {
        url: "/images/thrive-at-aarti/banner2.png",
        alternativeText: "banner",
      },
    },
    {
      title: "Prioritizing Internal Talent",
      description:
        "Prioritizing We empower our people to learn with purpose, perform with confidence, and lead with impact. Through ATOMS, our digital learning platform, employees chart their own growth journeys and access self-paced learning opportunities across five streams — Functional (technical expertise and cross-functional excellence), Behavioural (guided by the Aarti Leadership Competency Framework), Systems (digital tools, and plant management systems), Sustainability (high standards of safety, and environmental responsibility), and Compliance (regulatory norms, ethical conduct, and quality standards)",
      image: {
        url: "/images/thrive-at-aarti/banner3.png",
        alternativeText: "banner",
      },
    },
  ];

  // 🔹 Animation function for image transition
  const animateImageTransition = (newIndex: number, direction: number) => {
    const incoming = imageRefs.current[newIndex];
    const outgoing = imageRefs.current[prevIndexRef.current];

    if (newIndex === prevIndexRef.current || !incoming || !outgoing) return;

    // Animate outgoing image
    gsap.to(outgoing, {
      clipPath: direction > 0 ? "inset(0% 0% 100% 0%)" : "inset(100% 0% 0% 0%)",
      duration: 0.6,
      ease: "power2.in",
    });

    // Animate incoming image
    gsap.fromTo(
      incoming,
      {
        clipPath:
          direction > 0 ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
      },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.6,
        ease: "power2.out",
      }
    );

    prevIndexRef.current = newIndex;
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const total = cardData.length;
      const scrollDistance = window.innerHeight * total * 0.8;

      // Initialize clip paths
      imageRefs.current.forEach((el, i) => {
        gsap.set(el, {
          clipPath: i === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
        });
      });

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 10%",
        end: `+=${scrollDistance}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate(self) {
          const progress = self.progress;
          let idx = Math.floor(progress * total);
          idx = Math.min(Math.max(idx, 0), total - 1);

          if (idx !== prevIndexRef.current) {
            setExpanded(idx);
            setActiveCard(idx);
            animateImageTransition(idx, self.direction);
          }
        },
      });

      scrollTriggerRef.current = st;

      return () => {
        st.kill();
      };
    }, wrapperRef);

    return () => ctx.revert();
  }, [cardData.length]);

  return (
    <div ref={wrapperRef}>
      <div
        ref={containerRef}
        className="h-[calc(100vh-70px)] relative overflow-hidden"
      >
        {/* Vertical Line */}
        <div className="w-[1px] h-full bg-gray-500 absolute right-[7%] top-0 z-[2]" />

        {/* Accordion Section */}
        <div className="relative z-[2]">
          <H2 className="text-white py-[32px] max-w-[449px] fluid-container">
            Investing in Potential, Investing in Excellence
          </H2>

          {cardData.map((item, index) => (
            <div
              key={index}
              className={`relative potential-accordion ${
                expanded === index ? "is-expanded" : ""
              }`}
            >
              <MainAccordion
                borderBottom={
                  cardData.length - 1 !== index ? "1px solid gray" : "none"
                }
                expanded={expanded === index}
                showIcon={false}
                onChange={() => {
                  // Just update state and animate - NO scrolling
                  const direction = index > prevIndexRef.current ? 1 : -1;

                  setExpanded(index);
                  setActiveCard(index);
                  animateImageTransition(index, direction);
                }}
                title={
                  <SubH2 className="text-white py-2 fluid-container">
                    <span className="mr-[50px]">{`0${index + 1}`}</span>
                    {item.title}
                  </SubH2>
                }
              >
                <div className="flex justify-end -mt-12 pr-40">
                  <p className="text-white w-[45%] text-base pb-4">
                    {item.description}
                  </p>
                </div>
              </MainAccordion>
            </div>
          ))}
        </div>

        {/* Background Images */}
        <div className="absolute inset-0 z-[0]">
          {cardData.map((item, index) => (
            <div
              key={`image-${index}`}
              ref={(el) => {
                if (el) imageRefs.current[index] = el;
              }}
              className="absolute inset-0"
              style={{ zIndex: activeCard === index ? 2 : 1 }}
            >
              <Image
                src={item.image.url}
                alt={item.image.alternativeText}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
