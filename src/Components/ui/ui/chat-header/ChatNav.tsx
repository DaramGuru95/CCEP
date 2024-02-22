import { Avatar } from "@mui/material";
import { FC } from "react";

interface ChatNavProp {
  name: string;
  source?: string;
  type: any;
  righticon?: string;
  righticon2?: string;
  handleClickOpen?: any;
  item?: any;
}
export const ChatNav: FC<ChatNavProp> = ({
  name,
  source,
  type,
  righticon,
  righticon2,
  handleClickOpen,
  item,
}) => {
  return (
    <nav className="z-50 px-2 sticky shadow-md top-0 h-14 py-4 bg-white border-0 border-gray-300 bg-white  shadow-[0 2px 4px -2px rgb(16 24 40 / 0.1), 0 4px 6px -1px rgb(16 24 40 / 0.1)]">
      <div className="flex justify-between items-center px-2">
        <div className="flex items-center ">
          <Avatar alt="" src={source} sx={{ height: 29, width: 29 }}>
            {name[0]}
          </Avatar>
          {/* <img className="w-6 h-6 rounded-full" src={source} alt="User logo" /> */}
          <div className="flex-1 ms-2 text-base">
            <p className="whitespace-pre-wrap	 font-semibold text-gray-900 truncate dark:text-white text-base leading-none">
              {name}
            </p>
            <p className=" whitespace-pre-wrap  text-xs	font-medium text-slate-500 truncate dark:text-gray-500 leading-none">
              <span className="">{type}</span>
            </p>
          </div>
        </div>
        <div>
          {righticon2 && (
            <button className="mx-2 pt-2">
              <img
                width={10}
                height={10}
                className="w-4 h-4 rounded-full"
                src={righticon2}
                alt="Menu"
              />
            </button>
          )}
          <button
            onClick={(e) => {
              if (item) handleClickOpen(e, item);
            }}
          >
            <img
              width={12}
              height={12}
              className="w-4 h-4 rounded-full"
              src={righticon}
              alt="Menu"
            />
          </button>
        </div>
      </div>
    </nav>
  );
};
