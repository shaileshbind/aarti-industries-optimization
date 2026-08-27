import { H2, SubH1 } from "../Typography2";
import Image from "next/image";
import Button from "../Button";
import { FadeInReveal } from "../ScrollReveal";
import { LatestBlogProps } from "@/app/types/blogs.type";
import { formatDate } from "../../../../utils/formatDate";

export default function LatestBlog({ data, section_two }: LatestBlogProps) {
  const latestBlog = data?.data[0];

  if (!latestBlog) return null;

  const { title, thumbnailImageDesktop, date, excerpt, slug } = latestBlog;

  return (
    <div className="fluid-container">
      {section_two?.latestBlogTitle && <H2>{section_two?.latestBlogTitle}</H2>}

      <div className="md:flex justify-between items-center mt-[30px]">
        {thumbnailImageDesktop?.url && (
          <FadeInReveal className="md:w-1/2 h-[280px] md:h-[336px] rounded-[14px] overflow-hidden mb-2 md:mb-0">
            <Image
              src={thumbnailImageDesktop?.url}
              width={650}
              height={340}
              alt={thumbnailImageDesktop?.alternativeText || "banner"}
              className="w-full h-full object-cover object-top"
            />
          </FadeInReveal>
        )}

        <FadeInReveal delay={0.4} className="md:w-[46%]">
          <p className="text-sm text-[#DC4C03]">{formatDate(date)}</p>

          {title && <SubH1 className="py-2">{title}</SubH1>}

          {excerpt && (
            <p className="text-base text-[#4C5861] lg:max-w-[536px]">
              {excerpt}
            </p>
          )}

          {slug && (
            <Button
              title={section_two?.ctaTitle || "Read more"}
              href={`/blogs/${slug}`}
              className="mt-[30px]"
            />
          )}
        </FadeInReveal>
      </div>
    </div>
  );
}
