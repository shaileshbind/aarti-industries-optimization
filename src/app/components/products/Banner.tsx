import React from 'react'
import SearchBar from './SearchBar'
import Image from 'next/image'
import { H2 } from '../Typography2'
import { BodyText1 } from '../Typography2'

function Banner() {
  return (
    <section>
      <div className="banner h-[361px] md:h-[440px] mx-auto flex items-center justify-center flex-col text-center py-8 relative">
        <div className='h-auto max-w-[65%] md:max-w-[30%] mt-20 z-10'>
          <H2 className='text-h2-l'>Products</H2>
          <BodyText1 className='text-body-m mt-2.5 mb-9'>We deliver sustainable chemical solutions that power innovation across global industries.</BodyText1>
        </div>
        <SearchBar />

        <div className='absolute top-0 h-full w-full z-0'>
          <Image src="/images/products/product-banner-image.png" alt="banner" width={600} height={400} className='h-full w-full object-cover md:block hidden' />
          <Image src="/images/products/product-banner-image-mobile.png" alt="banner" width={600} height={400} className='h-full w-full object-cover md:hidden block' />
        </div>

        <div className='absolute bottom-[-37] right-[12%] z-0 md:block hidden'>
          <Image src="/images/products/product-star.png" alt="banner" width={600} height={400} className='h-full w-full object-cover' />
        </div>

        <div className='absolute bottom-[-20] right-[12%] z-0 md:hidden block'>
            <Image src="/images/star.png" alt="banner" width={1400} height={1400} className='h-full w-full object-cover' />
        </div>

      </div>
    </section>
  )
}

export default Banner