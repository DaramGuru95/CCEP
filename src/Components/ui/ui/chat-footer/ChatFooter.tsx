import { FC } from "react";
import { IconButton, Tooltip } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";
import SendIcon from "../../../../assets/icons/sendicon.svg";
import AddCircleIcon from "@mui/icons-material/AddCircle";
interface ChatFooterProp {
  disabled: any;
  onChange: any;
  sendMessage?: any;
  inputmessage?: string | null;
}

export const ChatFooter: FC<ChatFooterProp> = ({
  disabled,
  onChange,
  sendMessage,
  inputmessage,
}) => {
  return (
    <footer className="w-full sticky bottom-0 bg-white">
      <div style={{ width: "110%" }} className="relative w-full   flex my-2  ">
        <Tooltip
          title=""
          className="bg-sky-100  mr-2 rounded-full flex items-center justify-center   top-0 text-sky-600"
        >
          <IconButton
            component="label"
            className={" bg-sky-100 hover hover:text-sky-600 "}
            onClick={(e) => {}}
          >
            <AddCircleIcon fontSize={"large"} className=" text-sky-600" />
          </IconButton>
        </Tooltip>
        <input
          defaultValue={""}
          onChange={onChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          value={`${inputmessage}`}
          // autoFocus={false}
          placeholder={"Type here"}
          className=" flex  rounded-md w-full h-12	 border-0 px-5 text-xs focus:text-black text-gray-500  block bg-gray-100  focus:border-0 focus:outline-none focus:ring-1  focus:ring-sky-600"
        />
        <Tooltip
          title="Send Chat"
          className="absolute  flex items-center justify-center h-10  right-11 top-1 bg-sky-600 text-white "
          sx={{
            ".MuiIconButton-root": {
              backgroundColor: "#0284c7 !important",
            },
          }}
          onClick={sendMessage}
        >
          <IconButton
            component="label"
            onClick={sendMessage}
            className={"bg-sky-100   fs-14"}
            sx={{ display: "flex" }}
          >
            <img src={SendIcon} width={30} alt="" />
            {/* <SendIcon className="text-white" /> */}
          </IconButton>
        </Tooltip>
      </div>
    </footer>
  );
};
