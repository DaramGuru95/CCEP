import { FC } from "react";

interface RightNavProp {
  index: number;
  image: string;
  name: string;
}

export const RightNavLink: FC<RightNavProp> = ({ index, image, name }) => {
  return (
    <div
      key={index}
      className=" group text-center flex flex-col items-center justify-center relative rounded-xl   hover:bg-gray-50"
    >
      <img className="" src={image} alt="transfer-chat" />
      <a href="" className="">
        {name}
      </a>
    </div>
  );
};
