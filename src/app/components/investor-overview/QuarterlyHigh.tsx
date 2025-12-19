import { BodyText2, H2, H3 } from "../Typography2";
import { InvestorQuarterlyProps } from "@/app/types/investor-overview.type";

const QuarterlyHigh = ({ data }: InvestorQuarterlyProps) => {
  const { title, description, card } = data;
  return (
    <div className="mb-[72px] lg:mb-[140px]">
      <div className="grid xl:grid-cols-[400px_1fr] gap-y-[36px] gap-x-[100px] fluid-container">
        <div>
          {title && <H3 className="text-blue-100">{title}</H3>}
          {description && (
            <BodyText2 className="mt-[12px] lg:mt-[16px]">
              {description}
            </BodyText2>
          )}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-[40px]">
          {card?.map((items) => {
            return (
              <div
                key={items?.id}
                className="pb-[unset] xl:pb-[40px] lg:flex gap-x-[50px] justify-between xl:border-b xl:border-grey-200 items-center"
              >
                {items?.title && <BodyText2>{items?.title}</BodyText2>}
                {items?.value && (
                  <H2 className="text-orange-200">{items?.value}</H2>
                )}
                {items?.description && (
                  <BodyText2>{items?.description}</BodyText2>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuarterlyHigh;
