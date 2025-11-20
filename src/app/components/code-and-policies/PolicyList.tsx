"use client";
import React, { useState } from "react";
import ProductList from "../products/ProdutList";

const PolicyListComponent: React.FC<{ policiesList: any[] }> = ({ policiesList }) => {
    const [visibleCount, setVisibleCount] = useState(6);
    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 2);
    };
    return (
        <div className="container ">
            <div className="grid lg:grid-cols-2 gap-x-[64px] lg:gap-y-[20px] mx-auto py-[72px] lg:py-[70px]">
                {policiesList.slice(0, visibleCount).map((policy: any) => (
                    <ProductList key={policy.id} title={policy.title} link={policy.link} secondary={policy.secondary} />
                ))}
            </div>
            <div className="flex justify-center mb-8">
                <button onClick={handleLoadMore} className={`animated-underline w-fit cursor-pointer text-orange-200 text-[16px] font-normal leading-[100% font-alte-hans underline underline-offset-[4px] [text-underline-position:under]`}>
                    View More
                </button>
            </div>
        </div>
    );
};

export default PolicyListComponent;
