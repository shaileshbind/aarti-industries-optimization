import React from 'react'
import { BodyText1, BodyText2, H3, SubH2 } from '../Typography2'
import { FadeInRevealBlur } from '../ScrollReveal'
import Image from 'next/image'
import Timeline2 from './Timeline2'

function TimeLine() {
  return (
    <section className='fluid-container flex flex-col justify-between my-[50px] lg:my-[100px] relative pt-32'>
      <H3 className='w-[35%] absolute top-24'>Decades of Discovery and Growth in the Chemical Industry</H3>

      <div className='flex justify-center gap-16 items-end'>
        <div className='w-[25%] h-fit'>
          <FadeInRevealBlur delay={0.1}>
            <BodyText2 className="text-orange-100 font-alte-hans">
              1984
            </BodyText2>
          </FadeInRevealBlur>
          <SubH2>Established as Aarti Organics Private Limited</SubH2>
          <BodyText1>Lorem ipsum dolor sit amet consectetur. Justo sit massa massa magnis sollicitudin non ornare magna auctor. Cum sem enim eu et imperdiet quis</BodyText1>
        </div>
        <div className='w-[50%] gap-6 align-baseline justify-end flex flex-wrap'>
          <div className='w-[295px] h-[340px] mt-16'>
            <Image
              src="/images/our-story/old1.png"
              alt="old1"
              height={80}
              width={160}
              className="h-full w-full object-cover rounded-3xl"
            />
          </div>
          <div className='flex flex-col gap-6 justify-end'>
            <div className='w-[239px] h-[200px] relative'>
            <Image
              src="/images/our-story/old3.png"
              alt="old1"
              fill
              className="h-full w-full object-cover rounded-3xl"
            />
          </div>
          <div className='w-[217px] h-[220px]'>
            <Image
              src="/images/our-story/old2.png"
              alt="old1"
              height={80}
              width={160}
              className="h-full w-full object-cover rounded-3xl"
            />
          </div>
          </div>
        </div>
      </div>

      <div>
        {/* <div className='flex justify-between items-center w-[80%] mx-auto'>
          <BodyText2>Laying the Roots (1984-2012)</BodyText2>
          <BodyText2>Laying the Roots (1984-2012)</BodyText2>
          <BodyText2>Laying the Roots (1984-2012)</BodyText2>
        </div> */}
        <Timeline2 />
      </div>
    </section>
  )
}

export default TimeLine