'use client';

import { MarginProvider } from '@/app/contexts/MarginContext';
import AartiAdvantage from '../sections/AartiAdvantage';
import { RDAnalyticalExcProps } from '@/app/types/r-and-d.type';
import { AilEdgeProps } from '@/app/types/aarti-advantage.type';
import AilEdge from './AilEdge';

interface AdvantageSectionsProps {
  ExcdData?: RDAnalyticalExcProps['data'];
  ExcdSliderData?: RDAnalyticalExcProps['sliderData'];
  ailEdgeData?: AilEdgeProps['data'];
}

export default function AdvantageSections({
  ExcdData,
  ExcdSliderData,
  ailEdgeData,
}: AdvantageSectionsProps) {
  return (
    <MarginProvider>
        {ExcdData && ExcdSliderData && (
          <div>
            <AartiAdvantage
               
              data={ExcdData}
              sliderData={ExcdSliderData}
              showButton={false}
            />
          </div>
        )}
        {ailEdgeData && (
            <div className="pt-[72px] pb-[72px] lg:py-[140px]">
            <AilEdge data={ailEdgeData} />
            </div>
        )}
    </MarginProvider>
  );
}
