import React from 'react'
import { BodyText2, H3, SubH2 } from '../Typography2'
import Image from 'next/image'
import AnimatedText from '../AnimatedText'
import { ScaleInGroup } from '../ScrollReveal'

const CDMOPartner = () => {
  return (
    <section className='fluid-container lg:py-[100px] py-[50px] flex lg:flex-row flex-col justify-end relative'>
      <div className='lg:w-[40%] static lg:absolute top-42 left-0 mb-8'>
        <AnimatedText>
          <H3>We partner with global companies to develop molecules using our R&D expertise, infrastructure, sustainable practices, and our key pillars.</H3>
        </AnimatedText>
      </div>
      <ScaleInGroup delay={0.2} className='lg:mt-16 mt-2 flex gap-2 lg:w-[70%] flex-wrap justify-center lg:justify-normal'>
        <div className='lg:min-h-[320px] lg:h-auto lg:w-[320px] h-fit w-full hidden lg:block' data-scroll></div>
        <div className='lg:min-h-[320px] lg:h-auto lg:w-[320px] h-fit w-full bg-[#EFF3F5] rounded-3xl p-8 flex flex-col justify-between' data-scroll> 
          <Image
            src="/images/cdmo/cdmo-card-icon.svg"
            alt="logo"
            width={48}
            height={48}
          />
          <div className='mt-8 space-y-3'>
            <SubH2>Process-Safety-by-Design</SubH2>
            <BodyText2>Safety and sustainability embedded into every stage of development.</BodyText2>
          </div>
        </div>
        <div className='lg:min-h-[320px] lg:h-auto lg:w-[320px] h-fit w-full bg-[#EFF3F5] rounded-3xl p-8 flex flex-col justify-between' data-scroll>
          <Image
            src="/images/cdmo/cdmo-card-icon.svg"
            alt="logo"
            width={48}
            height={48}
          />
          <div className='mt-8 space-y-3'>
            <SubH2>Process-Safety-by-Design</SubH2>
            <BodyText2>Safety and sustainability embedded into every stage of development.</BodyText2>
          </div>
        </div>
        <div className='lg:min-h-[320px] lg:h-auto lg:w-[320px] h-fit w-full bg-[#EFF3F5] rounded-3xl p-8 flex flex-col justify-between' data-scroll>
          <Image
            src="/images/cdmo/cdmo-card-icon.svg"
            alt="logo"
            width={48}
            height={48}
          />
          <div className='mt-8 space-y-3'>
            <SubH2>Process-Safety-by-Design</SubH2>
            <BodyText2>Safety and sustainability embedded into every stage of development.</BodyText2>
          </div>
        </div>
        <div className='lg:min-h-[320px] lg:h-auto lg:w-[320px] h-fit w-full bg-[#EFF3F5] rounded-3xl p-8 flex flex-col justify-between' data-scroll>
          <Image
            src="/images/cdmo/cdmo-card-icon.svg"
            alt="logo"
            width={48}
            height={48}
          />
          <div className='mt-8 space-y-3'>
            <SubH2>Process-Safety-by-Design</SubH2>
            <BodyText2>Safety and sustainability embedded into every stage of development.</BodyText2>
          </div>
        </div>
      </ScaleInGroup>
    </section>
  )
}

export default CDMOPartner
