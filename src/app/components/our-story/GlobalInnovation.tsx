import React from 'react'
import AnimatedText from '../AnimatedText'
import { BodyText1, H3, SubH2 } from '../Typography2'
import Image from 'next/image'

function GlobalInnovation() {
    return (
        <section className='fluid-container flex flex-col justify-between my-[50px] lg:my-[100px]'>
            <AnimatedText className='lg:w-[70%] w-full mb-16'>
                <H3>From a single NCB facility in Gujarat to a global innovation led enterprise, AIL has stayed true to its founding values of Care, Integrity and Excellence.</H3>
            </AnimatedText>
            <div className='flex flex-col lg:flex-row justify-between items-center'>
                <div className="relative h-[317px] lg:h-[600px] w-full overflow-hidden lg:w-[55%]">
                    <div
                        className={`absolute right-0 top-0 min-h-[317px] lg:min-h-[600px] w-[100%] lg:w-full rounded-[20px] `}
                    >
                        <Image
                            src="/images/cdmo/cdmo-driving-banner.png"
                            alt="side-banner-img"
                            fill
                            className="absolute object-cover rounded-[20px]"
                        />

                        <div className="absolute left-0 object-cover backdrop-blur-lg rounded-tl-[20px] lg:rounded-tl-[30px]  h-[calc(100%-71px)] lg:h-[calc(100%-93px)] w-[75px] lg:w-[155px]"> </div>
                        <div className="absolute bottom-0 right-0 object-cover backdrop-blur-lg lg:rounded-[20px] rounded-b-[20px] h-[calc(100%-245px)] lg:h-[calc(100%-505px)] w-full"> </div>

                        <Image
                            src="/images/home/star-white.svg"
                            alt="img"
                            width={72}
                            height={72}
                            className="absolute bottom-[50px] lg:bottom-[57px] z-10 left-[50px] lg:left-[120px] w-[42px] lg:w-[72px]"
                        />
                        <div className="absolute min-h-screen bg-white w-[1px] left-[71px] lg:left-[155px]" />
                        <div className="absolute w-full bg-white bottom-[71px] lg:bottom-[92.5px] h-[1px]" />
                    </div>
                </div>

                <div className='lg:w-[37%] w-full flex flex-col gap-4 lg:gap-8 lg:mt-[unset] mt-[30px]'>
                    <SubH2 className='lg:mb-6 mb-4'>As we look ahead, our focus is on:</SubH2>

                    <div className='flex gap-[53px] border-b-[1px] border-b-[#E6EBEE] lg:pb-8 pb-4'>
                        <BodyText1 className='text-orange-100'>01</BodyText1>
                        <BodyText1>Becoming a global strategic partner in contract research, development, and manufacturing</BodyText1>
                    </div>

                    <div className='flex gap-[53px] border-b-[1px] border-b-[#E6EBEE] lg:pb-8 pb-4'>
                        <BodyText1 className='text-orange-100'>02</BodyText1>
                        <BodyText1>Becoming a global strategic partner in contract research, development, and manufacturing</BodyText1>
                    </div>

                    <div className='flex gap-[53px] border-b-[1px] border-b-[#E6EBEE] lg:pb-8 pb-4'>
                        <BodyText1 className='text-orange-100'>03</BodyText1>
                        <BodyText1>Becoming a global strategic partner in contract research, development, and manufacturing</BodyText1>
                    </div>

                    <div className='flex gap-[53px]'>
                        <BodyText1 className='text-orange-100'>04</BodyText1>
                        <BodyText1>Becoming a global strategic partner in contract research, development, and manufacturing</BodyText1>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default GlobalInnovation