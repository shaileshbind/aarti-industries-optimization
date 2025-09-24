"use client";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { H2 } from "../Typography2";

 
const SustainableChem = () => {
   
const triggerRef = useRef(null);
const headinLeft = useRef(null);
const headinRight = useRef(null);
const sustainbleLogo = useRef(null);
const susLogotl = useRef(null);
const susLogotr = useRef(null);
const susLogobl = useRef(null);
const susLogobr = useRef(null);
const sustainInner = useRef(null);
const envSlider = useRef(null);
  gsap.registerPlugin(ScrollTrigger);


useLayoutEffect(() => {
//   if (!triggerRef.current || !headingRef.current) return;
  const isMob = window.innerWidth <= 786;

  // GSAP context for automatic cleanup
  const ctx = gsap.context(() => {
    gsap.set(triggerRef.current, { position: "relative", top: 0, zIndex: "auto" });
    gsap.set(sustainbleLogo.current, {left: '52%', top: '50%', y: '-50%', x:'-50%' })
    gsap.set(envSlider.current, {opacity:0})

    // Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: isMob ? "top 75%" : "top top",
        end: isMob ? "top top" : "+=500",
        scrub: true,
        pin: true,
      },
    });
    tl.fromTo(headinLeft.current, {   x: -0 }, {  x: -150 } )
    tl.fromTo(headinRight.current, {   x: -0 }, {  x: 150 }, "<" )
    tl.fromTo(sustainbleLogo.current, {  width: '0px' }, { width: '200px' }, '<')
    
    tl.fromTo(susLogotl.current, {  opacity: 1}, { duration:1, opacity: 0 })
    
    tl.fromTo(susLogobl.current, {  opacity: 1}, { opacity: 0 }, '<')
    tl.fromTo(susLogobr.current, {  opacity: 1}, { opacity: 0 }, '<')
    tl.fromTo(headinLeft.current, {   x: -150, opacity: 1 }, {  x: -180, opacity: 0 }, '<' )
    tl.fromTo(headinRight.current, {   x: 150, opacity: 1 }, {  x: 180, opacity: 0 }, "<" )
    tl.fromTo(susLogotr.current, {  width: '100px'}, { duration:1, width: '500px' })
    tl.fromTo(sustainbleLogo.current, {  width: '200px', height: '200px', left: '52%', top: '50%', y: '-50%', x:'-50%' }, {  duration:1, width: '500px', height:'500px', left: '0%', top: '50%', y: '-50%', x:'0%' }, '<')
    tl.fromTo(envSlider.current, {opacity:0 }, {  opacity:1 })

    // tl.to(sustainbleLogo.current,  { width: '500px', height:'500px' },)
    // tl.fromTo(sustainInner.current, {  width: '200px', height: '200px'}, { width: '400px', height:'400px' }, '<')
    
    // if (isMob) {
    //   tl.fromTo(headingMobRef.current, { opacity: 0, yPercent: 50 }, { opacity: 1, yPercent: 0 })
    //     .fromTo(mapMobRef.current, { opacity: 0, yPercent: 10 }, { opacity: 1, yPercent: 0 })
    //     .fromTo(accordionsMobRef.current, { opacity: 0, yPercent: 10 }, { opacity: 1, yPercent: 0, delay: 0.2 })
    //     .fromTo(buttomMobRef.current, { opacity: 0, yPercent: 10 }, { opacity: 1, yPercent: 0, delay: 0.2 });
    // } else {
    //   tl.fromTo(headingRef.current, { opacity: 1, yPercent: 0 }, { opacity: 0, yPercent: -600 })
    //     .fromTo(contentRef.current, { opacity: 0, yPercent: 200 }, { opacity: 1, yPercent: 0 }, "<");
    // }
  });

  return () => ctx.revert();
}, []);
  return (
    <div
      ref={triggerRef}
      className="min-h-screen bg-white relative overflow-hidden flex justify-center items-center"
       
    >
       <div className="flex items-center gap-2">
        <span ref={headinLeft}>
            <H2>Sustainable Chemistry</H2>
        </span>
        <div ref={sustainbleLogo} className="flex w-[0px] h-[202px] overflow-hidden absolute ">
            <span ref={sustainInner} className="flex flex-wrap w-full h-full min-w-[200px] absolute top-0 left-[50%] translate-x-[-50%]  ">
            <i ref={susLogotl} className="absolute top-0 left-0">
            <Image
                    src="/images/home/sustainableIconTl.png"
                    alt="logo"
                    width={99}
                    height={101}
                    priority
                     
                />
            </i>
            <i ref={susLogotr} className="absolute top-0 right-0">
            <Image
                    src="/images/home/sustainableIconTr.png"
                    alt="logo"
                    width={99}
                    height={101}
                    priority
                    className="w-full"
                />
            </i>
            <i ref={susLogobl} className="absolute bottom-0 left-0">
            <Image
                    src="/images/home/sustainableIconBl.png"
                    alt="logo"
                    width={99}
                    height={101}
                    priority
                     
                />
            </i>
            <i ref={susLogobr} className="absolute bottom-0 right-0">
            <Image
                    src="/images/home/sustainableIconBr.png"
                    alt="logo"
                    width={99}
                    height={101}
                    priority
                     
                />
            </i>

            </span>
        </div>
        <span ref={headinRight}>
            <H2>Responsible Supply</H2>
        </span>
       </div>
      {/* <span className="absolute bottom-0 left-0 w-full h-[100vh] bg-white opacity-0 invisible" ref={spaceBottomRef}></span> */}
      <div className="bg-white  px-6 py-16 absolute top-[50%] translate-y-[-50%] left-0 w-full flex justify-start " ref={envSlider}>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center w-[80%] mr-auto ml-0" >
        
        {/* Left Image */}
        <div className="relative w-full h-[400px] lg:h-[500px] overflow-hidden rounded-[1rem] flex items-center justify-center">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="/images/home/forest.png"
              alt="Environment"
              className="w-full h-full object-cover scale-110"
            />
            <i className="absolute top-0 left-0 w-full h-full backdrop-blur-md"></i>
            <span  className="absolute bottom-2 left-2 rounded-br-[300px] rounded-tl-[400px] rounded-tr-[400px] rounded-bl-[20px] overflow-hidden w-[90%] h-[90%]">
            <img
              src="/images/home/forest.png"
              alt="Environment"
              className="w-full h-full object-cover scale-110"
            />
            </span>
            
          </div>
          <h2 className="absolute text-3xl lg:text-4xl font-medium text-white">Environment</h2>
        </div>

        {/* Right Content */}
        <div >
          <p className="text-black leading-relaxed mb-10">
            We enable sustainable supply chains through responsible manufacturing with
            renewable energy integration, waste recovery, and ZLD-ready plants. By embedding
            sustainable chemistry and circular economy practices, we help our customers and
            partners reduce their carbon footprints and meet their ESG goals.
          </p>

          {/* Stats */}
          <div className="flex gap-12 mb-8">
            <div>
              <p className="text-orange-600 text-4xl font-bold">24%</p>
              <p className="text-gray-400 text-sm">renewable electrical<br />energy</p>
            </div>
            <div>
              <p className="text-orange-600 text-4xl font-bold">94%</p>
              <p className="text-gray-400 text-sm">waste<br />recovered</p>
            </div>
          </div>

          {/* Link */}
          <a
            href="#"
            className="text-orange-600 underline hover:text-orange-500 transition"
          >
            Our Environmental Initiatives
          </a>
        </div>
      </div>

    </div>
    </div>
  );
};

export default SustainableChem;