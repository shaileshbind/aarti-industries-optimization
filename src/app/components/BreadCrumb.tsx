import React from "react";
import clsxN from "./../../../utils/clsxN";
import Link from "next/link";
import Image from "next/image";

type BreadCrumbInnerProps = {
  href: string;
  title: string;
};

interface BreadCrumbProps {
  breadcrumbArr?: BreadCrumbInnerProps[];
}

const BreadCrumb = ({ breadcrumbArr }: BreadCrumbProps) => {
  if (!breadcrumbArr) return null;

  return (
    <div className="flex overflow-x-auto pb-[37px]">
      {breadcrumbArr.map((item, index, arr) => (
        <React.Fragment key={"breadcrumb_" + index}>
          <div
            className={clsxN(
              "text-sm leading-[130%] font-normal capitalize w-max flex items-center",
              { "text-[#F36633]": arr.length === index + 1 }
            )}
          >
            <Link
              href={item.href}
              className={clsxN({
                "inline-block whitespace-nowrap overflow-hidden text-ellipsis":
                  item?.title?.length > 20,
              })}
            >
              {item.title}
            </Link>
          </div>

          {/* Show divider only if not last item */}
          {arr.length !== index + 1 && (
            <div className="px-2 flex items-center">
              <Image
                src="/images/breadcrumb-divider.svg"
                alt=""
                width={17}
                height={17}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default BreadCrumb;
