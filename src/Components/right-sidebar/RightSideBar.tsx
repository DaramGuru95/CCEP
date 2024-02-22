import React from "react";
import { RightNavLink } from "../ui/ui/rightNavLink/rightNavLink";
import TrasnferChat from "../../assets/icons/transfer-chat.svg";
import ForwardChat from "../../assets/icons/forward-chat.svg";
import RaiseTicket from "../../assets/icons/raise-ticket.svg";

const right_link = [
  { image: TrasnferChat, name: "Transfer Chat", link: "" },
  {
    image: ForwardChat,
    name: "Forward to Expert",
    link: "",
  },
  { image: RaiseTicket, name: "Raise a Ticket", link: "" },
];

const RightSideBar = () => {
  return (
    <div className="top-0 right-0 px-4  bg-white w-24 h-screen fixed rounded-none border-none ">
      <div className="px-4  pt-4 space-y-4 ">
        <nav className="flex flex-1  flex-col text-xs gap-y-4 pt-10 font-semibold text-slate-600">
          {right_link.map((val, key) => (
            <RightNavLink index={key} image={val.image} name={val.name} />
          ))}
        </nav>
      </div>
    </div>
  );
};

export default RightSideBar;
