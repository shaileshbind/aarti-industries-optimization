"use client";
import React, { useState, useEffect } from "react";
// import { FiDownload, FiArrowUpRight } from "react-icons/fi";
import clsx from "clsx";
import SmoothCollapseGSAP from "./SmoothCollapse";
import { BodyText1 } from "../Typography2";
import ProductTabs from "./ProductTabs";
import MobileFilter from "./MobileFilter";

type SubCategory = {
    id: string;
    name: string;
};

type Tab = {
    id: string;
    label: string;
    subCategories?: SubCategory[];
};

type Product = {
    id: string;
    title: string;
    tdsLink: string;
    redirectLink: string;
};

// Dummy Data
const tabs: Tab[] = [
    { id: "all", label: "All" },
    {
        id: "chemistry",
        label: "By Chemistry",
        subCategories: [
            { id: "chlorination", name: "Chlorination" },
            { id: "nitration", name: "Nitration" },
            { id: "hydrogenation", name: "Hydrogenation" },
            { id: "esterification", name: "Esterification" },
        ],
    },
    {
        id: "enduse",
        label: "By End Use",
        subCategories: [
            { id: "pharma", name: "Pharmaceuticals" },
            { id: "agro", name: "Agrochemicals" },
        ],
    },
    {
        id: "valuechain",
        label: "By Value Chain",
        subCategories: [
            { id: "pharma", name: "Pharmaceuticals" },
            { id: "agro", name: "Agrochemicals" },
            { id: "polymers", name: "Polymers" },
            { id: "dyes", name: "Dyes & Pigments" },
            { id: "speciality", name: "Speciality Chemicals" },
            { id: "others", name: "Others" },
            { id: "intermediates", name: "Intermediates" },
            { id: "solvents", name: "Solvents" },
            { id: "aromatics", name: "Aromatics" },
        ],
    },
];

const products: Product[] = [
    {
        id: "p1",
        title: "Para Dichloro Benzene",
        tdsLink: "#",
        redirectLink: "para-dichloro-benzene",
    },
    {
        id: "p2",
        title: "1,2,3 Tri Chloro Benzene",
        tdsLink: "#",
        redirectLink: "para-dichloro-benzene",
    },
    {
        id: "p3",
        title: "6-Chloro-2,4-dinitroaniline",
        tdsLink: "#",
        redirectLink: "#",
    },
    {
        id: "p4",
        title: "Ortho Dichloro Benzene",
        tdsLink: "#",
        redirectLink: "#",
    },
    {
        id: "p5",
        title: "1,3,5 Tri Chloro Benzene",
        tdsLink: "#",
        redirectLink: "#",
    },
    {
        id: "p6",
        title: "4-Chloro-2-methylphenol",
        tdsLink: "#",
        redirectLink: "#",
    },
    {
        id: "p7",
        title: "4-Chloro-2-nitroaniline",
        tdsLink: "#",
        redirectLink: "#",
    },
    {
        id: "p8",
        title: "1,3,5 Tri Chloro Benzene",
        tdsLink: "#",
        redirectLink: "#",
    },
    {
        id: "p9",
        title: "4-Chloro-2-methylphenol",
        tdsLink: "#",
        redirectLink: "#",
    },
    {
        id: "p10",
        title: "4-Chloro-2-nitroaniline",
        tdsLink: "#",
        redirectLink: "#",
    }
];

