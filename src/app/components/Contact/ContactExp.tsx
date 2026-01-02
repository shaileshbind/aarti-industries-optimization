import Link from "next/link";
import Image from "next/image";
import { Cta, SubH1 } from "../Typography2";
import { FadeInReveal } from "../ScrollReveal";
import { ContactExpProps } from "@/app/types/contact.type";
import SplitText from "../SplitText";

const ContactExp = ({ data }: ContactExpProps) => {
  const { title, ctaButton } = data;
  return (
    <div className="container">
      <FadeInReveal>
        <div className="relative w-full min-h-[186px] md:min-h-[158px] max-w-[full] lg:max-w-[920px] mx-auto rounded-[14px] md:rounded-[20px] py-[30px] md:py-[37px] px-[28px] md:px-[40px]  grid md:flex justify-between items-center gap-y-[24px] bg-gradient-orange-1 overflow-hidden">
          <Image
            src="/images/home/flower-t.svg"
            alt="img"
            width={217}
            height={217}
            className="absolute bottom-[-48px] md:bottom-[20px] -right-[35px] -md:right-[50px] w-[155px] h-[155px] md:w-[217px] md:h-[217px]"
          />
          <FadeInReveal delay={0.2} className="lg:w-[60%]">
            <SubH1 className="text-white">{title}</SubH1>
          </FadeInReveal>
          <FadeInReveal delay={0.2}>
            <Link
              href={`${ctaButton?.hasExternalLink == "true" ? ctaButton?.externalLink : ctaButton?.link?.link}`}
              target="_blank"
            >
              <div className="w-fit bg-white group rounded-[6px] flex gap-x-[8px] py-[14px] px-[22px] min-h-[47px] cursor-pointer relative z-10">
                <Cta className="text-orange-200 "><SplitText text={ctaButton?.title}/></Cta>
                <Image
                  src="/images/download-icon-orange.svg"
                  alt="icon"
                  width={14}
                  height={14}
                />
              </div>
            </Link>
          </FadeInReveal>
        </div>
      </FadeInReveal>
    </div>
  );
};

export default ContactExp;
