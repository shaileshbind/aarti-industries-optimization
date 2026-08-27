"use client";
import { useState, useEffect } from "react";
import clsx from "clsx";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useRouter, useSearchParams } from "next/navigation";
import { SubCategoryWithCkLayout } from "@/app/types/shareholder.type";

export interface CkEditorListingProps {
  reportLayout: SubCategoryWithCkLayout[];
}

export default function CkEditorListing({ reportLayout }: CkEditorListingProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeSubCategory, setActiveSubCategory] = useState<string>("");

  useEffect(() => {
    if (!reportLayout || reportLayout.length === 0) return;

    const urlSubCat = searchParams.get("subCategory");
    const targetSubCategory = urlSubCat || reportLayout[0]?.subCategory || "";

    const matchingSubCategory = reportLayout.find(
      (item) => item.subCategory === targetSubCategory,
    );

    if (matchingSubCategory) {
      setActiveSubCategory(targetSubCategory);
    } else if (reportLayout[0]) {
      setActiveSubCategory(reportLayout[0].subCategory);
    }
  }, [searchParams, reportLayout]);

  const mobStyles = {
    backgroundColor: "#F7F9FA",
    borderRadius: "10px",
    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  };

  const menuProps = {
    PaperProps: {
      sx: { borderRadius: "8px", maxWidth: "calc(100vw - 56px)" },
    },
  };

  const handleSubCategoryClick = (subCat: string) => {
    setActiveSubCategory(subCat);
    const params = new URLSearchParams(searchParams.toString());
    params.set("subCategory", subCat);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const currentSubCategory = reportLayout?.find(
    (item) => item.subCategory === activeSubCategory,
  );
  const htmlContent = currentSubCategory?.content ?? "";

  return (
    <div className="fluid-container pt-6 md:pt-10 pb-10 md:pb-[80px] lg:flex justify-between">
      {/* Left Sidebar - Subcategories (Desktop) */}
      {reportLayout?.length > 0 && (
        <div className="w-[20%] hidden lg:block">
          {reportLayout?.map((subCat, idx) => (
            <div
              key={`subcat_ck_${idx}`}
              className={clsx(
                "py-5 px-2 border-b-2 border-b-[#E1E1E1] cursor-pointer text-base transition-all duration-300",
                activeSubCategory === subCat.subCategory
                  ? "text-[#002F50]"
                  : "text-[#9997A2] hover:text-[#002F50]",
              )}
              onClick={() => handleSubCategoryClick(subCat.subCategory)}
            >
              {subCat.subCategory}
            </div>
          ))}
        </div>
      )}

      {/* Subcategory dropdown for mobile */}
      {reportLayout?.length > 0 && (
        <div className="block lg:hidden mb-6">
          <FormControl fullWidth>
            <Select
              sx={{
                ...mobStyles,
                "& .MuiSelect-select": {
                  whiteSpace: "normal",
                  wordWrap: "break-word",
                },
              }}
              MenuProps={menuProps}
              value={activeSubCategory}
              onChange={(e) => handleSubCategoryClick(e.target.value as string)}
              IconComponent={KeyboardArrowDownIcon}
            >
              {reportLayout?.map((subCat, idx) => (
                <MenuItem
                  key={`mobile_subcat_ck_${idx}`}
                  value={subCat.subCategory}
                  sx={{ whiteSpace: "normal", wordWrap: "break-word" }}
                >
                  {subCat.subCategory}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      )}

      {/* HTML content area */}
      <div
        className={clsx(
          "lg:p-10 lg:bg-[#F7F9FA] w-full rounded-[12px]",
          reportLayout?.length > 0 ? "lg:w-[75%]" : "lg:w-full",
        )}
      >
        {htmlContent ? (
          <div
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            className="ck-editor-content"
          />
        ) : (
          <p className="text-center text-[#4C5861]">No content available</p>
        )}
      </div>
    </div>
  );
}