const ProductFilterList: React.FC = () => {
    const [activeTab, setActiveTab] = useState("all");
    const [showSubCategories, setShowSubCategories] = useState(false);
    const [desktop, setDesktop] = useState<boolean>(true);
    const [showMobileFilter, setShowMobileFilter] = useState(false);

    useEffect(() => {
        const update = () => setDesktop(window.innerWidth >= 720);
        update(); 
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    // store multi-selected subcategory ids for filtering
    const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
    const toggleSubCategory = (id: string) => {
        setSelectedSubCategories(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="w-full max-w-[85rem] mx-auto my-[60px] px-4">
            {/* Tabs */}
            <ProductTabs
                tabs={tabs}
                activeId={activeTab}
                onChange={(id) => {
                    setActiveTab(id);
                    setShowSubCategories(id !== "all");
                }}
            />

            {/* Subcategories */}
            <SmoothCollapseGSAP className="hidden md:block" isOpen={showSubCategories}>
                <div className="flex flex-wrap gap-3 p-4 rounded-2xl bg-[#F7F9FA] max-w-5xl mx-auto">
                    {tabs
                        .find((t) => t.id === activeTab)
                        ?.subCategories?.map((sub) => {
                            const selected = selectedSubCategories.includes(sub.id);
                            return (
                                <button
                                    key={sub.id}
                                    type="button"
                                    onClick={() => toggleSubCategory(sub.id)}
                                    className={clsx(
                                        "px-4 py-2 border rounded-[10px] transition inline-flex items-center",
                                        selected
                                            ? "border-[#DC4C03] text-[#DC4C03]"
                                            : "border-[#4C5861] hover:bg-gray-100"
                                    )}
                                >
                                    <span className="mr-2">{sub.name}</span>

                                    {selected && (
                                        <span
                                            role="button"
                                            aria-label={`Deselect ${sub.name}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleSubCategory(sub.id);
                                            }}
                                            className="inline-flex items-center justify-center w-5 h-5 border border-[#DC4C03] rounded-full"
                                        >
                                            {/* cross svg */}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                                <g clipPath="url(#clip0_369_790)">
                                                    <path d="M0.572698 7.42628C0.595916 7.44953 0.623489 7.46797 0.653838 7.48055C0.684188 7.49313 0.716719 7.4996 0.749573 7.4996C0.782427 7.4996 0.814959 7.49313 0.845308 7.48055C0.875658 7.46797 0.90323 7.44953 0.926448 7.42628L3.99895 4.35378L7.0727 7.42628C7.11961 7.47319 7.18323 7.49955 7.24957 7.49955C7.31591 7.49955 7.37954 7.47319 7.42645 7.42628C7.47336 7.37937 7.49971 7.31575 7.49971 7.24941C7.49971 7.18307 7.47336 7.11944 7.42645 7.07253L4.3527 4.00003L7.4252 0.926282C7.47211 0.879371 7.49846 0.815748 7.49846 0.749407C7.49846 0.683066 7.47211 0.619442 7.4252 0.572532C7.37829 0.525621 7.31466 0.499268 7.24832 0.499268C7.18198 0.499268 7.11836 0.525621 7.07145 0.572532L3.99895 3.64628L0.925198 0.573782C0.877373 0.532825 0.815854 0.511424 0.752935 0.513854C0.690016 0.516284 0.630331 0.542367 0.585807 0.586891C0.541284 0.631414 0.515201 0.691099 0.51277 0.754018C0.51034 0.816937 0.531742 0.878456 0.572698 0.926282L3.6452 4.00003L0.572698 7.07378C0.526135 7.12062 0.5 7.18399 0.5 7.25003C0.5 7.31608 0.526135 7.37944 0.572698 7.42628Z" fill="#DC4C03" stroke="#DC4C03" strokeWidth="0.6" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_369_790">
                                                        <rect width="8" height="8" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                </div>
            </SmoothCollapseGSAP>

            {/* Product List */}

            <div className="flex items-center justify-between mb-6 md:mt-10">
                <BodyText1 >All Results (345)</BodyText1>

                {!desktop && showSubCategories && (<button className="flex gap-2 items-center" onClick={() => setShowMobileFilter(true)}>
                    <BodyText1>Filters</BodyText1>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <g clipPath="url(#clip0_230_740)">
                            <path d="M0.5 2.82059H8.11266C8.34209 3.86494 9.27472 4.64897 10.387 4.64897C11.4992 4.64897 12.4318 3.86497 12.6613 2.82059H15.5C15.7761 2.82059 16 2.59672 16 2.32059C16 2.04447 15.7761 1.82059 15.5 1.82059H12.661C12.4312 0.77678 11.4972 -0.00775146 10.387 -0.00775146C9.27609 -0.00775146 8.34262 0.776655 8.11284 1.82059H0.5C0.223875 1.82059 0 2.04447 0 2.32059C0 2.59672 0.223875 2.82059 0.5 2.82059ZM9.05866 2.3219C9.05866 2.32012 9.05869 2.31831 9.05869 2.31653C9.06087 1.58631 9.65672 0.99228 10.387 0.99228C11.1162 0.99228 11.7121 1.5855 11.7152 2.31537L11.7153 2.32272C11.7142 3.05419 11.1187 3.649 10.387 3.649C9.65553 3.649 9.06028 3.05478 9.05863 2.32375L9.05866 2.3219ZM15.5 13.1794H12.661C12.4311 12.1356 11.4972 11.351 10.387 11.351C9.27609 11.351 8.34262 12.1355 8.11284 13.1794H0.5C0.223875 13.1794 0 13.4032 0 13.6794C0 13.9555 0.223875 14.1794 0.5 14.1794H8.11266C8.34209 15.2237 9.27472 16.0077 10.387 16.0077C11.4992 16.0077 12.4318 15.2237 12.6613 14.1794H15.5C15.7761 14.1794 16 13.9555 16 13.6794C16 13.4032 15.7761 13.1794 15.5 13.1794ZM10.387 15.0077C9.65553 15.0077 9.06028 14.4135 9.05863 13.6825L9.05866 13.6807C9.05866 13.6789 9.05869 13.6771 9.05869 13.6753C9.06087 12.9451 9.65672 12.351 10.387 12.351C11.1162 12.351 11.7121 12.9442 11.7152 13.6741L11.7153 13.6814C11.7143 14.413 11.1188 15.0077 10.387 15.0077ZM15.5 7.5H7.88734C7.65791 6.45565 6.72528 5.67165 5.61303 5.67165C4.50078 5.67165 3.56816 6.45565 3.33872 7.5H0.5C0.223875 7.5 0 7.72387 0 8C0 8.27615 0.223875 8.5 0.5 8.5H3.33897C3.56888 9.54378 4.50275 10.3283 5.61303 10.3283C6.72391 10.3283 7.65738 9.5439 7.88716 8.5H15.5C15.7761 8.5 16 8.27615 16 8C16 7.72387 15.7761 7.5 15.5 7.5ZM6.94134 7.99868C6.94134 8.0005 6.94131 8.00228 6.94131 8.00406C6.93912 8.73428 6.34328 9.32831 5.61303 9.32831C4.88381 9.32831 4.28794 8.73509 4.28478 8.00525L4.28469 7.99794C4.28578 7.26637 4.88125 6.67165 5.61303 6.67165C6.34447 6.67165 6.93972 7.26584 6.94137 7.9969L6.94134 7.99868Z" fill="#4C5861" />
                        </g>
                        <defs>
                            <clipPath id="clip0_230_740">
                                <rect width="16" height="16" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </button>)}

                {!desktop && showMobileFilter && (
                    <MobileFilter
                        subCategories={tabs.find((t) => t.id === activeTab)?.subCategories || []}
                        selected={selectedSubCategories}
                        onClose={() => setShowMobileFilter(false)}
                        showMobileFilter={showMobileFilter}
                        onApply={(selected) => setSelectedSubCategories(selected)}
                        onClear={() => setSelectedSubCategories([])}
                    />
                )}
            </div>
            <div className="flex flex-wrap gap-4 items-center justify-between">
                {products.map((product, index) => {
                    const isHighlighted = hoveredIndex === index || (hoveredIndex === null && index === 0);
                    return (
                        <div
                            key={product.id}
                            onMouseEnter={() => setHoveredIndex(index)}
                            className={clsx(
                                "flex items-center justify-between border-b-2 py-4 md:p-4 transition-colors duration-500 cursor-pointer lg:min-w-[628px] w-full md:w-auto",
                                isHighlighted && desktop
                                    ? "bg-gradient-to-bl from-[#FA8129] to-[#DC4C03] rounded-lg text-white border-transparent"
                                    : "bg-white hover:bg-orange-50 border-gray-200"
                            )}
                        >

                            <div className="flex flex-col">
                                {/* Title */}
                                <BodyText1
                                    className={clsx(
                                        "text-lg font-medium",
                                        isHighlighted && desktop ? "text-white" : "text-gray-800"
                                    )}
                                >
                                    {product.title}
                                </BodyText1>

                                <a
                                    href={product.tdsLink}
                                    download
                                    className={clsx(
                                        " items-center space-x-1 text-sm md:hidden flex mt-1",
                                        isHighlighted && desktop ? "text-white" : "text-gray-700"
                                    )}
                                >
                                    <span>View TDS</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                                        <path d="M5 17.1666H15M10 3.83331V13.8333M10 13.8333L12.9167 10.9166M10 13.8333L7.08333 10.9166" stroke={isHighlighted && desktop ? "white" : "#4C5861"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </a>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center space-x-4">
                                <a
                                    href={product.tdsLink}
                                    download
                                    className={clsx(
                                        " items-center space-x-1 text-sm md:flex hidden",
                                        isHighlighted && desktop ? "text-white" : "text-gray-700"
                                    )}
                                >
                                    <span>View TDS</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                                        <path d="M5 17.1666H15M10 3.83331V13.8333M10 13.8333L12.9167 10.9166M10 13.8333L7.08333 10.9166" stroke={isHighlighted && desktop ? "white" : "#4C5861"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </a>
                                <a
                                    href={"/products/"+product.redirectLink}
                                    className={clsx(
                                        "w-8 h-8 flex items-center justify-center border rounded-[18px] transition",
                                        isHighlighted && desktop
                                            ? "border-white text-white hover:text-orange-600"
                                            : "border-orange-500 text-orange-500 hover:bg-orange-500"
                                    )}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M5.83203 14.1673L14.1654 5.83398" stroke={isHighlighted && desktop ? "white" : "#DC4C03"} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M5.83203 5.83398C5.83203 5.83398 8.35106 6.50004 9.99902 6.5C11.6467 6.49996 14.1654 5.83398 14.1654 5.83398C14.1654 5.83398 13.4991 8.35239 13.499 10C13.4989 11.6481 14.1654 14.1673 14.1654 14.1673" stroke={isHighlighted && desktop ? "white" : "#DC4C03"} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default ProductFilterList;