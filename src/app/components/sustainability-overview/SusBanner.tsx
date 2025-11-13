import React from 'react'
import HeroBanner from '../banners/HeroBanner'
import { SusBannerProps } from '@/app/types/sustainability.type';

const SusBanner = ({data}:SusBannerProps) => {
  const { title, ctaButton, image,mobImage } = data;
  return (
    <div>
     <HeroBanner
      title={title}
      image={image?.url}
      fullBg
      mobImage={mobImage?.url}
      alt={image?.alternativeText}
      mobAlt={mobImage?.alternativeText}
      btnLink={ctaButton?.link}
      btnTitle={ctaButton?.title}
    />
    </div>
  )
}

export default SusBanner;
