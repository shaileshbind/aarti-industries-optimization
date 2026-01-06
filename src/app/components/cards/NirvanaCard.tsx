"use client";
import React from "react";
import Image from "next/image";
import { BodyText2 } from "../Typography2";
import { FadeInReveal } from "../ScrollReveal";

interface NirvanaCardProps {
  id?: string | number;
  grey?: boolean;
  image?: string;
  mobImage?: string;
  icon?: string;
  desc?: string;
  flipImg?: string;
}

const NirvanaCard: React.FC<NirvanaCardProps> = ({
  id,
  grey = false,
  image,
  mobImage,
  icon,
  desc,
  flipImg,
}) => {
  const canFlip = !image && !mobImage && !!flipImg;

  return (
    <FadeInReveal 
      key={id}
      className={`relative lg:min-h-[246px] lg:min-w-[246px] rounded-[14px] overflow-hidden ${
        canFlip ? "group flip-container" : ""
      }`}
    >
      <style jsx>{`
        .flip-container {
          perspective: 1200px;
        }
        .flip-card {
          width: 100%;
          height: 100%;
          border-radius: 14px;
          position: relative;
          transition: transform 0.7s;
          transform-style: preserve-3d;
        }
        .group:hover .flip-card {
          transform: rotateY(180deg);
        }
        .flip-side {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
        }
        .flip-back {
          transform: rotateY(180deg);
        }
      `}</style>

      {image || mobImage ? (
        <>
          {image && (
            <Image
              fill
              src={image}
              alt="img"
              className="hidden lg:block object-cover hover:scale-105 transition-all duration-500"
            />
          )}

          {mobImage && (
            <Image
              fill
              src={mobImage}
              alt="img"
              className="block lg:hidden object-cover"
            />
          )}
        </>
      ) : (
        <div className="flip-card">
          {/* FRONT SIDE  */}
          <div
            className={`flip-side ${
              grey ? "bg-[#EFF3F5]" : "bg-gradient-orange-3"
            }`}
          >
            {!grey && (
              <Image
                src="/images/home/flower-t.svg"
                alt="decor"
                width={151}
                height={151}
                className="absolute top-[-35px] md:top-[-40px]
                -right-[18px] md:-right-[30px]
                w-[93px] h-[93px] md:w-[151px] md:h-[151px]"
              />
            )}

            <div className="pt-[24px] pb-[18px] px-[24px] grid content-between h-full">
              {icon && (
                <Image
                  src={icon}
                  height={36}
                  width={36}
                  alt="icon"
                  className="h-[36px] w-[36px] object-contain"
                />
              )}

              {desc && (
                <BodyText2 className={grey ? "text-[#4C5861]" : "text-white"}>
                  {desc}
                </BodyText2>
              )}
            </div>
          </div>
          {/* BACK SIDE  */}
          <div className="flip-side flip-back">
           {flipImg! && <Image
              src={flipImg!}
              alt="flip-img"
              fill
              className="object-cover"
            />}
          </div>
        </div>
      )}
    </FadeInReveal>
  );
};

export default NirvanaCard;
