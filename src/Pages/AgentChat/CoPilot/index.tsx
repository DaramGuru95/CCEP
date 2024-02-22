import { Button, Divider, Tooltip } from "@mui/material";
import { ChatNav } from "../../../Components/ui/ui/chat-header/ChatNav";
import TrusttLogo from "../../../assets/logo/trustt-logo.svg";

import CheckIcon from "../../../assets/icons/check.svg";
import KababVerticalIcon from "../../../assets/icons/kabab_vertical.svg";
import { MessageProps } from "../modal";
import {
  extractArray,
  extractStringsBeforeAfter,
} from "../../../Helpers/extractJson";
import { GridDeleteIcon } from "@mui/x-data-grid";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

import { useEffect, useRef, useState } from "react";
import { convertTimestampToTime } from "../../../Helpers/commonHelper";
export const labelMap: any = {
  trx_date: "Date",
  trx_amt: "Amount",
  trx_amount: "Amount",
  trx_det: "Txn Details",
  rwd_pts: "Reward Pts",
  trx_cgt: "Category",
  trx_month: "Statement Month",
  reward_points: "Reward Points",
  trx_amt_spnt: "Total Amount",
};

export const formatString = (inputString: any) => {
  // Check if the inputString contains a number with a decimal part
  // if (/^-?\d+\.\d+$/.test(inputString)) {
  if (/^-?\s*\d+\.\d+$/.test(inputString)) {
    // Convert the string to a number, format it with commas, and handle credit/debit
    let number = parseFloat(inputString.replace(/\s/g, ""));
    let formattedNumber = number.toLocaleString("en-US", {
      style: "decimal",
    });

    if (number < 0) {
      return "Rs " + formattedNumber.replace("-", "") + " CR";
    } else {
      return "Rs " + formattedNumber + " DR";
    }
  } else {
    // If the string does not contain a number with a decimal part, return the original string
    return inputString;
  }
};
const Copilot = ({
  copilotResponse,
  handleResponse,
}: {
  copilotResponse: MessageProps[];
  handleResponse: any;
}) => {
  const messagesEndRef = useRef<any>(null);
  const [disabledButtons, setDisabledButtons] = useState<any>([]);
  const handleUseResponse = (val: any, index: any, tabId: any) => {
    // if (!responseClicked) {
    handleResponse(val);
    setDisabledButtons([...disabledButtons, { index, tabId }]);
    // }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [copilotResponse]);
  return (
    <div className=" h-screen bg-white rounded-md  justify-between flex flex-col  space-y-2 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
      <ChatNav
        source={TrusttLogo}
        name="Co Pilot"
        type={""}
        righticon={KababVerticalIcon}
      />
      <div>
        {copilotResponse?.map((val, index) => (
          <div key={index} className="pb-2 msg-timestamp text-message mb-2">
            {val.recieving && (
              <div className="flex items-end mb-1">
                {/* max-w-xs */}
                <div className="relative flex w-2/3  max-w-fit  text-xs  mx-1 order-1 items-start rounded-md  bg-gray-100">
                  <div className="break-words flex py-2 whitespace-pre-wrap text-black fs-6  absolute right-2">
                    {/* {val?.time} */}
                    {convertTimestampToTime(val?.time)}
                  </div>
                  <div className="text-xs px-4 py-4 break-words  ">
                    <div className="text-slate-800 break-words whitespace-pre-wrap">
                      {/* I want to know about my last 5 transactions done on
                        Amazon */}
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
            {val.llmResponse && (
              <div className="flex items-end justify-end mb-4 mt-4 text-message ">
                <div className="flex flex-col min-w-full text-xs max-w-xs mx-1 order-1 items-end">
                  <div className="w-2/3 px-4 max-w-fit	 py-2  flex flex-col rounded-md text-black text-sm bg-ques  inline-block ">
                    <div className="break-words text-end  whitespace-pre-wrap  fs-6">
                      {convertTimestampToTime(val?.time)}
                    </div>

                    {copilotResponse.length - 1 == index && (
                      <div className="break-words text-end  whitespace-pre-wrap  fs-6">
                        <Button
                          sx={{
                            border: "none",
                            textTransform: "none",
                            background: "#fff",
                            borderRadius: 3,
                            p: 0,
                            fontSize: "10px",
                            fontWeight: 600,
                            width: "5.5rem",
                            gap: 0,
                          }}
                          variant="outlined"
                          startIcon={
                            <ModeEditOutlineOutlinedIcon
                              sx={{ height: "13px", width: "13px" }}
                            />
                          }
                          onClick={() =>
                            handleUseResponse(val, index, val.conv_session_id)
                          }
                          disabled={disabledButtons.some(
                            (button: any) =>
                              button.index === index &&
                              button.tabId == val.conv_session_id
                          )}
                        >
                          Use response
                        </Button>
                      </div>
                    )}
                    <div className="break-words text-xs  whitespace-pre-wrap ">
                      {/* {"Hi Rakhi how may i assist you today?"} */}
                      {val.action_flag !== "show-transaction-table" &&
                        val.llmResponse}
                      {val.action_flag === "show-transaction-table" && (
                        <>
                          <p>
                            {
                              extractStringsBeforeAfter(val.llmResponse)
                                .beforeStart
                            }
                          </p>
                          <div className="relative w-full flex flex-col justify-center items-center overflow-x-auto">
                            {Array.isArray(extractArray(val.llmResponse)) && (
                              <table
                                className="text-sm w-fit text-left rtl:text-center text-gray-500 overflow-x-auto"
                                style={{ border: "1px solid rgb(156 163 175)" }}
                              >
                                <tbody>
                                  {extractArray(val.llmResponse).map(
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
                                              extractArray(val.llmResponse)
                                                .length == index
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
                          {extractStringsBeforeAfter(val.llmResponse)?.afterEnd}
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <img src={CheckIcon} className="w-3 h-3 order-1 pr-1" alt="" />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
    </div>
  );
};

export default Copilot;
