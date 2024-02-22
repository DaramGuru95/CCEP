import { useEffect, useState } from "react";

export const SupervisiorTab = ({
  active,
  name,
  bedge,
  setActive,
  url_type,
  addActiveClass,
  activeClass,
  index,
}: {
  active: boolean;
  name: string;
  bedge: string;
  setActive: any;
  url_type: string;
  addActiveClass: any;
  activeClass: boolean;
  index: number;
}) => {
  return (
    <a
      key={index}
      className="mx-4"
      onClick={() => addActiveClass(url_type)}
      href="javascript:void(0)"
    >
      <div
        className={
          activeClass
            ? "py-2 border-b-2 border-cyan-500 pl-2 text-cyan-500	   font-bold text-sm "
            : "py-2 pl-2 text-color-heading  text-sm"
        }
      >
        <p>
          {name}
          <span className="inline-flex items-center justify-center rounded-full ml-2 bg-yellow-400 w-4 h-4 pl-0 py-1 fs-10 font-medium text-white ring-0 ring-inset ring-gray-500/10">
            {bedge}
          </span>
        </p>
      </div>
    </a>
  );
};
