import { ChatNav } from "../../../Components/ui/ui/chat-header/ChatNav";
import TrusttLogo from "../../../assets/logo/trustt-logo.svg";

import KababVerticalIcon from "../../../assets/icons/kabab_vertical.svg";
import { MessageProps } from "../modal";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { formatString, labelMap } from "../CoPilot";
import {
  extractArray,
  extractStringsBeforeAfter,
} from "../../../Helpers/extractJson";
import { useSelector } from "react-redux";
import { RootState } from "../../../Config/Store";
import { convertTimestampToTime } from "../../../Helpers/commonHelper";
import { AgentTranscriptModal } from "../../../Config/Store/Slices/reducers/agentconsole_reducers/agentTranscript_reducers";
import moment from "moment";

const AgentTranscript = ({ messages }: { messages: MessageProps[] }) => {
  const customerData = useSelector(
    (state: RootState) => state.getCustomer360Reducer
  );
  const customer360: any = customerData.data;
  const {
    userDetails: { profile_details },
  } = useSelector((state: RootState) => state.userDetails);
  const { data: transcriptInfo }: { data: AgentTranscriptModal | null } =
    useSelector((state: RootState) => state.getAgentTranscriptReducer);

  return (
    <div className="h-screen  bg-white rounded-md  justify-between flex flex-col  space-y-2 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
      <ChatNav
        source={TrusttLogo}
        name="Transcript"
        type={""}
        righticon={KababVerticalIcon}
      />
      <Box height={"100%"} paddingX={2} paddingY={1}>
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: 14,
          }}
          variant="subtitle2"
          gutterBottom
        >
          Agent {profile_details?.first_name} has joined the Conversation
        </Typography>
        <Box height={"100%"}>
          {messages?.map((val, index) => (
            <div key={index} className="flex flex-col ">
              <div className="flex ">
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: "600",
                  }}
                  variant="subtitle2"
                  marginRight={2}
                  gutterBottom
                >
                  [{convertTimestampToTime(val?.time)}]
                </Typography>

                {val.recieving && (
                  <Typography
                    sx={{
                      fontSize: 14,
                      // width: "100%",
                    }}
                    variant="subtitle2"
                    // gutterBottom
                  >
                    {customer360?.first_name}: {val.recieving}
                  </Typography>
                )}
              </div>
              <div className="flex">
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: "600",
                  }}
                  variant="subtitle2"
                  marginRight={2}
                  gutterBottom
                >
                  [{convertTimestampToTime(val?.time)}]
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    width: "100%",
                  }}
                  variant="subtitle2"
                  // gutterBottom
                >
                  {val.action_flag != "show-transaction-table" &&
                    `${profile_details?.first_name}: ${val.sending}`}
                  {val.action_flag == "show-transaction-table" && (
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
                                          extractArray(val.sending).length ==
                                          index
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
                                              {labelMap[key.toLowerCase()] ||
                                                key}
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
                </Typography>
              </div>
            </div>
          ))}
          <Typography
            sx={{
              fontWeight: "600",
              fontSize: 14,
              marginTop: 3,
            }}
            variant="subtitle2"
            gutterBottom
          >
            {customer360?.first_name} has Left the Conversation
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
            }}
            variant="subtitle2"
            gutterBottom
          >
            The call has ended [
            {transcriptInfo?.conv_closed_time
              ? moment(
                  transcriptInfo?.conv_closed_time,
                  "ddd, DD MMM YYYY HH:mm:ss"
                ).format("ddd, DD MMM YYYY hh:mm")
              : ""}
            ] Conversation
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default AgentTranscript;
