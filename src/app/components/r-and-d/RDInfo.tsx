"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { H2, H3, BodyText2 } from "../Typography2";
import { FadeInRevealBlur } from "../ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const RDInfo = () => {
  // const wrapperRef = useRef(null);
  // const topLineRef = useRef(null);
  // useEffect(() => {
  //   const ctx = gsap.context(() => {
  //     gsap.fromTo(
  //       topLineRef.current,
  //       { scaleY: 0, transformOrigin: "top center" },
  //       {
  //         scaleY: 1,
  //         ease: "power2.out",
  //         scrollTrigger: {
  //           trigger: wrapperRef.current,
  //           start: "top 85%",
  //           end: "bottom 65%",
  //           scrub: true,
  //         },
  //       }
  //     );
  //   }, wrapperRef);

  //   return () => ctx.revert();
  // }, []);
  //  const wrapperRefBox = useRef<HTMLDivElement>(null);
  // const animationRef = useRef<gsap.core.Tween | null>(null);

  // useEffect(() => {
  //   const wrapper = wrapperRefBox.current;
  //   if (!wrapper) return;

  //   // Clear any existing ScrollTrigger instances for this element
  //   ScrollTrigger.getAll().forEach((trigger) => {
  //     if (trigger.trigger === wrapper) {
  //       trigger.kill();
  //     }
  //   });

  //   // Small delay to ensure DOM is ready and scroll position is settled
  //   const timer = setTimeout(() => {
  //     // Refresh ScrollTrigger to recalculate positions
  //     ScrollTrigger.refresh();

  //     // Get all stat-box elements within this component
  //     const statBoxes = wrapper.querySelectorAll(".stat-box");

  //     // Reset elements to initial state
  //     gsap.set(statBoxes, {
  //       y: 80,
  //       opacity: 0,
  //     });

  //     // Create the animation
  //     animationRef.current = gsap.to(statBoxes, {
  //       y: 0,
  //       opacity: 1,
  //       duration: 0.8,
  //       ease: "power3.out",
  //       stagger: {
  //         each: 0.2,
  //         from: "random",
  //       },
  //       scrollTrigger: {
  //         trigger: wrapper,
  //         start: "top 85%",
  //         end: "bottom 20%",
  //         toggleActions: "play none none reverse",
  //         onRefresh: () => {
  //           // Ensure elements are in correct state on refresh
  //           const isInView = ScrollTrigger.isInViewport(wrapper, 0.15);

  //           if (!isInView) {
  //             gsap.set(statBoxes, { y: 80, opacity: 0 });
  //           }
  //         },
  //       },
  //     });
  //   }, 100);

  //   return () => {
  //     clearTimeout(timer);
  //     // Kill the specific animation and its ScrollTrigger
  //     if (animationRef.current) {
  //       animationRef.current.scrollTrigger?.kill();
  //       animationRef.current.kill();
  //       animationRef.current = null;
  //     }
  //   };
  // }, []); // Empty dependency array ensures this runs on every mount

const wrapperRef = useRef(null);
const topLineRef = useRef(null);
const wrapperRefBox = useRef<HTMLDivElement>(null);

useEffect(() => {
  const lineWrapper = wrapperRef.current;
  const boxWrapper = wrapperRefBox.current;
  if (!lineWrapper || !boxWrapper) return;

  // Clear existing ScrollTrigger instances
  ScrollTrigger.getAll().forEach((trigger) => {
    if (trigger.trigger === boxWrapper) trigger.kill();
  });

  const timer = setTimeout(() => {
    ScrollTrigger.refresh();
    const statBoxes = boxWrapper.querySelectorAll(".stat-box");

    const ctx = gsap.context(() => {
      // Top line animation
      gsap.fromTo(
        topLineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: lineWrapper,
            start: "top 85%",
            end: "bottom 65%",
            scrub: true,
          },
        }
      );

      // Stat boxes animation
      gsap.set(statBoxes, { y: 80, opacity: 0 });
      gsap.to(statBoxes, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: { each: 0.2, from: "random" },
        scrollTrigger: {
          trigger: boxWrapper,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          onRefresh: () => {
            if (!ScrollTrigger.isInViewport(boxWrapper, 0.15)) {
              gsap.set(statBoxes, { y: 80, opacity: 0 });
            }
          },
        },
      });
    });

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, 100);

  return () => clearTimeout(timer);
}, []);

  return (
    <div className="w-full">
      <div ref={wrapperRef} className="container mx-auto my-[100px]">
        {/* Top Line */}
        <div
          ref={topLineRef}
          className="mx-auto h-[64px] md:h-[120px] w-[1px] mb-20 lg:mb-0"
        >
          <Image
            src="/images/home/line.svg"
            alt="line"
            width={1}
            height={120}
          />
        </div>
        {/* Text content */}
        <div className="max-w-full lg:max-w-[1048px] mx-[unset] lg:mx-auto text-center mt-4">
          <FadeInRevealBlur>
            <H3>
              Aarti Industries innovative ecosystem is driven by two advanced
              research centres in Navi Mumbai and Vapi, where scientists work at
              the intersection of innovation, scale, and sustainability.
            </H3>
          </FadeInRevealBlur>
        </div>
        <div className="mt-[40px] lg:mt-[60px] max-w-[unset] lg:max-w-[1048px] mx-auto ">
          <div
            ref={wrapperRefBox}
            className="w-full min-h-[unset] lg:min-h-[350px] h-auto grid lg:grid-cols-[1fr_312px] gap-[6px]"
          >
            <div className="grid grid-cols-[1fr_1fr] lg:grid-cols-none lg:grid-rows-[1fr_1fr] gap-[6px]">
              <div className="grid grid-rows-3 lg:grid-rows-none lg:grid-cols-3 gap-[6px]">
                <div className="rounded-[20px] overflow-hidden relative stat-box">
                  <Image
                    src="/images/home/chemical.png"
                    alt="img"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="bg-grey-100 py-[27px] px-[24px] rounded-[20px] stat-box">
                  <H2 className="text-orange-200">20+</H2>
                  <BodyText2>sectors being served</BodyText2>
                </div>
                <div className="bg-grey-100 py-[27px] px-[24px] rounded-[20px] stat-box">
                  <H2 className="text-orange-200">2</H2>
                  <BodyText2>state-of-the-art R&D facilities</BodyText2>
                </div>
              </div>
              <div className="grid grid-rows-3 lg:grid-rows-none lg:grid-cols-3 gap-[6px]">
                <div className="bg-grey-100 py-[27px] px-[24px] rounded-[20px] stat-box">
                  <H2 className="text-orange-200">100+</H2>
                  <BodyText2>products</BodyText2>
                </div>
                <div className="rounded-[20px] overflow-hidden relative stat-box">
                  <Image
                    src="/images/home/test-lab.png"
                    alt="img"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="bg-grey-100 py-[27px] px-[24px] rounded-[20px] stat-box">
                  <H2 className="text-orange-200">16</H2>
                  <BodyText2>manufacturing facilities across India</BodyText2>
                </div>
              </div>
            </div>
            <div className="hidden lg:block relative rounded-[14px] lg:rounded-[20px] min-h-[136px] lg:min-h-[350px] overflow-hidden">
              <Image
                src="/images/rd/rd-info-banner.png"
                alt="img"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RDInfo;
