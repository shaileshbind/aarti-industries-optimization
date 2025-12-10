"use client";
import { FormControl, MenuItem, Select } from "@mui/material";
import clsx from "clsx";
import React, { useState, useEffect, useMemo } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { BodyText2, SubH3 } from "../Typography2";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const CONTACT_DATA = [
  {
    subCategory: "Shareholder Grievances & Nodal Officer",
    address: {
      name: "Mr. Raj Sarraf",
      position: "Company Secretary & Compliance Officer",
      address:
        "Embassy 247 Park, Tower C,4th Floor, Gandhi Nagar, Vikhroli West, Mumbai - 400083, Maharashtra, India",
      phone: "+91 22 6943 6100",
      email: "investorrelations@aarti-industries.com",
      fax: "",
      website: "",
      unit: "",
    },
  },
  {
    subCategory: "Registrars & Share Transfer Agent",
    address: {
      name: "MUFG Intime India Pvt. Ltd.",
      position: "Company Secretary & Compliance Officer",
      address:
        "C-101, 247 Park, L.B.S Marg,Vikhroli (W), Mumbai - 400083,Maharashtra, India",
      phone: "+91 22 4918 6000",
      email: "rnt.helpdesk@linkintime.co.in",
      fax: "+91 22 4918 6060",
      website: "http://linkintime.co.in",
      unit: "Unit: Aarti Industries Limited",
    },
  },
];

