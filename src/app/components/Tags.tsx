import clsxN from "../../../utils/clsxN";

type TagProps = {
  title: string;
  className?: string;
};

const Tags = ({ title, className }: TagProps) => {
  return (
    <p
      className={clsxN(
        "text-[#FF7932] font-medium text-[14px] font-roboto",
        className,
      )}
    >
      {title}
    </p>
  );
};

export default Tags;
