import { Tooltip } from "@mui/material";
import { ChatNav } from "../../../Components/ui/ui/chat-header/ChatNav";
import { ChatFooter } from "../../../Components/ui/ui/chat-footer/ChatFooter";
import TrusttLogo from "../../../assets/logo/trustt-logo.svg";
import CloseRedIcon from "../../../assets/icons/close_red.svg";
import PauseIcon from "../../../assets/icons/pause.svg";
import CheckIcon from "../../../assets/icons/check.svg";
import { SessionData } from "../../../Config/Store/Slices/reducers/homepage_reducers/activesessions_reducer";
import { MessageProps } from "../modal";
import { formatString, labelMap } from "../CoPilot";
import {
  extractArray,
  extractStringsBeforeAfter,
} from "../../../Helpers/extractJson";
import { useSelector } from "react-redux";
import { RootState } from "../../../Config/Store";
import { useEffect, useRef } from "react";
import { convertTimestampToTime } from "../../../Helpers/commonHelper";

interface AgentCallProps {
  handleClickOpen: any;
  closeModalItem: any;
  messages: MessageProps[];
  sendMessage: any;
  handleInput: any;
  userData: SessionData[];
  inputmessage?: string | null;
  copilotResponse: MessageProps[];
}

const AgentChatCard: React.FC<AgentCallProps> = ({
  handleClickOpen,
  closeModalItem,
  messages,
  sendMessage,
  handleInput,
  userData,
  inputmessage,
  copilotResponse,
}) => {
  const customerData = useSelector(
    (state: RootState) => state.getCustomer360Reducer
  );
  const customer360: any = customerData.data;
  const messagesEndRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, copilotResponse]);
  return (
    <div className="h-screen  bg-white rounded-md  justify-between flex flex-col  space-y-2 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
      <ChatNav
        source={""}
        name={customer360?.first_name + " " + customer360?.last_name}
        type={"Customer"}
        righticon={CloseRedIcon}
        righticon2={PauseIcon}
        handleClickOpen={handleClickOpen}
        item={closeModalItem}
      />
      <div ref={messagesEndRef}>
        {messages?.map((val, index) => (
          <div className="" key={index}>
            {val.recieving && (
              <div className="flex items-end mb-4">
                {/* max-w-xs */}
                <div className="relative flex w-2/3  max-w-fit   text-xs  mx-1 order-1 items-start rounded-md  bg-gray-100">
                  <div className="break-words flex py-2 whitespace-pre-wrap text-black fs-6  absolute right-2">
                    {/* {val?.time} */}
                    {convertTimestampToTime(val?.time)}
                  </div>
                  <div className="text-xs px-4 py-4 break-words  ">
                    <div className="text-slate-800 break-words whitespace-pre-wrap">
                      {val.recieving}
                    </div>
                  </div>
                </div>
                <Tooltip
                  className="ml-1"
                  sx={{ position: "inherit !important" }}
                  title=""
                >
                  <img
                    className="w-3 h-3 rounded"
                    src={TrusttLogo}
                    alt="agent logo"
                  />
                </Tooltip>
              </div>
            )}
            {val.sending && (
              <div className="flex items-end justify-end mb-4">
                <div className="flex flex-col min-w-full text-xs max-w-xs mx-1 order-1 items-end">
                  <div className="w-2/3 px-4 max-w-fit py-2  flex flex-col rounded-md text-black text-sm bg-ques  inline-block ">
                    <div className="break-words text-end  whitespace-pre-wrap  fs-6">
                      {/* {val?.time} */}
                      {convertTimestampToTime(val?.time)}
                    </div>
                    <div className="break-words text-xs  whitespace-pre-wrap ">
                      {val.action_flag !== "show-transaction-table" &&
                        val.sending}
                      {val.action_flag === "show-transaction-table" && (
                        <>
                          <p>
                            {extractStringsBeforeAfter(val.sending).beforeStart}
                          </p>
                          <div className="relative w-full flex flex-col justify-center items-center overflow-x-auto">
                            {Array.isArray(extractArray(val.sending)) && (
                              <table
                                className="text-sm w-fit text-left rtl:text-center text-gray-500 overflow-x-auto"
                                style={{ border: "1px solid rgb(156 163 175)" }}
                              >
                                <tbody>
                                  {extractArray(val.sending).map(
                                    (item: any, index: any) => (
                                      <tr
                                        className={` text-black ${
                                          index % 2 === 0
                                            ? "bg-gray-200"
                                            : "bg-white"
                                        }`}
                                        key={index}
                                      >
                                        <td
                                          style={{
                                            borderBottom: `${
                                              extractArray(val.sending)
                                                .length === index
                                                ? "1px solid rgb(156 163 175)"
                                                : "0px"
                                            }`,
                                            padding: "8px",
                                          }}
                                        >
                                          {/* stringWithMinus.replace(/^(-)/, '') */}
                                          {Object.keys(item).map(
                                            (key: any, i: any) => (
                                              <div
                                                key={i}
                                                className="flex flex-row "
                                              >
                                                <div
                                                  className="tableWidth"
                                                  // style={{ width: "100px" }}
                                                >
                                                  {labelMap[
                                                    key.toLowerCase()
                                                  ] || key}
                                                  :
                                                </div>
                                                <div className=" w-1/2 text-start whitespace-break-spaces	 flex items-end">
                                                  {formatString(item[key])}
                                                </div>
                                              </div>
                                            )
                                          )}
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                            )}
                          </div>
                          {extractStringsBeforeAfter(val.sending)?.afterEnd}
                        </>
                      )}
                      {/* {val.sending} */}
                    </div>
                  </div>
                </div>
                <img src={CheckIcon} className="w-3 h-3 order-1 pr-1" alt="" />
              </div>
            )}
            <div ref={messagesEndRef}></div>
          </div>
        ))}

        <ChatFooter
          sendMessage={sendMessage}
          onChange={handleInput}
          disabled={""}
          inputmessage={inputmessage}
        />
      </div>
    </div>
  );
};

export default AgentChatCard;
