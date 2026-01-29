import { BodyText2, H2, SubH3 } from "../Typography2";
import Image from "next/image";
import { ContactMapProps } from "@/app/types/contact.type";
import ContactMapSvg from "./ContactMapSvg";

const ContactMap = ({ data }: ContactMapProps) => {
  const { title, image, address } = data;
  return (
    <div className="my-[50px] lg:my-[100px]">
      {title && (
        <H2 className="max-w-[unset] lg:max-w-[550px] text-center mx-auto mb-[30px] lg:mb-[60px]">
          {title}
        </H2>
      )}
      <div className="relative container mx-auto w-full block lg:hidden">
        {image?.url && (
          <Image
            src={image?.url}
            alt="img"
            width={1265}
            height={623}
            className="w-full h-auto"
          />
        )}
      </div>
      <div className="relative w-full hidden lg:block h-[80vh]">
        <div className="w-[100%] h-full mx-auto relative ">
          <ContactMapSvg />
        </div>
      </div>
      <div className="block lg:hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[42px] gap-y-[42px] mt-[50px] container">
          {address?.map((items, index) => {
            return (
              <div key={index}>
                {items?.officeLabel && (
                  <div className="text-white bg-gradient-orange-3 w-fit px-[24px] py-[6px] rounded-full text-[12px] uppercase">
                    {items?.officeLabel}
                  </div>
                )}
                {items?.regionName && (
                  <SubH3 className="mt-[10px] !text-[20px]">
                    {items?.regionName}
                  </SubH3>
                )}
                {items?.companyName && (
                  <BodyText2 className="mt-[6px]">
                    {items?.companyName}
                  </BodyText2>
                )}
                {items?.address && <BodyText2>{items?.address}</BodyText2>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContactMap;
