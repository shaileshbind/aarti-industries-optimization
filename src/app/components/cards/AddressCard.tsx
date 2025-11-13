import React from "react";
import { BodyText1, SubH2 } from "../Typography2";
import Link from "next/link";

type AddressCardProps = {
  location?: string;
  name?: string;
  fullAddress?: string;
  phone?: string;
  type?: string;
  url?: string;
  registeredOffice?: boolean;
};

const AddressCard = ({ location, name, fullAddress, phone,  url, registeredOffice }: AddressCardProps) => {
  return (
    <div className="group bg-grey-100 p-[30px] rounded-[10px] mt-[20px] relative h-full flex flex-col">
      {registeredOffice && (
        <span className="absolute bg-white uppercase top-[-12px] border border-orange-200 text-orange-200 text-[12px] font-normal leading-[100%] font-alte-hans px-[10px] py-[5px] rounded-[50px] left-[30px]">
           registered office
        </span>
      )}
      <SubH2 className="text-blue-200 mb-[10px]">{location}</SubH2>
      <BodyText1 className="mb-[10px]">{name}</BodyText1>
      <BodyText1 className="mb-[10px] flex-grow">{fullAddress}</BodyText1>
      <div className="flex">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="mr-[10px] mt-[4px]">
          <path d="M13.0027 7.93023C12.0788 7.00632 10.616 7.00632 9.69205 7.93023L8.22919 9.39308C7.99821 9.2391 7.30528 8.85414 6.92032 8.46917C6.53535 8.08421 6.15039 7.39128 5.99641 7.08331L7.45926 5.62045C8.38317 4.69654 8.38317 3.23368 7.45926 2.30977L5.76543 0.692932C4.84152 -0.230977 3.37866 -0.230977 2.45475 0.692932L0.837911 2.38677C-1.16389 4.38857 0.683925 8.85414 3.60964 11.8568C6.53535 14.7826 11.0779 16.6304 13.0797 14.6286L14.7736 12.9347C15.6975 12.0108 15.6975 10.548 14.7736 9.62406L13.0027 7.93023ZM13.6187 11.8568L11.9248 13.5507C10.9239 14.5516 7.38227 13.4737 4.68753 10.7789C1.9928 8.08421 0.914903 4.54256 1.91581 3.54165L3.60964 1.84782C3.91761 1.53985 4.45656 1.53985 4.76453 1.84782L6.45836 3.54165C6.76633 3.84962 6.76633 4.38857 6.45836 4.69654L4.76453 6.1594C3.91761 7.00632 5.0725 8.77714 5.84242 9.54707C6.30438 10.009 8.22919 11.5489 9.23009 10.625L10.8469 9.00812C11.1549 8.70015 11.6939 8.70015 12.0018 9.00812L13.6957 10.702C13.9266 11.0099 13.9266 11.4719 13.6187 11.8568Z" fill="#DC4C03" />
        </svg>
        <BodyText1 className="mb-[10px]">

          {phone}</BodyText1>
      </div>
      <div className="flex">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="18" viewBox="0 0 15 18" fill="none" className="mr-[10px] mt-[4px]">
          <path d="M13.8409 7.29545C13.8409 12.3864 7.29545 16.75 7.29545 16.75C7.29545 16.75 0.75 12.3864 0.75 7.29545C0.75 5.55949 1.43961 3.89463 2.66712 2.66712C3.89463 1.43961 5.55949 0.75 7.29545 0.75C9.03142 0.75 10.6963 1.43961 11.9238 2.66712C13.1513 3.89463 13.8409 5.55949 13.8409 7.29545Z" stroke="#DC4C03" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7.29545 9.47727C8.50044 9.47727 9.47727 8.50044 9.47727 7.29545C9.47727 6.09047 8.50044 5.11364 7.29545 5.11364C6.09047 5.11364 5.11364 6.09047 5.11364 7.29545C5.11364 8.50044 6.09047 9.47727 7.29545 9.47727Z" stroke="#DC4C03" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <BodyText1 className="mb-[10px] cursor-pointer">
          <Link href={url || ""} target="_blank">
            Get Direction
          </Link>
        </BodyText1>
      </div>


    </div>
  );

};

export default AddressCard;