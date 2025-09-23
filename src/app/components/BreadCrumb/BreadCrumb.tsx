import React from 'react';
import clsxN from "../../../../utils/clsxN";
import Link from 'next/link';

type BreadCrumbInnerProps = {
    href: string;
    title: string;
}

interface BreadCrumbProps {
    breadcrumbArr?: BreadCrumbInnerProps[];
}

const BreadCrumb = ({ breadcrumbArr }: BreadCrumbProps) => {

    if (!breadcrumbArr) {
        return null;
    }

    return (
        <div className='flex overflow-x-auto py-[37px]'>
            {
                breadcrumbArr && breadcrumbArr.length > 0 &&
                breadcrumbArr.map((item, index, arr) => (
                    <React.Fragment key={'breadcrumb_' + index}>
                        {
                            item?.href && item?.title &&
                            <div className='flex'>
                                <div className={clsxN('text-sm leading-[130%] font-normal capitalize w-max', { 'text-primaryPink': arr.length === index + 1 })}>
                                    <Link href={item.href} className={clsxN({ 'inline-block whitespace-nowrap overflow-hidden text-ellipsis': item?.title?.length > 20 })}>{item.title}</Link>
                                </div>
                                {
                                    arr.length !== index + 1 ? <div className='text-sm leading-[130%] font-normal capitalize px-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                            <path d="M6.88281 4.02979C6.88281 4.02979 7.89145 5.77234 8.78994 6.67474C9.6883 7.57701 11.4261 8.59312 11.4261 8.59312C11.4261 8.59312 9.68381 9.6013 8.78154 10.4995C7.87899 11.398 6.86281 13.1364 6.86281 13.1364" stroke="#4C5861" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div> : null
                                }
                            </div>
                        }
                    </React.Fragment>
                ))
            }
        </div>
    )
}

export default BreadCrumb;