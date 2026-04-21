"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { TabsYearsContainerProps } from "@/app/types/shareholder.type";
import SimpleListing from "../templates/SimpleListing";
import YearAndListing from "../templates/YearAndListing";
import YearQuarterListing from "../templates/YearQuarterListing";
import ContactDetails from "./ContactDetails";
import { useRouter, useSearchParams } from "next/navigation";
import OrangeCardListing from "../templates/OrangeCardListing";
import CkEditorListing from "../templates/CkEditorListing";
import { DynamicReportsData } from "@/app/types/annual-reports.type";

export default function TabsYearsContainer({ data }: TabsYearsContainerProps) {
  const [activeTab, setActiveTab] = useState<number>(0);

  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize from URL
  useEffect(() => {
    const urlCategory = searchParams.get("category");
    if (urlCategory) {
      const index = data?.findIndex((item) => item.category === urlCategory);
      if (index !== -1) setActiveTab(index);
    }
  }, [searchParams, data]);

  // Determine which template to render based on category
  const getTemplateComponent = () => {
    const currentCategory = data?.[activeTab];

    if (!currentCategory) return null;

    // Check if it has reportLayout
    if (
      !currentCategory.reportLayout ||
      currentCategory.reportLayout.length === 0
    ) {
      // No reportLayout - could be Contact Details or empty category
      return null;
    }

    const firstLayout = currentCategory.reportLayout[0];

    // Check the component type
    switch (firstLayout.__component) {
      case "reports.sub-category-with-report":
        // Simple listing template (General category)
        // Filter only simple-list layouts
        const simpleListLayouts = currentCategory.reportLayout.filter(
          (
            layout,
          ): layout is Extract<
            typeof layout,
            { __component: "reports.sub-category-with-report" }
          > => layout.__component === "reports.sub-category-with-report",
        );
        return <SimpleListing reportLayout={simpleListLayouts} />;

      case "reports.sub-year-and-report":
        // Year and Report template - include sub-category-with-ck if present (e.g. "Others")
        const yearReportLayouts = currentCategory.reportLayout.filter(
          (
            layout,
          ): layout is Extract<
            typeof layout,
            { __component: "reports.sub-year-and-report" }
          > => layout.__component === "reports.sub-year-and-report",
        );
        const ckLayouts = currentCategory.reportLayout.filter(
          (
            layout,
          ): layout is Extract<
            typeof layout,
            { __component: "reports.sub-category-with-ck" }
          > => layout.__component === "reports.sub-category-with-ck",
        );
        const combinedLayouts = [...yearReportLayouts, ...ckLayouts];
        return <YearAndListing reportLayout={combinedLayouts} />;

      case "reports.sub-year-and-quarter":
        // Year, Quarter and Report template (IEPF category)
        // Filter only sub-year-and-quarter layouts
        const yearQuarterLayouts = currentCategory.reportLayout.filter(
          (
            layout,
          ): layout is Extract<
            typeof layout,
            { __component: "reports.sub-year-and-quarter" }
          > => layout.__component === "reports.sub-year-and-quarter",
        );
        return <YearQuarterListing reportLayout={yearQuarterLayouts} />;

      case "reports.simple-list":
        // Filter simple-list layouts
        const simpleListReports = currentCategory.reportLayout.filter(
          (
            layout,
          ): layout is Extract<
            typeof layout,
            { __component: "reports.simple-list" }
          > => layout.__component === "reports.simple-list",
        );

        // Construct data in the format OrangeCardListing expects
        // OrangeCardListing accesses: data[reportKey][0].reportLayout[0].reports
        const wrappedData: DynamicReportsData = {
          [currentCategory.category]: [
            {
              reportLayout: simpleListReports.map((layout) => ({
                id: layout.id,
                reports: layout.reports || [],
              })),
            },
          ],
        };

        return (
          <OrangeCardListing
            data={wrappedData}
            reportKey={currentCategory.category}
          />
        );

      case "reports.sub-category-with-ck":
        const ckEditorLayouts = currentCategory.reportLayout.filter(
          (
            layout,
          ): layout is Extract<
            typeof layout,
            { __component: "reports.sub-category-with-ck" }
          > => layout.__component === "reports.sub-category-with-ck",
        );
        return <CkEditorListing reportLayout={ckEditorLayouts} />;

      case "reports.contact-details":
        return <ContactDetails dataNew={data[activeTab]} />;

      default:
        return null;
    }
  };

  return (
    <div>
      {/* Top Category Tabs */}
      <div className="bg-[#002F50] flex md:justify-center gap-6 py-5! overflow-x-auto px-7">
        {data?.map((item, index) => (
          <div
            key={`top_category_${index}`}
            className={clsx(
              `border-r-[#10456A] cursor-pointer transition-all duration-300`,
              index === data.length - 1 ? "border-r-0" : "border-r-2 pr-6 ",
            )}
            onClick={() => {
              setActiveTab(index);
              router.push(`?category=${item.category}`, { scroll: false });
            }}
          >
            <p
              className={clsx(
                "text-base whitespace-nowrap",
                activeTab === index ? "text-[#FFF]" : "text-[#9997A2]",
              )}
            >
              {item?.category}
            </p>
          </div>
        ))}
      </div>

      {/* Render appropriate template based on category */}
      {getTemplateComponent()}
    </div>
  );
}
