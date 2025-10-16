import React from 'react'
import { FadeInRevealBlur } from '../ScrollReveal'
import { BodyText2, Cta, H3 } from '../Typography2'
import AnimatedText from '../AnimatedText'
import Button from '../Button'

function AboutCompany() {
    return (
        <section className='fluid-container flex justify-between my-[50px] lg:my-[100px]'>
            <FadeInRevealBlur delay={0.1}>
                <BodyText2 className="font-alte-hans capitalize">
                    About Company
                </BodyText2>
            </FadeInRevealBlur>

            <div className='w-[65%]'>
                <AnimatedText>
                    <H3>Aarti Industries (AIL) has built a 40-year legacy of innovation, partnerships, and global reach. We have grown into a strategic partner of choice for global leaders in speciality chemicals, agrochemicals, pharmaceuticals, polymers, plasticisers, additives, and energy, highlighting the growth of India speciality chemical industry.</H3>
                </AnimatedText>
                <Button className='mt-12' title="Learn More About Who We Are" href="#" secondary />
            </div>
        </section>
    )
}

export default AboutCompany