export default function ContactDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const data = useMemo(() => CONTACT_DATA, []);

  const [activeSubCategory, setActiveSubCategory] = useState<string>("");
  const [activeData, setactiveData] = useState<
    (typeof CONTACT_DATA)[0]["address"] | null
  >(null);

  // Initialize from URL or default to first subcategory
  useEffect(() => {
    if (!data || data.length === 0) return;

    const urlSubCat = searchParams.get("subCategory");
    const targetSubCategory = urlSubCat || data[0]?.subCategory || "";

    const matchingSubCategory = data.find(
      (item) => item.subCategory === targetSubCategory
    );

    if (matchingSubCategory) {
      setActiveSubCategory(targetSubCategory);
      setactiveData(matchingSubCategory.address);
    } else if (data[0]) {
      setActiveSubCategory(data[0].subCategory);
      setactiveData(data[0].address);
    }
  }, [searchParams, data]);

  const menuProps = {
    PaperProps: {
      sx: {
        borderRadius: "8px",
      },
    },
  };

  const mobStyles = {
    backgroundColor: "#F7F9FA",
    borderRadius: "10px",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  };

  // Handler for subcategory selection
  const handleSubCategoryClick = (subCat: string) => {
    setActiveSubCategory(subCat);
    const found = data.find((item) => item.subCategory === subCat);
    setactiveData(found ? found.address : null);

    // Update URL with query parameter
    const params = new URLSearchParams(searchParams.toString());
    params.set("subCategory", subCat);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="fluid-container pt-6 md:pt-10 pb-10 md:pb-[80px] lg:flex justify-between">
      {/* Left Sidebar - Subcategories (Desktop) */}
      <div className="w-[20%] hidden lg:block">
        {data?.map((subCat, idx) => (
          <div
            key={`subcat_${idx}`}
            className={clsx(
              `py-5 px-2 border-b-2 border-b-[#E1E1E1] cursor-pointer text-base transition-all duration-300`,
              activeSubCategory === subCat.subCategory
                ? "text-[#002F50]"
                : "text-[#9997A2] hover:text-[#002F50]"
            )}
            onClick={() => handleSubCategoryClick(subCat.subCategory)}
          >
            {subCat.subCategory}
          </div>
        ))}
      </div>

      {/* Subcategory dropdown for mobile */}
      <div className="block lg:hidden mb-6">
        <FormControl fullWidth>
          <Select
            sx={mobStyles}
            MenuProps={menuProps}
            value={activeSubCategory}
            onChange={(e) => handleSubCategoryClick(e.target.value as string)}
            IconComponent={KeyboardArrowDownIcon}
          >
            {data?.map((subCat, idx) => (
              <MenuItem key={`mobile_subcat_${idx}`} value={subCat.subCategory}>
                {subCat.subCategory}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="lg:p-10 !pt-4 lg:w-[75%] w-full">
        <div className="p-8 bg-[#EFF3F5] lg:w-1/2 rounded-[20px]">
          <SubH3>{activeData?.name}</SubH3>
          <BodyText2 className="py-2">{activeData?.position}</BodyText2>
          <BodyText2 className="pb-2">{activeData?.unit}</BodyText2>

          <BodyText2>{activeData?.address}</BodyText2>

          {activeData?.fax && (
            <BodyText2 className="pt-2">FAX: {activeData?.fax}</BodyText2>
          )}

          {activeData?.website && (
            <Link href={activeData?.website} target="_blank">
              <BodyText2 className="pt-2">
                Website: {activeData?.website}
              </BodyText2>
            </Link>
          )}

          <div className="pt-3 pb-2 flex gap-0 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="mr-[10px] mt-[4px]"
            >
              <path
                d="M13.0027 7.93023C12.0788 7.00632 10.616 7.00632 9.69205 7.93023L8.22919 9.39308C7.99821 9.2391 7.30528 8.85414 6.92032 8.46917C6.53535 8.08421 6.15039 7.39128 5.99641 7.08331L7.45926 5.62045C8.38317 4.69654 8.38317 3.23368 7.45926 2.30977L5.76543 0.692932C4.84152 -0.230977 3.37866 -0.230977 2.45475 0.692932L0.837911 2.38677C-1.16389 4.38857 0.683925 8.85414 3.60964 11.8568C6.53535 14.7826 11.0779 16.6304 13.0797 14.6286L14.7736 12.9347C15.6975 12.0108 15.6975 10.548 14.7736 9.62406L13.0027 7.93023ZM13.6187 11.8568L11.9248 13.5507C10.9239 14.5516 7.38227 13.4737 4.68753 10.7789C1.9928 8.08421 0.914903 4.54256 1.91581 3.54165L3.60964 1.84782C3.91761 1.53985 4.45656 1.53985 4.76453 1.84782L6.45836 3.54165C6.76633 3.84962 6.76633 4.38857 6.45836 4.69654L4.76453 6.1594C3.91761 7.00632 5.0725 8.77714 5.84242 9.54707C6.30438 10.009 8.22919 11.5489 9.23009 10.625L10.8469 9.00812C11.1549 8.70015 11.6939 8.70015 12.0018 9.00812L13.6957 10.702C13.9266 11.0099 13.9266 11.4719 13.6187 11.8568Z"
                fill="#DC4C03"
              />
            </svg>
            <Link href={`tel:${activeData?.phone}`}>
              <BodyText2>{activeData?.phone}</BodyText2>
            </Link>
          </div>

          <div className="flex gap-0 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="18"
              viewBox="0 0 15 18"
              fill="none"
              className="mr-[10px] mt-[4px]"
            >
              <path
                d="M13.8409 7.29545C13.8409 12.3864 7.29545 16.75 7.29545 16.75C7.29545 16.75 0.75 12.3864 0.75 7.29545C0.75 5.55949 1.43961 3.89463 2.66712 2.66712C3.89463 1.43961 5.55949 0.75 7.29545 0.75C9.03142 0.75 10.6963 1.43961 11.9238 2.66712C13.1513 3.89463 13.8409 5.55949 13.8409 7.29545Z"
                stroke="#DC4C03"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.29545 9.47727C8.50044 9.47727 9.47727 8.50044 9.47727 7.29545C9.47727 6.09047 8.50044 5.11364 7.29545 5.11364C6.09047 5.11364 5.11364 6.09047 5.11364 7.29545C5.11364 8.50044 6.09047 9.47727 7.29545 9.47727Z"
                stroke="#DC4C03"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <Link className="mt-1" href={`mailto:${activeData?.email}`}>
              <BodyText2>{activeData?.email}</BodyText2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
